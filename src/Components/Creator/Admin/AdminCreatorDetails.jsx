'use client';

import EmptyStateOne from '@/Components/Common/EmptyState/EmptyStateOne';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import CustomTable from '@/Components/Common/Table/CustomTables/CustomTable';
import axiosInstance from '@/Utils/AxiosInstance';
import { formatDate } from '@/Utils/Common';
import {
  IconBrandProducthunt,
  IconCalendar,
  IconCoinRupee,
  IconMail,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const AdminCreatorDetails = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions when data changes

  const fetchCreatorData = async creatorId => {
    try {
      setLoading(true);
      const result = await axiosInstance.post(
        `/admin/get_specific_creator_data/`,
        {
          creatorId: creatorId,
        }
      );

      setTransactions(result?.data?.data?.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data?._id) return;
    fetchCreatorData(data._id);
  }, [data?._id]);

  const TableHeaderItems = [
    { title: 'Date', icon: IconCalendar, value: 'date' },
    {
      title: 'Product',
      icon: IconBrandProducthunt,
      value: 'product',
    },
    {
      title: 'Amount',
      icon: IconCoinRupee,
      value: 'amount',
    },
    { title: 'Customer', icon: IconMail, value: 'email' },
  ];

  const renderTableDataCell = ({ type, item }) => {
    if (!item) return null;
    switch (type) {
      case 'product':
        return (
          <td className="flex max-w-72 items-center gap-2">
            <div className="truncate">
              {item.productDetails?.title ||
                'Unknown Product'}
            </div>
          </td>
        );
      case 'email':
        return (
          <td className="min-w-36">
            {item.userDetails?.email || '---'}
          </td>
        );
      case 'date':
        return (
          <td className="min-w-36">
            {formatDate(item.createdAt)}
          </td>
        );
      case 'amount':
        return (
          <td className="min-w-36">
            ₹{item.amountPaid || 0}
          </td>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <LayoutLoading />;
  }

  if (!data) {
    return <div>No creator data available</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="rounded-md bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">
          Creator Information
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">
              {data.name || '---'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">
              {data.email || '---'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">
              {data.phoneNumber || '---'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Username
            </p>
            <p className="font-medium">
              {data.username || '---'}
            </p>
          </div>
          {/* {data.wallet && (
            <div>
              <p className="text-sm text-gray-500">
                Wallet Balance
              </p>
              <p className="font-medium">
                ₹{data.wallet.balance || 0}
              </p>
            </div>
          )}
          {data.referrerUsedCodeDetails && (
            <div>
              <p className="text-sm text-gray-500">
                Referral Code
              </p>
              <p className="font-medium">
                {data.referrerUsedCodeDetails.code || '---'}
              </p>
            </div>
          )} */}
        </div>
      </div>

      <div className="rounded-md bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">
          Last 30 Transactions
        </h2>
        {transactions.length > 0 ? (
          <div className="mt-4">
            <CustomTable
              tableBodyItems={transactions}
              RenderTableDataCell={renderTableDataCell}
              tableHeaderItems={TableHeaderItems}
              showActions={false}
            />
          </div>
        ) : (
          <EmptyStateOne
            title="No transactions yet"
            description="This creator doesn't have any transactions yet."
          />
        )}
      </div>
    </div>
  );
};

export default AdminCreatorDetails;
