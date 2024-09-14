import React, { useState, useEffect} from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../../business/favorite';
import rollbar from "../../config/rollbar";

import { toast } from "react-toastify";
import { isItemFavorite } from "../../utils/favoriteUtils";

const FavoriteButton = ({ userId, itemId, itemType }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const checkIfFavorite = async () => {
            if (!userId) return;

            try {
                setIsLoading(true);
                const response = await getFavorites(userId);

                if (response.success) {
                    setIsFavorite(isItemFavorite(response.favorites, itemId, itemType));
                } else {
                    toast.error('Erro ao verificar se o item é favorito.');
                }
            } catch (error) {
                rollbar.error('Erro ao verificar se o item é favorito:', error);
                toast.error('Erro ao verificar se o item é favorito.');
            } finally {
                 setIsLoading(false);
            }
        }

        checkIfFavorite();
    }, [userId, itemId, itemType]);

    const handleAddFavorite = async () => {
        setIsLoading(true);

        try {
            const favorite = { itemId, itemType };
            await addFavorite(userId, favorite);

            setIsFavorite(true);
            toast.success("Item favoritado.");
        } catch (error) {
            toast.error('Falha ao adicionar favorito.');
            rollbar.error('Falha ao adicionar favorito:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleRemoveFavorite = async () => {
        setIsLoading(true);

        try {
            await removeFavorite(userId, itemId, itemType);

            setIsFavorite(false);
            toast.success('Favorito removido com sucesso.');
        } catch (error) {
            toast.error('Falha ao remover favorito.');
            rollbar.error('Erro ao remover favorito:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <button
            disabled={isLoading}
            onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
        >
            {isLoading ? 'Carregando...' : isFavorite ? 'Remover Favorito' : 'Adicionar Favorito'}
        </button>
    );
};

export default FavoriteButton;