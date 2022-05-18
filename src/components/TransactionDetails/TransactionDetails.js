import { useEffect, useState } from 'react';

import styles from './TransactionDetails.module.css';
import { ethers } from 'ethers';

const goerli = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_GOERLI);

const TransactionDetails = ({ trxInfo }) => {
  const [trxData, setTrxData] = useState({});
  useEffect(() => {
    if (typeof trxInfo === 'string') {
      const fetchTrx = async () => {
        let trxDetails = await goerli.getTransactionReceipt(trxInfo);
        console.log(trxDetails);
        setTrxData(trxDetails);
      };
      fetchTrx().catch(console.error);
    }
  }, [trxInfo]);

  return (
    <div className={styles.trxDetails}>
      <div className={styles.trxDetailsHeader}>Transactions receipt:</div>
      <br />
      <div className={styles.receiptDetails}>
        Confirmations: {trxData.confirmations}
      </div>
      <div className={styles.receiptDetails}>To: {trxData.to}</div>
      <div className={styles.receiptDetails}></div>
    </div>
  );
};

export default TransactionDetails;
