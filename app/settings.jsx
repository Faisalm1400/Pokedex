import { View, Text, Switch, StatusBar, Pressable } from 'react-native'
import React, { useContext } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { AppContext } from '@/context/contextProvider';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Settings = () => {

    const { colorScheme, toggleColorScheme } = useContext(AppContext);




    return (
        <View className='p-4 gap-10 dark:bg-neutral-900 h-full'>
            <StatusBar barStyle={colorScheme == 'dark' ? 'light' : 'dark'} />
            <View className="flex-row justify-between items-center">
                <Pressable onPress={() => router.back("/")}>
                    <FontAwesome name="arrow-left" size={24} color={colorScheme=='dark'?"white":"black"} />
                </Pressable>
            </View>
            <View className='bg-gray-200 p-8 rounded-2xl gap-3'>
                <View className='flex-row gap-3'>
                    <Feather name="settings" size={24} color="black" />
                    <Text className='text-xl font-semibold'>Settings</Text>
                </View>
                <Text>Customize your Pokedex experience</Text>
            </View>
            <View className='gap-3'>
                <Text className='text-xl uppercase text-gray-500 dark:text-white'>General</Text>
                <View className='border dark:border-white rounded-xl p-5'>
                    <View className='flex-row justify-between items-center'>
                        <View className='flex-row gap-3 items-center'>
                            <Feather name="moon" size={24} color="#9810FA" className='bg-[#F3E8FF] rounded-full p-4' />
                            <View>
                                <Text className='dark:text-white'>Dark Mode</Text>
                                <Text className='dark:text-white'>Change app theme</Text>
                            </View>
                        </View>
                        <Switch value={colorScheme == 'dark'} onChange={toggleColorScheme} />
                    </View>
                </View>
            </View>

            <View className='gap-3'>
                <Text className='text-xl uppercase text-gray-500 dark:text-white'>About</Text>
                <View className='border border-collapse rounded-xl overflow-hidden dark:border-white'>
                    <Text className='dark:text-white border-b dark:border-white py-5 px-3 border-collapse'>Terms of Service</Text>
                    <Text className='dark:text-white border-b dark:border-white py-5 px-3'>Privacy Policy</Text>
                    <View className='p-3'>
                        <Text className='dark:text-white'>App Version</Text>
                        <Text className='dark:text-white text-gray-500'>1.0.0</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Settings