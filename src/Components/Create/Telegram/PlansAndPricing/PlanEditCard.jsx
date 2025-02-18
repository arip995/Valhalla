/* eslint-disable no-unused-vars */
import { PeriodTypeOptions } from '@/Constants/constants';
import {
  Button,
  Checkbox,
  Select,
  TextInput,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import PricingTypeSelector from './PricingTypeSelector';
import { discountPercentage } from '@/Utils/Common';

function PlanEditCard({
  originalState,
  onSaveSubscriptionPlans,
  onCancel,
}) {
  const [periodLabel, setPeriodLabel] = useState(
    originalState.subscriptionPeriodLabel
  );

  const [periodValue, setPeriodValue] = useState(
    originalState.subscriptionPeriodValue
  );
  const [isValid, setIsValid] = useState(true);
  const [cost, setCost] = useState(
    originalState?.subscriptionCost || 0
  );
  // const [planTitle, setPlanTitle] = useState(
  //   originalState?.planTitle || ''
  // );
  const [enableDiscountedPrice, setEnableDiscountedPrice] =
    useState(originalState.enableDiscountedPrice || false);
  const [discountedPrice, setDiscountedPrice] = useState(
    originalState?.discountedPrice || ''
  );
  const [isEditingAgain, setIsEditingAgain] = useState(
    originalState?.isEditingAgain
  );
  const [
    isDiscountedPriceMoreThanPrice,
    setIsDiscountedPriceMoreThanPrice,
  ] = useState(false);
  const edited =
    periodLabel !== originalState.subscriptionPeriodLabel ||
    periodValue !== originalState.subscriptionPeriodValue ||
    cost !== originalState.subscriptionCost;
  // ||
  // planTitle !== originalState.planTitle;

  const onSetLifetime = bool => {
    if (bool) {
      setPeriodLabel('Lifetime');
      setPeriodValue(1);
    } else {
      setPeriodLabel(
        originalState.subscriptionPeriodLabel == 'Lifetime'
          ? 'Daily'
          : originalState.subscriptionPeriodLabel
      );
      setPeriodValue(originalState.subscriptionPeriodValue);
    }
  };
  const onClickSave = () => {
    isValid &&
      onSaveSubscriptionPlans(originalState.id, {
        subscriptionPeriodLabel: periodLabel,
        subscriptionPeriodValue: periodValue,
        subscriptionCost: cost,
        // planTitle,
        enableDiscountedPrice: enableDiscountedPrice,
        discountedPrice: discountedPrice || null,
      });
  };
  const onChangePriceType = type => {
    type === 'Lifetime'
      ? onSetLifetime(true)
      : onSetLifetime(false);
  };

  useEffect(() => {
    let isValid =
      periodLabel &&
      Number(periodValue || '0') &&
      Number(cost || '0');
    // && planTitle;

    if (
      enableDiscountedPrice &&
      (!discountedPrice || discountedPrice >= cost)
    ) {
      setIsDiscountedPriceMoreThanPrice(true);

      isValid = false;
    } else {
      setIsDiscountedPriceMoreThanPrice(false);
    }
    setIsValid(isValid);
  }, [
    periodLabel,
    periodValue,
    cost,
    // planTitle,
    discountedPrice,
    enableDiscountedPrice,
  ]);

  useEffect(() => {
    if (!enableDiscountedPrice) {
      setDiscountedPrice(0);
    }
  }, [enableDiscountedPrice]);

  if (!originalState?.id) return null;

  return (
    <div
      className="nexify-plan-edit-card"
      id={originalState.id}
    >
      <div className="nexify-plan-edit-card-content">
        <PricingTypeSelector
          onChange={onChangePriceType}
          values={[
            {
              value: 'Lifetime',
              label: 'Lifetime',
              description: 'Charge a one-time fixed fee',
            },
            {
              value: 'Subscription',
              label: 'Subscription',
              description:
                'Charge weekly, monthly, annually',
            },
          ]}
          value={
            periodLabel === 'Lifetime'
              ? 'Lifetime'
              : 'Subscription'
          }
        />
        {periodLabel !== 'Lifetime' ? (
          <div className="nexify-plan-edit-card-subsctiption-option">
            <div className="flex flex-row gap-4">
              <TextInput
                className={'nexify-plan-edit-card-flex-one'}
                type="text"
                inputMode="numeric"
                value={String(periodValue || '')}
                style={{ flex: 1 }}
                onChange={e => {
                  const value = e.target.value.replaceAll(
                    /[^0-9]/g,
                    ''
                  );
                  setPeriodValue(
                    value ? Number(value) : ''
                  );
                }}
              />
              <Select
                className={'nexify-plan-edit-card-flex-one'}
                checkIconPosition="right"
                data={PeriodTypeOptions}
                defaultSearchValue={periodLabel}
                // style={{ flex: 1 }}
                placeholder="Select time period"
                onChange={value => {
                  setPeriodLabel(value);
                }}
              />
            </div>
          </div>
        ) : null}

        <div className="">
          <TextInput
            label="Price"
            type="number"
            value={String(cost || '')}
            onChange={e => {
              const value = e.target.value.replaceAll(
                /[^0-9]/g,
                ''
              );
              setCost(
                value
                  ? Number(value) <= 1000000
                    ? Number(value)
                    : 1000000
                  : ''
              );
            }}
          />
          <Checkbox
            name="tgd-plan-enable-discount-price"
            id="tgd-plan-enable-discount-price"
            label="Offer discounted price on plan price"
            className={'mt-2'}
            checked={enableDiscountedPrice}
            onChange={e =>
              setEnableDiscountedPrice(e.target.checked)
            }
          />
        </div>
        {enableDiscountedPrice ? (
          <TextInput
            type="number"
            clampBehavior="strict"
            max={cost}
            value={discountedPrice || ''}
            rightSection={discountPercentage(
              cost,
              discountedPrice
            )}
            onChange={e => {
              if (e.target.value > cost) return;
              setDiscountedPrice(Number(e.target.value));
            }}
            invalid={isDiscountedPriceMoreThanPrice}
            error={
              isDiscountedPriceMoreThanPrice
                ? 'Discounted price should be less than price'
                : ''
            }
          />
        ) : null}
        {/* <TextInput
          label="Plan Name"
          type="text"
          value={planTitle}
          rightSection={`${planTitle?.length || 0}/${75}`}
          onChange={e => {
            const value = e?.target?.value?.trimStart();
            setPlanTitle(value || '');
          }}
          maxLength={75}
        /> */}
        <div
          className="w-100 flex"
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'end',
          }}
        >
          <Button
            variant="outline"
            color="gray"
            radius="xl"
            onClick={() => {
              onCancel(originalState.id, isEditingAgain);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            radius="xl"
            onClick={onClickSave}
            disabled={!isValid}
          >
            {originalState?.isCreatingPlan
              ? 'Create plan'
              : 'Save plan'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PlanEditCard);
