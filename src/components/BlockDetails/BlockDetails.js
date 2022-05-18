import styles from './BlockDetails.module.css';

const BlockDetails = ({ blockInfo, onTrxClick }) => {
  return (
    <div className={styles.blockDetails}>
      <div className={styles.blockDetailsHeader}>Block Transactions:</div>
      <br />
      {blockInfo.transactions && blockInfo.transactions.length
        ? blockInfo.transactions.map((trx, i) => (
            <div
              key={trx + i}
              className={styles.trxInfo}
              onClick={() => {
                onTrxClick(trx);
              }}
            >
              {trx}
            </div>
          ))
        : null}
    </div>
  );
};

export default BlockDetails;
