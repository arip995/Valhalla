import { getUniqueId } from '@/Utils/Common';
import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react';

const Benifits = ({ section, onSave = () => {} }) => {
  const [benefits, setBenefits] = useState(
    section?.id
      ? { ...section.value }
      : [{ id: getUniqueId(), value: '' }]
  );

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
    const updatedSection = benefits.filter(
      benefit => benefit.value.trim() !== ''
    );
    console.log(updatedSection);
    if (onSave) {
      onSave(updatedSection);
    }
  };

  const addBenefit = () => {
    setBenefits([
      ...benefits,
      { id: getUniqueId(), value: '' },
    ]);
  };

  return (
    <div className="mt-4 flex w-full flex-col gap-4">
      {Array.isArray(benefits) ? (
        benefits.map(benefit => (
          <TextInput
            placeholder="Add a Benefit"
            key={benefit.id}
            onChange={e =>
              onChange(benefit.id, e.target.value)
            }
            value={benefit.value}
          />
        ))
      ) : (
        <TextInput
          placeholder="Update Benefit"
          key={benefits.id}
          onChange={e =>
            onChange(benefits.id, e.target.value)
          }
          value={benefits.value}
        />
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
