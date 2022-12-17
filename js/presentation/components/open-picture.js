import {isEscKey} from '../utils/utils.js';

const bigPictureElem = document.querySelector('.big-picture');
const bnCloseElem = document.querySelector('#picture-cancel');

const bigPictureState = {
  commentCountElem: document.querySelector('.comments-count'),
  imageElem: document.querySelector('.big-picture__img img'),
  likesCountElem: document.querySelector('.likes-count'),
  descriptionElem: document.querySelector('.social__caption'),
  commentListElem: document.querySelector('.social__comments'),
};

const commentsCounterElem = document.querySelector('.social__comment-count');
const commentsLoaderElem = document.querySelector('.comments-loader');
const commentTemplateElem = document.querySelector('#comment').content.querySelector('.social__comment');


const showComments = (comments) => {
  bigPictureState.commentListElem.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = commentTemplateElem.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(newComment);
  });

  bigPictureState.commentListElem.appendChild(commentsFragment);
};

const closePicture = () => {
  bigPictureElem.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCounterElem.classList.remove('hidden');
  commentsLoaderElem.classList.remove('hidden');
};

const onPictureKeydown = (key) => {
  if (isEscKey(key)) {
    closePicture();
  }
};

const onPictureCloseClick = () => {
  closePicture();
};

const addClosePictureListeners = () => {
  document.addEventListener('keydown', (evt) => {
    onPictureKeydown(evt.key);
  });
  bnCloseElem.addEventListener('click', onPictureCloseClick, {once: true});
};

const drawPicture = (picture) => {
  bigPictureState.imageElem.src = picture.url;
  bigPictureState.commentCountElem.textContent = String(picture.comments.length);
  bigPictureState.likesCountElem.textContent = picture.likes;
  bigPictureState.descriptionElem.textContent = picture.description;
  showComments(picture.comments);
};
const openPicture = (picture) => {
  drawPicture(picture);

  bigPictureElem.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCounterElem.classList.add('hidden');
  commentsLoaderElem.classList.add('hidden');

  addClosePictureListeners();
};

export {openPicture};
