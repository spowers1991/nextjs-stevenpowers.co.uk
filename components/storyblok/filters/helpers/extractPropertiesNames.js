export function extractPropertiesNames(arr, propertyName) {
  const uniqueValuesSet = new Set();

  arr.forEach((obj) => {
    if (obj[propertyName]) {
      if (Array.isArray(obj[propertyName])) {
        obj[propertyName].forEach((value) => {
          uniqueValuesSet.add(value);
        });
      } else {
        uniqueValuesSet.add(obj[propertyName]);
      }
    }
  });

  return Array.from(uniqueValuesSet);
}
