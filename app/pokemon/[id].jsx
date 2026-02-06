import { View, Text, Image, ActivityIndicator, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import gradientByType from '@/components/bgGradient';
import { LinearGradient } from 'expo-linear-gradient';
import About from '@/components/about';
import BaseStats from '@/components/baseStats';
import Evolution from '@/components/evolution';
import Moves from '@/components/moves';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FavoritesContext } from '@/context/favoritesContext';

const DetailsPage = () => {

    const { toggleFavorite, isFavorite } = useContext(FavoritesContext);


    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(0);
    const [abouts, setAbouts] = useState(null);
    const [stats, setStats] = useState(null);
    const [evolution, setEvolution] = useState(null);
    const [moves, setMoves] = useState(null);
    // const [favorite, setFavorite] = useState(false);
    const router = useRouter();

    const { id } = useLocalSearchParams();

    // console.log(id)

    useEffect(() => {
        if (id) {
            fetchPokemon();
        }
    }, [id])

    async function fetchPokemon() {
        setLoading(true);
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!res.ok) throw new Error("Pokemon not found");

            const data = await res.json();

            // BASIC INFO
            setPokemon({
                id: data.id,
                name: data.name,
                image: data.sprites.other["official-artwork"].front_default,
                types: data.types,
            });


            const speciesRes = await fetch(data.species.url);
            const speciesData = await speciesRes.json();

            const specieRes = await speciesData.genera.find(g => g.language.name === "en")?.genus;
            const eggres = await speciesData.egg_groups;
            const eggs = await speciesData.hatch_counter;



            // ABOUT
            setAbouts({
                abilities: data.abilities.map(a => a.ability.name),
                height: data.height,
                weight: data.weight,
                species: specieRes,
                eggGroup: eggres.map(egg => egg.name),
                eggCycle: eggs,
            });

            // STATS 

            const statsData = {
                name: data.name,
                stats: data.stats.map(s => s),
            }
            setStats(statsData);



            // MOVES
            const pokemonMoves = await Promise.all(
                data.moves.slice(0, 20).map(async (m) => {
                    const moveRes = await fetch(m.move.url);
                    const details = await moveRes.json()

                    // console.log(details.type.name)

                    return {
                        name: m.move.name
                            .split('-')
                            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(' '),
                        damage: details.damage_class.name,
                        type: details.type.name,
                    };
                })
            );

            // console.log(pokemonMoves)

            setMoves(pokemonMoves);

            // EVOLUTION

            const parseEvolutionChain = (chain) => {
                let result = [];

                result.push(chain.species.url);

                chain.evolves_to.forEach(next => {
                    result = result.concat(parseEvolutionChain(next));
                });

                return result;
            };

            const evoRes = await fetch(speciesData.evolution_chain.url);
            const evoData = await evoRes.json();

            const evolutionList = parseEvolutionChain(evoData.chain);

            // const evolutionCollection = evolutionList.map(e => e)

            const evolution = await Promise.all(
                evolutionList.map(async (url) => {
                    // console.log(m)
                    const speciesRes = await fetch(url);
                    const speciesData = await speciesRes.json()

                    const varietiesData = await Promise.all(
                        speciesData.varieties.map(async (v) => {
                            const pokemonRes = await fetch(v.pokemon.url);
                            const pokemonData = await pokemonRes.json();

                            return {
                                id: pokemonData.id,
                                name: pokemonData.name,
                                image: pokemonData.sprites.other["official-artwork"].front_default,
                                isDefault: v.is_default,
                                url: v.pokemon.url,
                            };
                        })
                    );

                    return varietiesData;

                })
            );


            setEvolution(evolution.flat());

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // console.log(pokemon?.id)


    function getBg(pokemon) {
        return (
            gradientByType[pokemon.types[0].type.name] || ["#ccc", "#999"]
        );
    }







    // console.log(id)
    return (
        <>
            {pokemon && (
                <LinearGradient
                    colors={getBg(pokemon)}
                    className='flex-1'
                >
                    <View className="flex-row justify-between items-center p-4">
                        <Pressable onPress={() => router.back("/")}>
                            <FontAwesome name="arrow-left" size={24} color="white" />
                        </Pressable>

                        <Pressable
                            onPress={() => toggleFavorite(pokemon)}
                        >
                            <FontAwesome
                                name={isFavorite(pokemon.id) ? "heart" : "heart-o"}
                                size={24}
                                color="white"
                            />
                        </Pressable>
                    </View>
                    <View className='p-4'>
                        <View className='flex-row items-center justify-between'>
                            <View className='gap-2'>
                                <Text className="capitalize text-2xl font-bold mt-2 text-white">{pokemon.name}</Text>
                                <View className='flex-row gap-2'>
                                    {pokemon.types.map((t, i) => (
                                        <Text
                                            key={i}
                                            className=" text-white text-xs bg-white/30 rounded-full px-5 py-1 mt-1 text-center capitalize"
                                        >
                                            {t.type.name}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                            <Text className='text-white font-semibold text-lg'>#{pokemon.id}</Text>
                        </View>

                        <Image
                            source={{ uri: pokemon.image }}
                            className="w-64 h-64 mt-10 mx-auto"
                        />
                    </View>

                    <View className='flex-1 rounded-t-2xl bg-white overflow-hidden dark:bg-neutral-900'>
                        <View className='flex-row justify-evenly pt-10'>
                            <Pressable onPress={() => setView(0)}>
                                <Text className={`${view === 0 ? 'border-b-2 border-blue-500 font-bold' : ''}dark:text-white pb-2`}>About</Text>
                            </Pressable>
                            <Pressable onPress={() => setView(1)}>
                                <Text className={`${view === 1 ? 'border-b-2 border-blue-500 font-bold' : ''}dark:text-white pb-2`}>Base Stats</Text>
                            </Pressable>
                            <Pressable onPress={() => setView(2)}>
                                <Text className={`${view === 2 ? 'border-b-2 border-blue-500 font-bold' : ''}dark:text-white pb-2`}>Evolution</Text>
                            </Pressable>
                            <Pressable onPress={() => setView(3)}>
                                <Text className={`${view === 3 ? 'border-b-2 border-blue-500 font-bold' : ''}dark:text-white pb-2`}>Moves</Text>
                            </Pressable>
                        </View>



                        {view === 0 && <About data={abouts} />}
                        {view === 1 && <BaseStats data={stats} />}
                        {view === 2 && <Evolution data={evolution} />}
                        {view === 3 && <Moves data={moves} />}

                    </View>
                </LinearGradient>
            )}
        </>
    )
}



export default DetailsPage;