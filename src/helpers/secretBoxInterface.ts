// import { ByteArray } from "tweetnacl-ts/array";

interface ISecretBox {
    nonceLength: number
    privateKey: Uint8Array
}

export default ISecretBox