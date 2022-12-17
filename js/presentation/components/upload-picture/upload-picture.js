import {isEscKey} from '../../utils/utils.js';
import {checkComment, checkHashtags} from './upload-picture-viewmodel.js';


const uploadImageElem = document.querySelector('#upload-file');
const overlayImageElem = document.querySelector('.img-upload__overlay');
const bnCloseElem = document.querySelector('#upload-cancel');

const formElem = document.querySelector('.img-upload__form');
const hashtagInputElem = formElem.querySelector('.text__hashtags');
const commentInputElem = formElem.querySelector('.text__description');
const bnSubmitElem = formElem.querySelector('.img-upload__submit');

let isCheckPassedForHashtag = true;

let isCheckPassedForComment = true;

const closeOverlayImage = () => {
  uploadImageElem.value = '';
  overlayImageElem.classList.add('hidden');
  document.body.classList.remove('modal-open');
};
const onOverlayEscKeydown = (evt) => {
  if (isEscKey(evt.key) && evt.target !== hashtagInputElem && evt.target !== commentInputElem) {
    closeOverlayImage();
  }
};

const pristine = new Pristine(formElem, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text--invalid__error'
}, true);
const checkSubmitButton = () => {
  bnSubmitElem.disabled = !isCheckPassedForHashtag || !isCheckPassedForComment;
};


pristine.addValidator(
  hashtagInputElem,
  (input) => {
    const res = checkHashtags(input);
    isCheckPassedForHashtag = res;
    checkSubmitButton();
    return res;
  },
  'Хэштэг задан неправильно'
);

const initUploadingFeature = () => {
  uploadImageElem.addEventListener('change', () => {
    document.addEventListener('keydown', onOverlayEscKeydown);
    bnCloseElem.addEventListener('click', closeOverlayImage, {once: true});

    document.body.classList.add('modal-open');
    overlayImageElem.classList.remove('hidden');
  });
  pristine.addValidator(
    commentInputElem,
    (input) => {
      const res = checkComment(input);
      isCheckPassedForComment = res;
      checkSubmitButton();
      return res;
    },
    'Длина комментария не должна превышать 140 символов'
  );

  formElem.addEventListener('submit', () => {
    pristine.validate();
  });
};

export {initUploadingFeature};


