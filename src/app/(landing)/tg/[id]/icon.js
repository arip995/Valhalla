/* eslint-disable @next/next/no-img-element */

import { getMetaData } from '@/Utils/getMetaData';
import { ImageResponse } from 'next/og';
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default async function Icon({ params }) {
  const { data } = await getMetaData(params.id, 'tg');
  return new ImageResponse(
    (
      <img
        alt=""
        style={{ objectFit: 'cover' }}
        src={
          data.coverImage?.url ||
          data.creatorDetails?.profilePic ||
          'https://nexify-try.s3.ap-south-1.amazonaws.com/34aa82c3-9933-4705-acac-b294f4812f220.png'
        }
      />
    ),
    {
      ...size,
    }
  );
}
