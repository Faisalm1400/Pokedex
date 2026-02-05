import { createContext, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (pokemon) => {
        setFavorites((prev) => {
            const exists = prev.find(p => p.id === pokemon.id);

            if (exists) {
                return prev.filter(p => p.id !== pokemon.id);
            }
            return [...prev, pokemon];
        });
    };

    const isFavorite = (id) => {
        return favorites.some(p => p.id === id);
    };



    const info = {
        favorites,
        toggleFavorite,
        isFavorite
    }


    return (
        <FavoritesContext.Provider value={info}>
            {children}
        </FavoritesContext.Provider>
    )
}

export default FavoritesContextProvider;