const getRandomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1) ) + from;

const canFitMaxLength = (string, maxLength) => string.length <= maxLength;


getRandomNumber(3, 5);
canFitMaxLength('hello', 5);
canFitMaxLength('hello', 4);
