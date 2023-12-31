import { MemoryCard } from './interfaces/cardinterface';

const cards: NodeListOf<MemoryCard> = document.querySelectorAll('.memory-card');

const cardsArray: MemoryCard[] = Array.from(cards);
const cardValues: number[] = Array.from(cardsArray, (card) =>
  parseInt(card.dataset.card || '0', 10)
);

const successCards: String[] = [];
let allowFlip = true;

for (let i = cardValues.length - 1; i > 0; i--) {
  const newPosition = Math.ceil(Math.random() * i);
  [cardValues[i], cardValues[newPosition]] = [cardValues[newPosition], cardValues[i]];
}

cardsArray.forEach((card, index) => {
  card.dataset.card = String(cardValues[index]);
  card.querySelector('.front').textContent = String(cardValues[index]);
});

let pickedCard: string[] = [];

cards.forEach((card: HTMLElement) => {
  card.addEventListener('click', () => {
    cardHandler(card);
  });
});

const valueChecker = (numOne: string, numTwo: string): boolean => {
  return numOne === numTwo;
};

const turnBackAround = () => {
  pickedCard.forEach((cardNum) => {
    let card: HTMLElement = document.querySelector(`[data-card="${cardNum}"].flip`);
    if (card) {
      card.classList.toggle('flip');
    }
  });
  pickedCard = [];
  allowFlip = true;
};

const showWinningScreen = (): void => {
  const winningOverlay: HTMLElement = document.querySelector('.overlay');
  winningOverlay.classList.toggle('show');

  document.querySelector('.close').addEventListener('click', () => {
    winningOverlay.classList.toggle('show');
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
};

const cardHandler = (card: HTMLElement): void => {
  if (!card.classList.contains('flip') && allowFlip) {
    pickedCard.push(card.dataset.card);

    card.classList.toggle('flip');
    if (pickedCard.length > 1) {
      allowFlip = false;
      if (valueChecker(pickedCard[0], pickedCard[1])) {
        successCards.push(pickedCard[0]);
        allowFlip = true;
        pickedCard = [];
        if (successCards.length === cardsArray.length / 2) {
          showWinningScreen();
        }
      } else {
        setTimeout(turnBackAround, 1000);
      }
    }
  }
};
