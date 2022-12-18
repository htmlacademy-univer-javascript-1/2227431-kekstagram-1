const isEscKey = (keyCode) => keyCode === 'Escape';

const shuffle = function (arr) {
  return arr.sort(() => Math.random() - 0.5);
};

export {isEscKey, shuffle};
