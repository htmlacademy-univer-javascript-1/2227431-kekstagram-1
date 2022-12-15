import {createPhotos} from './data.js';

const template = document.querySelector('#picture').content.querySelector('.picture');

const getPicFromTemplate = (picture) => {
  const newPicture = template.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

  return newPicture;
};

const getPictureFragment = () => {
  const pictureFragment = document.createDocumentFragment();
  createPhotos().forEach((it) =>
    pictureFragment.appendChild(getPicFromTemplate(it))
  );
  return pictureFragment;
};

export { getPictureFragment };
