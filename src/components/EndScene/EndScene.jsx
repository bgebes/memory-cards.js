import { getAppState, resetApp } from '../../actions/actions';
import styles from './EndScene.module.css';

function EndScene() {
  const { score, total } = getAppState();
  if (total.correct < 12 && score > 0) return;

  const endStatus = total.correct > 11 ? 'win!' : 'losed!';

  return (
    <div className={`${styles.endScene} win lose`}>
      <div
        className={`p-4 card ${
          endStatus === 'win!' ? 'border-success' : 'border-danger'
        }`}
      >
        <div className="text-center">You {endStatus}</div>
        <div>Would you like to play again?</div>
        <button
          className="bg-success text-light card border-0 py-1 mt-2"
          onClick={resetApp}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default EndScene;
