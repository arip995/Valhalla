import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import React from 'react';

const WalletAleart = () => {
  return (
    <Alert
      icon={<IconAlertCircle size={16} />}
      color="yellow"
    >
      Payouts and settlements will not be processed on bank
      holidays.
    </Alert>
  );
};

export default WalletAleart;

{
  /* {user.isKycDone &&
                            !user.beneficiaryDetails &&
                            !user.vendorId && (
                              <Alert
                                icon={
                                  <IconAlertCircle
                                    size={16}
                                  />
                                }
                                title="Bank Details Missing"
                                color="yellow"
                              >
                                You need to add your bank
                                details first.
                                <Group mt="xs">
                                  <Button
                                    size="xs"
                                    variant="outline"
                                    color="black"
                                    onClick={() =>
                                      setOpenedBankDetails(
                                        true
                                      )
                                    }
                                  >
                                    Add Bank Details
                                  </Button>
                                </Group>
                              </Alert>
                            )} */
}
{
  /* {user.isKycDone &&
                    user.beneficiaryDetails?.length &&
                    user.multipleBankAccounts ? (
                      <Button
                        size="xs"
                        variant="outline"
                        color="black"
                        onClick={() =>
                          setOpenedBankDetails(true)
                        }
                      >
                        Add new bank
                      </Button>
                    ) : null} */
}

{
  /* {user?.beneficiaryDetails?.length ? (
                      <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Instant Payout Processing"
                        color="blue"
                      >
                        Your payout will be processed
                        instantly, typically within 1
                        minute. To confirm the status,
                        simply refresh the page. Please
                        note: In rare cases of sender
                        account disruptions or system
                        downtime, processing may extend to
                        3-4 hours. For any issues or
                        concerns, contact our dedicated
                        support team at{' '}
                        <a
                          href="mailto:support@nexify.club"
                          className="underline"
                        >
                          support@nexify.club
                        </a>
                        .
                      </Alert>
                    ) : null} */
}
