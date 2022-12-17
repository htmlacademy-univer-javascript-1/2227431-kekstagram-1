import {getPhotoArray} from '../../domain/use-case/get-photo-array.js';

let photoArray = [];

const getPhotos = () => {
  if (photoArray.length === 0) {
    photoArray = getPhotoArray();
  }
  return photoArray;
};
export {getPhotos};

