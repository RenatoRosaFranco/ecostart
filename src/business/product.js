import { firestore } from '../config/firebase';
import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getCurrentUser } from "../utils/userUtils";
import rollbar from "../config/rollbar";

export const getProducts = async () => {
    try {
        const productsRef = collection(firestore, 'products');
        const querySnapshot = await getDocs(productsRef);
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { success: true, products }
    } catch (error) {
        rollbar.error('Erro ao buscar produtos:', error);
        return { success: false, products: [], message: error.message }
    }
};

export const getProductById = async (productId) => {
    try {
        const productRef = doc(firestore, "products", productId);
        const docSnap = await getDoc(productRef);

        if (docSnap.exists()) {
            return { success: true, product: { id: docSnap.id, ...docSnap.data() } };
        } else {
            return { success: false, product: null, message: 'Produto não encontrado.' };
        }
    } catch (error) {
        rollbar.error('Erro ao buscar produto:', error);
        return { success: false, product: null, message: error.message };
    }
};

export const getProductsByUser = async (userId) => {
    try {
        const productsRef = collection(firestore, 'products');
        const q = query(productsRef, where('ownerId', '==', userId));

        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { success: true, products };
    } catch (error) {
        rollbar.error('Erro ao buscar serviços por usuário:', error);
        return { success: false, services: [], message: error.message };
    }
};

export const createProduct = async (productData) => {
    try {
        const user = await getCurrentUser();

        const productsRef = collection(firestore, 'products');
        const docRef = await addDoc(productsRef, {
            ...productData,
            createdAt: new Date(),
            ownerId: user.uid
        });

        return { success: true, productId: docRef.id };
    } catch (error) {
        rollbar.error('Erro ao criar product:', error);
        return { success: false, message: error.message };
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const productRef = doc(firestore, "products", productId);

        await updateDoc(productRef, {
            ...productData,
            updatedAt: new Date(),
        });

        return { success: true, message: 'Produto atualizado com sucesso' };
    } catch (error) {
        rollbar.error('Erro ao atualizar produto:', error);
        return { success: false, message: error.message };
    }
};

export const deleteProduct = async (productId) => {
    try {
        const productRef = doc(firestore, 'products', productId);
        await deleteDoc(productRef);

        return { success: true,  message: 'Produto removido com sucesso.' }
    } catch (error) {
        rollbar.error('Erro ao remover produto:', error);
        return { success: false, message: error.message };
    }
};