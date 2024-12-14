import {
  Collapse,
  NumberInput,
  Switch,
} from '@mantine/core';

const LimitQuantity = ({ form }) => {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-2 text-xl font-bold">
        Limit Quantity
      </div>
      <div className="flex justify-between">
        Limit total number of purchases?
      </div>
      <Switch
        checked={form.values.isLimitQuantityEnabled}
        onChange={e =>
          form.setFieldValue(
            'isLimitQuantityEnabled',
            e.currentTarget.checked
          )
        }
        color="green"
        label="I agree to sell my privacy"
      />
      <Collapse
        in={form.values.isLimitQuantityEnabled}
        className="flex flex-col gap-4"
      >
        <NumberInput
          hideControls
          placeholder="0"
          clampBehavior="strict"
          max={100000000}
          radius="md"
          {...form.getInputProps('quantity')}
        />
      </Collapse>
    </div>
  );
};

export default LimitQuantity;
