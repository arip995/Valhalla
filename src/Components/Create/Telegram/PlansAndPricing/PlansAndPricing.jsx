import { Button, Input, rem } from '@mantine/core';
import { randomId, useId } from '@mantine/hooks';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import '../../../../styles/common/plan-and-pricing.css';
import { periodTypeOptions } from '../useCreateTelegram';
import PlanCard from './PlanCard';
import PlanEditCard from './PlanEditCard';
import { compact } from '@/src/Utils/Common';

const PlansAndPricing = ({ stepThreeForm }) => {
  const [plans, setPlans] = useState(
    stepThreeForm.values?.subscriptionPlans
      ?.subscriptionPlans || [
      {
        subscriptionPeriodLabel: 'Months',
        subscriptionPeriodValue: 1,
        subscriptionCost: null,
        isCreatingPlan: true,
        planTitle: '',
        id: 'plan_0',
        editing: true,
      },
    ]
  );
  const onSaveSubscriptionPlans = (id, plan) => {
    setPlans(prevState => {
      const updatedPlans = prevState.map(val => {
        if (val.id !== id) return val;
        return {
          ...val,
          ...plan,
          editing: false,
          isEditingAgain: false,
          isCreatingPlan: false,
        };
      });
      return updatedPlans;
    });
  };
  const scrollPlanIntoView = id => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'instant',
      });
      element.classList.add('pop');
      setTimeout(() => {
        element.classList.remove('pop');
      }, 200);
    }
  };
  const addNewPlan = () => {
    for (let plan of plans) {
      if (plan.editing) {
        toast.error(
          'You have unsaved plans, Please save it'
        );
        return;
      }
    }
    const newPlanId = randomId();
    setPlans(plan => {
      return [
        ...plan,
        {
          subscriptionPeriodLabel: 'Months',
          subscriptionPeriodValue: 1,
          subscriptionCost: null,
          planTitle: '',
          isCreatingPlan: true,
          id: newPlanId,
          editing: true,
        },
      ];
    });

    setTimeout(() => {
      scrollPlanIntoView(newPlanId);
    }, 200);
  };
  const editPlan = id => {
    setPlans(prev => {
      return prev.map(val =>
        val.id == id
          ? { ...val, editing: true, isEditingAgain: true }
          : val
      );
    });
    setTimeout(() => {
      scrollPlanIntoView(id);
    }, 200);
  };
  const deletePlan = async id => {
    let prevPlanId = plans?.[1]?.id;
    let foundPlan;
    if (plans?.length > 1) {
      const element = document.getElementById(id);
      if (element) {
        element.style.opacity = '1';

        element.style.transition =
          'transform 0.2s ease-out, opacity 0.2s ease-out';
        element.style.overflow = 'hidden';
        element.style.opacity = '0';
        element.style.transform = 'scaleY(0.01)';
      }
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 200);
      });
      setPlans(prevState => {
        const updatedPlans = compact(
          prevState.map(val => {
            if (val.id !== id) {
              !foundPlan && (prevPlanId = val.id);
              return val;
            } else {
              foundPlan = true;
              setTimeout(() => {
                scrollPlanIntoView(prevPlanId);
              }, 200);
              return null;
            }
          })
        );
        return updatedPlans;
      });
    }
  };
  const onCancel = async (id, isEditingAgain) => {
    if (isEditingAgain) {
      const indexToUpdate = plans.findIndex(
        plan => plan.id === id
      );

      // Make sure the plan with id 'plan_1' exists
      if (indexToUpdate !== -1) {
        // Create a new array with the updated plan
        const updatedPlans = [...plans];
        updatedPlans[indexToUpdate] = {
          ...updatedPlans[indexToUpdate],
          editing: false,
          isCreatingPlan: false,
          isEditingAgain: false,
        };

        // Update the state with the new array of plans
        setPlans(updatedPlans);
      }
    } else {
      if (plans?.length > 1) {
        const updatedPlans = plans.filter(
          plan => plan.id !== id
        );

        // Update the state with the filtered array of plans
        setPlans(updatedPlans);
      }
    }
  };
  const savedPlansLength =
    plans?.filter(val => {
      return !val?.editing;
    })?.length || 0;

  useEffect(() => {
    const updatedPlans = plans.filter(
      plan => plan.isCreatingPlan == false
    );
    setTimeout(() => {
      stepThreeForm.setValues({
        subscriptionPlans: updatedPlans,
      });
    }, 100);
  }, [plans]);

  return (
    <>
      <div className="nexify-custom-plans-container nexify-pricing-section">
        <div className="nexify-custom-plans-about-container">
          <div className="nexify-custom-plans-title">
            Pricing & Plans
          </div>
        </div>
        {plans.map((plan, index) => {
          if (plan.editing) {
            return (
              <Input.Wrapper
                error={
                  stepThreeForm.errors?.subscriptionPlans
                }
              >
                <PlanEditCard
                  key={plan.id}
                  originalState={plan}
                  index={index}
                  hideDelete={plans?.length == 1}
                  periodTypeOptions={periodTypeOptions}
                  onSaveSubscriptionPlans={
                    onSaveSubscriptionPlans
                  }
                  deletePlan={deletePlan}
                  onCancel={onCancel}
                />
              </Input.Wrapper>
            );
          } else {
            return (
              <PlanCard
                key={plan.id}
                plan={plan}
                editPlan={editPlan}
                hideDelete={savedPlansLength < 2}
                deletePlan={deletePlan}
              />
            );
          }
        })}
        <Button
          fullWidth
          variant="outline"
          onClick={addNewPlan}
          color="blue"
          size="md"
        >
          + Add another plan
        </Button>
        <Button
          type="submit"
          onClick={() =>
            stepThreeForm.setValues({
              isSaveClickedAtleastOnce: true,
            })
          }
          fullWidth
          color="black"
          size="md"
        >
          Publish telegram page
        </Button>
      </div>
      <Toaster />
    </>
  );
};

export default PlansAndPricing;
