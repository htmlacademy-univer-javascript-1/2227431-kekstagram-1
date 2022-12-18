import {EFFECTS} from '../upload-picture-viewmodel.js';

const overlayImageElem = document.querySelector('.img-upload__overlay');
const previewImageElem = overlayImageElem.querySelector('.img-upload__preview');
const effectsListElem = overlayImageElem.querySelector('.effects__list');
const sliderElem = overlayImageElem.querySelector('.effect-level__slider');
const effectLevelElem = overlayImageElem.querySelector('.effect-level__value');
const sliderFieldElem = overlayImageElem.querySelector('.img-upload__effect-level');

let currentEffect;
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

const removeEffectsListeners = () => {
  effectsListElem.removeEventListener('change', onEffectsChangeListener);
  sliderElem.noUiSlider.destroy();
};

const initEffectsSettings = () => {
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
};

export {removeEffectsListeners, initEffectsSettings};
