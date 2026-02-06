import { View, Text } from 'react-native'
import React from 'react'

const MAX_STAT = 200;

const statMap = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};


const BaseStats = ({ data }) => {

  // console.log(data.stats)

  return (
    <View className='px-8 py-6'>
      {data.stats.map((s, index) => {
        const statName = statMap[s.stat.name];
        const statValue = s.base_stat;
        const barWidth = `${(statValue / MAX_STAT) * 100}%`;


        return (
          <View key={index} className="flex-row items-center gap-4">

            {/* Stat name */}
            <Text className="w-24 text-gray-600 font-medium dark:text-white">
              {statName}
            </Text>

            {/* Stat value */}
            <Text className="w-10 font-semibold dark:text-white">
              {statValue}
            </Text>

            {/* Stat bar */}
            <View className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <View
                style={{ width: barWidth }}
                className="h-full bg-blue-500 rounded-full"
              />
            </View>
          </View>
        )
      })}

      <View className='gap-2 mt-10'>
        <Text className='font-semibold dark:text-white'>Type defense</Text>
        <Text className='dark:text-white'>The effectiveness of each type on {data.name }</Text>
      </View>
    </View>
  )
}

export default BaseStats