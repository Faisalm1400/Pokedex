import { View, Text, FlatList, Image } from 'react-native'
import React, { useContext } from 'react'
import { FavoritesContext } from '@/context/favoritesContext';
import { LinearGradient } from 'expo-linear-gradient';
import { AppContext } from '@/context/contextProvider';
import { Link } from 'expo-router';

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);
    const { getBg } = useContext(AppContext)
    // console.log(favorites)

    return (
        <View className='p-2'>
            <Text className='text-xl font-bold mb-2'>{favorites.length} {favorites.length > 1 ? "favorites" : "favorite"}</Text>
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