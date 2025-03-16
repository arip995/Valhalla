'use client';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import Header from '@/Components/Common/Header/Header';
import ShortenUrlModal from '@/Components/Common/Modal/ShortenUrlModal';
import axiosInstance from '@/Utils/AxiosInstance';
import ProductListing from '@/Components/Apps/ProductListing/ProductListing';

export default function ShortUrl() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          '/shorturl/list'
        );
        console.log(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            'No internet connection'
        );
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header
        title="Short Url"
        modal={true}
        Component={ShortenUrlModal}
      />
      <ProductListing />
    </>
  );
}
