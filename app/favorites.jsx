import { View, Text, FlatList, Image, Pressable, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { FavoritesContext } from '@/context/favoritesContext';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '@/context/contextProvider';
import { Link, router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);
    const { getBg } = useContext(AppContext)

    const { colorScheme } = useContext(AppContext);
    // console.log(favorites)

    return (
        <View className='p-2 dark:bg-neutral-900 h-full'>

            <View className="flex-row justify-between items-center py-3">
                <Pressable onPress={() => router.back()}>
                    <FontAwesome name="arrow-left" size={24} color={colorScheme == "dark" ? "white" : "black"} />
                </Pressable>
            </View>
            <Text className='text-xl font-bold mb-2 p-2 dark:text-white'>{favorites.length} {favorites.length > 1 ? "favorites" : "favorite"}</Text>
            <FlatList
                data={favorites}
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
};


export default Favorites