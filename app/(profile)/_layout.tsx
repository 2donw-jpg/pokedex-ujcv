import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import MaterialIcons from '@expo/vector-icons/MaterialIcons';// Importing the icon set

export default function AuthLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="pokemons" 
        options={{ 
          title: 'Pokemons', 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="catching-pokemon" size={size} color={color} /> // Replaced icon
          ),
        }} 
      />
      <Tabs.Screen 
        name="ranks" 
        options={{ 
          title: 'Ranks', 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile', 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}
