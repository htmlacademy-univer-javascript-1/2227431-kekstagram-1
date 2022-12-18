import {ZOOM_MAX, ZOOM_MIN, ZOOM_STEP} from '../upload-picture-viewmodel.js';

const overlayImageElem = document.querySelector('.img-upload__overlay');
const previewImageElem = overlayImageElem.querySelector('.img-upload__preview');
const bnZoomOutElem = overlayImageElem.querySelector('.scale__control--smaller');
const bnZoomInElem = overlayImageElem.querySelector('.scale__control--bigger');
const scaleControlElem = overlayImageElem.querySelector('.scale__control--value');

let scaleValue = parseInt(scaleControlElem.value.replace('%', ''), 10);

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

const removeScaleListeners = () => {
  bnZoomOutElem.removeEventListener('click', onZoomOutListener);

  bnZoomInElem.removeEventListener('click', onZoomInListener);
};

const initScaleSettings = () => {
  scaleValue = 100;
  scaleControlElem.value = '100%';
  previewImageElem.style.transform = 'scale(1)';
  bnZoomOutElem.addEventListener('click', onZoomOutListener);
  bnZoomInElem.addEventListener('click', onZoomInListener);
};

export {removeScaleListeners, initScaleSettings};
