class TicTacToeGame {

    constructor(targetDiv, size) {
        this.targetDiv = targetDiv
        this.size = size
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
        this.playerTurn = "X"
        this.gameArea = null
        this.moves = 0
        this.createGameArea()
    }

    addClickListenerToGameArea() {
        this.gameArea.addEventListener('click', (event) => {
            let t = event.target
            let x = t.dataset.x
            let y = t.dataset.y
            console.log(x, y)
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
        let storeVal = this.playerTurn == "X" ? 1 : -1;
        this.playerTurn = this.playerTurn == "X" ? "O" : "X";
        return storeVal
    }

    createGameArea() {
        let gameArea = document.createElement("div")
        gameArea.classList.add("TTTArea")
        this.targetDiv.append(gameArea)
        this.gameArea = gameArea
        this.drawBoard()
        this.addClickListenerToGameArea()
    }

    drawBoard() {

        this.gameArea.innerHTML = ""
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
        console.log(this)
        //Clears the DOM
        this.gameArea.remove()
        for(var key in this){
        	delete this[key]
        }
        console.log(this)
    }

}