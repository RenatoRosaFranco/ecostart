import { auth, firestore } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true, message: 'Login realizado com sucesso.' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

export const signUp = async (name, email, document_number, account_type, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(firestore, 'profiles', user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            document_number: document_number,
            account_type: account_type,
            createdAt: new Date()
        });

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