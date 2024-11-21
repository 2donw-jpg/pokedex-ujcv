import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';
const URLAb  = 'https://pokeapi.co/api/v2/ability';
const CACHE_KEY = 'pokemonData';
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Fetches Pokémon data by ID or name.
 * @param {number|string} idOrName - Pokémon ID (1-151) or name (e.g., 'bulbasaur').
 * @returns {Promise<Object>} - Pokémon data object.
 */
export const fetchPokemon = async (idOrName) => {
    try {
      const response = await axios.get(`${BASE_URL}/${idOrName}`);
      if (!response.ok) {
        throw new Error(`Error fetching Pokémon with ID/Name: ${idOrName}`);
      }
      const data = await response.data;
      return data;
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
      return null;
    }
  };



  
/**
 * Fetches all the first 151 pokemons
 * @returns {Promise<Object>} - Pokémon data object.
 */
export const fetchPokemonData = async () => {
  try {
    const cachedData = await AsyncStorage.getItem(CACHE_KEY);

    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRATION_TIME) {
        return data; // Use cached data
      }
    }

    const response = await axios.get(POKEMON_API_URL);
    const data = await response.data;

    await AsyncStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() })
    );
    return data;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    throw error;
  }
};