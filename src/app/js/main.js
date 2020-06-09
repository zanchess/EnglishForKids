/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import '../css/style.scss';
import { cards, mainPageData } from './module/cards-data.js';
import { Card, CardsList } from './module/classes.js';

const pages = document.getElementById('pages');
const mainBlock = document.getElementById('main-page');
const cardsBlock = document.getElementById('cards');
const container = document.querySelector('.container');
const sidebar = document.getElementById('sidebar');
const gameModeButton = document.getElementById('game-mode');
const statrGameButton = document.getElementById('start-game');
const resultsBlock = document.getElementById('results');
const gameOverPage = document.getElementById('game-over_page');
let cardList = null;
let currentPage = null;
let dataForGame = null;
let countErrors = 0;

/* sidebar functions */
function showSidebar() {
  container.classList.add('show-sidebar');
}

function hideSidebar() {
  container.classList.remove('show-sidebar');
}

function isShowingSidebar() {
  return container.classList.contains('show-sidebar');
}

function toggleSidebarBack() {
  isShowingSidebar() ? hideSidebar() : showSidebar();
}

const toggleSidebar = (e) => {
  if (isShowingSidebar() && container.contains(e.target)) {
    e.preventDefault();
    hideSidebar();
  } else if (e.target.classList.contains('hamburger') || e.target.classList.contains('bar')) {
    toggleSidebarBack();
  }
};

const showMainPage = (block) => {
  if (block.classList.contains('main_hidden')) {
    block.classList.remove('main_hidden');
  }
};

/* Main page render function */
const renderMainPage = (parent) => {
  const sectionsBlock = document.createDocumentFragment();
  for (const key in mainPageData) {
    if (Object.prototype.hasOwnProperty.call(mainPageData, key)) {
      const section = document.createElement('a');
      const nameLink = document.createElement('span');

      section.classList.add('main-page__section');
      nameLink.classList.add('main-page__name-link');

      section.setAttribute('href', '#');
      section.setAttribute('alt', `${key}`);
      section.style.backgroundImage = `url(${mainPageData[key]})`;
      nameLink.innerHTML = key;

      section.appendChild(nameLink);
      sectionsBlock.appendChild(section);
    }
  }
  parent.appendChild(sectionsBlock);
};

/* Show english word */
const rotateToStartWord = (e) => {
  if (!e.target.classList.contains('cards__rotate') && !e.target.classList.contains('cards__audio') && !e.target.classList.contains('card__front') && (e.target.classList.contains('translate') || e.target.parentNode.classList.contains('translate'))) {
    e.target.parentNode.classList.remove('translate');
  }
};

/* Show translate */
const clickOnTranslateButton = (e) => {
  if (e.target.classList.contains('cards__rotate')) {
    e.target.parentNode.classList.add('translate');
  }
  if (e.target.classList.contains('card__front')) {
    e.target.previousSibling.play();
  }
};

/* Render training cards */
const showTrainingCard = (i) => {
  currentPage = i;

  if (cardsBlock.classList.contains('cards_hidden')) {
    cardsBlock.classList.remove('cards_hidden');
  }
  if (cardsBlock.innerHTML) {
    cardsBlock.innerHTML = '';
  }
  mainBlock.classList.add('main_hidden');
  cardList = new CardsList(cards[i], cardsBlock);
  if (!gameModeButton.checked) {
    cardList.createCardList();
  } else {
    cardList.createGameCardList();
    statrGameButton.classList.remove('start-game_hidden');
  }
};

/* Mix cards for game */
const setCurrentPageData = () => {
  dataForGame = [...cards[currentPage]].sort(() => Math.random() - 0.5);
  statrGameButton.innerHTML = 'Start Game';
};

/* Change mode which we switch toggle */
const changeAppMode = () => {
  if (cardsBlock.innerHTML) {
    cardsBlock.innerHTML = '';
  }
  /* if (!gameOverPage.classList.contains('game-over_hidden')) {
    gameOverPage.innerHTML = '';
    gameOverPage.classList.add('game-over_hidden');
  } */
  if (mainBlock.classList.contains('main_hidden') && gameOverPage.classList.contains('game-over_hidden')) {
    cardList = new CardsList(cards[currentPage], cardsBlock);

    if (gameModeButton.checked && gameOverPage.classList.contains('game-over_hidden')) {
      cardList.createGameCardList();
      if (statrGameButton.classList.contains('start-game_hidden')) {
        statrGameButton.classList.remove('start-game_hidden');
        statrGameButton.innerHTML = 'Start Game';
        countErrors = 0;
        setCurrentPageData();
      }
    } else if (gameOverPage.classList.contains('game-over_hidden')) {
      cardList.createCardList();
      statrGameButton.classList.add('start-game_hidden');
      resultsBlock.innerHTML = '';
    }
  }
};


/* start chapter from main page */
const chooseChapter = (e) => {
  if (e.target.classList.contains('nav-link') || e.target.classList.contains('main-page__section') || e.target.classList.contains('main-page__name-link')) {
    const clickedLink = e.target.getAttribute('alt') || e.target.innerHTML;
    switch (clickedLink) {
      case cards[0][0]:
        showTrainingCard(1);
        setCurrentPageData();
        break;
      case cards[0][1]:
        showTrainingCard(2);
        setCurrentPageData();
        break;
      case cards[0][2]:
        showTrainingCard(3);
        setCurrentPageData();
        break;
      case cards[0][3]:
        showTrainingCard(4);
        setCurrentPageData();
        break;
      case cards[0][4]:
        showTrainingCard(5);
        setCurrentPageData();
        break;
      case cards[0][5]:
        showTrainingCard(6);
        setCurrentPageData();
        break;
      case cards[0][6]:
        showTrainingCard(7);
        setCurrentPageData();
        break;
      case cards[0][7]:
        showTrainingCard(8);
        setCurrentPageData();
        break;
      case 'Main':
        dataForGame = null;
        currentPage = null;
        statrGameButton.innerHTML = 'Start Game';
        statrGameButton.classList.add('start-game_hidden');
        cardsBlock.innerHTML = '';
        showMainPage(mainBlock);
        break;

      default:
        break;
    }
  }
};

/* Game start function */
const gameStart = (e) => {
  const { target } = e;
  if (target.innerHTML === 'Start Game') {
    target.innerHTML = 'Repeat';
  }
  if (target.classList.contains('start-game') && dataForGame.length !== 0) {
    new Audio(dataForGame[0].audioSrc).play();
    target.innerHTML = 'Repeat';
  }
  if (target.classList.contains('card__game-card') && !target.classList.contains('card__game-card_done') && statrGameButton.innerHTML === 'Repeat') {
    const cardSrc = target.childNodes[0].getAttribute('src');
    if (cardSrc === dataForGame[0].audioSrc) {
      new Audio('audio/correct.mp3').play();
      dataForGame.shift();
      target.classList.add('card__game-card_done');

      const tickElement = document.createElement('img');

      tickElement.setAttribute('src', 'img/tick.png');
      tickElement.setAttribute('alt', 'tick');

      const first = resultsBlock.childNodes[0];
      resultsBlock.insertBefore(tickElement, first);


      if (dataForGame.length === 0) {
        let gameOverImgSrc = null;
        let gameOverAudio = null;

        if (countErrors) {
          gameOverImgSrc = 'img/failure.jpg';
          gameOverAudio = new Audio('audio/bad.mp3');
        } else {
          gameOverImgSrc = 'img/success.jpg';
          gameOverAudio = new Audio('audio/good.mp3');
        }

        gameOverAudio.play();

        const gameOverResult = document.createElement('span');
        const backToMainPage = document.createElement('button');

        backToMainPage.classList.add('back-to-main');
        gameOverResult.classList.add('game-over_result');


        const gameOverImg = document.createElement('img');
        gameOverImg.setAttribute('src', gameOverImgSrc);
        gameOverImg.setAttribute('alt', 'game over img');

        backToMainPage.innerHTML = 'Main Page';
        gameOverResult.innerHTML = `Количество ошибок: ${countErrors}`;

        cardsBlock.innerHTML = '';
        resultsBlock.innerHTML = '';
        const fragment = document.createDocumentFragment();

        fragment.appendChild(gameOverImg);
        fragment.appendChild(gameOverResult);
        fragment.appendChild(backToMainPage);
        gameOverPage.appendChild(fragment);
        if (gameOverPage.classList.contains('game-over_hidden')) {
          gameOverPage.classList.remove('game-over_hidden');
        }
        statrGameButton.classList.add('start-game_hidden');
        countErrors = 0;
        setTimeout(() => {
          gameOverPage.innerHTML = '';
          gameOverPage.classList.add('game-over_hidden');
          showMainPage(mainBlock);
        }, 3000);
      }
      if (dataForGame.length !== 0) {
        setTimeout(() => {
          new Audio(dataForGame[0].audioSrc).play();
        }, 1500);
      }
    } else {
      new Audio('audio/error.mp3').play();

      const errorElement = document.createElement('img');
      errorElement.setAttribute('src', 'img/error.png');
      errorElement.setAttribute('alt', 'error');

      const first = resultsBlock.childNodes[0];
      resultsBlock.insertBefore(errorElement, first);

      countErrors += 1;
    }
  }
  if (target.classList.contains('back-to-main')) {
    gameOverPage.innerHTML = '';
    showMainPage(mainBlock);
  }
};

window.onload = function () {
  renderMainPage(mainBlock);
};
cardsBlock.addEventListener('click', clickOnTranslateButton);
cardsBlock.addEventListener('mouseout', rotateToStartWord);
mainBlock.addEventListener('click', chooseChapter);
sidebar.addEventListener('click', chooseChapter);
/* document.querySelector('.hamburger').addEventListener('click', toggleSidebar, false); */
document.querySelector('.switch-toggle').addEventListener('change', changeAppMode);
pages.addEventListener('click', gameStart);
container.addEventListener('click', toggleSidebar);
