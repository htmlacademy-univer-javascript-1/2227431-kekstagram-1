import {isEscKey} from '../../utils/utils.js';


const COMMENTS_TO_ADD = 5;

const bigPictureElem = document.querySelector('.big-picture');

const bnCloseElem = bigPictureElem.querySelector('#picture-cancel');
const bnCommentsLoadElem = bigPictureElem.querySelector('.comments-loader');

const commentTemplateElem = document.querySelector('#comment').content.querySelector('.social__comment');

let currentPicture;
let loadedCommentsCount;

const state = {
  allCommentCountElem: bigPictureElem.querySelector('.comments-count'),
  currentCommentsCounterElem: bigPictureElem.querySelector('.social__comment-count'),
  imageElem: bigPictureElem.querySelector('.big-picture__img img'),
  likesCountElem: bigPictureElem.querySelector('.likes-count'),
  descriptionElem: bigPictureElem.querySelector('.social__caption'),
  commentListElem: bigPictureElem.querySelector('.social__comments'),
};

const closePicture = () => {
  bigPictureElem.classList.add('hidden');
  document.body.classList.remove('modal-open');
  state.currentCommentsCounterElem.classList.remove('hidden');
  bnCommentsLoadElem.classList.remove('hidden');
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

const updateCommentsCounterElem = (updateValue) => {
  const allCommentsText = ` из ${state.allCommentCountElem.textContent} комментариев`;
  state.currentCommentsCounterElem.textContent = `${updateValue + 1}${allCommentsText}`;
};

const loadComment = (comment) => {
  const newComment = commentTemplateElem.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  state.commentListElem.appendChild(newComment);
};

const onClickLoadMoreComments = () => {
  for (let i = loadedCommentsCount; i < loadedCommentsCount + COMMENTS_TO_ADD; i++) {
    if (i === currentPicture.comments.length - 1) {
      bnCommentsLoadElem.classList.add('hidden');
    }
    if (i >= currentPicture.comments.length) {
      break;
    }
    loadComment(currentPicture.comments[i]);
    updateCommentsCounterElem(i);
  }
  loadedCommentsCount += COMMENTS_TO_ADD;
};

const renderPicture = () => {
  state.imageElem.src = currentPicture.url;
  state.allCommentCountElem.textContent = String(currentPicture.comments.length);
  state.likesCountElem.textContent = currentPicture.likes;
  state.descriptionElem.textContent = currentPicture.description;
  if (currentPicture.comments.length <= 5) {
    updateCommentsCounterElem(Number(state.allCommentCountElem.textContent));
  }
};
const openPicture = (picture) => {
  loadedCommentsCount = 0;
  currentPicture = picture;
  state.commentListElem.innerHTML = '';

  renderPicture();
  onClickLoadMoreComments();

  document.body.classList.add('modal-open');
  bigPictureElem.classList.remove('hidden');
  state.currentCommentsCounterElem.classList.remove('hidden');

  if (picture.comments.length <= 5) {
    bnCommentsLoadElem.classList.add('hidden');
  } else {
    bnCommentsLoadElem.classList.remove('hidden');
    bnCommentsLoadElem.addEventListener('click', onClickLoadMoreComments);
  }

  addClosePictureListeners();
};

export {openPicture};
