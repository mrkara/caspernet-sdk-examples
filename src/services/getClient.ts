import { CasperServiceByJsonRPC } from 'casper-js-sdk';

export const getClient = (url: string) => {
  return new CasperServiceByJsonRPC(url);
}
