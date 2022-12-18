import {isEscKey} from '../utils/utils.js';
import {initScaleSettings, removeScaleListeners} from './components/scale-settings.js';
import {initEffectsSettings, removeEffectsListeners} from './components/effects-settings.js';
import {initPristineValidations, isPristineValid, removePristine} from './components/validation-fields.js';
import {uploadPicture} from './upload-picture-viewmodel.js';

const documentBodyElem = document.querySelector('body');

const uploadImageElem = document.querySelector('#upload-file');
const overlayImageElem = document.querySelector('.img-upload__overlay');
const bnCloseElem = document.querySelector('#upload-cancel');

const formElem = document.querySelector('.img-upload__form');
const hashtagInputElem = formElem.querySelector('.text__hashtags');
const commentInputElem = formElem.querySelector('.text__description');
const submitButton = formElem.querySelector('.img-upload__submit');

const successfulSubmissionElem = document.querySelector('#success').content.querySelector('.success');
const errorSubmissionElem = document.querySelector('#error').content.querySelector('.error');
const bnSuccessElem = successfulSubmissionElem.querySelector('.success__button');
const bnErrorElem = errorSubmissionElem.querySelector('.error__button');

const previewElem = document.querySelector('.img-upload__preview').querySelector('img');
const fileChooserElem = document.querySelector('.img-upload__start input[type=file]');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const closeOverlay = () => {
  uploadImageElem.value = '';

  formElem.reset();
  document.removeEventListener('keydown', onOverlayEscKeydown);
  removeScaleListeners();
  removeEffectsListeners();
  overlayImageElem.classList.add('hidden');

  document.body.classList.remove('modal-open');
  removePristine();
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onCloseSuccessSendMsgClickListener = (evt) => {
  if (evt.target === successfulSubmissionElem) {
    closeSendMessages();
  }
};

const onCloseErrorSendMsgClickListener = (evt) => {
  if (evt.target === errorSubmissionElem) {
    closeSendMessages();
  }
};
const onErrorSendMsgEscKeydownListener = (evt) => {
  if (isEscKey(evt.key)) {
    closeSendMessages();
  }
};
const onSuccess = () => {
  closeOverlay();
  enableSubmitButton();
  bnSuccessElem.addEventListener('click', closeSendMessages);
  document.addEventListener('keydown', onErrorSendMsgEscKeydownListener);
  document.addEventListener('click', onCloseSuccessSendMsgClickListener);
  documentBodyElem.appendChild(successfulSubmissionElem);
};
const onFail = () => {
  overlayImageElem.classList.add('hidden');
  enableSubmitButton();
  bnErrorElem.addEventListener('click', closeSendMessages);
  document.addEventListener('keydown', onErrorSendMsgEscKeydownListener);
  document.addEventListener('click', onCloseErrorSendMsgClickListener);
  documentBodyElem.appendChild(errorSubmissionElem);
};

function onOverlayEscKeydown(evt) {
  if (isEscKey(evt.key) && evt.target !== hashtagInputElem && evt.target !== commentInputElem) {
    closeOverlay();
  }
}

function closeSendMessages() {
  if (documentBodyElem.contains(successfulSubmissionElem)) {
    documentBodyElem.removeChild(successfulSubmissionElem);
  }
  if (documentBodyElem.contains(errorSubmissionElem)) {
    overlayImageElem.classList.remove('hidden');
    documentBodyElem.removeChild(errorSubmissionElem);
  }

  document.removeEventListener('keydown', onErrorSendMsgEscKeydownListener);
  document.removeEventListener('click', onCloseSuccessSendMsgClickListener);
  document.removeEventListener('click', onCloseErrorSendMsgClickListener);
  bnSuccessElem.removeEventListener('click', closeSendMessages);
  bnErrorElem.removeEventListener('click', closeSendMessages);
}

const initUploadingFeature = () => {
  uploadImageElem.addEventListener('change', () => {
    document.addEventListener('keydown', onOverlayEscKeydown);
    bnCloseElem.addEventListener('click', closeOverlay, {once: true});

    initScaleSettings();
    initEffectsSettings();

    document.body.classList.add('modal-open');
    overlayImageElem.classList.remove('hidden');
  });
  initPristineValidations();
  fileChooserElem.addEventListener('change', () => {
    const file = fileChooserElem.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewElem.src = URL.createObjectURL(file);
    }
  });

  formElem.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isPristineValid()) {
      disableSubmitButton();
      uploadPicture(onSuccess, onFail, new FormData(evt.target));
    }
  });
};

export {initUploadingFeature};


