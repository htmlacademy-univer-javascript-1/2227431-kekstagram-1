import {isPictureSent} from '../../data/api.js';

const isPictureUploaded = async (onFail, body) => await isPictureSent(onFail, body);

export {isPictureUploaded};
