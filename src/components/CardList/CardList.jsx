import React from 'react';
import { getCardsState } from '../../actions/actions';
import Card from '../Card/Card';
import styles from './CardList.module.css';

function CardList() {
  const cards = getCardsState();

  return (
    <div className="container">
      <div
        className={`${styles.cardList} row d-flex justify-content-between mt-3`}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default CardList;
