import { getUniqueId } from '@/Utils/Common';
import {
  ActionIcon,
  Button,
  TextInput,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';

const Benifits = ({ section, onSave = () => {} }) => {
  const [benefits, setBenefits] = useState(
    section?.length
      ? [...section]
      : [{ id: getUniqueId(), value: '' }]
  );
  console.log(benefits);

  const onChange = (id, value) => {
    if (Array.isArray(benefits)) {
      const newBenefits = benefits.map(benefit =>
        benefit.id === id ? { ...benefit, value } : benefit
      );
      setBenefits(newBenefits);
    } else if (
      typeof benefits === 'object' &&
      benefits !== null
    ) {
      if (benefits.id === id) {
        setBenefits({ ...benefits, value });
      }
    }
  };

  const handleSave = () => {
    let updatedSection;
    if (Array.isArray(benefits)) {
      updatedSection = benefits.filter(
        benefit => benefit.value.trim() !== ''
      );
    } else if (
      typeof benefits === 'object' &&
      benefits !== null
    ) {
      updatedSection =
        benefits.value.trim() !== '' ? [benefits] : [];
    }
    if (onSave) {
      onSave(updatedSection);
    }
  };

  const addBenefit = () => {
    if (Array.isArray(benefits)) {
      setBenefits([
        ...benefits,
        { id: getUniqueId(), value: '' },
      ]);
    } else if (
      typeof benefits === 'object' &&
      benefits !== null
    ) {
      setBenefits([
        { ...benefits },
        { id: getUniqueId(), value: '' },
      ]);
    }
  };

  const deleteBenefit = id => {
    if (Array.isArray(benefits)) {
      const newBenefits = benefits.filter(
        benefit => benefit.id !== id
      );
      setBenefits(newBenefits);
    }
  };
  console.log(benefits.length > 1);
  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      {Array.isArray(benefits) ? (
        benefits.map(item => (
          <div key={item.id} className="flex items-center">
            <TextInput
              placeholder="Add a Benefit"
              className="flex-grow"
              onChange={e =>
                onChange(item.id, e.target.value)
              }
              value={item.value}
            />
            <Button
              variant="subtle"
              color="red"
              onClick={() => deleteBenefit(item.id)}
              className="ml-2"
            >
              <IconTrash size={16} />
            </Button>
          </div>
        ))
      ) : (
        <div className="flex items-center">
          <TextInput
            placeholder="Update Benefit"
            className="flex-grow"
            onChange={e =>
              onChange(benefits.id, e.target.value)
            }
            value={benefits.value}
          />
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => deleteBenefit(benefits.id)}
            className="ml-2"
          >
            <IconTrash size={16} />
          </ActionIcon>
        </div>
      )}
      {benefits.id ? null : (
        <div className="flex w-full justify-end">
          <Button
            variant="transparent"
            onClick={addBenefit}
          >
            + Add Benefit
          </Button>
        </div>
      )}
      <div className="flex w-full justify-end">
        <Button
          color="black"
          className="w-max"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Benifits;
