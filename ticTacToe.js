let boxes = [...document.querySelectorAll('.box')];
let resetBtn = document.querySelector('#reset')
let turn0 = true;
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let undoBtn = document.querySelector('#undo');

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
let moves = [];

boxes.forEach((box, idx) => {
    const id = idx;
    box.id = id;
    box.addEventListener('click', function (){
        if (turn0){
            box.innerText = "O";
            box.style.color = 'lightcoral';
            turn0 = false;
        } else {
            box.innerText = 'X';
            box.style.color = 'lightcoral';
            turn0 = true;
        }
        moves.push(id);
        box.disabled = true;
        checkWinner();
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val){
            msg.innerText = `${pos1Val} Wins`;
            msgContainer.classList.remove('hide');
            disableBoxes();
            return;
        }
    }
    const allFilled = boxes.every((box) => box.innerText !== "");
    if (allFilled){
        msg.innerText = "Match Drawn";
        msgContainer.classList.remove('hide');
    }
};

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add('hide');
    moves = [];
};

const undo = () => {
    const toUndo = moves.pop();
    if (toUndo === undefined) return;

    const box = boxes[toUndo]
    box.innerText = "";
    box.disabled = false;
    turn0 = !turn0;
};

newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
undoBtn.addEventListener('click', undo);