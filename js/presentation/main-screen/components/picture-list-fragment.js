import {getPhotos} from '../main-viewmodel.js';
import {openPicture} from './open-picture.js';


const PicturesListElem = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const getPicFromTemplate = (picture) => {
  const newPicture = template.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  newPicture.dataset.id = picture.id;

  return newPicture;
};

const getPictureListFragment = () => {
  const pictureFragment = document.createDocumentFragment();
  const photosArray = getPhotos();
  photosArray.forEach((it) =>
    pictureFragment.append(getPicFromTemplate(it))
  );
  return pictureFragment;
};

const renderPictures = () => {
  PicturesListElem.append(getPictureListFragment());
  PicturesListElem.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
      const clickedPicture = getPhotos().find((picture) => Number(pictureElement.dataset.id) === picture.id);
      openPicture(clickedPicture);
    }
  });
};

export {renderPictures};
