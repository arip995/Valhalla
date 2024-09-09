import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import {
  socialIconsMapping,
  SocialPlatforms,
  SocialTitleMapping,
} from './Sections';

const Social = ({ section = SocialPlatforms, onSave }) => {
  const [connectedPlatforms, setConnectedPlatforms] =
    useState(() => {
      const initialState = {};
      SocialPlatforms.forEach(platform => {
        const existingPlatform = section.find(
          s => s.type === platform.type
        );
        initialState[platform.type] = existingPlatform
          ? existingPlatform.value || ''
          : '';
      });
      console.log(initialState);
      return initialState;
    });

  const handleConnect = platformName => {
    setConnectedPlatforms(prev => {
      const newState = { ...prev };
      newState[platformName] = '';
      return newState;
    });
  };
  const handleInputChange = (platformName, value) => {
    setConnectedPlatforms(prev => ({
      ...prev,
      [platformName]: value,
    }));
  };

  const handleSave = () => {
    const updatedSection = Object.entries(
      connectedPlatforms
    )
      .map(([type, value]) => ({
        type,
        value: value || '',
      }))
      .filter(platform => platform.value !== '');
    if (onSave) {
      console.log(updatedSection);
      onSave(updatedSection);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mt-4 flex items-center justify-center overflow-y-auto">
        <div className="flex h-[55vh] w-full flex-col gap-4">
          {Object.keys(connectedPlatforms)?.map(
            (platformType, index) => {
              const platform = SocialPlatforms.find(
                p => p.type === platformType
              );
              if (!platform) return null;

              return (
                <div
                  key={index}
                  className="mx-2 flex items-center justify-between rounded-lg border bg-gray-50 p-4"
                >
                  <div className="flex w-full items-center space-x-3">
                    <img
                      src={socialIconsMapping[platformType]}
                      alt={platformType}
                      className="h-10 w-10"
                    />
                    <div className="w-full flex-grow">
                      <div className="socials flex w-full items-center">
                        <TextInput
                          fullWidth
                          value={
                            connectedPlatforms[platformType]
                          }
                          onChange={e =>
                            handleInputChange(
                              platformType,
                              e.target.value
                            )
                          }
                          leftSectionWidth={100}
                          placeholder="username"
                          className="w-full"
                          leftSection={
                            <span className="text-sm text-gray-500">{`${SocialTitleMapping[platformType.toLowerCase()].toLowerCase()}.com/`}</span>
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="ml-3 text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      handleConnect(
                        platformType,
                        platform.value || ''
                      )
                    }
                  >
                    x
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button
          type="submit"
          color="black"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Social;
