import { getClient } from '../services/getClient';
import * as util from 'util';
//const provider = 'https://rpc.casperholders.com/rpc';
const provider = 'https://rpc.testnet.casperholders.com/rpc';
const client = getClient(provider);
const STREAMING_INTERVAL = 1000;

// @ts-ignore
const streamBlocks = async (interval) => {
  console.log('==================================================');
  console.log('Streaming blocks');
  console.log('==================================================');
  let height: number | undefined;

  while(true) {
    const result = await client.getLatestBlockInfo();

    if(!!result && !!result.block) {
      const heightForBlock = result.block.header.height;

      if(heightForBlock) {
        if(!height || heightForBlock > height) {
          height = heightForBlock;

          console.log('==================================================');
          console.log('Block number: ' + height);
          console.log('==================================================');

          const blockToPrint = {
            hash: result.block.hash,
            header: result.block.header,
            // @ts-ignore
            body: result.block.body,
          }

          console.log(util.inspect(blockToPrint, false, null, true));
        }
      }
    }

    await new Promise((resolve, reject) => { setTimeout(resolve, interval); });
  }
}


(async () => {
  await streamBlocks(STREAMING_INTERVAL);
})()
  .catch((err) => {
    console.log(err);
  });
