let redPlayer = 'r';
let yellowPlayer = 'y';
let currPlayer = (Math.floor(Math.random() * 2) ? 'r' : 'y');

let gameOver = false;
let gameWinner;

let board;

let rows = 6;
let cols = 7;

window.onload = () => {
    let info = document.getElementById("info");
    info.innerText = (currPlayer === 'r' ? 'Red' : 'Yellow') + " is up!";
    setGame();
}

function setGame() {
    board = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            //board array
            row.push(' ');

            //html
            //<div class="tile" id="0-0" ></div>
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            tile.addEventListener('click', setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (board[r][c] != ' ') {
        return;
    }
    else {
        for (let i = 5; i >= r; i--) {
            if (board[i][c] === ' ') {
                r = i;
                break;
            }
        }
    }
    board[r][c] = currPlayer;
    let tile = document.getElementById(r+'-'+c);
    if (currPlayer === redPlayer) {
        tile.classList.add("red-piece");
        currPlayer = yellowPlayer;
        info.innerText = 'Yellow is up!';
        gameWinner = 'Red';
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = redPlayer;
        info.innerText = 'Red is up!'
        gameWinner = 'Yellow';
    }
    gameOver = checkWin();
}

function checkWin() {
    if (checkHorizontal() || checkVertical() || checkDiagonal()) {
        console.log("Horizonal: " + checkHorizontal() + " Vert: " + checkVertical());
        info.innerText = gameWinner + " won!";
        return true;
    }
    return false;
}

function checkHorizontal() {
    let count = 0;
    let curr;
    for (let r = 0; r < rows; r++) {
        curr = board[r][0];
        count = 1;
        for (let c = 1; c < cols; c++) {
            if (board[r][c] === ' ') {
                count = 1;
                curr = ' ';
            }
            else if (board[r][c] === curr) {
                count++;
                if (count === 4) {
                    return true;
                }
            }
            else {
                curr = board[r][c];
                count = 1;
            }
        }
    }
    return false;
}

function checkVertical() {
    let count = 0;
    let curr;
    for (let c = 0; c < cols; c++) {
        curr = board[0][c];
        count = 1;
        for (let r = 1; r < rows; r++) {
            if (board[r][c] === ' ') {
                count = 1;
                curr = ' ';
            }
            else if (board[r][c] === curr) {
                count++;
                if (count === 4) {
                    return true;
                }
            }
            else {
                curr = board[r][c];
                count = 1;
            }
        }
    }
    return false;
}

function checkDiagonal() {
    if (checkDiagonalLeft() || checkDiagonalRight()) {
        console.log("left: " + checkDiagonalLeft() + " right: " + checkDiagonalRight());
        return true;
    }
    return false;
}

function checkDiagonalRight() {
    let count = 0;
    let curr;
    let rCopy;

    //start col 0
    for (let r = 3; r < rows; r++) {
        rCopy = r-1;
        let c = 1;
        curr = board[r][0];
        count = 1;
        //console.log(r);
        while (rCopy >= 0) {
            //console.log(rCopy + "-" + c + " " + count);
            if (board[rCopy][c] === ' ') {
                rCopy--;
                c++;
                count = 1;
                curr = ' ';
            }
            else if (board[rCopy][c] === curr) {
                count++;
                //console.log("In curr: " + rCopy + "-" + c + " " + count);
                if (count === 4) {
                    return true;
                }
                rCopy--;
                c++;
            }
            else {
                curr = board[rCopy][c];
                count = 1;
                rCopy--;
                c++;
            }
        }
        //console.log(count);
    }

    //start row 5
    let cCopy;
    for (let c = 1; c < 4; c++) {
        cCopy = c+1;
        let r = 4;
        curr = board[5][c];
        count = 1;
        while (cCopy <= 6) {
            if (board[r][cCopy] === ' ') {
                r--;
                cCopy++;
                count = 1;
                curr = ' ';
            }
            else if (board[r][cCopy] === curr) {
                count++;
                if (count === 4) {
                    return true;
                }
                r--;
                cCopy++;
            }
            else {
                curr = board[r][cCopy];
                count = 1;
                r--;
                cCopy++;
            }
        }
    }

    return false;
}

function checkDiagonalLeft() {
    let count = 0;
    let curr;
    let rCopy;

    //start col 0
    for (let r = 0; r < 3; r++) {
        rCopy = r+1;
        let c = 1;
        curr = board[r][0];
        count = 1;
        //console.log(r);
        while (rCopy <= 5) {
            //console.log(rCopy + "-" + c + " " + count);
            if (board[rCopy][c] === ' ') {
                rCopy++;
                c++;
                count = 1;
                curr = ' ';
            }
            else if (board[rCopy][c] === curr) {
                count++;
                //console.log("In curr: " + rCopy + "-" + c + " " + count);
                if (count === 4) {
                    return true;
                }
                rCopy++;
                c++;
            }
            else {
                curr = board[rCopy][c];
                count = 1;
                rCopy++;
                c++;
            }
        }
        //console.log(count);
    }

    //start row 5
    let cCopy;
    for (let c = 1; c < 4; c++) {
        cCopy = c+1;
        let r = 1;
        curr = board[0][c];
        count = 1;
        while (cCopy <= 6) {
            if (board[r][cCopy] === ' ') {
                r++;
                cCopy++;
                count = 1;
                curr = ' ';
            }
            else if (board[r][cCopy] === curr) {
                count++;
                if (count === 4) {
                    return true;
                }
                r++;
                cCopy++;
            }
            else {
                curr = board[r][cCopy];
                count = 1;
                r++;
                cCopy++;
            }
        }
    }

    return false;
}