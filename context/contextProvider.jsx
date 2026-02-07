import gradientByType from "@/components/bgGradient";
import { createContext, useEffect, useRef, useState } from "react";
import { useColorScheme } from "nativewind";

export const AppContext = createContext();

const PAGE_SIZE = 30;

const AppContextProvider = ({ children }) => {

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [page, setPage] = useState(0);


    const { colorScheme, toggleColorScheme } = useColorScheme();

    const fetchingRef = useRef(false);
    const cacheRef = useRef({});


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!search.trim()) {
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
        if (fetchingRef.current) return;
        fetchingRef.current = true;
        setLoading(true);

        try {
            const offset = page * PAGE_SIZE
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${PAGE_SIZE}&offset=${offset}`)
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
            setPokemons((prev) => [...prev, ...basicPokemons]);
            setPage((prev) => prev + 1);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
            fetchingRef.current = false;
        }

    }


    const searchPokemon = async (name) => {
        const key = name.toLowerCase();

        // hit cache
        if (cacheRef.current[key]) {
            setSearchResult(cacheRef.current[key]);
            return;
        }
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`)
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
            setSearchResult([])
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
        fetchPokemon,
        loading,
    }

    return (
        <AppContext.Provider value={contextInfo}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;