import {createPhotos} from '../../data/data-impl.js';
// import { openPicture } from './open-picture.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const getPicFromTemplate = (picture) => {
  const newPicture = template.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  newPicture.dataset.id = picture.id;
  // newPicture.addEventListener('click', () => { openPicture(picture); });

  return newPicture;
};

const getFragmentAndData = () => {
  const pictureFragment = document.createDocumentFragment();
  const photosArray = createPhotos();
  photosArray.forEach((it) =>
    pictureFragment.append(getPicFromTemplate(it))
  );
  return {fragment: pictureFragment, array: photosArray};
};

export {getFragmentAndData};
