import { PinataSDK } from 'pinata-web3';
import config from '../config';

const pinata = new PinataSDK({
  pinataJwt: config.pinata_jwt,
  pinataGateway: config.pinata_gateway_url,
});

const uploadEventURI = async (eventName: string) => {
  try {
    // const blob = new Blob([fs.readFileSync('./hello-world.txt')]);
    // const file = new File([blob], 'hello-world.txt', { type: 'text/plain' });
    const group = await pinata.groups.create({
      name: eventName,
    });
    return group;
  } catch (error) {
    console.log(error);
  }
};

// async function upload() {
//   try {
//     const blob = new Blob([fs.readFileSync('./hello-world.txt')]);
//     const file = new File([blob], 'hello-world.txt', { type: 'text/plain' });
//     const upload = await pinata.upload.file(file);
//     console.log(upload);
//   } catch (error) {
//     console.log(error);
//   }
// }
