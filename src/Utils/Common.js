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
