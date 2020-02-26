// eslint-disable-next-line import/prefer-default-export
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
};

// export const getFromLocalStorage = (itemKey) => {
//   try {
//     return JSON.parse(localStorage.getItem(itemKey));
//   } catch (e) {
//     return null;
//   }
// };

export const removeFromLocalStorage = (itemKey) => {
  const name = localStorage.getItem(itemKey);
  /* istanbul ignore if */
  if (name !== null) {
    localStorage.removeItem(itemKey);
    return true;
  }
  return false;
};
