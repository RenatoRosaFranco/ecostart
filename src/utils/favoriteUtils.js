export const isItemFavorite = (favorites, itemId, itemType) => {
    return favorites.some(fav => fav.itemId === itemId && fav.itemType === itemType);
}