import { firestore } from "../config/firebase";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import rollbar from "../config/rollbar";

export const getFavorites = async (userId) => {
    try {
        const favoritesRef = doc(firestore, 'favorites', userId);
        const docSnap = await getDoc(favoritesRef);

        if (docSnap.exists()) {
            return { success: true, favorites: docSnap.data().favorites || [] }
        } else {
            return { success: true,  favorites: [] };
        }

    } catch (error) {
        rollbar.error('Erro ao buscar favoritos:', error);
        return { success: false, favorites: [], message: error.message };
    }
}

export const addFavorite = async (userId, favorite) => {
    try {
        const favoritesRef = doc(firestore, "favorites", userId);
        const docSnap = await getDoc(favoritesRef);

        if (docSnap.exists()) {
            const existingFavorites = docSnap.data().favorites || [];
            await setDoc(favoritesRef, {
                favorites: [...existingFavorites, favorite]
            }, { merge: true });
        } else {
            await setDoc(favoritesRef, {
                favorites: [favorite]
            });
        }

        return {success: true, message: 'Favorito adicionado com sucesso.'}
    } catch (error) {
        rollbar.error('Erro ao adicionar favorito:', error);
        return {success: false, message: error.message}
    }
}

export const removeFavorite = async (userId, itemId, itemType) => {
    try {
        const favoritesRef = doc(firestore, 'favorites', userId);
        const docSnap = await getDoc(favoritesRef);

        if (docSnap.exists()) {
            let favorites = docSnap.data().favorites || [];
            favorites = favorites.filter(fav => fav.itemId !== itemId || fav.itemType !== itemType);

            await updateDoc(favoritesRef, { favorites });

            return { success: true, message: 'Favorito removido com sucesso.' };
        } else {
            return { success: false,  message: 'Nenhum favorito encontrado para o usuário.' };
        }

    } catch (error) {
        rollbar.error('Erro ao remover favorito:', error);
        return { success: false, message: error.message };
    }
}