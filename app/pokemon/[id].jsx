import { View, Text, Image, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import gradientByType from '@/components/bgGradient';
import { LinearGradient } from 'expo-linear-gradient';
import About from '@/components/about';
import BaseStats from '@/components/baseStats';
import Evolution from '@/components/evolution';
import Moves from '@/components/moves';

const DetailsPage = () => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(0);
    const [abouts, setAbouts] = useState(null);
    const [stats, setStats] = useState(null);
    const [evolution, setEvolution] = useState(null);
    const [moves, setMoves] = useState(null);

    const { id } = useLocalSearchParams();

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
                ids: data.id,
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

            // STATS & MOVES
            setStats(data.stats);
            setMoves(data.moves);

            // EVOLUTION

            const evoRes = await fetch(speciesData.evolution_chain.url);
            const evoData = await evoRes.json();

            setEvolution(evoData.chain);

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
                >
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
                            <Text className='text-white font-semibold text-lg'>#{pokemon.ids}</Text>
                        </View>

                        <Image
                            source={{ uri: pokemon.image }}
                            className="w-64 h-64 mt-10 mx-auto"
                        />
                    </View>

                    <View className='rounded-t-2xl bg-white overflow-hidden'>
                        <View className='flex-row justify-evenly pt-10'>
                            <Pressable onPress={() => setView(0)}>
                                <Text className={`${view === 0 ? 'border-b-2 border-blue-500 font-bold' : ''} pb-2`}>About</Text>
                            </Pressable>
                            <Pressable onPress={() => setView(1)}>
                                <Text className={`${view === 1 ? 'border-b-2 border-blue-500 font-bold' : ''} pb-2`}>Base Stats</Text>
                            </Pressable>
                            <Pressable onPress={() => setView(2)}>
                                <Text className={`${view === 2 ? 'border-b-2 border-blue-500 font-bold' : ''} pb-2`}>Evolution</Text>
                            </Pressable>
                            <Pressable onPress={() => setView(3)}>
                                <Text className={`${view === 3 ? 'border-b-2 border-blue-500 font-bold' : ''} pb-2`}>Moves</Text>
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

export default DetailsPage