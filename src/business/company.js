import { firestore } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import rollbar from '../config/rollbar';

export const getCompanyProfiles = async () => {
    try {
        const profilesRef = collection(firestore, 'profiles');
        const q = query(profilesRef, where('account_type', '==', 'company'));
        const querySnapshot = await getDocs(q);

        const companies = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { success: true, companies }
    } catch (error) {
        rollbar.error('Erro ao buscar perfis de empresas:', error);
        return { success: false, companies: [], message: error.message };
    }
};

export const getCompanyProfile = async (companyId) => {
    try {
        const companyRef = doc(firestore, "profiles", companyId);
        const docSnap = await getDoc(companyRef);

        if (docSnap.exists()) {
            return { success: true, company: { id: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, company: null, message: 'Empresa não encontrada.' };
        }
    } catch (error) {
        rollbar.error('Erro ao buscar empresa por ID:', error);
        return { success: false, company: null, message: error.message };
    }
};