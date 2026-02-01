import { Image, Text, View } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const PokedexInfo = () => {
  return (
    <ScrollView className='px-5'>
      {/* App info */}
      <LinearGradient
      colors={["#FA2C3D", "#F63396"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }} className='mt-5 items-center p-7 rounded-xl overflow-hidden gap-4'>
        <Image source={require('../assets/images/poke-icon.png')} className='w-28 h-28'/>
        <View className='items-center gap-3'>
          <Text className='text-2xl text-white font-bold'>Pokédex App</Text>
          <Text className='text-white'>Your ultimate Pokemon companion</Text>
        </View>
      </LinearGradient>
      {/* About info */}
      <View className='border border-gray-300 p-4 flex-row mt-5 gap-4 rounded-xl overflow-hidden items-start justify-center'>
        <Feather name="book-open" size={24} color="#155DFC" className='bg-[#DBEAFE] p-2 rounded-full' />
        <View className='gap-3'>
          <Text className='text-xl font-bold'>About This App</Text>
          <Text className='w-72 text-lg'>This Pokedex app provides comprehensive information about Pokemon from all generations. Browse, search, and learn about your favorite Pokemon with detailed stats, evolutions, and moves.</Text>
        </View>
      </View>
      {/* Features info */}
      <View className='border border-gray-300 p-4 flex-row mt-5 gap-4 rounded-xl overflow-hidden items-start justify-center'>
        <Feather name="info" size={24} color="#00A63E" className='bg-[#DBFCE7] p-2 rounded-full' />
        <View className='gap-3'>
          <Text className='text-xl font-bold'>Features</Text>
          <View className='gap-1'>
            <Text className='w-72 text-lg'>• Search and filter Pokemon</Text>
            <Text className='w-72 text-lg'>• View detailed stats and abilities</Text>
            <Text className='w-72 text-lg'>• Explore evolution chains</Text>
            <Text className='w-72 text-lg'>• Browse moves and attacks</Text>
            <Text className='w-72 text-lg'>• Save favorite Pokemon</Text>
            <Text className='w-72 text-lg'>• Explore by region</Text>
          </View>
        </View>
      </View>
      {/* Data Source info */}
      <View className='border border-gray-300 p-4 flex-row mt-5 gap-4 rounded-xl overflow-hidden items-start justify-center'>
        <Feather name="code" size={24} color="#9810FA" className='bg-[#F3E8FF] p-2 rounded-full' />
        <View className='gap-3'>
          <Text className='text-xl font-bold'>Data Source</Text>
          <Text className='w-72 text-lg'>All Pokemon data is sourced from the PokeAPI, a comprehensive RESTful API for Pokemon information.</Text>
        </View>
      </View>
      {/* Made info */}
      <View className='bg-[#FEF2F5] border border-gray-300 p-4 flex-row my-5 gap-4 rounded-xl overflow-hidden items-start justify-center'>
        <Feather name="heart" size={24} color="#E7000B" className='bg-[#FFE2E2] p-2 rounded-full' />
        <View className='gap-3'>
          <Text className='text-xl font-bold'>Made for Fans</Text>
          <Text className='w-72 text-lg'>Created with love for Pokemon trainers around the world. Gotta catch 'em all!</Text>
        </View>
      </View>
      <View className='justify-center items-center gap-4 my-8'>
        <Text className='text-gray-500'>Version 1.0.0</Text>
        <Text className='text-gray-500'>© {new Date().getFullYear()} Pokedex App</Text>
        <Text className='text-gray-500'>© Developed by Faisal Rahman</Text>
      </View>
    </ScrollView>
  )
}

export default PokedexInfo
