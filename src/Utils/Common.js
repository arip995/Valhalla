import {
  IconFile,
  IconFileText,
  IconMusic,
  IconPhoto,
  IconVideo,
} from '@tabler/icons-react';
import axiosInstance from './AxiosInstance';

export function Compact(arr) {
  return arr.filter(Boolean);
}

export function updateObjectStates(data, setterFunction) {
  // data can be an object or list of objects of type {name: <name>, value: <value>}
  // name is a string and supports dot notation
  let entries = Array.isArray(data)
    ? [...data]
    : [{ ...data }];
  if (!entries?.length) return;
  setterFunction(prev => {
    let prevData = prev ? { ...prev } : {};
    entries.forEach(({ name, value }) => {
      const keys = name.split('.');
      let current = prevData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (
          !current[keys[i]] ||
          typeof current[keys[i]] !== 'object'
        ) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
    });
    return prevData;
  });
}

export function discountPercentage(value, discountedValue) {
  if (
    !value ||
    !discountedValue ||
    isNaN(value) ||
    isNaN(discountedValue)
  ) {
    return '0%';
  }
  return `${Math.round(100 * ((value - discountedValue) / value))}%`;
}

export const isDevEnv = () => {
  return process.env.NEXT_PUBLIC_ENV === 'DEV';
};

export const googleOauth = query => {
  const currentUrl = window.location.href;
  const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/google/auth?redirect=${encodeURIComponent(currentUrl)}${!!query && `&${query}`}`;
  window.location.href = redirectUrl;
};

export const convertFullNameToFirstNameLastName =
  fullName => {
    const words = fullName.split(' ');
    if (words.length === 1) {
      return { firstName: fullName, lastName: '' };
    } else {
      const firstName = words[0];
      const lastName = words.slice(1).join(' ');
      return { firstName, lastName };
    }
  };

export const onDrag = (
  result,
  arrray,
  onSuccess = () => {}
) => {
  if (result.source.index === result.destination.index)
    return;
  if (!result.destination) return;
  let tempArray = [...arrray];
  let [selectedRow] = tempArray.splice(
    result.source.index,
    1
  );
  tempArray.splice(
    result.destination.index,
    0,
    selectedRow
  );
  onSuccess(tempArray);
  return tempArray;
};

export const getUniqueId = () => {
  const now = new Date();
  const timestamp = now.getTime();
  return String(
    Math.floor(timestamp / 1000) +
      Math.floor(Math.random() * 1000000)
  );
};

export const isValueChanged = (value1, value2) => {
  return Object.keys(value1).some(key => {
    const oldValue = value1[key];
    const newValue = value2[key];

    if (
      Array.isArray(oldValue) &&
      Array.isArray(newValue)
    ) {
      if (oldValue.length !== newValue.length) return true;
      return oldValue.some((item, index) => {
        if (typeof item === 'object' && item !== null) {
          return Object.keys(item).some(
            prop => item[prop] !== newValue[index][prop]
          );
        }
        return item !== newValue[index];
      });
    } else if (
      typeof oldValue === 'object' &&
      oldValue !== null &&
      typeof newValue === 'object' &&
      newValue !== null
    ) {
      return Object.keys(oldValue).some(
        prop => oldValue[prop] !== newValue[prop]
      );
    }
    return oldValue !== newValue;
  });
};

export const calculateCourseContentHighlights = content => {
  let totalDuration = 0;
  let downlodableResources = 0;
  let articles = 0;
  let lessons = 0;
  let modules = 0;

  content.map(module => {
    if (
      !module?.lessons?.length ||
      module.status === 0 ||
      module.status === 3
    )
      return;
    modules += 1;
    module?.lessons?.map(lesson => {
      if (
        !lesson ||
        lesson.status === 0 ||
        lesson.status === 3
      )
        totalDuration += Number(lesson.duration) || 0;
      lessons += 1;
      if (lesson.lessonType === 'textImage') {
        articles += 1;
      }
      if (
        lesson.supportMaterial?.length ||
        lesson.lessonType === 'file'
      ) {
        downlodableResources +=
          lesson.supportMaterial.length;
      }
    });
  });
  return {
    totalDuration,
    downlodableResources,
    articles,
    modules,
    lessons,
  };
};

export const calculateModuleHighlights = module => {
  let totalDuration = 0;
  let downlodableResources = 0;
  let articles = 0;
  let lessons = 0;

  if (!module?.lessons?.length) return;
  module.lessons.map(lesson => {
    if (
      !lesson ||
      lesson.status === 0 ||
      lesson.status === 3
    )
      return;
    totalDuration += Number(lesson.duration) || 0;
    lessons += 1;
    if (lesson.lessonType === 'textImage') {
      articles += 1;
    }
    if (
      lesson.supportMaterial?.length ||
      lesson.lessonType === 'file'
    ) {
      downlodableResources += lesson.supportMaterial.length;
    }
  });
  return {
    totalDuration,
    downlodableResources,
    articles,
    lessons,
  };
};

export function convertMinutesToHours(minutes, type = 1) {
  if (!minutes) return '00:00';
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = (minutes % 60).toFixed(0);

  if (remainingMinutes == 60) {
    hours += 1;
    remainingMinutes = 0;
  }

  // Pad hours and minutes with leading zero if necessary
  const paddedHours = String(hours).padStart(2, '0');
  const paddedMinutes = String(remainingMinutes).padStart(
    2,
    '0'
  );

  switch (type) {
    case 1:
      return `${hours ? `${hours} hours and ` : ''}${remainingMinutes ? `${remainingMinutes} minutes` : ''}`;
    case 2:
      return `${hours ? `${hours}h ` : ''}${remainingMinutes ? `${remainingMinutes}min ` : ''}`;
    case 3:
      return `${paddedHours}:${paddedMinutes}:00`;
    default:
      return { hours, minutes: remainingMinutes };
  }
}

export const contentTypeIconMapping = ({
  type = 'file',
  ...props
}) => {
  switch (type) {
    case 'file':
      return <IconFile {...props} />;
    case 'video':
      return <IconVideo {...props} />;
    case 'textImage':
      return <IconFileText {...props} />;
    case 'audio':
      return <IconMusic {...props} />;
    case 'image':
      return <IconPhoto {...props} />;
    default:
      break;
  }
};

export const checkIfPurchased = async (productId, user) => {
  try {
    const { data } = await axiosInstance.post(
      '/purchase/details',
      { productId, userId: user._id }
    );
    return data?.ok;
  } catch (error) {
    console.log(error);
  }
};
