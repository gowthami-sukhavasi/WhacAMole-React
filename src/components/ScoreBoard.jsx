import PropTypes from "prop-types";

export default function ScoreBoard({
  score,
  gameStatus,
  handleStart,
  timeLeft,
}) {
  return (
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
  );
}

ScoreBoard.propTypes = {
  score: PropTypes.number,
  gameStatus: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
};
