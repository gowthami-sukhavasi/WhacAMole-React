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
  const [hideMole1, setHideMole1] = useState(false);
  const [hideMole2, setHideMole2] = useState(false);

  const randomIndex = () => {
    const randomX = Math.floor(Math.random() * rows);
    const randomY = Math.floor(Math.random() * columns);
    return { x: randomX, y: randomY };
  };

  const changeMoleIndex = () => {
    if (gameStatus) {
      const newMolePosition1 = randomIndex();
      let newMolePosition2;
      do {
        newMolePosition2 = randomIndex();
      } while (
        newMolePosition2.x === newMolePosition1.x &&
        newMolePosition2.y === newMolePosition1.y
      );
      setMolePosition1(newMolePosition1);
      setMolePosition2(newMolePosition2);
      setHideMole1(false);
      setHideMole2(false);
    }
  };

  useEffect(() => {
    const moleTimer = setInterval(() => {
      changeMoleIndex();
    }, 1500);

    return () => clearInterval(moleTimer);
  }, [gameStatus]);

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

  const updateScore = (moleIndex) => {
    setScore((prev) => prev + 1);
    if (moleIndex === 1) {
      setHideMole1(true);
    } else {
      setHideMole2(true);
    }
  };

  const displayMole = (index1, index2, moleIndex) => {
    const molePosition = moleIndex === 1 ? molePosition1 : molePosition2;
    const hideMole = moleIndex === 1 ? hideMole1 : hideMole2;
    return (
      gameStatus &&
      molePosition?.x === index1 &&
      molePosition?.y === index2 && (
        <div className="mole-hill">
          <img
            onClick={() => updateScore(moleIndex)}
            className={`mole-head ${hideMole ? "disappear" : "appear"}`}
            src={moleHead}
            alt="mole"
          />
        </div>
      )
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
                      {displayMole(posX, posY, 1)}
                      {displayMole(posX, posY, 2)}
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
