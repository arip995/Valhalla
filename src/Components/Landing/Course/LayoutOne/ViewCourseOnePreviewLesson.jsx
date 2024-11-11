import { SavedLessonContent } from '@/Components/Create/Course/CreateCourseStepTwo/CreateCourseAddEditLesson';
import {
  IconFile,
  IconFileText,
  IconMusic,
  IconVideo,
} from '@tabler/icons-react';
import { useCallback } from 'react';

const ViewCourseOnePreviewLessons = ({
  activeLesson,
  setActiveLesson,
  previewList = [],
}) => {
  const List = useCallback(() => {
    return (
      <div className="w-fill flex flex-col gap-2 font-semibold text-gray-800">
        {previewList.map((item, i) => {
          return (
            <div
              className="flex w-full cursor-pointer items-center gap-2 p-2 hover:bg-gray-50"
              onClick={() => {
                setActiveLesson(item);
              }}
              key={i}
            >
              <div className="min-w-fit rounded-md border border-gray-200 p-3">
                {item.lessonType === 'video' ? (
                  <IconVideo color="gray" stroke={1} />
                ) : item.lessonType === 'textImage' ? (
                  <IconFileText color="gray" stroke={1} />
                ) : item.lessonType === 'audio' ? (
                  <IconMusic
                    color="gray"
                    className="list-files-image"
                    stroke={1}
                  />
                ) : (
                  <IconFile
                    color="gray"
                    className="list-files-image"
                    stroke={1}
                  />
                )}
              </div>
              <div className="text-wrap break-all">
                {item.title}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [previewList]);

  if (!activeLesson || !previewList?.length) return null;
  return (
    <div className="flex w-full flex-col gap-3 p-2">
      <SavedLessonContent value={activeLesson} />
      <List />
    </div>
  );
};

export default ViewCourseOnePreviewLessons;
