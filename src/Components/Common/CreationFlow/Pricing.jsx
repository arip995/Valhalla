import { discountPercentage } from '@/Utils/Common';
import {
  Checkbox,
  Collapse,
  NumberInput,
} from '@mantine/core';
import React from 'react';
import RadioGroup from '../Radio/RadioGroup';
import { PRICE_TYPES } from '@/Constants/constants';

const Pricing = ({ form, type }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-2 text-xl font-bold">
        Set Pricing
      </div>

      {!!type && (
        <RadioGroup
          value={form.values.priceType}
          onChange={value => {
            console.log(value);
            form.setValues({
              priceType: value,
              hasDiscountedPrice: false,
            });
          }}
          list={PRICE_TYPES}
        />
      )}
      {form.values.priceType === 'customerDecided' ? (
        <NumberInput
          label="Minimum Price"
          leftSection="₹"
          hideControls
          max={500000}
          clampBehavior="strict"
          placeholder="Enter minimum price"
          id={form.key('minimumPrice')}
          {...form.getInputProps('minimumPrice')}
        />
      ) : (
        <>
          <NumberInput
            label="Price"
            leftSection="₹"
            hideControls
            max={500000}
            clampBehavior="strict"
            placeholder="Enter price"
            id={form.key('price')}
            {...form.getInputProps('price')}
          />
          <Checkbox
            label="Offer discounted price"
            {...form.getInputProps('hasDiscountedPrice', {
              type: 'checkbox',
            })}
          />
        </>
      )}
      <Collapse in={form.values.hasDiscountedPrice}>
        <NumberInput
          label="Discounted price"
          id={form.key('discountedPrice')}
          leftSection="₹"
          placeholder="Enter discounted price"
          hideControls
          max={500000}
          clampBehavior="strict"
          rightSection={discountPercentage(
            form.values.price,
            form.values.discountedPrice
          )}
          {...form.getInputProps('discountedPrice')}
        />
      </Collapse>
    </div>
  );
};

export default Pricing;
