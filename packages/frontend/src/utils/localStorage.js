// eslint-disable-next-line import/prefer-default-export
export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// export const getFromLocalStorage = (itemKey) => {
//   try {
//     return JSON.parse(localStorage.getItem(itemKey));
//   } catch (e) {
//     return undefined;
//   }
// };

export const removeFromLocalStorage = (itemKey) => {
  const name = JSON.parse(localStorage.getItem(itemKey));
  /* istanbul ignore if */
  if (name !== null) {
    localStorage.removeItem(itemKey);
    return true;
  }
  return false;
};
