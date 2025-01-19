import { Button, Modal, Text } from '@mantine/core';
import CouponCard from './CouponCard';
import PrePaymentModal from './CreateCoupon';
import useListAndEditCoupon from './useListAndEditCoupon';
const ListAllCoupons = () => {
  const {
    coupons,
    onChangeStatus,
    onEdit,
    fetchCoupons,
    opened,
    setOpened,
    editData,
  } = useListAndEditCoupon();

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Text size="md" className="mb-2" fw={600}>
          Coupons
        </Text>
        <Button
          variant="outline"
          onClick={() => setOpened(prev => !prev)}
          size="xs"
          leftSection={'+'}
        >
          Add Coupon
        </Button>
      </div>
      <div className="my-4 flex flex-col gap-4">
        {coupons?.length > 0 &&
          coupons.map(coupon => (
            <CouponCard
              key={coupon._id}
              coupon={coupon}
              onChangeStatus={onChangeStatus}
              status={coupon.status}
              onEdit={onEdit}
            />
          ))}
      </div>
      <Modal
        keepMounted={false}
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title="Create or Update Coupon"
      >
        <PrePaymentModal
          onUpdate={() => {
            setOpened(false);
            fetchCoupons();
          }}
          data={editData}
        />
      </Modal>
    </>
  );
};

export default ListAllCoupons;
