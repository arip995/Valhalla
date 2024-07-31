import PricingTypeSelector from '@/Components/Create/Telegram/PlansAndPricing/PricingTypeSelector';
import { DurationOptions } from '@/Constants/constants';
import {
  Button,
  Checkbox,
  Drawer,
  Grid,
  Input,
  Select,
  Text,
} from '@mantine/core';
import { IconLayoutSidebarRightExpand } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { modals } from '@mantine/modals';

const MAX_TITLE_LENGTH = 75;
const MIN_TITLE_LENGTH = 0;

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
        durationOptions.find(
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
        if (price && discountedPrice > price) {
          errorObj.discountedPrice = `Discounted price cannot be greater than plan price (₹${price})`;
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
    setIsSaveClickedAtleastOnce(false);
    setTempData({});
  };

  const onUpdatePriceType = type => {
    type
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
        planType: durationOptions[1].value,
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
  console.log(tempData);
  return (
    <>
      <Drawer
        opened={openSideBar}
        onClose={() => resetTempData()}
      >
        {/* Header start */}
        <div className="pd-add-plan-header">
          <IconLayoutSidebarRightExpand
            stroke={1.5}
            size={18}
            className="pd-add-plan__close"
            onClick={() => {
              setOpenSideBar(false);
            }}
          />

          <div>
            {tempData?._id ? 'Edit Plan' : 'New Plan'}
          </div>
        </div>
        {/* Header end */}
        {/* Body start */}
        <div className="pd-add-plan-body">
          <div className="pd-add-plan-block">
            <div className="pd-add-plan-block-header">
              Plan Name
            </div>
            <div className="pd-add-plan-block-body">
              <Input
                rightSection={`${
                  tempData?.title?.length || 0
                }/${MAX_TITLE_LENGTH}`}
                placeholder="Give your plan a name"
                value={tempData?.title || ''}
                onChange={e =>
                  updateDetails({
                    name: 'title',
                    value:
                      e.target.value?.trimStart() || '',
                  })
                }
                error={errors?.title}
              ></Input>
            </div>
          </div>
          {!tempData?._id ? (
            <div className="pd-add-plan-block">
              <div className="pd-add-plan-block-header">
                Plan Type
              </div>
              <PricingTypeSelector
                periodLabel={tempData.planType}
                onSetLifetime={onUpdatePriceType}
              />
              <div className="pd-add-plan-block-body">
                {tempData?.planType?.toLowerCase() !==
                'lifetime' ? (
                  <div className="pd-add-plan-duration-container">
                    <Input.Wrapper
                      error={errors?.periodQuantity}
                      infoText="^ Set a duration for your subscription plan"
                    >
                      <Grid>
                        <Grid.Col size="3">
                          <Input
                            placeholder="0"
                            value={
                              tempData?.periodQuantity || ''
                            }
                            onChange={e => {
                              updateDetails({
                                name: 'periodQuantity',
                                value: Number(
                                  e.target.value
                                ),
                              });
                            }}
                            error={!!errors?.periodQuantity}
                          />
                        </Grid.Col>
                        <Grid.Col
                          size="9"
                          onClick={e => e.stopPropagation()}
                        >
                          <Select
                            checkIconPosition="right"
                            data={periodTypeOptions}
                            placeholder="Select time period"
                            onChange={value => {
                              updateDetails({
                                name: 'planType',
                                value: value,
                              });
                            }}
                          />
                        </Grid.Col>
                      </Grid>
                    </Input.Wrapper>
                  </div>
                ) : null}
                <div className="pd-add-plan-help-block">
                  Note: Plan type cannot be edited once
                  created. You will have to create a new
                  plan, if needed.
                </div>
              </div>
            </div>
          ) : null}
          <div className="pd-add-plan-block">
            <div className="pd-add-plan-block-header">
              Plan Price
            </div>
            <div className="pd-add-plan-block-body">
              <Input
                type="number"
                placeholder=""
                value={tempData?.price || ''}
                onChange={e => {
                  updateDetails({
                    name: 'price',
                    value: Number(e.target.value),
                  });
                }}
                error={errors?.price}
              />
              <Checkbox
                name="pd-plan-enable-discount-price"
                id="pd-plan-enable-discount-price"
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
                <Input
                  rightSection={discountPercentage(
                    tempData.price,
                    tempData.discountedPrice
                  )}
                  value={tempData.discountedPrice || ''}
                  onChange={e => {
                    updateDetails({
                      name: 'discountedPrice',
                      value: Number(e.target.value),
                    });
                  }}
                  error={errors?.discountedPrice}
                />
              ) : null}
            </div>
          </div>
        </div>
        {/* Body end */}
        {/* Footer start */}
        <div className="pd-add-plan-footer">
          <Button
            onClick={() => onSaveChanges()}
            disabled={isSaving || isDeleting}
            loading={isDeleting}
            variant="filled"
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
              radius="xl"
            >
              Delete Plan
            </Button>
          ) : null}
        </div>
        {/* Footer end */}
      </Drawer>
    </>
  );
};

export default TGEPlanAndPriceEditCreate;
