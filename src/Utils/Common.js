/**
 *
 * @param {*} arr
 * @returns
 * removes all the falsy values from a array
 */
export function compact(arr) {
  return arr.filter(Boolean);
}

/**
 *
 * @param {*} data
 * @param {*} setterFunction
 * @returns
 * For up
 */
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
    return 0;
  }
  return Math.round(
    `${100 * ((value - discountedValue) / value)}%`
  );
}
