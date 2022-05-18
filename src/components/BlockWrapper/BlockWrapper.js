import { useEffect, useState, useRef } from 'react';
import BlockCard from '../BlockCard/BlockCard';
import styles from './BlockWrapper.module.css';

const BlockWrapper = ({ provider, networkName, onBlockCardClick }) => {
  const [blocks, setBlocks] = useState([]);
  const [latestBlockNumber, setLatestBlockNumber] = useState(0);

  useEffect(() => {
    const fetchBlocks = async () => {
      let latestBlock = await provider.getBlock('latest');
      setLatestBlockNumber(latestBlock.number);
      let nextTenBlocks = [];
      for (let i = -1; i >= -9; i--) {
        let block = await provider.getBlock(i);
        nextTenBlocks.push(block);
      }
      setBlocks([latestBlock, ...nextTenBlocks]);
      provider.on('block', (blockNumber) => {
        setLatestBlockNumber(blockNumber);
      });
    };
    fetchBlocks().catch(console.error);
  }, []);

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const fetchNewBlock = async () => {
      let newBlock = await provider.getBlock(latestBlockNumber);
      let sliced = [...blocks].slice(0, -1);
      let newBlocks = [newBlock, ...sliced];
      setBlocks(newBlocks);
    };
    fetchNewBlock().catch(console.error);
  }, [latestBlockNumber]);

  return (
    <div>
      <div className={styles.networkHeader}>
        {blocks.length === 10
          ? `Connected to network: ${networkName}`
          : `Connecting to network...`}
      </div>
      <div className={styles.blockWrapper}>
        {blocks.length === 10 ? (
          blocks.map((block) => (
            <div key={block.number}>
              <BlockCard
                block={block}
                latest={block.number === latestBlockNumber}
                onBlockCardClick={onBlockCardClick}
              />
            </div>
          ))
        ) : (
          <div>Loading 10 latest blocks...</div>
        )}
      </div>
    </div>
  );
};

export default BlockWrapper;
