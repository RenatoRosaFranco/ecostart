import { firestore } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import rollbar from '../config/rollbar';

export const getSelfEmployedsProfiles = async () => {
    try {
        const profilesRef = collection(firestore, 'profiles');
        const q = query(profilesRef, where('account_type', '==', 'self_employed'));
        const querySnapshot = await getDocs(q);

        const selfEmployeds = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { success: true, selfEmployeds }
    } catch (error) {
        rollbar.error('Erro ao buscar perfis de prestadores de serviços:', error);
        return { success: false, companies: [], message: error.message };
    }
}