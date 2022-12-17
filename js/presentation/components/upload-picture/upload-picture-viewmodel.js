
const HASHTAG_REGEX = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;


const isHashtagCorrect = (value) => HASHTAG_REGEX.test(value);
const isCommentCorrect = (value) => value.length < 140;

const checkHashtags = (value) => {
  const hashtags = value.split(' ');
  return hashtags.every(isHashtagCorrect);
};

const checkComment = (value) => isCommentCorrect(value);


export {checkHashtags, checkComment};
