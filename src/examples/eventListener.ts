// @ts-ignore
import EventSource from 'eventsource';
import * as util from 'util';
//const peer = 'http://65.21.235.219:9999/events/deploys';
const peer = 'http://44.227.221.218:9999/events';

// DeployAccepted
const listenDeploys = () => {
  const events = new EventSource(peer + '/deploys');

  events.addEventListener('open', (event: MessageEvent) => {
    console.log('\n==================================================');
    console.log('Deploy event stream opened:');
    console.log('==================================================');
    console.log(event);
  });

  events.onmessage = (event: MessageEvent) => {
    // const parsedData = JSON.parse(event.data);
    console.log('\n==================================================');
    console.log('Deploy event stream message:');
    console.log('==================================================');
    console.log(event);

    console.log('\nParsed data:');
    console.log('==================================================');
    const data = JSON.parse(event.data);
    console.log(util.inspect(data, false, null, true));
    console.log('==================================================');
  };

  events.addEventListener('error', (error: MessageEvent) => {
    console.log('\n==================================================');
    console.log('Deploy event stream error:');
    console.log('==================================================');
    console.log(error);
  });
}

// FinalitySignature
const listenSigs = () => {
  const events = new EventSource(peer + '/sigs');

  events.addEventListener('open', (event: MessageEvent) => {
    console.log('\n==================================================');
    console.log('Sigs event stream opened:');
    console.log('==================================================');
    console.log(event);
  });

  events.onmessage = (event: MessageEvent) => {
    // const parsedData = JSON.parse(event.data);
    console.log('\n==================================================');
    console.log('Sigs event stream message:');
    console.log('==================================================');
    console.log(event);

    console.log('\nParsed data:');
    console.log('==================================================');
    const data = JSON.parse(event.data);
    console.log(util.inspect(data, false, null, true));
    console.log('==================================================');
  };

  events.addEventListener('error', (error: MessageEvent) => {
    console.log('\n==================================================');
    console.log('Sigs event stream error:');
    console.log('==================================================');
    console.log(error);
  });
}

// BlockAdded
// DeployProcessed
const listenMain = () => {
  const events = new EventSource(peer + '/main');

  events.addEventListener('open', (event: MessageEvent) => {
    console.log('\n==================================================');
    console.log('Main event stream opened:');
    console.log('==================================================');
    console.log(event);
  });

  events.onmessage = (event: MessageEvent) => {
    // const parsedData = JSON.parse(event.data);
    console.log('\n==================================================');
    console.log('Main event stream message:');
    console.log('==================================================');
    console.log(event);

    console.log('\nParsed data:');
    console.log('==================================================');
    const data = JSON.parse(event.data);
    console.log(util.inspect(data, false, null, true));
    console.log('==================================================');
  };

  events.addEventListener('error', (error: MessageEvent) => {
    console.log('\n==================================================');
    console.log('Main event stream error:');
    console.log('==================================================');
    console.log(error);
  });
}

(async() => {
  //listenDeploys();
  //listenSigs();
  listenMain();

})();