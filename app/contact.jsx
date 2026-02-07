import { View, Text, Pressable, Linking, Alert } from 'react-native'
import React, { useContext } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { router } from 'expo-router'
import { AppContext } from '@/context/contextProvider'
import Feather from '@expo/vector-icons/Feather'

const Contact = () => {

  const { colorScheme } = useContext(AppContext);


  const openLink = async (url) => {
    const support = await Linking.canOpenURL(url);

    if (support) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "No application found to open the link.")
    }
  }

  return (
    <View className='p-4 gap-10 bg-white dark:bg-neutral-900 h-full'>
      <View className="flex-row justify-between items-center">
        <Pressable onPress={() => router.back("/")}>
          <FontAwesome name="arrow-left" size={24} color={colorScheme === 'dark' ? "white" : "black"} />
        </Pressable>
      </View>

      <View className='bg-[#CDE3FE] p-8 rounded-2xl gap-3'>
        <View className='flex-row gap-3 w-1/2'>
          <Feather name="mail" size={24} color="#1F64FC" />
          <Text className='text-xl font-semibold capitalize w-full'>Contact us</Text>
        </View>
        <Text>Have questions or feedback? We'd love to hear from you!</Text>
      </View>

      <View className='gap-3'>
        <Text className='text-xl uppercase text-gray-500 dark:text-white'>Reach us</Text>
        <View className='border border-collapse rounded-xl overflow-hidden dark:border-white'>
          <Pressable onPress={() => openLink("mailto:faisalm1400@gmail.com")} className='border-b dark:border-white py-5 px-4 flex-row gap-3 items-center'>
            <View className='bg-[#CDE3FE] p-2 rounded-full'>
              <Feather name="mail" size={20} color="#1F64FC" />
            </View>
            <Text className='dark:text-white'>Email</Text>
          </Pressable>
          <Pressable onPress={() => openLink("https://www.linkedin.com/in/faisal-rahman-a0922938a/")} className='border-b dark:border-white py-5 px-4 flex-row gap-3 items-center'>
            <View className='bg-[#CDE3FE] p-2 rounded-full'>
              <FontAwesome name="linkedin" size={20} color="#1F64FC" />
            </View>
            <Text className='dark:text-white'>LinkedIn</Text>
          </Pressable>
          <Pressable onPress={() => openLink("https://github.com/faisalm1400")} className='border-b dark:border-white py-5 px-4 flex-row gap-3 items-center'>
            <View className='dark:bg-[#F3F4F6] bg-[#364153] p-2 rounded-full'>
              <Feather name="github" size={20} color={colorScheme === 'dark' ? "#364153" : "#F3F4F6"} />
            </View>
            <Text className='dark:text-white'>GtHub</Text>
          </Pressable>
          <Pressable onPress={() => openLink("https://www.facebook.com/faisal.rahman.1400")} className='dark:border-white py-5 px-4 flex-row gap-3 items-center'>
            <View className='bg-[#CDE3FE] p-2 rounded-full'>
              <Feather name="facebook" size={20} color="#1F64FC" />
            </View>
            <Text className='dark:text-white'>Facebook</Text>
          </Pressable>
        </View>
      </View>

    </View>
  )
}

export default Contact