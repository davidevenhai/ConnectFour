import React from 'react';
import PaintBoard from "./PaintBoard";
import Player from "./Player";
import './App.css';

class Game extends React.Component {
    state = {
        board: [],
        row: 5,
        col: 5,
        playerColors: ["", 'red', 'blue', 'black', 'green'],
        playerOne: {name: "", color: "", score: 0, text: "playerOne", token: 0},
        playerTwo: {name: "", color: "", score: 0, text: "playerTwo", token: 0},
        turn: "playerOne",
        gameStarted: false,
        playerOneToken: 0,
        playerTwoToken: 0,
    }

    createBoard = () => {
        const tempBoard = [];
        for (let i = 0; i < this.state.row; i++) {
            const tempRow = [];
            for (let j = 0; j < this.state.col; j++) {
                tempRow.push({color: "white", row: i, col: j})
            }
            tempBoard.push(tempRow);
        }
        this.setState({board: tempBoard, playerOneToken: 0, playerTwoToken: 0});
    }


    checkWinner = (board) => {
        for (let i = 0; i < this.state.row; i++) {
            for (let j = 0; j <= this.state.col - 4; j++) {
                if (board[i][j].color !== 'white' && board[i][j].color === board[i][j + 1].color && board[i][j].color === board[i][j + 2].color && board[i][j].color === board[i][j + 3].color) {
                    return board[i][j].color;
                }
            }
        }
        for (let i = 0; i <= this.state.row - 4; i++) {
            for (let j = 0; j < this.state.col; j++) {
                if (board[i][j].color !== 'white' && board[i][j].color === board[i + 1][j].color && board[i][j].color === board[i + 2][j].color && board[i][j].color === board[i + 3][j].color) {
                    return board[i][j].color;
                }
            }
        }
        for (let i = 0; i <= this.state.row - 4; i++) {
            for (let j = 0; j <= this.state.col - 4; j++) {
                if (board[i][j].color !== 'white' && board[i][j].color === board[i + 1][j + 1].color && board[i][j].color === board[i + 2][j + 2].color && board[i][j].color === board[i + 3][j + 3].color) {
                    return board[i][j].color;
                }
                if (board[i + 3][j].color !== 'white' && board[i + 3][j].color === board[i + 2][j + 1].color && board[i + 3][j].color === board[i + 1][j + 2].color && board[i + 3][j].color === board[i][j + 3].color) {
                    return board[i + 3][j].color;
                }
            }
        }
        return null;
    }
    BoardIsFull = () => {
        const currentBoard = this.state.board;
        let gameIsOver = true;
        for (let i = 0; i < this.state.col; i++) {
            if (currentBoard[0][i].color === 'white') {
                gameIsOver = false;
                break;
            }
        }
        return gameIsOver;
    }

    userClick = (col) => {
        let winner = null;
        let tempBoard = this.state.board;
        const player = this.state.turn === 'playerOne' ? this.state.playerOne : this.state.playerTwo;
        let painted = false;
        console.log("Before the for loop " + this.state.row - 1)
        for (let i = this.state.row - 1; i >= 0; i--) {
            console.log(i + " Row" + col + " Col");
            if (tempBoard[i][col].color === 'white') {
                tempBoard[i][col].color = player.color;
                painted = true;
                break;
            }
        }
        if (!painted) {
            alert("Column is full")
        } else {
            console.log(this.state.playerOneToken + "player one token")
            console.log(this.state.playerTwoToken + "player two token")
            player.text === 'playerOne' ? this.setState({playerOneToken: this.state.playerOneToken + 1}) : this.setState({playerTwoToken: this.state.playerTwoToken + 1});
            this.state.turn === "playerOne" ? this.setState({
                turn: 'playerTwo',
                playerOne: player
            }) : this.setState({turn: 'playerOne', playerTwo: player});
            this.setState({board: tempBoard}, () => {
                winner = this.checkWinner(tempBoard);
                if (winner) {
                    const winningPlayer = winner === this.state.playerOne.color ? 'playerOne' : 'playerTwo';
                    const updatedScore = this.state[winningPlayer].score + 1;
                    const winnerState=winningPlayer==='playerOne'? this.state.playerOne: this.state.playerTwo
                    winnerState.score=updatedScore;
                    winningPlayer==='playerOne'? this.setState({playerOne:winnerState}): this.setState({playerTwo:winnerState});

                    setTimeout(() => {
                        alert(`${this.state[winningPlayer].name} has won!`);
                        this.createBoard()

                    }, 200)
                } else if (this.BoardIsFull()) {
                    setTimeout(() => {
                        alert("Nobody won, game is over")
                        this.createBoard();
                    }, 200)

                }
                //update the tokens
                if (this.BoardIsFull() || winner) {
                    const playerOne = this.state.playerOne;
                    playerOne.token = this.state.playerOne.token + this.state.playerOneToken;
                    const playerTwo = this.state.playerTwo;
                    playerTwo.token = this.state.playerTwo.token + this.state.playerTwoToken;
                    this.setState({
                        playerOne: playerOne,
                        playerTwo: playerTwo
                    })
                }
            })

        }

    }
    changeColor = (event, player) => {
        const currentPlayer = (player === 'playerOne' ? this.state.playerOne : this.state.playerTwo);
        const otherPlayer = (player === 'playerOne' ? this.state.playerTwo : this.state.playerOne);
        if (event.target.value !== otherPlayer.color || otherPlayer.color === '') {
            currentPlayer.color = event.target.value;
            player === 'playerOne' ? this.setState({playerOne: currentPlayer}) : this.setState({playerTwo: currentPlayer});
        } else {
            alert("This color is taken.")
        }
    }

    changeName = (event, player, type) => {
        const userChoice = event.target.value;
        const currentPlayer = (player === 'playerOne' ? this.state.playerOne : this.state.playerTwo);
        currentPlayer[type] = userChoice;
        player === 'playerOne' ? this.setState({playerOne: currentPlayer}) : this.setState({playerTwo: currentPlayer});
    }

    setSize = (event, type) => {
        const size = event.target.value;
        if (size >= 5 && size <= 10) {
            type === 'row' ? this.setState({row: size}) : this.setState({col: size});
        } else {
            alert("Please enter a number between 5-10");
        }
    }

    startGame = () => {
        if (this.state.playerOne.name !== '' && this.state.playerTwo.name !== '' && this.state.playerOne.color !== '' && this.state.playerTwo.color !== '') {
            this.createBoard();
            this.setState({gameStarted: true}); // Set gameStarted to true
        } else {
            alert("Please enter all of the information needed.")
        }
    }


    render() {
        return (<div className={'game'}>
                <div className={'title'}></div>
                <h1 id={'mainTitle'}>Welcome to connect four game!</h1>
                {this.state.gameStarted === false ? (<div className={"try"}>
                    <Player
                        player={[this.state.playerOne, this.state.playerTwo]}
                        colorArray={this.state.playerColors}
                        changeName={this.changeName}
                        changeColor={this.changeColor}
                    />
                    <h3>Please choose column size between 5-10</h3>
                    <input type={'number'} value={this.state.col} min={5} max={10}
                           onChange={(event) => this.setSize(event, "col")}/>
                    <h3>Please choose row size between 5-10</h3>
                    <input type={'number'} value={this.state.row} min={5} max={10}
                           onChange={(event) => this.setSize(event, "row")}/>
                    <br/>
                    <button onClick={this.startGame}><b>Start the game!</b></button>
                </div>) : (<div className={"try"}>
                    <h2>{this.state.turn === 'playerOne' ? `${this.state.playerOne.name}'s turn` : `${this.state.playerTwo.name}'s turn`}</h2>
                    <PaintBoard board={this.state.board} userClick={this.userClick}/>

                    <h3 style={{color: this.state.playerOne.color}}>Player name: {this.state.playerOne.name},
                        Token: {this.state.playerOne.token},
                        Score: {this.state.playerOne.score}</h3>
                    <h3 style={{color: this.state.playerTwo.color}}>Player name: {this.state.playerTwo.name},
                        Token: {this.state.playerTwo.token},
                        Score: {this.state.playerTwo.score}</h3>
                    <button onClick={this.createBoard}><b>Reset</b></button>
                </div>)}
            </div>

        )
    }
}

export default Game;
