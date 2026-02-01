import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'

const Evolution = ({ data }) => {

  // console.log(data.map(p => p.id))

  return (

    <FlatList
      data={data}
      keyExtractor={((_, index) => index.toString())}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
      renderItem={({ item }) => (
        <View className="gap-6 py-6 px-4">
              <View key={item.id} className="flex-row items-center gap-5 bg-gray-50 rounded-2xl">
                <Image
                  source={{ uri: item.image }}
                  className="w-28 h-28"
                />
                <View className='gap-2'>
                  <Text>#{item.id}</Text>
                  <Text className="capitalize mt-1 font-semibold">{item.name}</Text>
                  {!item.isDefault && (
                    <Text className="text-sm text-gray-400">Variant</Text>
                  )}
                </View>
              </View>
        </View>
      )}
    />
  )
}

export default Evolution