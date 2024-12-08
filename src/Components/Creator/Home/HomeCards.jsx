import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import axiosInstance from '@/Utils/AxiosInstance';
import { Select } from '@mantine/core';
import {
  IconCoinRupee,
  IconShoppingBag,
} from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';

const PRODUCT_TYPE_NAMES = {
  course: 'Course',
  tg: 'Telegram Group',
  lc: 'Locked  Content',
};

const TIME_PERIODS = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'lifetime', label: 'Lifetime' },
];

const HomeAnalytics = () => {
  const [data, setData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    productTypeDetails: [],
  });
  const [selectedPeriod, setSelectedPeriod] =
    useState('week');
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async type => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        '/analytics/home',
        {
          type,
        }
      );
      setData(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const formatCurrency = amount =>
    `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  useEffect(() => {
    fetchAnalytics(selectedPeriod);
  }, [selectedPeriod, fetchAnalytics]);

  if (loading) return <LayoutLoading />;

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Select
            checkIconPosition="right"
            data={TIME_PERIODS}
            value={selectedPeriod}
            onChange={(_, option) => {
              if (!option?.value) return;
              setSelectedPeriod(option.value);
            }}
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(data.totalRevenue)}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <IconCoinRupee className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Total Sales
                </p>
                <p className="text-2xl font-bold">
                  {data.totalSales}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <IconShoppingBag className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Type Details */}
        <div className="rounded-lg bg-white shadow">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">
              Product Analytics
            </h2>
          </div>
          <div className="divide-y">
            {data.productTypeDetails.map(product => (
              <div
                key={product.productType}
                className="p-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {
                        PRODUCT_TYPE_NAMES[
                          product.productType
                        ]
                      }
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.sales} sales
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAnalytics;
