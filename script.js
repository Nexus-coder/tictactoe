
//Game starting state
var toeTurn = false;
let ROUNDS = 5;
let winDB = [];
let count = 0;
let flag = false;
let gridBoxes = document.getElementsByClassName('grid-box');
let results = document.querySelector('.results');
let body = document.querySelector('.body');
let change = document.querySelector('.change');
let tic = `<svg xmlns="http://www.w3.org/2000/svg" width="53" height="54" viewBox="0 0 53 54" fill="none">
<path d="M50 3L3 50" stroke="#BC6C25" stroke-width="5" stroke-linecap="round"/>
<path d="M49.4491 50.5446L2.99999 3.00004" stroke="#BC6C25" stroke-width="5" stroke-linecap="round"/>
</svg>`;
let toe = `<svg xmlns="http://www.w3.org/2000/svg" width="67" height="67" viewBox="0 0 67 67" fill="none">
<circle cx="33.25" cy="33.25" r="30.75" stroke="#BC6C25" stroke-width="5"/>
</svg>`;

//Grid array that maps the co-ordinates of the input
const gridTableDetWin = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];


//Colourd state
let machine = {
    initial: 'brown',
    state: {
        brown: {
            on: { CLICK: 'pink' }
        },
        pink: {
            on: { CLICK: 'blue' }
        },
        blue: {
            on: {
                CLICK: 'brown'
            }
        }

    }
}

change.addEventListener('click', () => {
    let currentState = body.dataset.state;
    let nextState = machine.state[currentState].on['CLICK'];
    body.dataset.state = nextState;
})


//checks if next move is possible
//If there is any table in grid table then the next move is possible
function checkAmove() {
    var move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gridTableDetWin[i][j] === 0) {
                move = true;
                break;
            }
        }
    }

    return move;
}

//Function to determine winner according to the rows
function checkRows() {
    var win = false;
    //check filled rows
    for (let row = 0; row < 3; row++) {
        if ((gridTableDetWin[row][0] === gridTableDetWin[row][1]) &&
            (gridTableDetWin[row][0] === gridTableDetWin[row][2])) {
            if (gridTableDetWin[row][0] != 0) {
                win = true;
            }
        }
    }

    return win;

};


function checkCols() {
    var win = false;
    //check filled cols
    for (let col = 0; col < 3; col++) {
        if ((gridTableDetWin[0][col] === gridTableDetWin[1][col]) &&
            (gridTableDetWin[0][col] === gridTableDetWin[2][col])) {

            if (gridTableDetWin[0][col] != 0) {
                console.log("Cols", (gridTableDetWin[0][col] === gridTableDetWin[1][col])
                    && (gridTableDetWin[0][col] === gridTableDetWin[2][col]));
                win = true;
            }
        }
    }

    return win;

};

function checkDiagonals() {
    /*
    *two possible conditions for 
    *one two win through the diagonals
    */
    var diag1 = ((gridTableDetWin[0][0] === gridTableDetWin[1][1]) && (gridTableDetWin[0][0] == gridTableDetWin[2][2])) && gridTableDetWin[0][0] != 0;
    var diag2 = ((gridTableDetWin[0][2] === gridTableDetWin[1][1]) && (gridTableDetWin[0][2] == gridTableDetWin[2][0])) && gridTableDetWin[0][2] != 0;

    return diag1 || diag2;

}

function checkWin() {
    // return Sum of all conditions
    return checkRows() || checkCols() || checkDiagonals();
}


//Function to add svg to boxes
function add(e, { row, col }) {
    //console.log("workin");
    var input;
    //2 for toe & 1 for tic
    if (toeTurn) {
        input = toe;
        gridTableDetWin[row][col] = 2;
    } else {
        input = tic;
        gridTableDetWin[row][col] = 1;
    }

    //append icon
    e.target.innerHTML = input;

    //change who's next
    toeTurn = !toeTurn;

    //check if next move is possible
    if (!checkAmove()) {
        setTimeout(reset, 1000);
        winDB.push([0, 0])
        results.innerText = "Draw";
    }
}

//to add event listener on boxes
function tictacLog() {
    [...gridBoxes].forEach((gridBox) => {
        gridBox.addEventListener("click", function (e) {

            //valid move
            if (e.target.innerHTML === "") {
                add(e, {
                    row: parseInt(e.target.dataset.row),
                    col: parseInt(e.target.dataset.col)
                });

                //check if there's a win
                var win = checkWin();

                if (win) {
                    setTimeout(reset, 1000);
                    if (toeTurn) {
                        results.innerText = ("tic wins");
                        winDB.push([1, 0])
                    } else {
                        results.innerText = ("tac wins");
                        winDB.push([0, 1])
                    }
                }
                for (let i = 0; i <= winDB.length; i++) {
                    document.querySelector(`#datax${i}`).innerText = winDB[i][0];
                    document.querySelector(`#data0${i}`).innerText = winDB[i][1];
                }
                putSound.play();
            }
        })
    })
};

let putSound = new Audio('C:/Users/hp/Desktop/Dev/Games/XandOgame/mixkit-game-ball-tap-2073.wav');
let hitSound = new Audio('C:/Users/hp/Desktop/Dev/Games/XandOgame/mixkit-ethereal-fairy-win-sound-2019.wav');

function reset() {
    //reseting the array
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gridTableDetWin[i][j] = 0;
        }
    }
    //clear board
    [...gridBoxes].forEach((box) => {
        box.innerHTML = "";
    });
}

//adding event listeners to boxes
tictacLog();

// function random(num) {
//     return Math.floor(Math.random() * num);
// }
// setTimeout(gridBoxes[remainNum[random(remainNum.length - 1)]].click(),500)

//When winner is found dont add any more element with click