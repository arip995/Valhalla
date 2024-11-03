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

export const calculateCourseContentHighlights = val => {
  console.log(val);
};
