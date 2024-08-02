import PricingTypeSelector from '@/Components/Create/Telegram/PlansAndPricing/PricingTypeSelector';
import {
  DurationOptions,
  PeriodTypeOptions,
} from '@/Constants/constants';
import { discountPercentage } from '@/Utils/Common';
import {
  Button,
  Checkbox,
  Drawer,
  Grid,
  Input,
  NumberInput,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconLayoutSidebarRightExpand } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

const MAX_TITLE_LENGTH = 75;
const MIN_TITLE_LENGTH = 0;

const MyScrollArea = props => (
  <ScrollArea.Autosize type="never" {...props} />
);

const TGEPlanAndPriceEditCreate = ({
  openSideBar,
  setOpenSideBar = () => {},
  plan,
  isSaving,
  isDeleting,
  numOfPlans,
  onDelete,
  onSave,
}) => {
  const [tempData, setTempData] = useState();
  const [errors, setErrors] = useState({});
  const [
    isSaveClickedAtleastOnce,
    setIsSaveClickedAtleastOnce,
  ] = useState(false);

  const saveChanges = () => {
    let {
      title,
      price,
      enableDiscountedPrice,
      discountedPrice,
      periodQuantity,
      planType,
    } = tempData;

    let updateData = {
      subscriptionPeriod: title,
      cost: price,
      enableDiscountedPrice,
      discountedCost: discountedPrice,
      periodQuantity,
      planType,
      days: 36500,
    };
    if (planType.toLowerCase() !== 'lifetime') {
      const unitDuration =
        DurationOptions.find(
          option => option.value === planType
        )?.days || 0;
      updateData.days =
        Number(periodQuantity || 0) * unitDuration;
    }
    if (tempData._id) {
      updateData._id = tempData._id;
    }
    onSave(updateData);
  };

  const onSaveChanges = () => {
    if (!isSaveClickedAtleastOnce) {
      setIsSaveClickedAtleastOnce(true);
      return;
    }
    if (Object.keys(errors || {}).length) {
      return;
    }

    saveChanges();
  };

  const onConfirmDelete = () => {
    onDelete({ _id: tempData._id });
  };

  const onDeletePlan = () =>
    modals.openConfirmModal({
      title: 'Delete Plan',
      children: (
        <Text size="sm">
          Are you sure you want to delete this plan?
        </Text>
      ),
      labels: { confirm: 'Yes, Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => {},
      onConfirm: onConfirmDelete,
    });

  const validateData = () => {
    let {
      title,
      price,
      enableDiscountedPrice,
      discountedPrice,
      periodQuantity,
      planType,
    } = tempData;
    title = title?.trim();
    const canShowErrors = isSaveClickedAtleastOnce;
    let errorObj = {};
    if (title) {
      if (
        MIN_TITLE_LENGTH &&
        title.length < MIN_TITLE_LENGTH
      ) {
        errorObj.title = canShowErrors
          ? `Plan name should be atleast ${MIN_TITLE_LENGTH} characters`
          : null;
      } else if (title.length > MAX_TITLE_LENGTH) {
        errorObj.title = `Plan name cannot exceed ${MAX_TITLE_LENGTH} characters`;
      }
    } else {
      errorObj.title = canShowErrors
        ? `Plan name is required`
        : null;
    }

    if (planType?.toLowerCase() !== 'lifetime') {
      if (periodQuantity) {
        if (isNaN(periodQuantity)) {
          errorObj.periodQuantity = 'Invalid duration';
        }
      } else {
        errorObj.periodQuantity = canShowErrors
          ? 'Plan duration is required'
          : null;
      }
    }

    if (!price) {
      errorObj.price = canShowErrors
        ? `Plan price is required`
        : null;
    }

    if (enableDiscountedPrice) {
      if (discountedPrice) {
        if (price && discountedPrice >= price) {
          errorObj.discountedPrice = `Discounted should be less than plan price (₹${price})`;
        }
      } else {
        errorObj.discountedPrice = canShowErrors
          ? `Enter a discounted price`
          : null;
      }
    }

    return errorObj;
  };

  const updateDetails = data => {
    // data can be an object or list of objects of type {name: <name>, value: <value>}
    let entries = Array.isArray(data)
      ? [...data]
      : [{ ...data }];
    if (!entries?.length) return;
    let dataToUpdate = {};
    entries.forEach(({ name, value }) => {
      dataToUpdate[name] = value;
    });
    setTempData(prevData => ({
      ...prevData,
      ...dataToUpdate,
    }));
  };

  const resetTempData = () => {
    setOpenSideBar(false);
    setIsSaveClickedAtleastOnce(false);
    setTempData({});
  };

  const onChangePriceType = type => {
    type === 'Lifetime'
      ? updateDetails({
          name: 'planType',
          value: 'Lifetime',
        })
      : updateDetails([
          {
            name: 'planType',
            value: DurationOptions[1].value,
          },
          {
            name: 'periodQuantity',
            value: 1,
          },
        ]);
  };

  useEffect(() => {
    if (!isSaveClickedAtleastOnce) return;
    // save button has been clicked for the first time,
    // check for errors and proceed to save if the form is valid
    const newErrors = validateData();
    setErrors(_ => newErrors);
    if (Object.keys(newErrors).length) return;
    saveChanges();
  }, [isSaveClickedAtleastOnce]);

  useEffect(() => {
    if (!tempData) return;
    const newErrors = validateData();
    setErrors(_ => newErrors);
  }, [tempData]);

  useEffect(() => {
    if (!plan?._id) {
      setTempData({
        periodQuantity: 1,
        planType: DurationOptions[1].value,
      });
      return;
    }
    setTempData({
      title: plan.subscriptionPeriod,
      price: plan.cost,
      enableDiscountedPrice: plan.enableDiscountedPrice,
      discountedPrice: plan.discountedCost,
      periodQuantity: plan.periodQuantity,
      planType: plan.planType,
      _id: plan._id,
    });
  }, [plan]);

  if (!tempData) return null;

  return (
    <>
      <Drawer
        className="tgd-add-plan"
        opened={openSideBar}
        onClose={() => resetTempData()}
        title={tempData?._id ? 'Edit Plan' : 'New Plan'}
        scrollAreaComponent={MyScrollArea}
        padding="0px"
        closeButtonProps={{
          icon: (
            <IconLayoutSidebarRightExpand
              stroke={1.5}
              size={24}
            />
          ),
        }}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="tgd-add-plan-body mb-14">
            <div className="tgd-add-plan-block">
              <div className="tgd-add-plan-block-body">
                <TextInput
                  className="nexify-rightsection-change"
                  label="Plan Name"
                  rightSection={`${
                    tempData?.title?.length || 0
                  }/${MAX_TITLE_LENGTH}`}
                  placeholder="Give your plan a name"
                  value={tempData?.title || ''}
                  onChange={e => {
                    updateDetails({
                      name: 'title',
                      value:
                        e.target.value?.trimStart() || '',
                    });
                  }}
                  error={errors?.title}
                ></TextInput>
              </div>
            </div>
            {!tempData?._id ? (
              <div className="tgd-add-plan-block">
                <Input.Label className="mb-1">
                  Plan Type
                </Input.Label>
                <PricingTypeSelector
                  onChange={onChangePriceType}
                  values={[
                    {
                      value: 'Subscription',
                      description: 'Subscription',
                    },
                    {
                      value: 'Lifetime',
                      description: 'Lifetime',
                    },
                  ]}
                  value={
                    tempData.planType === 'Lifetime'
                      ? 'Lifetime'
                      : 'Subscription'
                  }
                />
                <div className="tgd-add-plan-block-body mt-4">
                  {tempData?.planType?.toLowerCase() !==
                  'lifetime' ? (
                    <div className="tgd-add-plan-duration-container">
                      <Grid>
                        <Grid.Col size="3">
                          <NumberInput
                            label="Plan Duration"
                            hideControls
                            placeholder="0"
                            value={
                              tempData?.periodQuantity || ''
                            }
                            onChange={value => {
                              updateDetails({
                                name: 'periodQuantity',
                                value: Number(value),
                              });
                            }}
                            error={errors?.periodQuantity}
                          />
                        </Grid.Col>
                        <Grid.Col
                          size="9"
                          onClick={e => e.stopPropagation()}
                        >
                          <Select
                            checkIconPosition="right"
                            data={PeriodTypeOptions}
                            placeholder="Select time period"
                            value={tempData?.planType}
                            onChange={value => {
                              updateDetails({
                                name: 'planType',
                                value: value,
                              });
                            }}
                          />
                        </Grid.Col>
                      </Grid>
                    </div>
                  ) : null}
                  <div className="tgd-add-plan-help-block">
                    Note: Plan type cannot be edited once
                    created. You will have to create a new
                    plan, if needed.
                  </div>
                </div>
              </div>
            ) : null}
            <div className="tgd-add-plan-block">
              <div className="tgd-add-plan-block-body">
                <NumberInput
                  label="Plan Price"
                  hideControls
                  type="number"
                  placeholder="0"
                  value={tempData?.price || ''}
                  onChange={value => {
                    updateDetails({
                      name: 'price',
                      value: Number(value),
                    });
                  }}
                  error={errors?.price}
                />
                <Checkbox
                  name="tgd-plan-enable-discount-price"
                  id="tgd-plan-enable-discount-price"
                  label="Offer discounted price on plan price"
                  checked={tempData?.enableDiscountedPrice}
                  onChange={e =>
                    updateDetails({
                      name: 'enableDiscountedPrice',
                      value: e.target.checked,
                    })
                  }
                  inline
                />
                {tempData?.enableDiscountedPrice ? (
                  <NumberInput
                    className="nexify-rightsection-change"
                    label="Discounted Price"
                    max={tempData?.price}
                    clampBehavior="strict"
                    placeholder="0"
                    hideControls
                    rightSection={discountPercentage(
                      tempData.price,
                      tempData.discountedPrice
                    )}
                    value={tempData.discountedPrice || ''}
                    onChange={value => {
                      updateDetails({
                        name: 'discountedPrice',
                        value: Number(value),
                      });
                    }}
                    error={errors?.discountedPrice}
                  />
                ) : null}
              </div>
            </div>
          </div>
          {/* <div className="tgd-add-plan-footer-container "> */}
          <div className="tgd-add-plan-footer">
            <Button
              onClick={() => onSaveChanges()}
              disabled={isSaving || isDeleting}
              loading={isDeleting}
              variant="filled"
              color="black"
              radius="xl"
            >
              Save Changes
            </Button>
            {tempData?._id && numOfPlans > 1 ? (
              <Button
                onClick={() => onDeletePlan()}
                disabled={isDeleting || isSaving}
                loading={isDeleting}
                variant="filled"
                color="red"
                radius="xl"
              >
                Delete Plan
              </Button>
            ) : null}
          </div>
          {/* </div> */}
        </div>
      </Drawer>
    </>
  );
};

export default React.memo(TGEPlanAndPriceEditCreate);
