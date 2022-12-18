import {
  areHashtagsCorrect,
  areHashtagsRightAmount,
  hasNoHashtagDuplicates,
  isCommentCorrect, MAX_COMMENT_SIZE
} from '../upload-picture-viewmodel.js';

const formElem = document.querySelector('.img-upload__form');
const hashtagInputElem = formElem.querySelector('.text__hashtags');
const commentInputElem = formElem.querySelector('.text__description');

const pristine = new Pristine(formElem, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text--invalid__error'
}, false);

const removePristine = () => {
  pristine.destroy();
};

const initPristineValidations = () => {
  pristine.addValidator(
    hashtagInputElem,
    (input) => areHashtagsRightAmount(input),
    'Максимальное количество хештегов - 5!',
    1
  );

  pristine.addValidator(
    hashtagInputElem,
    (input) => hasNoHashtagDuplicates(input),
    'Хэштэги не должны повторяться!',
    2
  );

  pristine.addValidator(
    hashtagInputElem,
    (input) => areHashtagsCorrect(input),
    'Хэштэг может содержать только буквы и цифры. Максимальная длина хештега - 20 символов.',
    3
  );

  pristine.addValidator(
    commentInputElem,
    (input) => isCommentCorrect(input),
    `Длина комментария не должна превышать ${MAX_COMMENT_SIZE} символов`
  );
};
const isPristineValid = () => pristine.validate();

export {removePristine, initPristineValidations, isPristineValid};
