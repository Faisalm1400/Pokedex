import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import gradientByType from '@/components/bgGradient';
import { LinearGradient } from 'expo-linear-gradient';

const DetailsPage = () => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(false);

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

            if (!res.ok) {
                throw new Error("Pokemon not found");
            }

            const data = await res.json();

            const pokemonDetails = {
                ids: data.id,
                name: data.name,
                image: data.sprites.other["official-artwork"].front_default,
                types: data.types,
            }

            setPokemon(pokemonDetails);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
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
                            <Text className='font-semibold'>About</Text>
                            <Text className='font-semibold'>Base Stats</Text>
                            <Text className='font-semibold'>Evolution</Text>
                            <Text className='font-semibold'>Moves</Text>
                        </View>


                    </View>
                </LinearGradient>
            )}
        </>
    )
}

export default DetailsPage