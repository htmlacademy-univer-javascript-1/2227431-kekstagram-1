const bigPictureElement = document.querySelector('.big-picture');
const bnClose = document.querySelector('#picture-cancel');
const ESCAPE_KEYCODE = 'Escape';

const bigPictureState = {
  commentCount: document.querySelector('.comments-count'),
  image: document.querySelector('.big-picture__img img'),
  likesCount: document.querySelector('.likes-count'),
  description: document.querySelector('.social__caption'),
  commentList: document.querySelector('.social__comments'),
};

const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');


const showComments = (comments) => {
  bigPictureState.commentList.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(newComment);
  });

  bigPictureState.commentList.appendChild(commentsFragment);
};

const closePicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCounter.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
};

const onPictureKeydown = (key) => {
  if (key === ESCAPE_KEYCODE) {
    closePicture();
  }
};

const onPictureCloseClick = () => {
  closePicture();
};

const addClosePictureListeners = () => {
  document.addEventListener('keydown', (evt) => { onPictureKeydown(evt.key); });
  bnClose.addEventListener('click', onPictureCloseClick, {once:true});
};

const drawPicture = (picture) => {
  bigPictureState.image.src = picture.url;
  bigPictureState.commentCount.textContent = String(picture.comments.length);
  bigPictureState.likesCount.textContent = picture.likes;
  bigPictureState.description.textContent = picture.description;
  showComments(picture.comments);
};
const openPicture = (picture) => {
  drawPicture(picture);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  addClosePictureListeners();
};

export { openPicture };
