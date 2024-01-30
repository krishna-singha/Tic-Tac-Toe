import React, { useState } from 'react';
import './App.css';
import Block from './components/Blocks/Block';
import Button from './components/Button/Button';


// App component
function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");

  // Check winner function
  const checkWinner = (state: any[]) => {
    const win = [
      [0, 1, 2], // Horizontal
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Vertical
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonal
      [2, 4, 6]
    ];
    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return true;
      }
    }
    return false;
  }

  // Change button function
  const changeButton = () => {
    const button = document.getElementById('button');
    if (button) {
      button.innerHTML = 'Play Again';
    }
  }

  // Handle click function
  const handleClick = (index: number) => {
    const stateCopy = Array.from(state);

    if (stateCopy[index] !== null || checkWinner(stateCopy)) return;

    stateCopy[index] = currentTurn;

    // Check if the game is over or draw
    const win = checkWinner(stateCopy);
    if (win) {
      const winner = document.getElementById('turn');
      if (winner) {
        winner.innerHTML = `Player ${currentTurn} has won!`;
      }
      changeButton();
    }
    else {
      const isFull = !stateCopy.includes(null);
      if (isFull) {
        const winner = document.getElementById('turn');
        if (winner) {
          winner.innerHTML = `Nobody has won. It's a draw!`;
        }
        changeButton();
      }
    }

    // Set state
    setCurrentTurn(currentTurn === "X" ? "O" : "X");
    setState(stateCopy);
  };

  return (
    <div id="container">
      <div className="heading">TIC TAC TOE</div>
      <div id="content">
        <div id="turn">Player {currentTurn} 's turn</div>
        <div id='board'>
          <div className="row row-1">
            <Block onClick={() => handleClick(0)} value={state[0]} />
            <Block onClick={() => handleClick(1)} value={state[1]} />
            <Block onClick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className="row row-2">
            <Block onClick={() => handleClick(3)} value={state[3]} />
            <Block onClick={() => handleClick(4)} value={state[4]} />
            <Block onClick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className="row row-3">
            <Block onClick={() => handleClick(6)} value={state[6]} />
            <Block onClick={() => handleClick(7)} value={state[7]} />
            <Block onClick={() => handleClick(8)} value={state[8]} />
          </div>
        </div>
        <div id="developer">
          <p>Developed by Krishna Singha</p>
        </div>
        <Button />
      </div>
    </div>
  );
}

export default App;