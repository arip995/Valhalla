import {
  Button,
  Checkbox,
  Fieldset,
  Group,
  Loader,
  Modal,
  NumberInput,
  Select,
  TextInput,
} from '@mantine/core';
import useCreateCoupon from './useCreateCoupon';
import { DatePickerInput } from '@mantine/dates';

const CreateCouponModal = ({
  data,
  onUpdate = () => {},
  onClose = () => {},
  opened,
}) => {
  const isEdit = !!Object.keys(data || {}).length;
  const { form, handleSubmit, products, onDelete } =
    useCreateCoupon(data, isEdit, onUpdate, onClose);

  return (
    <Modal
      trapFocus={false}
      opened={opened}
      onClose={() => {
        onClose();
        form.reset();
      }}
      keepMounted={false}
      title={`${isEdit ? 'Update' : 'Create'} Coupon`}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      {form.values.loading ? (
        <div className="flex h-full min-h-96 w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          className="mt-2 flex flex-col gap-4"
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
              form.setFieldValue(
                'discountType',
                option.value
              );
            }}
            checkIconPosition="right"
          />
          {!isEdit && (
            <Select
              label="Select a product"
              placeholder="select product"
              searchable
              disabled={isEdit}
              data={products.map(product => ({
                label: product.title,
                value: product._id,
              }))}
              {...form.getInputProps('productId')}
              onChange={(_, option) => {
                if (!option?.value) return;
                form.setFieldValue(
                  'productId',
                  option.value
                );
              }}
              checkIconPosition="right"
            />
          )}
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
            <div className="flex w-full flex-col gap-2">
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
            </div>
          </Fieldset>
          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
            {isEdit && (
              <Button
                variant="outline"
                color="red"
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
          </Group>
        </form>
      )}
    </Modal>
  );
};

export default CreateCouponModal;
