import { durationMapping } from '@/Components/TelegramDashboard/EditPlansAndPricing/TGESinglePlan';
import {
  Button,
  Modal,
  Paper,
  Text,
  TextInput,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks'; // Import useMediaQuery
import {
  IconLock,
  IconMail,
  IconPhone,
  IconTag,
} from '@tabler/icons-react';
import { useState } from 'react';
import PaymentProviderImages from './PaymentProviderImages';
import axiosInstance from '@/Utils/AxiosInstance';
import toast from 'react-hot-toast';

const PaymentPreview = ({
  price = 100,
  title = 'Order Summary',
  isCourse = false,
  subscription = {},
  course = [],
  onPurchase = () => {},
  opened,
  onClose,
  email = 'test@test.com',
  phoneNumber = '1234567890',
  productDetails,
}) => {
  // Detect mobile screens (max-width: 36em ≈ 576px)
  const isMobile = useMediaQuery('(max-width: 36em)');
  const [couponCode, setCouponCode] = useState('');
  const [couponDetails, setCouponDetails] = useState(null);
  const [isCouponApplied, setIsCouponApplied] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const onCouponApply = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        '/coupon/apply',
        {
          code: couponCode,
          productId: productDetails._id,
          price,
        }
      );
      setLoading(false);
      if (data.ok) {
        console.log(data.data);
        setIsCouponApplied(true);
        setCouponDetails(data.data.data);
      }
    } catch (error) {
      toast.error(
        typeof error?.response?.data?.message === 'string'
          ? error?.response?.data?.message
          : 'invalid coupon'
      );
      console.error('Error applying coupon:', error);
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size={isMobile ? 'xs' : 'lg'} // Smaller modal on mobile
      centered
      overlayProps={{
        color: 'rgba(0, 0, 0, 0.65)',
        blur: 10,
      }}
    >
      <div className="space-y-4 pt-4">
        {/* Contact Card */}
        <Paper
          p="sm"
          className="border border-gray-200 bg-white/80 backdrop-blur-md"
        >
          <div
            className={`grid grid-cols-${isMobile ? '1' : '2'} gap-${isMobile ? '3' : '4'}`}
          >
            {!!email && (
              <div
                className={`flex items-center gap-${isMobile ? '2' : '3'}`}
              >
                <div
                  className={`rounded-full bg-purple-100 p-${isMobile ? '1.5' : '2'}`}
                >
                  <IconMail
                    size={isMobile ? 16 : 18}
                    className="text-purple-600"
                  />
                </div>
                <Text
                  size={isMobile ? 'xs' : 'sm'}
                  c="gray.7"
                  className="truncate"
                >
                  {email}
                </Text>
              </div>
            )}
            <div
              className={`flex items-center gap-${isMobile ? '2' : '3'}`}
            >
              <div
                className={`rounded-full bg-indigo-100 p-${isMobile ? '1.5' : '2'}`}
              >
                <IconPhone
                  size={isMobile ? 16 : 18}
                  className="text-indigo-600"
                />
              </div>
              <Text
                size={isMobile ? 'xs' : 'sm'}
                c="gray.7"
              >
                +91 {phoneNumber}
              </Text>
            </div>
          </div>
        </Paper>

        {/* Price Card */}
        {/* <Paper
          p={isMobile ? 'md' : 'lg'}
          className="relative overflow-hidden border border-gray-200 bg-white shadow-lg"
        >
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400"
            style={{ transform: 'translateY(1px)' }} // Slight offset to align with border
          />
          <div
            className="absolute bottom-1 left-4 right-4 h-0.5 bg-gray-300/50"
            style={{
              borderStyle: 'dashed',
              borderWidth: '0 0 1px 0',
            }} // Subtle dashed layer
          />

          <Text
            size={isMobile ? 'md' : 'lg'}
            fw={600}
            className={`mb-${isMobile ? '3' : '4'} text-gray-800`}
          >
            Price Breakdown
          </Text>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Text
                size={isMobile ? 'sm' : 'md'}
                c="gray.6"
              >
                Base Price
              </Text>
              <Text
                size={isMobile ? 'sm' : 'md'}
                c={hasDiscountedPrice ? 'gray.4' : 'gray.8'}
                td={
                  hasDiscountedPrice
                    ? 'line-through'
                    : 'none'
                }
              >
                ₹{price}
              </Text>
            </div>
            {hasDiscountedPrice && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconTag
                    size={isMobile ? 16 : 18}
                    className="text-green-500"
                  />
                  <Text
                    size={isMobile ? 'sm' : 'md'}
                    c="green.6"
                  >
                    After Discount
                  </Text>
                </div>
                <Text
                  size={isMobile ? 'md' : 'lg'}
                  fw={700}
                  c="green.6"
                >
                  ₹{discountedPrice}
                </Text>
              </div>
            )}
          </div>
        </Paper> */}

        {/* Subscription Type */}
        {!!subscription.planType && (
          <Paper
            p={isMobile ? 'sm' : 'lg'}
            className="relative overflow-hidden border border-gray-200 bg-white"
          >
            <div
            // className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400"
            // style={{ transform: 'translateY(1px)' }} // Slight offset to align with border
            />
            <div
            // className="absolute bottom-1 left-4 right-4 h-0.5 bg-gray-300/50"
            // style={{
            //   borderStyle: 'dashed',
            //   borderWidth: '0 0 1px 0',
            // }} // Subtle dashed layer
            />

            {/* <Text
            size={isMobile ? 'md' : 'lg'}
            fw={600}
            className={`mb-${isMobile ? '3' : '4'} text-gray-800`}
          >
            Plan Details
          </Text> */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Text
                  size={isMobile ? 'sm' : 'md'}
                  c="gray.6"
                >
                  Selected Plan
                </Text>
                <Text size="sm" fw={600} c="gray.8">
                  {subscription.planType.toLowerCase() ===
                  'lifetime'
                    ? ''
                    : subscription.periodQuantity}{' '}
                  {
                    durationMapping[
                      subscription.planType.toLowerCase()
                    ]
                  }
                </Text>
              </div>
            </div>
          </Paper>
        )}

        {/* Coupon Input */}
        <TextInput
          radius="xl"
          placeholder="Have a coupon code?"
          value={couponCode}
          onChange={e =>
            setCouponCode(
              e.target.value?.toLocaleUpperCase()
            )
          }
          rightSectionWidth={80}
          rightSection={
            couponCode ? (
              <Button
                onClick={onCouponApply}
                radius="xl"
                size="xs"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                loading={loading}
              >
                Apply
              </Button>
            ) : null
          }
        />

        {/* Course List */}
        {isCourse && course?.length > 0 && (
          <Paper
            p={isMobile ? 'md' : 'lg'}
            className="border border-gray-200 bg-white/80 shadow-lg backdrop-blur-md"
          >
            <Text
              size={isMobile ? 'md' : 'lg'}
              fw={600}
              className={`mb-${isMobile ? '3' : '4'} text-gray-800`}
            >
              Course Details
            </Text>
            <div
              className={`space-y-${isMobile ? '2' : '3'}`}
            >
              {course.map((course, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-lg bg-gray-50 p-2 transition-colors hover:bg-gray-100`}
                >
                  <Text size="sm" fw={500} c="gray.7">
                    {course.title}
                  </Text>
                  <div
                    className={`rounded-full bg-gray-200/80 p-1.5`}
                  >
                    <IconLock
                      size={isMobile ? 14 : 16}
                      className="text-gray-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Paper>
        )}

        {/* Total and Checkout */}
        <Paper
          p={isMobile ? 'md' : 'lg'}
          className="space-y-4 border border-gray-200 bg-white/80 shadow-lg backdrop-blur-md"
        >
          <div
            className={`mb-${isMobile ? '3' : '4'} flex items-center justify-between`}
          >
            <Text
              size={isMobile ? 'sm' : 'md'}
              fw={500}
              c="gray.8"
            >
              Final Amount
            </Text>
            <Text
              size={isMobile ? 'md' : 'lg'}
              fw={700}
              c={
                couponDetails?.discountedPrice
                  ? 'gray.6'
                  : 'gray.8'
              }
              td={
                couponDetails?.discountedPrice
                  ? 'line-through'
                  : ''
              }

              //   className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              ₹{price}
            </Text>
          </div>
          {!!couponDetails?.discountedPrice && (
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconTag
                  size={isMobile ? 16 : 18}
                  className="text-green-500"
                />
                <Text
                  size={isMobile ? 'sm' : 'md'}
                  c="green.6"
                >
                  After Discount
                </Text>
              </div>
              <Text
                size={isMobile ? 'md' : 'lg'}
                fw={700}
                c="green.6"
              >
                ₹{couponDetails.discountedPrice}
              </Text>
            </div>
          )}
          <Button
            fullWidth
            className="mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 hover:from-purple-700 hover:to-indigo-700"
            size="sm"
            radius="xl"
            color="teal"
            onClick={() =>
              onPurchase(
                couponDetails?.discountedPrice || price,
                isCouponApplied,
                couponDetails
              )
            }
            loading={loading}
          >
            Complete Payment
          </Button>
          <PaymentProviderImages
            size="h-8"
            spacing="space-x-2"
          />
        </Paper>
      </div>
    </Modal>
  );
};

export default PaymentPreview;
