import {getPhotos} from '../main-viewmodel.js';
import {openPicture} from './open-picture.js';
import {showErrorAlert} from '../../utils/utils.js';


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

const onLoadingPicturesError = () => {
  showErrorAlert('Не удалось загрузить данные. Проверьте подключение к Интернету и перезагрузите страницу.');
};

const getPictureListFragment = async () => {
  const pictureFragment = document.createDocumentFragment();
  const result = await getPhotos(onLoadingPicturesError);
  result.forEach((it) => pictureFragment.append(getPicFromTemplate(it)));
  return pictureFragment;
};
const renderPictures = () => {
  getPictureListFragment().then((fragment) => {
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
  });

};

export {renderPictures};
