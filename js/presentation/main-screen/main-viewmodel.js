import {getPhotoArray} from '../../domain/use-case/get-photo-array.js';

let photoArray = [];

const getPhotos = async (onFail) => {
  if (photoArray.length === 0) {
    photoArray = await getPhotoArray(onFail);
  }
  return photoArray;
};

export {getPhotos};

