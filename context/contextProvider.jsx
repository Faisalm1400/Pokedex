import gradientByType from "@/components/bgGradient";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();


const AppContextProvider = ({ children }) => {

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPokemon();
    }, [])

    async function fetchPokemon() {
        if (loading) return;
        setLoading(true);

        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=10')
            const data = await response.json();

            const basicPokemons = await Promise.all(
                data.results.map(async (p) => {
                    const detailRes = await fetch(p.url);
                    const details = await detailRes.json()

                    const pokemon = {
                        id: details.id,
                        name: details.name,
                        image: details.sprites.other["official-artwork"].front_default,
                        types: details.types,
                    }
                    return pokemon;
                })
            );
            setPokemons(basicPokemons)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }

    }


    function getBg(item) {
        return (
            gradientByType[item.types[0].type.name] || ["#ccc", "#999"]
        );
    }




    const contextInfo = {
        pokemons,
        getBg,
    }

    return (
        <AppContext.Provider value={contextInfo}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;