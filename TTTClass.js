class TicTacToeGame {

    constructor(targetDiv) {

    		//Store the area you are appending to
        this.targetDiv = targetDiv
        //Create the board data structure
        //IMPORTANT X's and O's are stored as 1 and -1. Makes it easy to determine if there is a run
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        //Start a player,count the moves
        this.playerTurn = "X"
        this.moves = 0

        //Create the element to contain the game
        let gameArea = document.createElement("div")
        gameArea.classList.add("TTTArea")
        targetDiv.append(gameArea)
        //Store that element to draw to again later
        this.gameArea = gameArea

        this.drawBoard()

        this.addClickListenerToBoard()

        this.me = this
    }

    addClickListenerToBoard() {
        this.gameArea.addEventListener('click', (event) => {
        		//Each cell in the board has an X and Y data property. Recall those to figure out which has been clicked
            let t = event.target
            let x = t.dataset.x
            let y = t.dataset.y
            console.log(x, y)
            //Make sure that area of the board model doesn't have a value
            if (this.board[x][y] == 0) {
                this.board[x][y] = this.playerMove()
                console.log(this.board)
                this.drawBoard()
                this.checkVictory()
            }
        })
    }

    checkVictory() {
        this.moves++
        var tb = this.board
        if (
            (tb[0][0] + tb[0][1] + tb[0][2]) == 3 ||
            (tb[1][0] + tb[1][1] + tb[1][2]) == 3 ||
            (tb[2][0] + tb[2][1] + tb[2][2]) == 3 ||
            (tb[0][0] + tb[1][0] + tb[2][0]) == 3 ||
            (tb[0][1] + tb[1][1] + tb[2][1]) == 3 ||
            (tb[0][2] + tb[1][2] + tb[2][2]) == 3 ||
            (tb[0][0] + tb[1][1] + tb[2][2]) == 3 ||
            (tb[0][2] + tb[1][1] + tb[2][0]) == 3
        ) {
            alert("X WINS")
            this.end()
        } else if (
            (tb[0][0] + tb[0][1] + tb[0][2]) == -3 ||
            (tb[1][0] + tb[1][1] + tb[1][2]) == -3 ||
            (tb[2][0] + tb[2][1] + tb[2][2]) == -3 ||
            (tb[0][0] + tb[1][0] + tb[2][0]) == -3 ||
            (tb[0][1] + tb[1][1] + tb[2][1]) == -3 ||
            (tb[0][2] + tb[1][2] + tb[2][2]) == -3 ||
            (tb[0][0] + tb[1][1] + tb[2][2]) == -3 ||
            (tb[0][2] + tb[1][1] + tb[2][0]) == -3
        ) {
            alert("O WINS")
            this.end()
        } else if (this.moves >= 9) {
            alert("TIE GAME")
        }

    }

    createCell(x, y, val) {
        let displayChar
        if (val == -1) {
            displayChar = "O"
        } else if (val == 1) {
            displayChar = "X"
        } else {
            displayChar = "_"
        }
        return `<div class="TTTCell" data-x="${x}" data-y="${y}">${displayChar}</div>`
    }

    playerMove() {
        let currentMove = this.playerTurn == "X" ? 1 : -1;
        this.playerTurn = this.playerTurn == "X" ? "O" : "X";
        return currentMove
    }

    drawBoard() {

    		//Clear game area
        this.gameArea.innerHTML = ""

        //This is iterating both rows and columns of the 2d array
        this.board.map((row, i) => {

            let gameRow = document.createElement("div")
            gameRow.classList.add("TTTRow")

            row.map((col, ii) => {
                gameRow.innerHTML += this.createCell(i, ii, this.board[i][ii])
            })

            this.gameArea.append(gameRow)
        })

    }

    end() {
        //Clears the DOM
        this.gameArea.remove()
        //Can't find a good way to ensure it gets garbage collected upon completion
        for(var key in this){
        	delete this[key]
        }
        console.log(this)
    }

}