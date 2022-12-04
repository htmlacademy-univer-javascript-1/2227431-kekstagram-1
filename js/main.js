const getRandomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;

const canFitMaxLength = (string, maxLength) => string.length <= maxLength;


getRandomNumber(3, 5);
canFitMaxLength('hello', 5);
canFitMaxLength('hello', 4);


const COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Константин',
  'Юрий',
  'Ильяс',
  'Полина',
  'Мария',
  'Арсениий',
  'Матвей',
  'Серый',
  'Леха',
  'Аня'
];

const createComments = () => Array.from({length: getRandomNumber(0, 100)}).map((value, index) => ({
  id: index + 1,
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: COMMENTS_TEXT[getRandomNumber(0, COMMENTS_TEXT.length - 1)],
  name: NAMES[getRandomNumber(0, NAMES.length - 1)],
}));

const createPhotos = () => Array.from({length: 25}).map((value, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: COMMENTS_TEXT[getRandomNumber(0, COMMENTS_TEXT.length - 1)],
  likes: getRandomNumber(15, 200),
  comments: createComments(),
}));

createPhotos();
