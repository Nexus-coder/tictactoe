//Needed values
//Everytime a game is starte count is re-initialized to zero,So is detWin
var toeTurn = false;
var rounds = 0;
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
var boardBoxes = document.querySelectorAll(".grid-box");
var tacWins = 0;
var ticWins = 0;

//console.log(body.dataset.state);
const gridTableDetWin = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

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
    //console.log(44);
})

function checkAmove(){
    var move;
    for(let i = 0 ; i < 3 ;i++){
        for(let j= 0 ; j< 3; j++){
            if(gridTableDetWin[i][j] === 0){
                move = true;
                break;
            }
        }
    }

return move;
}

//Function to determine winner
function checkRows() {
var win = false;
    //check filled rows
    for(let row = 0 ; row < 3; row++){
        if((gridTableDetWin[row][0] === gridTableDetWin[row][1])&&(gridTableDetWin[row][0] === gridTableDetWin[row][2])){
            if(gridTableDetWin[row][0] != 0){
                win = true;
            }
        }
    }

    return win;

};


function checkCols() {
var win =false;
    //check filled rows
    for(let col = 0 ; col < 3; col++){
        if((gridTableDetWin[0][col] === gridTableDetWin[1][col]) && (gridTableDetWin[0][col]=== gridTableDetWin[2][col])){
           
            if(gridTableDetWin[0][col] != 0){
                console.log((gridTableDetWin[0][col] === gridTableDetWin[1][col]) && (gridTableDetWin[0][col]=== gridTableDetWin[2][col]));
                win =  true;
            }
        }
    }
    
    return win;

};


function checkWin(){
    return checkRows() || checkCols() || checkDiagonals();
}


function checkDiagonals(){
    var diag1 = ((gridTableDetWin[0][0] === gridTableDetWin[1][1]) && (gridTableDetWin[0][0] == gridTableDetWin[2][2])) && gridTableDetWin[0][0] != 0;
    var diag2 = ((gridTableDetWin[0][2] === gridTableDetWin[1][1]) && (gridTableDetWin[0][2] == gridTableDetWin[2][0])) && gridTableDetWin[0][2] != 0;
    /*if(diag1 || diag2){
        return true;
    }else{
        return false;
    }*/

    //console.log(diag1,diag2);
    return diag1 || diag2;
    
}

//Function to add svg to boxes
function add(e,{row,col}) {
    var input;
        if(toeTurn){
            input = toe;
            gridTableDetWin[row][col] = 2;
        }else{
            input = tic;
            gridTableDetWin[row][col] = 1;
        }

        console.log(gridTableDetWin);
        e.target.innerHTML = input;

        toeTurn = !toeTurn;
        rounds += 0.5;

        if(!checkAmove()){
            reset();
            results.innerText = "Draw";
        } 
        //console.log(rounds);
        // detWin[index] = input;
        // indexPresent.push(index);
}
//Add in the global context the flag is always false

//This is the 
function tictacLog() {
    [...gridBoxes].forEach((gridBox, index) => {
        gridBox.addEventListener("click", function(e) {
            //add icons
            add(e,{
                row : parseInt(e.target.dataset.row),
                col : parseInt(e.target.dataset.col)
            })

            //check if there's a win
            var win = checkWin();

            if(win){
                reset();
                //check who won
                if(toeTurn){
                    results.innerText = ("tic wins");
                    ticWins++;
                }else{
                    results.innerText = ("tac wins");
                    tacWins++;
                }

                document.querySelector("#datax1").innerText = ticWins;
                document.querySelector("#data01").innerText = tacWins;
            }

            putSound.play()

        })
    });
}

let putSound = new Audio('C:/Users/hp/Desktop/Dev/Games/XandOgame/mixkit-game-ball-tap-2073.wav');
let hitSound = new Audio('C:/Users/hp/Desktop/Dev/Games/XandOgame/mixkit-ethereal-fairy-win-sound-2019.wav');

function reset() {
    //reseting the array
    for(let i = 0 ; i < 3 ;i++){
        for(let j= 0 ; j< 3; j++){
            gridTableDetWin[i][j] = 0;
        }
    }
    //clear board
    boardBoxes.forEach((box)=>{
        box.innerHTML = " ";
    });
}


tictacLog();

// function random(num) {
//     return Math.floor(Math.random() * num);
// }
// setTimeout(gridBoxes[remainNum[random(remainNum.length - 1)]].click(),500)

//When winner is found dont add any more element with click


