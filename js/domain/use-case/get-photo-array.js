import {getPhotos} from '../../data/api.js';

const getPhotoArray = async (onFail) => await getPhotos(onFail);

export {getPhotoArray};
