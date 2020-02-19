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
//   } catch (e) {s
//     return null;
//   }
// };

// export const removeFromLocalStorage = (itemKey) => {
// try {
//   localStorage.removeItem(itemKey);
//   return true;
// } catch (e) {
//   return null;
// }
// };
