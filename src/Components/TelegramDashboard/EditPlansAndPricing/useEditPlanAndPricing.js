import axiosInstance from '@/Utils/AxiosInstance';
import { onDrag } from '@/Utils/Common';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useEditPlanAndPricing = data => {
  const router = useParams();
  const [openPlanSideBar, setOpenPlanSideBar] =
    useState(false);
  const [isSavingPlan, setIsSavingPlan] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isDeletingPlan, setIsDeletingPlan] =
    useState(false);
  const [plans, setPlans] = useState(
    data?.subscriptionPlans || []
  );

  const updateDetails = (data = {}) => {
    return axiosInstance.post('/telegram/update_group', {
      productId: router.id,
      ...data,
    });
  };
  const onSavePlan = async data => {
    if (isSavingPlan || !data) return;
    try {
      setIsSavingPlan(true);
      const updateData = { ...data, planId: data._id };
      const res = await updateDetails({
        type: data?.type
          ? data.type
          : data._id
            ? 'editPlan'
            : 'addPlan',
        data: updateData,
      });
      if (!res.data.data.subscriptionPlans.length) {
        throw new Error('Failed to update plans data');
      }
      setPlans(res.data.data.subscriptionPlans);
      setOpenPlanSideBar(false);
      if (data.type === 'updatePlanPositions') return;
      toast.success(
        `Plan ${data._id ? `updated` : `created`} successfully`
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          `Error saving details. Try again later.`
      );
    } finally {
      toast.success('Updated successfully');
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
      console.log(res.data);
      if (res?.data?.data?.subscriptionPlans?.length) {
        setPlans(res.data.data.subscriptionPlans);
        setOpenPlanSideBar(false);
        toast.success(`Plan deleted successfully`);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.Error ||
          `Error deleting plan. Try again later.`
      );
    } finally {
      setIsDeletingPlan(false);
    }
  };
  const onTogglePlanStatus = async data => {
    if (!data?._id) return;
    if (data.status === 1) {
      // creator is disabling the plan, check for the number of active plans
      const activePlans = plans.filter(
        item => item.status === 1
      );
      if (activePlans.length < 2) {
        toast.error('Need atleast 1 active plan');
        return;
      }
    }
    if (isToggling) return;
    try {
      setIsToggling(true);

      const res = await updateDetails({
        type: 'status',
        data: {
          planId: data._id,
          status: data.status ? 0 : 1,
        },
      });
      if (res?.status == 200) {
        setPlans(prev => {
          return prev.map(item => {
            if (item?._id === data._id) {
              return {
                ...item,
                status: data.status === 0 ? 1 : 0,
              };
            } else {
              return { ...item };
            }
          });
        });
        toast.success(
          `Plan ${data.status ? 'disabled' : 'enabled'} successfully`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.Error ||
          `Error ${
            data.status ? 'disabling' : 'enabling'
          } plan. Try again later.`
      );
    } finally {
      setIsToggling(false);
    }
  };
  const onDragPlans = result => {
    const tempPlans = onDrag(result, plans);
    if (!tempPlans?.length) return;
    setPlans(tempPlans);
    onSavePlan({
      plans: tempPlans.map(item => ({
        _id: item._id,
      })),
      type: 'updatePlanPositions',
    });
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
