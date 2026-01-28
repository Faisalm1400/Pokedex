import { useEffect, useState } from "react";
import { Text, TextInput, View, FlatList, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import gradientByType from "../components/bgGradient";





export default function Index() {
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
      // console.log(data.results)

      const basicPokemons = await Promise.all(
        data.results.map(async (p) => {
          const detailRes = await fetch(p.url);
          const details = await detailRes.json()

          const pokemon = {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
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


  return (
    <View className="flex-1 p-2">
      <Text className="text-2xl font-bold mb-2">Pokédex</Text>
      <TextInput className="border border-gray-400 rounded-xl p-3 mb-2" placeholder="Search Pokémon" />

      <FlatList
        data={pokemons}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View className="w-1/2 p-1">
            <LinearGradient
              colors={getBg(item)}
              className="rounded-xl overflow-hidden p-4 flex-row items-center"
            >
              <View>
                <Text className="text-white font-bold">
                  #{item.id}
                </Text>
                <Text className="capitalize text-white text-lg font-bold">
                  {item.name}
                </Text>

                {item.types.map((t, i) => (
                  <Text
                    key={i}
                    className="text-white text-xs bg-white/30 rounded-full px-2 py-1 mt-1 text-center"
                  >
                    {t.type.name}
                  </Text>
                ))}
              </View>
              <Image source={{ uri: item.image }} className="w-28 h-28" />
            </LinearGradient>
          </View>
        )}
      />

    </View>
  );
}
