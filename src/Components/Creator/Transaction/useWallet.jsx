import axiosInstance from '@/Utils/AxiosInstance';
import { useEffect, useState } from 'react';

const useWallet = () => {
  const [walletDetails, setWalletDetails] = useState(null);
  const [loading, setLoading] = useState(-1);
  const fetchWalletDetails = async () => {
    try {
      const { data } = await axiosInstance.get(
        '/payment/get_wallet_details'
      );
      setWalletDetails(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(0);
    }
  };

  useEffect(() => {
    fetchWalletDetails();
  }, []);

  return { walletDetails, loading };
};

export default useWallet;
