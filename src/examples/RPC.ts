import {
  CasperServiceByJsonRPC,
} from 'casper-js-sdk';

import * as util from 'util';

//let client = new CasperServiceByJsonRPC('https://rpc.casperholders.com/rpc');
//let client = new CasperServiceByJsonRPC('https://rpc.testnet.casperholders.com/rpc');
let client = new CasperServiceByJsonRPC('http://44.196.132.164:7777/rpc');

/*
curl -s http://rpc.casperholders.com:9999/events/deploys
 */

// @ts-ignore
const findLatestTransfer = async () => {
  console.log('==================================================');
  console.log('Finding latest transfer');
  console.log('==================================================');
  let height, transferHashes, result;

  while(true) {
    if(transferHashes && transferHashes.length > 0) {
      const deployHash = transferHashes[0];
      console.log('Fetching transfer ' + deployHash);
      const deployInfo = await client.getDeployInfo(deployHash);
      console.log('Transfer deploy');
      console.log(util.inspect(deployInfo, false, null, true));
      console.log('Tranfer block');
      console.log(util.inspect(result, false, null, true));
      return;
    } else {
      if(!!height) {
        height -= 1;
        try {
          result = await client.getBlockInfoByHeight(height);
        } catch(e) {
          console.log(e);
        }
      } else {
        try {
          result = await client.getLatestBlockInfo();
        } catch(e) {
          console.log(e);
        }
      }

      height = !!result && !!result.block ? result.block.header.height : undefined;

      transferHashes = !!result && !!result.block
        // @ts-ignore
        ? result.block.body.transfer_hashes
        : [];

      console.log('Got block height: ' + height);
      console.log('Got ' + transferHashes.length + ' deploys');
    }
  }
}

// @ts-ignore
const findEraEnd = async () => {
  console.log('==================================================');
  console.log('Finding era_end');
  console.log('==================================================');
  let eraEnd, result;
  let height: number | undefined = 759005;

  while(true) {
    if(!!height) {
      height--;

      try {
        result = await client.getBlockInfoByHeight(height);
      } catch(e) {
        console.log(e);
      }
    } else {
      try {
        result = await client.getLatestBlockInfo();
      } catch(e) {
        console.log(e);
      }
    }

    height = !!result && !!result.block ? result.block.header.height : undefined;

    eraEnd = !!result && !!result.block
      // @ts-ignore
      ? result.block.header.era_end
      : undefined;

    console.log('Got block height: ' + height);
    console.log('Got era_end: ');
    console.log(util.inspect(eraEnd, false, null, true));

    if(eraEnd) { return; }
  }
}

// @ts-ignore
const findLatestDeploy = async () => {
  console.log('==================================================');
  console.log('Finding latest deploy');
  console.log('==================================================');
  let height, deployHashes, result;

  while(true) {
    if(deployHashes && deployHashes.length > 0) {
      const deployHash = deployHashes[0];
      console.log('Fetching deploy ' + deployHash);
      const deployInfo = await client.getDeployInfo(deployHash);
      console.log(util.inspect(deployInfo, false, null, true));
      return;
    } else {
      if(!!height) {
        height -= 1;
        result = await client.getBlockInfoByHeight(height);
      } else {
        result = await client.getLatestBlockInfo();
      }

      height = !!result && !!result.block ? result.block.header.height : undefined;

      deployHashes = !!result && !!result.block
        // @ts-ignore
        ? result.block.body.deploy_hashes
        : [];

      console.log('Got block height: ' + height);
      console.log('Got ' + deployHashes.length + ' deploys');
    }
  }
}

// @ts-ignore
const getLatestBlockInfo = async () => {
  console.log('==================================================');
  console.log('Checking latest block');
  console.log('==================================================');
  let result = await client.getLatestBlockInfo();
  console.log('Latest block: ');
  console.log(util.inspect(result, false, null, true));
}

// @ts-ignore
const getBlockByHeightExample = async () => {
  console.log('==================================================');
  console.log('Checking blocks by height');
  console.log('==================================================');

  let check = async (height: number) => {
    let result = await client.getBlockInfoByHeight(height);
    console.log('Block height to check: ', height);
    console.log('Block height from header: ', result.block?.header.height);
    console.log('Header: ');
    console.log(result.block?.header);
  };

  let blocks_to_check = 3;

  for (let i = 0; i < blocks_to_check; i++) {
    console.log('==================================================');
    await check(i);
  }
}

// @ts-ignore
const getBlockByHashExample = async () => {
  console.log('==================================================');
  console.log('Checking blocks by hash');
  console.log('==================================================');

  let check = async (height: number) => {
    let block_by_height = await client.getBlockInfoByHeight(height);
    let block_hash = block_by_height.block?.hash!;
    let block = await client.getBlockInfo(block_hash);
    console.log('Block height to check: ', height);
    console.log('Block hash to check: ', block_hash);
    console.log('Block height from header: ', block_by_height.block?.header.height);
    console.log('Header: ');
    console.log(block.block?.header);
  };

  let blocks_to_check = 3;

  for (let i = 0; i < blocks_to_check; i++) {
    console.log('==================================================');
    await check(i);
  }
}

(async () => {
  //await findEraEnd();
  //await findLatestTransfer();
  //await findLatestDeploy();
  await getLatestBlockInfo();
  //await getBlockByHeightExample();
  //await getBlockByHashExample();
})()
  .catch((err) => {
    console.log(err);
  });
