import PropTypes from "prop-types";
import moleHill from "./assets/moleHill.png";
import moleHead from "./assets/moleHead.png";

function Whackamole({ rows, columns }) {
  return (
    <div className="game-container">
      <div className="header">
        <button className="start-button">Start Game</button>
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
                    <img className="mole-head" src={moleHead} />
                    <img className="mole-hill" src={moleHill} />
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
};

Whackamole.deafultProps = {
  rows: 3,
  columns: 3,
};
