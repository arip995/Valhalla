import Kyc from '@/Components/Creator/Account/Kyc';
import useUsername from '@/Components/Creator/Account/useUsername';
import useUser from '@/Utils/Hooks/useUser';
import { checkRestrictedChars } from '@/Utils/Regex';
import {
  Button,
  Group,
  Loader,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import AddUpdateContactDetails from '../General/AddUpdateContactDetails';
import { AllProducts } from '@/Components/Creator/Home/AllProducts';

const CompleteProfileModal = ({
  opened,
  showCreate = true,
  onClose = () => {},
}) => {
  // eslint-disable-next-line no-unused-vars
  const { user, setUserData, setCurrentUser } =
    useUser(true);
  const {
    username,
    setUsername,
    error,
    loadingUsername,
    showUpdateUsernameButton,
    onUpdateUsername,
  } = useUsername();
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

  const checkBackAndSaveDisabled = (type = 'save') => {
    if (type === 'save') {
      if (completeProfileForm.values.activeStep == 3)
        return true;
      if (
        completeProfileForm.values.activeStep === 0 &&
        !showUpdateUsernameButton
      ) {
        return true;
      }
      if (completeProfileForm.values.activeStep === 1) {
        return true;
      }
    } else {
      if (completeProfileForm.values.activeStep == 0)
        return true;
    }
  };
  const nextStep = async () => {
    if (completeProfileForm.values.activeStep == 0) {
      await onUpdateUsername();
      completeProfileForm.setValues({
        activeStep:
          completeProfileForm.values.activeStep + 1,
      });
    } else {
      completeProfileForm.setValues({
        activeStep:
          completeProfileForm.values.activeStep + 1,
      });
    }
  };

  useEffect(() => {
    completeProfileForm.setValues({
      username: user?.username,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      kycDetails: user?.kycDetails,
      bankDetails: user?.bankDetails,
    });
    if (user.isKycDone) {
      completeProfileForm.setValues({ activeStep: 3 });
    } else if (!user.username) {
      completeProfileForm.setValues({ activeStep: 0 });
    } else if (!user.email || !user.phoneNumber) {
      completeProfileForm.setValues({ activeStep: 1 });
    } else {
      completeProfileForm.setValues({ activeStep: 2 });
    }
  }, [user]);

  if (!user) return <Loader />;

  return (
    <>
      <Modal
        title={
          <>
            {completeProfileForm.values.activeStep == 0
              ? 'Step 1:Username(KYC)'
              : completeProfileForm.values.activeStep == 1
                ? 'Step 2:Contact Details(KYC)'
                : completeProfileForm.values.activeStep == 2
                  ? 'Step 3:Bank Details(KYC)'
                  : completeProfileForm.values.activeStep ==
                      3
                    ? 'Congrajulations'
                    : null}
          </>
        }
        opened={opened}
        onClose={onClose}
        size="lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-4 pt-4">
          {completeProfileForm.values.activeStep == 0 ? (
            <TextInput
              maxLength={10}
              radius="sm"
              description="Username"
              placeholder="pandaop"
              value={username}
              onChange={e => {
                if (!checkRestrictedChars(e.target.value))
                  return;
                setUsername(e.target.value);
              }}
              error={error}
              leftSection={<Text size="sm">@</Text>}
              rightSection={
                !!loadingUsername && <Loader size={'sm'} />
              }
            />
          ) : completeProfileForm.values.activeStep == 1 ? (
            <div className="flex w-full flex-col items-center gap-2">
              <AddUpdateContactDetails
                onSuccess={nextStep}
                type={
                  !completeProfileForm.values.email
                    ? 'email'
                    : 'phoneNumber'
                }
              />
            </div>
          ) : completeProfileForm.values.activeStep == 2 ? (
            <Kyc
              onSuccess={() => {
                setTimeout(() => {
                  toast.success(
                    'Congrajulations, profile completed successfully'
                  );
                  nextStep();
                }, 2000);
              }}
            />
          ) : completeProfileForm.values.activeStep == 3 ? (
            <>
              <div className="mb-4 flex w-full items-center gap-3">
                <IconCircleCheckFilled
                  size={30}
                  color="green"
                />
                <div className="text-center text-xl font-bold">
                  Profile Completed Sucessfully.
                </div>
              </div>
              {showCreate ? <AllProducts /> : null}
            </>
          ) : null}

          <Group justify="center" mt="xl">
            {/* <Button
              variant="default"
              onClick={prevStep}
              disabled={checkBackAndSaveDisabled('back')}
            >
              Back
            </Button> */}
            {completeProfileForm.values.activeStep == 0 ? (
              <Button
                onClick={nextStep}
                disabled={checkBackAndSaveDisabled()}
              >
                Save and continue
              </Button>
            ) : null}
          </Group>
        </div>
      </Modal>
    </>
  );
};

export default CompleteProfileModal;
