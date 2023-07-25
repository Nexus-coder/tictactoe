//Needed values
//Everytime a game is starte count is re-initialized to zero,So is detWin
let count = 0;
let detWin = [];
let remainNum = [];
let indexPresent = [];
let flag = false;
let possNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let gridBoxes = document.getElementsByClassName('grid-box');
let exTic = document.querySelector('.ex');
let zeroToe = document.querySelector('.zero');
let results = document.querySelector('.results');
let body = document.querySelector('.body');
let change = document.querySelector('.change');
console.log(body.dataset.state);
const gridTableDetWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let tic = `<svg xmlns="http://www.w3.org/2000/svg" width="53" height="54" viewBox="0 0 53 54" fill="none">
<path d="M50 3L3 50" stroke="#BC6C25" stroke-width="5" stroke-linecap="round"/>
<path d="M49.4491 50.5446L2.99999 3.00004" stroke="#BC6C25" stroke-width="5" stroke-linecap="round"/>
</svg>`;
let toe = `<svg xmlns="http://www.w3.org/2000/svg" width="67" height="67" viewBox="0 0 67 67" fill="none">
<circle cx="33.25" cy="33.25" r="30.75" stroke="#BC6C25" stroke-width="5"/>
</svg>`

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
    console.log(44);
})

//Function to determine winner
function determineWinner(index) {
    //Check i a winner has already been found
    gridTableDetWin.forEach(([num1, num2, num3]) => {
        if (((detWin[num1] === "X")) && ((detWin[num2] === "X")) && ((detWin[num3] === "X")) || ((detWin[num1] === "O")) && ((detWin[num2] === "O")) && ((detWin[num3] === "O"))) {
            results.innerHTML = `Winner ${detWin[index]}!!`;
            hitSound.play();
            flag = true;
        }
    })

};

//Function to add svg to boxes
function instance() {
    let flag = false;
    function ElementToBox(e) {
        console.log(flag)
        flag = !flag;
        let input = flag ? toe : tic
        e.target.innerHTML = input;
        // detWin[index] = input;
        // indexPresent.push(index);
    }
    return ElementToBox;
}
//Add in the global context the flag is always false
let Add = instance();

//This is the 
function tictacLog() {
    [...gridBoxes].forEach((gridBox, index) => {
        gridBox.addEventListener("click", function(e) {
            console.dir(gridBox);
            Add(e)
            console.dir(Add)
            //Here the number of grids let is displayed assumming that the active player is O;
            remainNum = possNum.filter(num => !indexPresent.includes(num));
            console.log(remainNum);
            if (remainNum.length == 0) {
                results.innerHTML = `Draw`;
            }


            putSound.play()
            //Once winner has been decided break out o the loop
            determineWinner(index);

        })
    });
}

let putSound = new Audio('C:/Users/hp/Desktop/Dev/Games/XandOgame/mixkit-game-ball-tap-2073.wav');
let hitSound = new Audio('C:/Users/hp/Desktop/Dev/Games/XandOgame/mixkit-ethereal-fairy-win-sound-2019.wav');

function reset() {
    [...gridBoxes].forEach((gridBox, index) => {
        gridBox.innerHTML = "";
    });
}


tictacLog();

// function random(num) {
//     return Math.floor(Math.random() * num);
// }
// setTimeout(gridBoxes[remainNum[random(remainNum.length - 1)]].click(),500)

//When winner is found dont add any more element with click


