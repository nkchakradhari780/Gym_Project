import styles from './card.module.css';
import { MdSupervisedUserCircle } from 'react-icons/md';

const Card = ({ title, number }) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle />
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{number}</span>
        <span className={styles.detail}></span>
      </div>
    </div>
  );
};

export default Card;
