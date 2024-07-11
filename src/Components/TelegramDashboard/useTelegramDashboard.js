import React, { useEffect, useState } from 'react';
import {
  useDidUpdate,
  useIsFirstRender,
  useMounted,
} from '@mantine/hooks';
import axios from 'axios';
import toast from 'react-hot-toast';

const useTelegramDashboard = productId => {
  const [tgData, setTgData] = useState(null);
  const firstRender = useIsFirstRender();

  async function getData(id) {
    try {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/telegram/get_group_data?productId=${id}`
      );
      setTgData(data.data.data);
    } catch (error) {
      toast.error('Failed to get group data');
    }
  }

  if (firstRender) {
    getData(productId);
  }

  console.log(tgData);
};

export default useTelegramDashboard;
