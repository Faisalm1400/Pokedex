import { View, Text, Image } from 'react-native'
import React from 'react'

const Evolution = ({ data }) => {

  console.log(data.map(p => p.id))

  return (
    <View className="gap-6 py-6 px-4">
      {
        data.map(p => (
          <View key={p.id} className="flex-row items-center gap-5 bg-gray-50 rounded-2xl">
            <Image
              source={{ uri: p.image }}
              className="w-28 h-28"
            />
            <View className='gap-2'>
              <Text>#{p.id}</Text>
              <Text className="capitalize mt-1 font-semibold">{p.name}</Text>
              {!p.isDefault && (
                <Text className="text-sm text-gray-400">Variant</Text>
              )}
            </View>
          </View>
        ))
      }
    </View>
  )
}

export default Evolution