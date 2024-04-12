import { rand } from "./random.js";

export function makeRandStr(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(rand() * charset.length);
        result += charset[randomIndex];
    }
    return result;
}