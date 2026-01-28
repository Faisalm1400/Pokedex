import { Drawer } from 'expo-router/drawer';
import { Stack } from "expo-router";
import './global.css';

export default function RootLayout() {
  return (
    <Drawer screenOptions={{
      drawerPosition: "right",
    }}>
      <Drawer.Screen
        name='index'
        options={{
          drawerLabel: 'All Pokémon',
          title: 'Pokémon'
        }}
      />
      <Drawer.Screen name='pokedexInfo' options={{ title: 'Pokédex Info' }} />
    </Drawer>
  );
}
