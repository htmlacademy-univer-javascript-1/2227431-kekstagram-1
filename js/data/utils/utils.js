const getRandomInt = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;

const canFitMaxLength = (string, maxLength) => string.length <= maxLength;

export {getRandomInt, canFitMaxLength};
