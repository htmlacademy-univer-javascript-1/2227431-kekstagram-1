import {getPictureFragment} from './get_pictures_fragment_use_case.js';

const picturesList = document.querySelector('.pictures');

const init = () => {
  picturesList.appendChild(getPictureFragment);
};

init();
