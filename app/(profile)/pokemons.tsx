import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, Alert } from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';
import { getUserProfile } from '@/services/dbService';
import { auth } from '@/services/firebaseConfig';
import PokemonList from '@/components/PokemonList';
import { fetchPokemonData } from '@/services/pokemonApi';

const Home = () => {
  // State variables
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // If authenticated, fetch user data
        getUserProfile(currentUser)
          .then((data) => setUserData(data))
          .catch((err) => console.error('Error fetching user data:', err));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Fetch Pokémon list data
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const data = await fetchPokemonData();
        //@ts-ignore
        setPokemonList(data.results);
      } catch (error) {
        Alert.alert('Error', 'Failed to load Pokémon data.');
      }
    };

    fetchPokemonList();
  }, []);

  // Redirect to login page
  const handleLoginRedirect = () => {
    router.push('/(auth)/login');
  };

  const handlePress = (codigo: number) => {
    router.push(`/details?codigo=${codigo}`);
  };

  return (
    <>
      {/* Button to scan here */}
      <Pressable onPress={() => router.push('/scanner')}>
        <Text style={styles.scanButton}>Scan here</Text>
      </Pressable>

      {/* Pokémon list */}
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {pokemonList.map((pokemon, index) => (
            <Pressable key={pokemon.name} onPress={() => handlePress(index + 1)}>
              <PokemonList codigo={index + 1} pokemons={pokemon} />
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scanButton: {
    fontSize: 18,
    color: '#3498db',
    textAlign: 'center',
    marginVertical: 16,
  },
  pokemonPressable: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  pokemon: {
    fontSize: 16,
    color: '#2c3e50',
  },
});

export default Home;
