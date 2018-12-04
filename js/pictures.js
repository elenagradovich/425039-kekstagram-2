'use strict';

var commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptionArray = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var amountPictures = 25;
var minAmountLikes = 15;
var maxAmountLikes = 200;
var commentsList = [];

var getRandomNumber = function (minNumber, maxNumber) {
  var random = minNumber + Math.floor(Math.random() * (maxNumber - minNumber));
  return random;
};

var getCommentsArray = function (amount) {
  commentsList = [];
  for (var i = 0; i < amount; i++) {
    commentsList.push(commentsArray[getRandomNumber(0, (commentsArray.length))]);
  }

  return commentsList;
};
var createPictureObject = function (number) {
  var commentsAmount = getRandomNumber(0, commentsArray.length);
  return {
    url: 'photos/' + (number+1) + '.jpg',
    likes : getRandomNumber(minAmountLikes, maxAmountLikes),
    commentsAmount: commentsAmount,
    comments : getCommentsArray(commentsAmount),
    description : descriptionArray[getRandomNumber(0, descriptionArray.length)]
  }
}

var picturesArray = [];

for (var i = 0; i < amountPictures; i++) {
  picturesArray.push(createPictureObject(i));
}

console.log(picturesArray);

var pictureTemplate = document.querySelector('#picture').content; //шаблон на странице
var picturesContainer =  document.querySelector('.pictures.container'); //место вставки картинок
var picture = document.createDocumentFragment();

var getPicturesDomElements = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.commentsAmount;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  return pictureElement;
}

for (var i = 0; i < amountPictures; i++) {
  picture.appendChild(getPicturesDomElements(picturesArray[i]));
}

picturesContainer.appendChild(picture);
var bigPicture = document.querySelector('.big-picture');

var getIncreasedPicture = function (pictureInc) {
  bigPicture.querySelector('.big-picture__img > img').src = pictureInc.url;
  bigPicture.querySelector('.big-picture__img > img').alt = '';
  bigPicture.querySelector('.likes-count').textContent = pictureInc.likes;
  bigPicture.querySelector('.social__caption').textContent = pictureInc.description;
  var socialComments = bigPicture.querySelector('.social__comments');
  for (i = 0; i < picture.commentsAmount; i++) {
    socialComments.children[i].querySelector('.social__text').textContent = pictureInc.comments[i];
    socialComments.children[i].querySelector('.social__picture').src = "img/avatar-" + getRandomNumber(1, 6) +
    ".svg";
  }
}

getIncreasedPicture(picturesArray[0]);
bigPicture.classList.remove('hidden');

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');
