import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const About = ({ data }) => {

    const { abilities, height, weight, species, eggGroup, eggCycle } = data;

    const abilityNames = abilities.map(a => (a))

    const eggGroupName = eggGroup.map(e => e)

    return (
        <View className='py-8 px-6'>
            <View className='gap-2'>
                <View className='flex-row gap-9'>
                    <Text className='dark:text-white'>Species:</Text>
                    <Text className='dark:text-white'>{species}</Text>
                </View>

                <View className='flex-row gap-12'>
                    <Text className='dark:text-white'>Height:</Text>
                    <Text className='dark:text-white'>{height / 10}m ({Math.floor(height / 10 * 3.281)}'{Math.round((height / 10 * 3.281 % 1) * 12)}")</Text>
                </View>
                <View className='flex-row gap-11'>
                    <Text className='dark:text-white'>Weight:</Text>
                    <Text className='dark:text-white'>{weight / 10}kg ({(weight / 10 * 2.205).toFixed(1)}lb)</Text>
                </View>
                <View className='flex-row gap-10'>
                    <Text className='dark:text-white'>Abilities:</Text>
                    <Text className='capitalize dark:text-white'>{abilityNames.join(', ')}</Text>
                </View>
            </View>


            <View className='gap-2 mt-4'>
                <Text className='text-xl font-semibold dark:text-white'>Breeding</Text>
                <View className='flex-row gap-5'>
                    <Text className='dark:text-white'>Egg Group:</Text>
                    <Text className='capitalize dark:text-white'>{eggGroupName.join(", ")}</Text>
                </View>
                <View className='flex-row gap-6'>
                    <Text className='dark:text-white'>Egg Cycle:</Text>
                    <Text className='dark:text-white'>{eggCycle}</Text>
                </View>
            </View>

        </View>
    )
}

export default About