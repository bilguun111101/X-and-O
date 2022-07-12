const X_CLASS = 'x'; const CIRCLE_CLASS = 'circle'; 
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const WINNING_COMBINATIONS = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 4, 8],[2, 4, 6],[0, 3, 6],[1, 4, 7],[2, 5, 8]]
const game = document.querySelector('.game');
let circleTurn;
document.querySelector('#restartButton').addEventListener('click', startGame);

startGame();

function startGame() {
    circleTurn = false;
    cellElements.forEach(box => {
        box.classList.remove(X_CLASS)
        box.classList.remove(CIRCLE_CLASS);
        box.addEventListener('click', handleClick)
    })
    setBoardHoverClass();
    document.querySelector('.winning-message').classList.remove('show')
}

function handleClick(e) {
    const box = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    console.log(circleTurn, currentClass)
    placeMark(box, currentClass);
    checkWin(currentClass) ? endGame(false) : isDraw() ? endGame(true) : swapTurns(), setBoardHoverClass();
}


// some small functions

function placeMark(box, currentClass) {box.classList.add(currentClass);}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
})})}

function endGame(boom) {
    boom ? winningMessageTextElement.textContent = 'Tie!!!' : winningMessageTextElement.textContent = `${circleTurn ? "O's " : "X's "} Wins!!!`;
    document.querySelector('.winning-message').classList.add('show')
}
function isDraw() {
    return [...cellElements].every(box => {
        return box.classList.contains(X_CLASS) || box.classList.contains(CIRCLE_CLASS);
    })
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    game.classList.remove(X_CLASS);
    game.classList.remove(CIRCLE_CLASS);
    circleTurn ? game.classList.add(CIRCLE_CLASS) : game.classList.add(X_CLASS);
}