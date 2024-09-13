import { auth } from '../config/firebase';

export const signIn = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        return { success: true, message: 'Login realizado com sucesso.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const signUp = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        return { success: true, message: 'Cadastro realizado com sucesso!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};