import styles from './BlockCard.module.css';

const BlockCard = ({ block, onBlockCardClick }) => {
  return (
    <div className={styles.blockCard} onClick={() => onBlockCardClick(block)}>
      <div className={styles.blockNumber}>Block #: {block.number}</div>
      <div className={styles.hash}>{block.hash}</div>
    </div>
  );
};

export default BlockCard;
