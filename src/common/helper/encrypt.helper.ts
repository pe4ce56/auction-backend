import * as CryptoJS from 'crypto-js';


const encryptPass = 'sayasendiri'


export const encrypt = (text: string): string => {
    return CryptoJS.AES.encrypt(text, encryptPass).toString();
};

export const decrypt = (ciphertext: string): string => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptPass);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};