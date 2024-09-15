import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import rollbar from "../config/rollbar";
import {createProfile} from "../business/profile";

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true, message: 'Login realizado com sucesso.' };
    } catch (error) {
        rollbar.error('Erro ao efetuar login:', error);
        return { success: false, message: error.message };
    }
};

export const signUp = async (name, email, phone_number, document_number, account_type, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const profileData = { name, phone_number, document_number, account_type };
        const result = await createProfile(user.uid, profileData);

        if (result.success) {
            return { success: true, message: 'Cadastro realizado com sucesso!' };
        } else {
            return { success: false, message: 'Erro ao criar perfil.' };
        }
    } catch (error) {
        rollbar.error('Erro ao efetuar cadastro:', error);
        return { success: false, message: error.message };
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return { success: true, message: 'Logout realizado com sucesso!' };
    } catch (error) {
        rollbar.error('Erro ao efetuar logout:', error);
        return { success: false, message: error.message };
    }
};