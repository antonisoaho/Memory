const cards = document.querySelectorAll('.memory-card');
const cardsArray = Array.from(cards);
const cardValues = Array.from(cardsArray, (card) => parseInt(card.dataset.card || '0', 10));
const successCards = [];
for (let shuffleCount = 0; shuffleCount < 3; shuffleCount++) {
    for (let i = cardValues.length - 1; i > 0; i--) {
        const newPosition = Math.ceil(Math.random() * i);
        [cardValues[i], cardValues[newPosition]] = [
            cardValues[newPosition],
            cardValues[i],
        ];
    }
}
cardsArray.forEach((card, index) => {
    card.dataset.card = String(cardValues[index]);
    card.querySelector('.front').textContent = String(cardValues[index]);
});
let pickedCard = [];
cards.forEach((card) => {
    card.addEventListener('click', () => {
        cardHandler(card);
    });
});
const valueChecker = (numOne, numTwo) => {
    return numOne === numTwo;
};
const turnBackAround = () => {
    pickedCard.forEach((cardNum) => {
        let card = document.querySelector(`[data-card="${cardNum}"].flip`);
        if (card) {
            card.classList.toggle('flip');
        }
    });
    pickedCard = [];
};
const showWinningScreen = () => {
    const winningOverlay = document.querySelector('.overlay');
    winningOverlay.classList.toggle('show');
    document.querySelector('.close').addEventListener('click', () => {
        winningOverlay.classList.toggle('show');
        setTimeout(() => {
            location.reload();
        }, 1000);
    });
};
const cardHandler = (card) => {
    if (!card.classList.contains('flip')) {
        pickedCard.push(card.dataset.card);
        card.classList.toggle('flip');
        if (pickedCard.length > 1) {
            if (valueChecker(pickedCard[0], pickedCard[1])) {
                successCards.push(pickedCard[0]);
                pickedCard = [];
                if (successCards.length === cardsArray.length / 2) {
                    showWinningScreen();
                }
            }
            else {
                setTimeout(turnBackAround, 1000);
            }
        }
    }
};
export {};
