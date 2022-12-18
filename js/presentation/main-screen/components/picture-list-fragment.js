import {getPhotos} from '../main-viewmodel.js';
import {openPicture} from './open-picture.js';
import {shuffle} from '../../utils/utils.js';
import {showErrorAlert} from './error-alert.js';


const DEBOUNCE_DELAY = 500;
const NUMBER_OF_PICTURES_FOR_RANDOM_FILTER = 10;

const PicturesListElem = document.querySelector('.pictures');
const templateElem = document.querySelector('#picture').content.querySelector('.picture');

const filtersElem = document.querySelector('.img-filters');
const filtersGroupElem = document.querySelector('.img-filters__form');

const bnFilterDefaultElem = document.querySelector('#filter-default');
const bnFilterRandomElem = document.querySelector('#filter-random');
const bnFilterDiscussedElem = document.querySelector('#filter-discussed');

const FILTERS = {
  'filter-default': bnFilterDefaultElem,
  'filter-random': bnFilterRandomElem,
  'filter-discussed': bnFilterDiscussedElem,
};

let newPictures, currentPictureNodes = [];
const getPicFromTemplate = (picture) => {
  const newPicture = templateElem.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  newPicture.dataset.id = picture.id;

  return newPicture;
};

const onLoadingPicturesError = () => {
  showErrorAlert('Не удалось загрузить данные. Проверьте подключение к Интернету и перезагрузите страницу.');
};

const getPictureListFragment = (pictures) => {
  const pictureFragment = document.createDocumentFragment();
  pictures.forEach((it) => {
    const newPic = getPicFromTemplate(it);
    pictureFragment.append(newPic);
    currentPictureNodes.push(newPic);
  });
  return pictureFragment;
};
const renderNewPictures = (pictures) => {
  currentPictureNodes.forEach((picture) => PicturesListElem.removeChild(picture));
  currentPictureNodes = [];

  const fragment = getPictureListFragment(pictures);
  PicturesListElem.append(fragment);

  PicturesListElem.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
      getPhotos(onLoadingPicturesError).then((arr) => {
        openPicture(
          arr.find((picture) => Number(pictureElement.dataset.id) === picture.id)
        );
      });
    }
  });
};

const addChangeFilterListener = (initialPictures) => {
  let currentFilter = 'filter-default';
  let timeoutId;

  filtersGroupElem.addEventListener('click', (evt) => {
    const allPictures = JSON.parse(JSON.stringify(initialPictures));
    const shuffledPictures = JSON.parse(JSON.stringify(initialPictures));
    const sortedPictures = JSON.parse(JSON.stringify(initialPictures));

    const filter = evt.target.id;
    switch (filter) {
      case 'filter-default':
        newPictures = allPictures;
        break;
      case 'filter-random':
        shuffle(shuffledPictures);
        newPictures = shuffledPictures.slice(0, NUMBER_OF_PICTURES_FOR_RANDOM_FILTER);
        break;
      case 'filter-discussed':
        newPictures = sortedPictures.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }

    [bnFilterDefaultElem, bnFilterRandomElem, bnFilterDiscussedElem].forEach((button) => button.classList
      .remove('img-filters__button--active'));
    FILTERS[filter].classList.add('img-filters__button--active');

    if (filter !== currentFilter) {
      currentFilter = filter;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => renderNewPictures(newPictures), DEBOUNCE_DELAY);
    }
  });
};
const initPictureList = () => {
  filtersElem.classList.remove('img-filters--inactive');
  getPhotos(onLoadingPicturesError).then((picture) => {
    newPictures = picture;
    renderNewPictures(picture);
    addChangeFilterListener(picture);
  });
};

export {initPictureList};
