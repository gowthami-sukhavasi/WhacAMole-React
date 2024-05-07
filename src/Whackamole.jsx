import PropTypes from "prop-types";
import moleHill from "./assets/moleHill.png";
import moleHead from "./assets/moleHead.png";
import { useState, useEffect } from "react";
function Whackamole({ rows, columns, timer }) {
  const [molePosition1, setMolePosition1] = useState({});
  const [molePosition2, setMolePosition2] = useState({});
  const [timeLeft, setTimeLeft] = useState(timer);
  const [gameStatus, setGameStatus] = useState(false);
  const [score, setScore] = useState(null);

  const randomIndex = () => {
    const randomX = Math.floor(Math.random() * rows);
    const randomY = Math.floor(Math.random() * columns);
    return { x: randomX, y: randomY };
  };

  const changeMoleIndex = () => {
    if (gameStatus) {
      const timerID = setTimeout(() => {
        setMolePosition1(randomIndex());
        setMolePosition2(randomIndex());
      }, 1500);

      return () => clearTimeout(timerID);
    }
  };

  useEffect(() => {
    changeMoleIndex();
  }, [gameStatus, molePosition1, molePosition2]);

  const gameTimer = () => {
    if (gameStatus && timeLeft > 0) {
      const timerID = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timerID);
    } else if (timeLeft === 0) {
      setGameStatus(false);
      setMolePosition1({});
      setMolePosition2({});
    }
  };

  useEffect(() => {
    gameTimer();
  }, [gameStatus, timeLeft]);

  const handleStart = () => {
    setGameStatus((prev) => !prev);
    setScore(0);
    setTimeLeft(timer);
  };

  const updateScore = () => {
    setScore((prev) => prev + 1);
  };

  const displayMole = (index1, index2) => {
    return (
      gameStatus &&
      ((molePosition1?.x === index1 && molePosition1?.y === index2 && (
        <img onClick={updateScore} className="mole-head" src={moleHead} />
      )) ||
        (molePosition2?.x === index1 && molePosition2?.y === index2 && (
          <img onClick={updateScore} className="mole-head" src={moleHead} />
        )))
    );
  };

  return (
    <div className="game-container">
      <div className="header">
        <div className="score-board">
          {score === null ? (
            <button className="start-button" onClick={handleStart}>
              Start Game
            </button>
          ) : (
            <>
              <p>Score: {score}</p>
              {!gameStatus && (
                <button className="start-button" onClick={handleStart}>
                  Play Again
                </button>
              )}
              <p>Timer : {timeLeft}</p>
            </>
          )}
        </div>
      </div>
      <div className="grid">
        {Array(rows)
          .fill()
          .map((_ele, posX) => (
            <div className="row" key={posX}>
              {Array(columns)
                .fill()
                .map((_ele, posY) => (
                  <div className="column" key={posY}>
                    <div className="mole-head-div">
                      {displayMole(posX, posY)}
                    </div>
                    <div>
                      <img className="mole-hill" src={moleHill} />
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Whackamole;

Whackamole.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number,
  timer: PropTypes.number,
};

Whackamole.deafultProps = {
  rows: 3,
  columns: 3,
  timer: 15,
};
