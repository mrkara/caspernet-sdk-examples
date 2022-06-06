import {
  CasperServiceByJsonRPC, GetStatusResult,
} from 'casper-js-sdk';

import { mainnetPeers, testnetPeers } from '../config/constants';
import * as fs from 'fs';
import * as util from 'util';
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

export const getNextMainnetPeer = (previousPeer: string): string => {
  const index = mainnetPeers.indexOf(previousPeer);
  return getMainnetPeerAt(index === mainnetPeers.length - 1 ? 0 : index + 1);
}

export const getNextTestnetPeer = (previousPeer: string): string => {
  const index = testnetPeers.indexOf(previousPeer);
  return getMainnetPeerAt(index === testnetPeers.length - 1 ? 0 : index + 1);
}

export const getMainnetPeerAtOffset = (previousPeer: string, offset: number): string => {
  const index = mainnetPeers.indexOf(previousPeer);
  return getMainnetPeerAt(
    index + offset > testnetPeers.length - 1
      ? (index + offset) - testnetPeers.length
      : index + offset
  );
}

export const getTestnetPeerAtOffset = (previousPeer: string, offset: number): string => {
  // get index of peer
  // return peer from offset index
}

export const getMainnetPeerAt = (index: number): string => {
  return mainnetPeers[index];
}

export const getTestnetPeerAt = (index: number): string => {
  return testnetPeers[index];
}

export const getRPCEndpoint = (peer: string): string => {
  return 'http://' + peer.slice(0, peer.indexOf(':'))+':7777/rpc';
}
