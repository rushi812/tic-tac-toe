import { useEffect, useState } from "react";
import Square from "./Square";

const initialState = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [gameState, setGameState] = useState(initialState);
  const [isXChance, setIsXChance] = useState(true);
  const [winner, setWinner] = useState("");
  const [nextPlayer, setNextPlayer] = useState("");
  const [isDraw, setIsDraw] = useState(false);
  const [isSquareDisabled, setIsSquareDisabled] = useState(false);

  useEffect(() => {
    const winner = checkWinner();

    if (winner && winner !== "draw") {
      setWinner(winner);
      setIsXChance(true);
      setNextPlayer("");
      setIsSquareDisabled(true);
    } else if (winner && winner === "draw") {
      setIsDraw(true);
      setNextPlayer("");
      setIsSquareDisabled(true);
    }
  }, [gameState]);

  const onSquareClicked = (index) => {
    let strings = [...gameState];

    if (winner || gameState[index]) return;
    strings[index] = isXChance ? "X" : "O";
    setGameState(strings);
    setIsXChance(!isXChance);
    if (isXChance) {
      setNextPlayer("O");
    } else {
      setNextPlayer("X");
    }
  };

  const startNewGame = () => {
    setGameState(initialState);
    setIsXChance(true);
    setNextPlayer("");
    setIsSquareDisabled(false);
    setIsDraw(false);

    if (winner) {
      setWinner("");
    }
  };

  const checkWinner = () => {
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
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      } else if (!gameState.includes("")) {
        return "draw";
      }
    }
    return null;
  };

  return (
    <div className="app-header">
      <p className="heading-text">Tic Tac Toe - React</p>
      {winner && <h1 className="fc-aqua">Winner: {winner}</h1>}
      {nextPlayer && <h1 className="fc-aqua">Next Player: {nextPlayer}</h1>}
      {isDraw && <h1 className="fc-aqua">It's a Draw! Start again</h1>}
      <div className="board">
        {gameState.map((square, i) => (
          <Square
            key={i + 1}
            value={square}
            onClick={() => onSquareClicked(i)}
            disabled={isSquareDisabled}
          />
        ))}
      </div>

      <div>
        <button className="start-new-game-btn" onClick={startNewGame}>
          Start New Game
        </button>
        <p className="fc-aqua fw-600">RUSHIRAJ BRAHMBHATT</p>
      </div>
    </div>
  );
}

export default App;
