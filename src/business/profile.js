import {doc, getDoc, setDoc, updateDoc} from 'firebase/firestore';
import { firestore } from '../config/firebase';
import rollbar from "../config/rollbar";

export const getProfile = async (userId) => {
    try {
        const profileRef = doc(firestore, 'profiles', userId);
        const profileDoc = await getDoc(profileRef);

        if (profileDoc.exists()) {
            return { success: true, data: profileDoc.data() };
        } else {
            return { success: false, message: 'Perfil não encontrado.' };
        }
    } catch (error) {
        rollbar.error('Erro ao buscar perfil:', error);
        return { success: false, message: 'Erro ao buscar perfil.' };
    }
};

export const createProfile = async (userId, profileData) => {
    try {
        const profileRef = doc(firestore, 'profiles', userId);

        console.log(profileData);

        await setDoc(profileRef, {
            name: profileData.name,
            phone_number: profileData.phone_number,
            document_number: profileData.document_number,
            account_type: profileData.account_type,
            ownerId: userId,
            createdAt: new Date()
        });

        return { success: true, message: 'Perfil criado com sucesso.' }
    } catch (error) {
        rollbar.error('Erro ao criar o perfil:', error);
        return { success: false, message: 'Erro ao criar o perfil' };
    }
};

export const updateProfile = async (userId, profileData) => {
    try {
        const profileRef = doc(firestore, 'profiles', userId);

        console.log(profileRef);

        await updateDoc(profileRef, { name: profileData.name });

        return { success: true, message: 'Perfil atualizado com sucesso!' };
    } catch (error) {
        rollbar.error('Erro ao atualizar o perfil:', error);
        return { success: true, message: 'Erro ao atualizar o perfil.' };
    }
};