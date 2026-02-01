import { View, Text, } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

const Moves = ({ data }) => {





  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
      renderItem={({ item }) => (
        <View className="py-2 border-b border-gray-200">
          <Text className="capitalize font-medium">
            {item.name}
          </Text>
          <Text className="text-xs text-gray-500 capitalize">
            {item.type} • {item.damage}
          </Text>
        </View>
      )}
    />
  )
}

export default Moves