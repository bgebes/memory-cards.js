import React from 'react';
import { getAppState } from '../../actions/actions';
import styles from './GameStatus.module.css';

function GameStatus() {
  const { score, status, activeCards, total } = getAppState();

  return (
    <div className="sticky-top border-bottom">
      <div className={`${styles.gameStatus} container`}>
        <section>
          <span>Game Status: </span>
          <span
            className={`${status === 'Wrong Match!' ? 'text-danger' : ''} ${
              status === 'Correct Match!' ? 'text-success' : ''
            }`}
          >
            {status}
          </span>
          <span className="mx-5">Your Score: {score}</span>
          {/* {activeCards.length > 0 && (
            <>
              <span>Active Card{activeCards.length > 1 && 's'}: </span>
              <span>
                {activeCards[0].title}{' '}
                {activeCards[1] && `, ${activeCards[1].title}`}
              </span>
            </>
          )} */}
        </section>
        <section className="d-none d-lg-block">
          <span>Total Opened: {total.opened}</span>
          <span className="mx-5">Total Closed: {total.closed}</span>
          <span>Total Card: {total.all}</span>
        </section>
      </div>
    </div>
  );
}

export default GameStatus;
