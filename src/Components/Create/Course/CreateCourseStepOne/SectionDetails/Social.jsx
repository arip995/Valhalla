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
      [section].forEach(platform => {
        if (platform.value) {
          initialState[platform.type] = platform.value;
        }
      });
      return initialState;
    });

  const handleConnect = (
    platformName,
    initialValue = ''
  ) => {
    console.log(platformName, connectedPlatforms);
    setConnectedPlatforms(prev => {
      const newState = { ...prev };
      if (newState[platformName] !== undefined) {
        delete newState[platformName];
      } else {
        newState[platformName] = initialValue;
      }
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
    const updatedSection = section.map(platform => ({
      ...platform,
      value: connectedPlatforms[platform.type] || '',
    }));
    if (onSave) {
      onSave(updatedSection);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="mt-4 flex items-center justify-center overflow-y-auto">
        <div className="flex h-[55vh] w-full flex-col gap-4">
          {section?.map((platform, index) => {
            return (
              <div
                key={index}
                className="mx-2 flex items-center justify-between rounded-lg border bg-gray-50 p-4"
              >
                <div className="flex w-full items-center space-x-3">
                  <img
                    src={socialIconsMapping[platform.type]}
                    alt={platform.type}
                    className="h-10 w-10"
                  />
                  <div className="w-full flex-grow">
                    {connectedPlatforms[platform.type] !==
                    undefined ? (
                      <div className="socials flex w-full items-center">
                        <TextInput
                          fullWidth
                          value={
                            connectedPlatforms[
                              platform.type
                            ]
                          }
                          onChange={e =>
                            handleInputChange(
                              platform.type,
                              e.target.value
                            )
                          }
                          leftSectionWidth={100}
                          placeholder="username"
                          className="w-full"
                          leftSection={
                            <span className="text-sm text-gray-500">{`${SocialTitleMapping[platform.type.toLowerCase()].toLowerCase()}.com/`}</span>
                          }
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="text-base font-medium text-gray-800">
                          {platform.type}
                        </h3>
                        {/* <p className="text-sm text-gray-500" >
                          Tap to connect
                        </p> */}
                      </>
                    )}
                  </div>
                </div>
                <button
                  className="ml-3 text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    handleConnect(
                      platform.type,
                      platform.value || ''
                    )
                  }
                >
                  {connectedPlatforms[platform.type] !==
                    undefined || platform.value
                    ? 'x'
                    : '+'}
                </button>
              </div>
            );
          })}
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
