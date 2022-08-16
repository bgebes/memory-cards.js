import styles from './Card.module.css';
import jokerImage from '../../assets/jokerImage.png';
import { toggleCard } from '../../actions/actions';

function Card({ card }) {
  const image =
    card.status === 'closed'
      ? { size: '64px', bg: jokerImage }
      : { size: '96px', bg: card.image };

  const statusClassName =
    card.status === 'done'
      ? styles.done
      : card.status === 'temporaryDisabled'
      ? styles.temporaryDisabled
      : 'defaultCard';

  return (
    <div
      className={`${styles.cardStyle} card col-2 shadow m-2 ${statusClassName}`}
      onClick={() => toggleCard(card)}
      style={{
        backgroundImage: `url(${image.bg})`,
        backgroundSize: image.size,
      }}
    ></div>
  );
}

export default Card;
