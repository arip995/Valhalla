import { contentTypeIconMapping } from '@/Utils/Common';
import classNames from 'classnames';

const CourseContentList = ({
  content,
  activeLesson,
  onChange = () => {},
}) => {
  if (!content?.length) return null;

  return (
    <div className="hide-scrollbar flex w-full flex-col gap-2">
      {content.map((module, i) => {
        if (!module?.lessons?.length) return null;
        return (
          <div
            className="flex w-full flex-col gap-2"
            key={i}
          >
            <div className="px-2 text-lg font-semibold text-gray-900">
              {module.title}
            </div>
            {module.lessons.map((lesson, i) => {
              if (!lesson) return null;
              return (
                <div
                  className={classNames(
                    'flex items-center gap-1 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-gray-100',
                    {
                      '!bg-gray-200':
                        activeLesson._id === lesson._id,
                    }
                  )}
                  key={i}
                  onClick={() => {
                    onChange(lesson, module);
                  }}
                >
                  {contentTypeIconMapping({
                    type: lesson.lessonType,
                    size: 20,
                    color: 'black',
                    className: 'min-w-fit',
                  })}
                  <div className="text-wrap text-gray-800">
                    {lesson.title}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
