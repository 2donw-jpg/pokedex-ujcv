import React, { useEffect, useState } from "react";
import Poke from "../types/Pokemon";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import axios from "axios";

type PokemonProps = {
  codigo: number;
  pokemons: Poke;
};

const PokemonList: React.FC<PokemonProps> = ({ codigo, pokemons }) => {
  const [typeColor, setTypeColor] = useState("#CBCBCB");

  const getTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      fire: "#fca34d",
      water: "#7ac6fa",
      grass: "#6bc26b",
      electric: "#f6e200",
      ground: "#e4c99f",
      fairy: "#f2a7d7",
      psychic: "#f983d2",
      bug: "#9dca4f",
      dragon: "#6a84d2",
      ghost: "#b99ae1",
      normal: "#a8a878",
      fighting: "#e35432",
      poison: "#9b6df0",
      rock: "#c3a04b",
      ice: "#8fdaf6",
      steel: "#7b7f7e",
      dark: "#6f5f56",
      flying: "#c3b2e3",
    };
    return typeColors[type] || "#CBCBCB";
  };

  useEffect(() => {
    const fetchPokemonType = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${codigo}`
        );

        const firstType = response.data.types[0]?.type.name;

        if (firstType) {
          setTypeColor(getTypeColor(firstType));
        }
      } catch (error) {
        console.error("Error fetching Pokémon type:", error);
      }
    };
    fetchPokemonType();
  }, [codigo]);

  return (
    <View style={styles.container}>
      <View style={[styles.contenedorPokemon, { backgroundColor: typeColor }]}>
        <Image
          style={styles.imagePokemon}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${codigo}.png`,
          }}
        />
        <View style={styles.contenedorDatosGenerales}>
          <Text style={styles.nombreEnFicha}>
            No.{codigo}  |{" "}
            {pokemons.name.charAt(0).toUpperCase() + pokemons.name.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contenedorPokemon: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  imagePokemon: {
    height: 80,
    width: 80,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  contenedorDatosGenerales: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  nombreEnFicha: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
});

export default PokemonList;
