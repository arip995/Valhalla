'use client';
import React from 'react';
import Header from '@/Components/Common/Header/Header';
import ShortenUrlModal from '@/Components/Common/Modal/ShortenUrlModal';

export default function ShortUrl() {
  return (
    <Header
      title="Short Url"
      modal={true}
      Component={ShortenUrlModal}
    />
  );
}
