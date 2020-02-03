'use strict'

const LIFE = '🐷';
const BOARDSIZE = { i: 10, j: 10 }
const POPULATIONPERCENT = 0.6;
var gBoard = [];
var gInterval;
var testPos = { i: 1, j: 1 }
var gIsLife = true;
generateBoard();
// gBoard[0][0] = LIFE;
// gBoard[0][1] = LIFE;
// gBoard[0][2] = LIFE;
// gBoard[1][0] = LIFE;
// gBoard[1][2] = LIFE;
// gBoard[2][0] = LIFE;
// gBoard[2][1] = LIFE;
// gBoard[2][2] = LIFE;

// mat[3][0] = LIFE;
// mat[3][1] = LIFE;
// mat[3][2] = LIFE;

// console.table(gBoard);
// console.table(mat);
// console.log(countNeig(testPos));

gInterval = setInterval(play, 1000);

function play() {
    runGeneration();
    renderBoard();
    if (!gIsLife) clearInterval(gInterval);
}


function generateBoard() {
    for (var i = 0; i < BOARDSIZE.i; i++) {
        gBoard[i] = [];
        for (var j = 0; j < BOARDSIZE.j; j++) {
            gBoard[i][j] =(Math.random() > POPULATIONPERCENT) ?  '' :  LIFE;
        }
    }

}

function runGeneration() {
    var mat = copyMat(gBoard);
    var isThereLife = false;
    for (var i = 0; i < BOARDSIZE.i; i++) {
        for (var j = 0; j < BOARDSIZE.j; j++) {
            var pos = { i: i, j: j };
            var neigCount = countNeig(pos);
            if (neigCount < 3 || neigCount > 5) mat[i][j] = '';
            if (neigCount === 3 && mat[i][j] === '') mat[i][j] = LIFE;
            if (mat[i][j] === LIFE) isThereLife = true;

        }
    }
    gBoard = mat;
    gIsLife = isThereLife;
}


function countNeig(pos) {
    var count = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i < 0 || j < 0 || i > gBoard.length - 1 || j > gBoard[0].length - 1) continue;
            if (gBoard[i][j] === LIFE) count++;
        }
    }
    return (gBoard[pos.i][pos.j] === LIFE) ? count - 1 : count;
}

function copyMat(mat) {
    var matCopy = [];
    for (var i = 0; i < mat.length; i++) {
        matCopy[i] = mat[i].slice();
    }
    return matCopy;
}


function renderBoard() {
    // gCurrentCells = cellsNum;
    var strHTML = '';
    for (var i = 0; i < BOARDSIZE.i; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < BOARDSIZE.j; j++) {
            strHTML += `<td data-i="${i}" data-j="${j}">${(gBoard[i][j] === LIFE) ? LIFE : ''}</td>`;
        }
        strHTML += '</tr>';
        // strHTML = strHTML.slice(0, strHTML.length - 4);
        document.querySelector('table').innerHTML = strHTML;
    }
}