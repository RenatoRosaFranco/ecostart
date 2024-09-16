import { auth } from "../config/firebase";

export const avatar = (width = 124, height = 124) => {
    return `https://placehold.co/${width}x${height}`
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            if (user) {
                resolve(user);
            } else {
                reject(new Error('Usuário não autenticado'));
            }
        }, error => {
            reject(error);
        });
    });
};