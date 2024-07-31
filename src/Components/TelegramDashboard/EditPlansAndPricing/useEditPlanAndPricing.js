import axiosInstance from '@/Utils/AxiosInstance';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useEditPlanAndPricing = (data, onUpdate) => {
  const router = useRouter();
  const [openPlanSideBar, setOpenPlanSideBar] =
    useState(false);
  const [isSavingPlan, setIsSavingPlan] = useState(false);
  const [isDeletingPlan, setIsDeletingPlan] =
    useState(false);
  const [plans, setPlans] = useState(
    data?.subscriptionPlans || []
  );

  const updateDetails = (data = {}) => {
    return axiosInstance.post('/telegram/update_group', {
      id: router.query.id,
      ...data,
    });
  };
  const updatePlansData = async updatedPlans => {
    try {
      const response = await axiosInstance.post(
        '/telegram/update_group',
        {
          data: {
            plans: updatedPlans.map(item => ({
              _id: item._id,
            })),
          },
          type: 'updatePlanPositions',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update plans data');
      }

      console.log('Plans data updated successfully');
    } catch (error) {
      console.error(
        'Error updating plans data:',
        error.message
      );
    }
  };
  const onSavePlan = async data => {
    if (isSavingPlan || !data) return;
    try {
      setIsSavingPlan(true);
      const updateData = { ...data, planId: data._id };
      const res = await updateDetails({
        type: data._id ? 'editPlan' : 'addPlan',
        data: updateData,
      });
      if (res?.data?.data?.subscriptionPlans?.length) {
        // setProductData(res?.data?.data?.group);
        setOpenPlanSideBar(false);
        toast.success(
          `Plan ${data._id ? `updated` : `created`} successfully`
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          `Error saving details. Try again later.`
      );
    } finally {
      setIsSavingPlan(false);
    }
  };
  const onDeletePlan = async data => {
    if (isDeletingPlan || !data?._id) return;
    try {
      setIsDeletingPlan(true);
      const res = await updateDetails({
        type: 'deletePlan',
        data: { planId: data._id },
      });
      if (res?.data?.data?.subscriptionPlans?.length) {
        // setProductData(res?.data?.data?.group)
        setOpenPlanSideBar(false);
        toast.success(`Plan deleted successfully`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.Error ||
          `Error deleting plan. Try again later.`
      );
    } finally {
      setIsDeletingPlan(false);
    }
  };
  const onTogglePlanStatus = async data => {
    if (!plan?._id) return;
    if (plan.status === 1) {
      // creator is disabling the plan, check for the number of active plans
      const activePlans = data?.subscriptionPlans.filter(
        item => item.status === 1
      );
      if (activePlans.length < 2) {
        toast('Need atleast 1 active plan');
        return;
      }
    }
    if (isToggling || !data?._id) return;
    try {
      setIsToggling(true);

      const res = await updateDetails({
        type: 'status',
        data: {
          planId: data._id,
          status: data.status ? 0 : 1,
        },
      });

      if (res?.data?.data?.subscriptionPlans?.length) {
        // setProductData(res?.data?.data?.group);
        toast.success(
          `Plan ${data.status ? 'disabled' : 'enabled'} successfully`
        );
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.Error ||
          `Error ${
            data.status ? 'disabling' : 'enabling'
          } plan. Try again later.`
      );
    } finally {
      setIsToggling(false);
    }
  };
  const onDragPlans = result => {
    if (!result.destination) return;
    let tempPlans = [...data?.subscriptionPlans];
    let [selectedRow] = tempPlans.splice(
      result.source.index,
      1
    );
    tempPlans.splice(
      result.destination.index,
      0,
      selectedRow
    );
    setPlans(tempPlans);
    updatePlansData(tempPlans);
  };

  return {
    openPlanSideBar,
    setOpenPlanSideBar,
    isSavingPlan,
    isDeletingPlan,
    onSavePlan,
    onDeletePlan,
    onTogglePlanStatus,
    onDragPlans,
    plans,
  };
};

export default useEditPlanAndPricing;
