import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true, message: 'Login realizado com sucesso.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const signUp = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, message: 'Cadastro realizado com sucesso!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return { success: true, message: 'Logout realizado com sucesso!' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}