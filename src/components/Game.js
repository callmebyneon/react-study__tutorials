import React from 'react';
import './Game.css';

import SortIcon from '@mui/icons-material/Sort';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';


function Square(props) {
  return (
    <button 
      className={props.isLast 
        ? (props.isWon ? 'square last win': 'square last') 
        : (props.isWon ? 'square win': 'square')} 
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        isLast={this.props.lastIndex === i ? true : false}
        isWon={this.props.winLines && (this.props.winLines.includes(i) ? true : false)}
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8],
    ];
    return (
      <>
      {
        rows.map(x => 
          <div className="board-row">
            {x.map(y => this.renderSquare(y))}
          </div>
        )
      }
      </>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastIndex: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      isAsc: true,
    }
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const { winner } = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const lastIndex = squares.findIndex((elm, idx) => elm !== current.squares[idx]); //find last changed button's index

    this.setState({
      history: history.concat([{
        squares: squares,
        lastIndex: lastIndex,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  resetGame() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
        lastIndex: null,
      }],
      stepNumber: 0,
      xIsNext: true,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { winner, lines } = calculateWinner(current.squares);
    
    let status = null;
    if (winner) {
      status = `Winner is '${winner}'!`;
    } else {
      if (history.length === 10) {
        status = `Draw game.`;
      } else {
        status = `Next player: '${this.state.xIsNext ? 'X' : 'O'}'`;
      }
    }

    return (
      <React.Fragment>
        <div className="game">
          <Paper className="game-board" elevation={3} sx={{ padding: 2, bgcolor: 'primary.light' }}>
            <Board 
              winLines={lines ? lines : undefined}
              lastIndex={current.lastIndex}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </Paper>
          <div className="game-info">
            <div className={(winner || history.length === 10) ? 'end' : undefined}>{status}</div>
            <Stack direction="row" spacing={2}>
              <Tooltip title="Click to New Game" placement="left">
                <Button variant="outlined" color="secondary" onClick={() => this.resetGame()}>
                  <RestartAltIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Click to Change history's order" placement="right">
                <Button variant="outlined" color="primary" onClick={() => this.setState({ isAsc: !this.state.isAsc })}>
                  <SortIcon />
                </Button>
              </Tooltip>
            </Stack>
            <ol className={this.state.isAsc ? 'asc' : 'desc'}>
              {this.state.isAsc 
                ? history.map((step, move) => {
                  const log = move ? `Go to move #${move}` : `Go to game start`;
                  return (
                    <li key={move}>
                      <Button variant="text" onClick={() => this.jumpTo(move)}>{log}</Button>
                    </li>
                  );
                })
                : Array.from(history).reverse().map((step, move) => {
                  move = Math.abs(history.length - move - 1);
                  const log = move ? `Go to move #${move}` : `Go to game start`;
                  return (
                    <li key={move}>
                      <Button variant="text" onClick={() => this.jumpTo(move)}>{log}</Button>
                    </li>
                  );
                })
              }
            </ol>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        lines: [a, b, c],
      }
    }
  }
  return {
    winner: null,
    lines: null,
  }
}

export default Game;



// ========================================

/* ------------------- *
*     Advanced try     *
* -------------------- */
// 1. ?????? ?????? ???????????? ?????? ??????(???, ???)?????? ??? ????????? ????????? ??????????????????.
// 2. ?????? ???????????? ?????? ????????? ???????????? ?????? ??????????????????. [V]
// 3. ??????????????? ?????? ??? ???????????? ????????? ??? ?????? ???????????? ??????????????? Board??? ?????? ??????????????????. [V]
// 4. ?????????????????? ?????????????????? ????????? ??????????????? ?????? ????????? ??????????????????. [V]
// 5. ????????? ???????????? ????????? ????????? ??? ??? ?????? ???????????? ??????????????????. [V]
// 6. ????????? ?????? ?????? ??????????????? ???????????? ??????????????????. [V]