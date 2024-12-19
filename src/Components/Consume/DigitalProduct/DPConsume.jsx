'use client';

import ListFiles from '@/Components/Common/ListFiles/ListFiles';
import LayoutLoading from '@/Components/Common/Loading/LayoutLoading';
import { SavedLessonContent } from '@/Components/Create/Course/CreateCourseStepTwo/CreateCourseAddEditLesson';
import { checkIfPurchased } from '@/Utils/Common';
import { getMetaData } from '@/Utils/getMetaData';
import useUser from '@/Utils/Hooks/useUser';
import { ActionIcon, rem } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DPConsume = ({ productId }) => {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [dpData, setDPData] = useState(false);
  const [videos, setVideos] = useState([]);
  const [files, setFiles] = useState([]);

  const redirectToBuyPage = () => {
    const host = process.env.NEXT_PUBLIC_HOST;
    const url = `${host}/dp/${productId}`;
    router.push(url);
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      if (!user?._id) {
        redirectToBuyPage();
      }
      const hasPurchased = await checkIfPurchased(
        productId,
        user._id
      );
      if (!hasPurchased) {
        redirectToBuyPage();
      }
      const { data } = await getMetaData(productId, 'dp');
      let files = [];
      let videos = [];
      data.files.map(item => {
        if (item.type.startsWith('video')) {
          videos.push({
            lessonType: 'video',
            video: {
              ...item,
            },
          });
        } else {
          files.push({ ...item });
        }
      });
      setFiles(files);
      setVideos(videos);
      setDPData(data);
    } catch (error) {
      // toast.error(error?.response?.data?.message || '');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user === -1) return;
    fetchProductData();
  }, [user?._id]);

  if (loading) {
    return <LayoutLoading />;
  }
  //   console.log(productId, dpData);
  if (!productId || !user?._id || !dpData) return null;

  return (
    <>
      <Link
        href={`/dp/${productId}`}
        className="absolute left-2 top-2"
      >
        <ActionIcon
          variant="default"
          className="!fixed left-2 top-2"
          size="lg"
          radius="lg"
        >
          <IconArrowLeft
            stroke={1}
            color="black"
            style={{ width: rem(20), height: rem(20) }}
          />
        </ActionIcon>
      </Link>
      <div className="mx-auto mt-6 w-full max-w-xl p-2 md:mt-0 md:p-6">
        {!!files?.length && (
          <div className="my-2 font-semibold">Files</div>
        )}
        {files?.length ? (
          <ListFiles files={files} showDownloadButton />
        ) : null}

        {!!videos?.length && (
          <div className="my-2 mt-4 font-semibold">
            Videos
          </div>
        )}
        {videos?.length
          ? videos.map((item, i) => {
              return (
                <SavedLessonContent value={item} key={i} />
              );
            })
          : null}
      </div>
    </>
  );
};

export default DPConsume;
