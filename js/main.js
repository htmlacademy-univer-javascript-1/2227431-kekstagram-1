import { getPicturesFragment } from './use-cases/get-pictures-fragment.js';

const picturesList = document.querySelector('.pictures');

const init = () => {
  picturesList.append(getPicturesFragment());
};

init();
