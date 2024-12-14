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
        <Switch
          checked={form.values.isLimitedQuantityEnabled}
          onChange={e =>
            form.setFieldValue(
              'isLimitedQuantityEnabled',
              e.currentTarget.checked
            )
          }
          color="green"
        />
      </div>
      <Collapse
        in={form.values.isLimitedQuantityEnabled}
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
