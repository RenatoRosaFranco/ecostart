import { auth } from "../config/firebase";

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