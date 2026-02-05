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
                    <Text>Species:</Text>
                    <Text>{species}</Text>
                </View>

                <View className='flex-row gap-12'>
                    <Text>Height:</Text>
                    <Text>{height / 10}m ({Math.floor(height / 10 * 3.281)}'{Math.round((height / 10 * 3.281 % 1) * 12)}")</Text>
                </View>
                <View className='flex-row gap-11'>
                    <Text>Weight:</Text>
                    <Text>{weight / 10}kg ({(weight / 10 * 2.205).toFixed(1)}lb)</Text>
                </View>
                <View className='flex-row gap-10'>
                    <Text>Abilities:</Text>
                    <Text className='capitalize'>{abilityNames.join(', ')}</Text>
                </View>
            </View>


            <View className='gap-2 mt-4'>
                <Text className='text-xl font-semibold'>Breeding</Text>
                <View className='flex-row gap-5'>
                    <Text>Egg Group:</Text>
                    <Text className='capitalize'>{eggGroupName.join(", ")}</Text>
                </View>
                <View className='flex-row gap-6'>
                    <Text>Egg Cycle:</Text>
                    <Text>{eggCycle}</Text>
                </View>
            </View>

        </View>
    )
}

export default About