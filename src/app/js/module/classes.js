export class Card {
  constructor(state) {
    this.state = state;

    this.cardContainer = document.createElement('div');
    this.cardElement = document.createElement('div');
    this.cardElementFront = document.createElement('div');
    this.cardElementBack = document.createElement('div');
    this.bottomCardFront = document.createElement('div');
    this.bottomCardBack = document.createElement('div');
    this.buttonAudio = document.createElement('button');
    this.rotateLangButton = document.createElement('button');
    this.cardWordFront = document.createElement('span');
    this.cardWordBack = document.createElement('span');
    this.audio = document.createElement('audio');
    this.startGameButton = document.createElement('button');
  }

  createTrainingCard() {
    this.cardContainer.classList.add('card__container');
    this.cardElement.classList.add('card');

    this.audio.classList.add('cards__audio-elem');
    this.audio.setAttribute('src', `${this.state.audioSrc}`);

    this.cardElementFront.className = 'card__front';
    this.cardElementBack.className = 'card__back';


    this.bottomCardFront.className = 'cards__bottom cards__bottom_front';
    this.bottomCardBack.className = 'cards__bottom cards__bottom_back';

    this.cardWordFront.className = 'cards__word cards__word_front';
    this.cardWordBack.className = 'cards__word cards__word_back';

    this.buttonAudio.classList.add('cards__audio');
    this.rotateLangButton.classList.add('cards__rotate');

    this.bottomCardFront.appendChild(this.cardWordFront);
    this.bottomCardBack.appendChild(this.cardWordBack);
    this.cardElement.appendChild(this.audio);
    this.cardElementFront.appendChild(this.bottomCardFront);
    this.cardElementBack.appendChild(this.bottomCardBack);
    this.cardElement.appendChild(this.cardElementFront);
    this.cardElement.appendChild(this.cardElementBack);
    /* this.cardElement.appendChild(this.buttonAudio); */
    this.cardElement.appendChild(this.rotateLangButton);
    this.cardContainer.appendChild(this.cardElement);

    this.cardElementFront.style.backgroundImage = `url(${this.state.image})`;
    this.cardElementBack.style.backgroundImage = `url(${this.state.image})`;
    this.cardWordFront.innerHTML = `${this.state.word}`;
    this.cardWordBack.innerHTML = `${this.state.translation}`;
    /* this.buttonAudio.innerHTML = 'listen'; */
    this.rotateLangButton.innerHTML = '&#8634;';

    return this.cardContainer;
  }

  createGameCard() {
    this.cardContainer.classList.add('card__container');
    this.cardElement.classList.add('card__game-card');
    this.audio.classList.add('cards__audio-elem');
    this.startGameButton.classList.add('start-game');

    this.audio.setAttribute('src', `${this.state.audioSrc}`);

    this.cardElement.style.backgroundImage = `url(${this.state.image})`;

    this.cardElement.appendChild(this.audio);
    this.cardContainer.appendChild(this.cardElement);


    return this.cardContainer;
  }
}

export class CardsList {
  constructor(state, block) {
    this.state = state;
    this.block = block;
    this.fragment = null;
  }

  /* Method wich add cards in training mode */
  createCardList() {
    this.fragment = document.createDocumentFragment();
    this.state.forEach((cardElement) => {
      const card = new Card(cardElement).createTrainingCard();
      this.fragment.appendChild(card);
    });
    this.block.appendChild(this.fragment);
    this.fragment = null;
  }

  /* Method which add cards in game mode */
  createGameCardList() {
    if (this.block) {
      this.block.innerHTML = '';
    }
    this.fragment = document.createDocumentFragment();
    this.state.forEach((cardElement) => {
      const card = new Card(cardElement).createGameCard();
      this.fragment.appendChild(card);
    });
    this.block.appendChild(this.fragment);
    this.fragment = null;
  }
}
