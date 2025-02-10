import {
  Button,
  Checkbox,
  Fieldset,
  Group,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useCreateCoupon from './useCreateCoupon';

const PrePaymentModal = ({ data, onUpdate = () => {} }) => {
  const { form, handleSubmit } = useCreateCoupon(
    data,
    !!Object.keys(data || {}).length,
    onUpdate
  );

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-4"
    >
      <TextInput
        maxLength={20}
        label="Coupon Code"
        placeholder="Enter coupon code"
        rightSection={`${form.values.code?.length || 0}/20`}
        value={form.values.code
          ?.toUpperCase()
          .replace(/[^A-Z0-9]/gi, '')}
        onChange={event =>
          form.setFieldValue(
            'code',
            event.currentTarget.value
              ?.toUpperCase()
              .replace(/[^A-Z0-9]/gi, '')
          )
        }
        error={form.errors.code}
      />
      <Select
        label="Discount Type"
        placeholder="Select discount type"
        data={[
          { label: 'Percentage', value: '1' },
          { label: 'Fixed', value: '2' },
        ]}
        {...form.getInputProps('discountType')}
        onChange={(_, option) => {
          if (!option?.value) return;
          form.setFieldValue('discountType', option.value);
        }}
      />
      <NumberInput
        label="Discount Value"
        allowDecimal={false}
        allowNegative={false}
        allowLeadingZeros={false}
        placeholder="Enter discount value"
        {...form.getInputProps('discountValue')}
      />
      <Checkbox
        label="Give limited coupons"
        {...form.getInputProps('isLimited', {
          type: 'checkbox',
        })}
      />
      {form.values.isLimited && (
        <NumberInput
          label="Usage Limit"
          placeholder="Enter usage limit"
          allowDecimal={false}
          allowNegative={false}
          allowLeadingZeros={false}
          {...form.getInputProps('usageLimit')}
        />
      )}
      <Fieldset legend="Coupon Validity">
        <DatePickerInput
          label="Valid From"
          placeholder="Pick start date"
          {...form.getInputProps('validFrom')}
        />
        <DatePickerInput
          label="Valid Until"
          placeholder="Pick end date"
          {...form.getInputProps('validUntil')}
        />
      </Fieldset>
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};

export default PrePaymentModal;
