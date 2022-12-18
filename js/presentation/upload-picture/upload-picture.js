import {isEscKey} from '../utils/utils.js';
import {
  areHashtagsCorrect,
  hasNoHashtagDuplicates,
  areHashtagsRightAmount, isCommentCorrect, MAX_COMMENT_SIZE, ZOOM_STEP, ZOOM_MIN, EFFECTS, ZOOM_MAX, uploadPicture
} from './upload-picture-viewmodel.js';

const documentBody = document.querySelector('body');

const uploadImageElem = document.querySelector('#upload-file');
const overlayImageElem = document.querySelector('.img-upload__overlay');
const bnCloseElem = document.querySelector('#upload-cancel');

const formElem = document.querySelector('.img-upload__form');
const hashtagInputElem = formElem.querySelector('.text__hashtags');
const commentInputElem = formElem.querySelector('.text__description');
const submitButton = formElem.querySelector('.img-upload__submit');

const previewImageElem = overlayImageElem.querySelector('.img-upload__preview');

const bnZoomOutElem = overlayImageElem.querySelector('.scale__control--smaller');
const bnZoomInElem = overlayImageElem.querySelector('.scale__control--bigger');
const scaleControlElem = overlayImageElem.querySelector('.scale__control--value');

const effectsListElem = overlayImageElem.querySelector('.effects__list');
const sliderElem = overlayImageElem.querySelector('.effect-level__slider');
const effectLevelElem = overlayImageElem.querySelector('.effect-level__value');
const sliderFieldElem = overlayImageElem.querySelector('.img-upload__effect-level');

const successfulSubmission = document.querySelector('#success').content.querySelector('.success');
const errorSubmission = document.querySelector('#error').content.querySelector('.error');
const successButton = successfulSubmission.querySelector('.success__button');
const errorButton = errorSubmission.querySelector('.error__button');

const pristine = new Pristine(formElem, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text--invalid',
  successClass: 'text--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text--invalid__error'
}, false);

let currentEffect;
let scaleValue = parseInt(scaleControlElem.value.replace('%', ''), 10);
const applyEffect = (evt) => {
  currentEffect = evt.target.value;
  const effectModel = EFFECTS[currentEffect];
  if (!effectModel) {
    previewImageElem.style.filter = 'none';
    sliderFieldElem.classList.add('hidden');
    return;
  }

  sliderFieldElem.classList.remove('hidden');
  const min = effectModel.min;
  const max = effectModel.max;
  const step = effectModel.step;

  sliderElem.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step,
  });
  const effectsPreview = evt.target.parentNode.querySelector('.effects__preview');
  previewImageElem.classList.add(effectsPreview.getAttribute('class').split('  ')[1]);

};
const onEffectsChangeListener = (evt) => {
  applyEffect(evt);
};
const changeEffectIntensity = () => {
  const sliderValue = sliderElem.noUiSlider.get();
  effectLevelElem.value = sliderValue;
  const effect = EFFECTS[currentEffect];
  previewImageElem.style.filter = effect ? `${effect.style}(${sliderValue}${effect.unit})` : '';

};
const onZoomInListener = () => {
  scaleValue += ZOOM_STEP;
  scaleValue = (scaleValue > ZOOM_MAX) ? ZOOM_MAX : scaleValue;
  scaleControlElem.value = `${scaleValue}%`;
  previewImageElem.style.transform = `scale(${scaleValue / 100})`;
};

const onZoomOutListener = () => {
  scaleValue -= ZOOM_STEP;
  scaleValue = (scaleValue < ZOOM_MIN) ? ZOOM_MIN : scaleValue;
  scaleControlElem.value = `${scaleValue}%`;
  previewImageElem.style.transform = `scale(${scaleValue / 100})`;
};

const closeOverlay = () => {
  uploadImageElem.value = '';

  formElem.reset();
  document.removeEventListener('keydown', onOverlayEscKeydown);
  bnZoomOutElem.removeEventListener('click', onZoomOutListener);

  bnZoomInElem.removeEventListener('click', onZoomInListener);
  effectsListElem.removeEventListener('change', onEffectsChangeListener);

  sliderElem.noUiSlider.destroy();
  overlayImageElem.classList.add('hidden');

  document.body.classList.remove('modal-open');
  pristine.destroy();
};

function onOverlayEscKeydown(evt) {
  if (isEscKey(evt.key) && evt.target !== hashtagInputElem && evt.target !== commentInputElem) {
    closeOverlay();
  }
}

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onCloseSuccessSendMsgClickListener = (evt) => {
  if (evt.target === successfulSubmission) {
    closeSendMessages();
  }
};

const onCloseErrorSendMsgClickListener = (evt) => {
  if (evt.target === errorSubmission) {
    closeSendMessages();
  }
};

const onErrorSendMsgEscKeydownListener = (evt) => {
  if (isEscKey(evt.key)) {
    closeSendMessages();
  }
};

function closeSendMessages() {
  if (documentBody.contains(successfulSubmission)) {
    documentBody.removeChild(successfulSubmission);
  }
  if (documentBody.contains(errorSubmission)) {
    overlayImageElem.classList.remove('hidden');
    documentBody.removeChild(errorSubmission);
  }

  document.removeEventListener('keydown', onErrorSendMsgEscKeydownListener);
  document.removeEventListener('click', onCloseSuccessSendMsgClickListener);
  document.removeEventListener('click', onCloseErrorSendMsgClickListener);
  successButton.removeEventListener('click', closeSendMessages);
  errorButton.removeEventListener('click', closeSendMessages);
}

const onSuccess = () => {
  closeOverlay();
  enableSubmitButton();
  successButton.addEventListener('click', closeSendMessages);
  document.addEventListener('keydown', onErrorSendMsgEscKeydownListener);
  document.addEventListener('click', onCloseSuccessSendMsgClickListener);
  documentBody.appendChild(successfulSubmission);
};
const onFail = () => {
  overlayImageElem.classList.add('hidden');
  enableSubmitButton();
  errorButton.addEventListener('click', closeSendMessages);
  document.addEventListener('keydown', onErrorSendMsgEscKeydownListener);
  document.addEventListener('click', onCloseErrorSendMsgClickListener);
  documentBody.appendChild(errorSubmission);
};

const initUploadingFeature = () => {
  uploadImageElem.addEventListener('change', () => {
    document.addEventListener('keydown', onOverlayEscKeydown);
    bnCloseElem.addEventListener('click', closeOverlay, {once: true});

    scaleValue = 100;
    scaleControlElem.value = '100%';
    previewImageElem.style.transform = 'scale(1)';
    bnZoomOutElem.addEventListener('click', onZoomOutListener);
    bnZoomInElem.addEventListener('click', onZoomInListener);

    currentEffect = 'effect-none';
    previewImageElem.classList.add('effects__preview--none');
    effectsListElem.addEventListener('change', onEffectsChangeListener);

    sliderFieldElem.classList.add('hidden');
    noUiSlider.create(sliderElem, {
      range: {min: 0, max: 100},
      start: 100,
      connect: 'lower'
    });
    sliderElem.noUiSlider.on('update', () => {
      changeEffectIntensity();
    });

    document.body.classList.add('modal-open');
    overlayImageElem.classList.remove('hidden');
  });

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

  formElem.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    evt.preventDefault();
    if (isValid) {
      disableSubmitButton();
      uploadPicture(onSuccess, onFail, new FormData(evt.target));
    }
  });
};

export {initUploadingFeature};


