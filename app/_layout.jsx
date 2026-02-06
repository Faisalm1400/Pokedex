import { Drawer } from 'expo-router/drawer';
import { Stack } from "expo-router";
import './global.css';
import AppContextProvider from '@/context/contextProvider';
import FavoritesContextProvider from '@/context/favoritesContext';

export default function RootLayout() {
  return (

    <AppContextProvider>
      <FavoritesContextProvider>
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
          <Drawer.Screen name='favorites' options={{ title: 'Favorites' }} />
          <Drawer.Screen name='pokedexInfo' options={{ title: 'Pokédex Info' }} />
          <Drawer.Screen name='settings' options={{ title: 'Settings' }} />
          <Drawer.Screen name='pokemon/[id]' options={{ title: 'Pokémon Details', drawerItemStyle: { display: "none" } }} />
        </Drawer>
      </FavoritesContextProvider>
    </AppContextProvider>
  );
}
