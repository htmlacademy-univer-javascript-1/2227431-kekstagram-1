const getRandomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1) ) + from;

const canFitMaxLength = (string, maxLength) => string.length <= maxLength;


console.log(getRandomNumber(3, 5));
console.log(canFitMaxLength('hello', 5));
console.log(canFitMaxLength('hello', 4));
