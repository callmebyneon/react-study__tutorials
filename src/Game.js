import React from 'react';
import './Game.css';

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
          <Board 
            winLines={lines ? lines : undefined}
            lastIndex={current.lastIndex}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          <div className="game-info">
            <div className={(winner || history.length === 10) ? 'end' : undefined}>{status}</div>
            <button onClick={() => this.setState({ isAsc: !this.state.isAsc })}>Change the order below</button>
            <ol className={this.state.isAsc ? 'asc' : 'desc'}>
              {this.state.isAsc 
                ? history.map((step, move) => {
                  const log = move ? `Go to move #${move}` : `Go to game start`;
                  return (
                    <li key={move}>
                      <button onClick={() => this.jumpTo(move)}>{log}</button>
                    </li>
                  );
                })
                : Array.from(history).reverse().map((step, move) => {
                  move = Math.abs(history.length - move - 1);
                  const log = move ? `Go to move #${move}` : `Go to game start`;
                  return (
                    <li key={move}>
                      <button onClick={() => this.jumpTo(move)}>{log}</button>
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
// 1. 이동 기록 목록에서 특정 형식(행, 열)으로 각 이동의 위치를 표시해주세요.
// 2. 이동 목록에서 현재 선택된 아이템을 굵게 표시해주세요. [V]
// 3. 사각형들을 만들 때 하드코딩 대신에 두 개의 반복문을 사용하도록 Board를 다시 작성해주세요. [V]
// 4. 오름차순이나 내림차순으로 이동을 정렬하도록 토글 버튼을 추가해주세요. [V]
// 5. 승자가 정해지면 승부의 원인이 된 세 개의 사각형을 강조해주세요. [V]
// 6. 승자가 없는 경우 무승부라는 메시지를 표시해주세요. [V]