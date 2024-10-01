import useUser from '@/Utils/Hooks/useUser';
import {
  Button,
  Group,
  Loader,
  Modal,
  Stepper,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

const CompleteProfileModal = ({
  opened,
  onClose = () => {},
}) => {
  // eslint-disable-next-line no-unused-vars
  const { user, setUserData, setCurrentUser } =
    useUser(true);
  const completeProfileForm = useForm({
    initialValues: {
      username: user?.username,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      kycDetails: user?.kycDetails,
      bankDetails: user?.bankDetails,
      activeStep: 0,
    },
    validateInputOnChange: true,
    validate: {},
  });

  const nextStep = () =>
    completeProfileForm.setValues({
      activeStep: completeProfileForm.values.activeStep + 1,
    });
  const prevStep = () =>
    completeProfileForm.setValues({
      activeStep: completeProfileForm.values.activeStep - 1,
    });

  useEffect(() => {
    completeProfileForm.setValues({
      username: user?.username,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      kycDetails: user?.kycDetails,
      bankDetails: user?.bankDetails,
    });
    if (!user.username) {
      completeProfileForm.setValues({ activeStep: 0 });
    } else if (!user.email || user.phoneNumber) {
      completeProfileForm.setValues({ activeStep: 1 });
    } else {
      completeProfileForm.setValues({ activeStep: 2 });
    }
  }, [user]);

  if (!user) return <Loader />;

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Complete your profile"
        size="xl"
      >
        <div className="p-4">
          <Stepper
            active={completeProfileForm.values.activeStep}
            onStepClick={val => {
              completeProfileForm.setValues({
                activeStep: val,
              });
            }}
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="Username">
              Step 1 content: Create an account
            </Stepper.Step>
            <Stepper.Step label="Contact Details">
              Step 2 content: Verify email
            </Stepper.Step>
            <Stepper.Step label="Bank Details">
              Step 3 content: Get full access
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to
              previous step
            </Stepper.Completed>
          </Stepper>

          <Group justify="center" mt="xl">
            <Button
              variant="default"
              onClick={prevStep}
              disabled={
                completeProfileForm.values.activeStep == 0
              }
            >
              Back
            </Button>
            <Button
              onClick={nextStep}
              disabled={
                completeProfileForm.values.activeStep == 3
              }
            >
              Next step
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default CompleteProfileModal;
