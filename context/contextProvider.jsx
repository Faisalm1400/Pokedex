import gradientByType from "@/components/bgGradient";
import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";

export const AppContext = createContext();



const AppContextProvider = ({ children }) => {

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState(null);

    const { colorScheme, toggleColorScheme } = useColorScheme();


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!search) {
                setSearchResult(null);
                return
            } else {
                searchPokemon(search)
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [search])

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


    const searchPokemon = async (name) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
            const data = await res.json();


            setSearchResult([
                {
                    id: data.id,
                    name: data.name,
                    image: data.sprites.other["official-artwork"].front_default,
                    types: data.types,
                },
            ]);


        } catch {
            setSearchResult(null)
        }
    }


    const dataToShow = searchResult ? searchResult : pokemons;


    function getBg(item) {
        return (
            gradientByType[item.types[0].type.name] || ["#ccc", "#999"]
        );
    }



    const contextInfo = {
        dataToShow,
        getBg,
        colorScheme,
        toggleColorScheme,
        search,
        setSearch,
    }

    return (
        <AppContext.Provider value={contextInfo}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;