import {isPictureUploaded} from '../../domain/use-case/send-picture.js';

const HASHTAG_REGEX = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)|(^$)/;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_SIZE = 140;
const ZOOM_STEP = 25;
const ZOOM_MIN = 25;
const ZOOM_MAX = 100;

const EFFECTS = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'grayscale',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'sepia',
    unit: '',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    style: 'brightness',
    unit: '',
  }
};
const hasNoHashtagDuplicates = (values) => {
  const hashtags = values.split(' ');
  const lowerCaseHashtags = [];
  for (const hashtag of hashtags) {
    lowerCaseHashtags.push(hashtag.toLowerCase());
  }
  return (new Set(lowerCaseHashtags)).size === lowerCaseHashtags.length;
};
const areHashtagsRightAmount = (values) => {
  const hashtags = values.split(' ');
  return hashtags.length <= MAX_HASHTAGS;
};

const isCommentCorrect = (value) => value.length < MAX_COMMENT_SIZE;

const isHashtagCorrect = (value) => HASHTAG_REGEX.test(value);

const areHashtagsCorrect = (value) => {
  const hashtags = value.split(' ');
  return hashtags.every(isHashtagCorrect);
};

const uploadPicture = (onSuccess, onFail, body) => {
  isPictureUploaded(onFail, body).then((res) => {
    if (res) {
      onSuccess();
    }
  });
};

export {
  areHashtagsCorrect,
  areHashtagsRightAmount,
  hasNoHashtagDuplicates,
  isCommentCorrect,
  uploadPicture,
  MAX_COMMENT_SIZE,
  ZOOM_MAX,
  ZOOM_MIN,
  ZOOM_STEP,
  EFFECTS
};


