export const capitalizeAllWords = (sentence) => sentence.split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export const generateUsername = (firstName, lastName) => {
  const userName = `${firstName.toLowerCase()}${capitalizeAllWords(lastName.toLowerCase())}`;
  return userName;
};
