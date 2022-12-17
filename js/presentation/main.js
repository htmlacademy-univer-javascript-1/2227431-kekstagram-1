import {renderPictures} from './main-screen/components/picture-list-fragment.js';
import {initUploadingFeature} from './upload-picture/upload-picture.js';

const init = () => {
  renderPictures();
  initUploadingFeature();
};

init();
