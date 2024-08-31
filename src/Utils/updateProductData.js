export const updateProductData = (data, setProductData) => {
  // data can be an object or list of objects of type {name: <name>, value: <value>}
  // name is a string and supports dot notation
  let entries = Array.isArray(data)
    ? [...data]
    : [{ ...data }];
  if (!entries?.length) return;
  setProductData(prev => {
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
};
