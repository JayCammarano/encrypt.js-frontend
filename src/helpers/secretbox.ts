import { decode as decodeBase64, encode as encodeBase64 } from '@stablelib/base64';
import { decode as decodeUTF8, encode as encodeUTF8 } from '@stablelib/utf8';
import { randomBytes } from 'crypto';
import { secretbox, secretbox_open } from 'tweetnacl-ts';
import ISecretBox from "./secretBoxInterface";

class SecretBox implements ISecretBox {
  nonceLength: number
  privateKey: Uint8Array

  constructor(privateKey: string, nonceLength: number = 24) {
    this.nonceLength = nonceLength
    this.privateKey = decodeBase64(privateKey);
  }
  
  #eventToUint8 = (event: object, nonce: Buffer) => {
    const eventString = encodeUTF8(JSON.stringify(event));
  
    return secretbox(eventString, nonce, this.privateKey);
  }

  
  encrypt = (event: Object) => {
    const nonce = randomBytes(this.nonceLength);
    const eventUintArray8 = this.#eventToUint8(event, nonce)

    const fullMessage = new Uint8Array(this.nonceLength + eventUintArray8.length);
    fullMessage.set(nonce);
    fullMessage.set(eventUintArray8, this.nonceLength);
  
    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
  };

  decrypt = (eventWithNonce: string) => {;
    const decodedEventWNonce: Uint8Array = decodeBase64(eventWithNonce);
    const nonce: Uint8Array = decodedEventWNonce.slice(0, this.nonceLength);
    const event: Uint8Array = decodedEventWNonce.slice(this.nonceLength, eventWithNonce.length);
    
    const decrypted = secretbox_open(event, nonce, this.privateKey);
  
    if (!decrypted) {
      throw new Error('Could not decrypt message');
    }
  
    const base64DecryptedMessage = decodeUTF8(decrypted);
    return JSON.parse(base64DecryptedMessage);
  };
}

export default SecretBox