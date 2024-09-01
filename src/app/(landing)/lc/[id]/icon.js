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
  const { data } = await getMetaData(params.id, 'lc');
  return new ImageResponse(
    (
      <img
        alt=""
        style={{ objectFit: 'cover' }}
        src={
          data.coverImage?.url ||
          data.creatorDetails?.profilePic ||
          'https://nexify-try.s3.ap-south-1.amazonaws.com/11d6044f-d452-4c13-b4de-e9aa1a08a164.png'
        }
      />
    ),
    {
      ...size,
    }
  );
}
