import { firestore } from '../config/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
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
};

export const getSelfEmployedProfile = async (selfEmployedId) => {
    try {
        const selfEmployedRef = doc(firestore, "profiles", selfEmployedId);
        const docSnap = await getDoc(selfEmployedRef);

        if (docSnap.exists()) {
            return { success: true, selfEmployed: { id: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, selfEmployed: null, message: 'Prestador de serviço não encontrado.' };
        }
    } catch (error) {
        rollbar.error('Erro ao buscar perfil de autônomo por ID:', error);
        return { success: false, selfEmployed: null, message: error.message };
    }
};