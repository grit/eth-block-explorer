import { useState } from 'react';
import BlockDetails from './components/BlockDetails/BlockDetails';
import TransactionDetails from './components/TransactionDetails/TransactionDetails';

import { ethers } from 'ethers';

import styles from './App.module.css';
import BlockWrapper from './components/BlockWrapper/BlockWrapper';

const goerli = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_GOERLI);

export function App() {
  const [blockInfo, setBlockInfo] = useState({});
  const [trxInfo, setTrxInfo] = useState({});

  onBlockCardClick = block => {
    setBlockInfo(block);
  };

  onTrxClick = trx => {
    setTrxInfo(trx);
  };

  return (
    <div className={styles.columns}>
      <div className={styles.column}>
        <BlockWrapper
          provider={goerli}
          networkName='Goerli'
          onBlockCardClick={onBlockCardClick}
        />
      </div>
      <div className={styles.column}>
        <BlockDetails blockInfo={blockInfo} onTrxClick={onTrxClick} />
        <TransactionDetails trxInfo={trxInfo} />
      </div>
    </div>
  );
}
