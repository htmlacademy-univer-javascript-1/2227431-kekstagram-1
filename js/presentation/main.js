import {getFragmentAndData} from '../domain/use-case/get-fragment-and-data.js';
import {openPicture} from './components/open-picture.js';
import {initUploadingFeature} from './components/upload-picture/upload-picture.js';

const PicturesListElem = document.querySelector('.pictures');


const renderPictures = () => {
  const tmp = getFragmentAndData();
  const pictureFragment = tmp.fragment;
  const picturesArray = tmp.array;
  PicturesListElem.append(pictureFragment);

  PicturesListElem.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');
    if (pictureElement) {
      const clickedPicture = picturesArray.find((picture) => Number(pictureElement.dataset.id) === picture.id);
      openPicture(clickedPicture);
    }
  });
};
const init = () => {
  renderPictures();
  initUploadingFeature();
};

init();
