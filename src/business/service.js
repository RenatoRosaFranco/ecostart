import { firestore } from "../config/firebase";

import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    limit,
} from 'firebase/firestore';

import { getCurrentUser } from "../utils/userUtils";
import rollbar from "../config/rollbar";

export const getServices = async () => {
    try {
        const servicesRef = collection(firestore, 'services');
        const querySnapshot = await getDocs(servicesRef);
        const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { success: true, services };
    } catch (error) {
        rollbar.error('Erro ao buscar serviços:', error);
        return { success: true, services: [], message: error.message }
    }
};

export const getServiceById = async (serviceId) => {
    try {
        const serviceRef = doc(firestore, "services", serviceId);
        const docSnap = await getDoc(serviceRef);

        if (docSnap.exists()) {
            return { success: true, service: { id: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, service: null, message: 'Serviço não encontrado.' }
        }
    } catch (error) {
        rollbar.error('Erro ao buscar serviços:', error);
        return { success: false, service: null, message: error.message };
    }
};

export const getServicesByUser = async (userId, page, pageSize) => {
    try {
        const servicesRef = collection(firestore, 'services');

        const q = query(
            servicesRef,
            where('ownerId', '==', userId),
            limit(pageSize)
        );

        const querySnapshot = await getDocs(q);
        const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const totalDocsRef = query(
            servicesRef,
            where('ownerId', '==', userId)
        );
        const totalDocsSnapshot = await getDocs(totalDocsRef);
        const totalDocs = totalDocsSnapshot.size;
        const totalPages = Math.ceil(totalDocs / pageSize);

        return { success: true, services, totalPages };
    } catch (error) {
        rollbar.error('Erro ao buscar serviços por usuário:', error);
        return { success: false, services: [], message: error.message };
    }
};

export const createService = async (serviceData) => {
    try {
        const user = await getCurrentUser();

        const servicesRef = collection(firestore, 'services');
        const docRef = await addDoc(servicesRef, {
            ...serviceData,
            createdAt: new Date(),
            ownerId: user.uid,
        });

        return { success: true, serviceId: docRef.id };
    } catch (error) {
        console.log(error);
        rollbar.error('Erro ao criar serviço:', error);
        return { success: false, message: error.message };
    }
};

export const updateService = async (serviceId, serviceData) => {
    const user = await getCurrentUser();

    try {
        const serviceRef = doc(firestore, "services", serviceId);
        await updateDoc(serviceRef, {
            ...serviceData,
            updatedAt: new Date(),
        });

        return { success: true, message: 'Serviço atualizado com sucesso!' };
    } catch (error) {
        rollbar.error('Erro ao atualizar serviço:', error);
        return { success: false, message: error.message };
    }
};

export const deleteService = async (serviceId) => {
    try {
        const user = await getCurrentUser();

        const serviceRef = doc(firestore, 'services', serviceId);
        await deleteDoc(serviceRef);

        return { success: true, message: 'Serviço removido com sucesso!' };
    } catch (error) {
        console.log(error);
        rollbar.error('Erro ao remover serviço:', error);
        return { success: false, message: error.message };
    }
};