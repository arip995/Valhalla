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
          data.coverImage ||
          data.creatorDetails?.profilePic ||
          'https://nexify-try.s3.ap-south-1.amazonaws.com/499766c5-b634-4ec9-a0f6-1a2bc19a591a.png'
        }
      />
    ),
    {
      ...size,
    }
  );
}
