import { useContext } from "react";
import { Text, TextInput, View, FlatList, Image, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { AppContext } from "@/context/contextProvider";





export default function Index() {

  const { dataToShow, getBg, colorScheme,search,setSearch } = useContext(AppContext);



  return (
    <View className="flex-1 p-2 dark:bg-neutral-900">
      <StatusBar barStyle={colorScheme == 'dark' ? 'light' : 'dark'} />
      <Text className="text-2xl font-bold mb-2 dark:text-white">Pokédex</Text>
      <TextInput 
      value={search}
      onChangeText={setSearch}
      className="border border-gray-400 rounded-xl p-3 mb-2" 
      placeholderTextColor={colorScheme == 'dark' ? "white" : "black"} 
      placeholder="Search Pokémon" />

      <FlatList
        data={dataToShow}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View className="w-1/2 p-1">
            <Link href={{
              pathname: '/pokemon/[id]',
              params: { id: item.id }
            }}>
              <LinearGradient
                colors={getBg(item)}
                className="rounded-xl overflow-hidden p-4 flex-row items-center"
              >
                <View className="">
                  <Text className="text-white font-bold">
                    #{item.id}
                  </Text>
                  <Text className="capitalize text-white text-lg font-bold">
                    {item.name}
                  </Text>

                  {item.types.map((t, i) => (
                    <Text
                      key={i}
                      className="text-white text-xs bg-white/30 rounded-full px-2 py-1 mt-1 text-center capitalize"
                    >
                      {t.type.name}
                    </Text>
                  ))}
                </View>
                <View className="h-28 w-28 items-center justify-center">
                  <Image source={{ uri: item.image }}
                    className="w-20 h-20"
                    resizeMode="contain" />
                </View>
              </LinearGradient>
            </Link>
          </View>
        )}
      />

    </View>
  );
}
