import { AES, enc } from "crypto-js";
import secureLocalStorage from "react-secure-storage";

//set up machanism of encrypt and decrypted assesstoken
const ENCRYPT_KY = import.meta.env.VITE_ENCRYPTED_KEY;

//set up encrypt with crypto-js to encrypt the accesstoken
export const encryptedToken = (encrypted) => {
  const dataEncrypted = AES.encrypt(encrypted, ENCRYPT_KY).toString();
  return dataEncrypted;
};

//store accessToken

export const storeAccessToken = (accessToken) => {
  const dataEncrypted = encryptedToken(accessToken);
  secureLocalStorage.setItem(ENCRYPT_KY, dataEncrypted);
};

//decrypted assessToken
export const decryptedAccessToken = (encryptedToken) => {
  if (encryptedToken) {
    const decryptAccessToken = AES.decrypt(encryptedToken, ENCRYPT_KY);
    return decryptAccessToken.toString(enc.Utf8);
  }
};


//getDecryptAccessToken
export const getDecryptedAccessToken = () =>{
    const encryptedToken = secureLocalStorage.getItem(ENCRYPT_KY);
    console.log("The encryptedToken: ", encryptedToken)
    if(encryptedToken)
    {
        return decryptedAccessToken(encryptedToken);
    }
    return null;
}
