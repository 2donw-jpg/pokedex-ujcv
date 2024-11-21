import React, { useEffect, useState, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";
import axios from "axios";
import Poke from "../types/Pokemon";
import PokeAbility from "@/types/PokemonAbilities";

const baseUrlAPI = "https://pokeapi.co/api/v2/pokemon";
const URLAb = "https://pokeapi.co/api/v2/ability";
const URLSpecies = "https://pokeapi.co/api/v2/pokemon-species";

const Details = () => {
  const [contenido, setContenido] = useState<Poke | null>(null);
  const [ability, setAbility] = useState<PokeAbility | null>(null);
  const [speciesDescription, setSpeciesDescription] = useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState<string>("#FF6347");
  const { codigo: queryCodigo } = useLocalSearchParams();
  const [codigo, setCodigo] = useState(queryCodigo);

  // Animación de rotación
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Iniciar la animación de rotación cuando el componente se monte
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 10000, // Duración de 10 segundos
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ).start();
  }, []); // Este efecto solo se ejecutará una vez cuando el componente se monte

  useEffect(() => {
    loadPoke();
  }, [codigo]);

  const loadPoke = async() => {
    try {
      const result = await axios.get(`${baseUrlAPI}/${codigo}`);
      const resultAbilities = await axios.get(`${URLAb}/${codigo}`);
      const resultSpecies = await axios.get(`${URLSpecies}/${codigo}`);

      setContenido(result.data);

      if (result.data.types && result.data.types.length > 0) {
        const typeColor = getTypeColor(result.data.types[0].type.name);
        setBackgroundColor(typeColor);
      }

      setAbility(resultAbilities.data);

      const flavorTextEntry = resultSpecies.data.flavor_text_entries.find(
        //@ts-ignore
        (entry) => entry.language.name === "es"
      );
      setSpeciesDescription(
        flavorTextEntry ? flavorTextEntry.flavor_text : "Descripción no disponible."
      );
    } catch (error) {
      console.error("Error al cargar los datos del Pokémon:", error);
    }
  };

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
    return typeColors[type] || "#FF6347";
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]} >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.pokemonName}>
            {contenido?.name?.toUpperCase() || "Cargando..."}
          </Text>
          <Text style={styles.pokemonId}>
            #{contenido?.id?.toString().padStart(3, "0")}
          </Text>
        </View>
        <View style={styles.typesContainer}>
        
          {contenido?.types.map((typeInfo) => (
            <Text key={typeInfo.slot} style={styles.typeBadge}>
              {typeInfo.type.name.toUpperCase()}
            </Text>
          ))}
        </View>

        {/* Ajuste para mover los textos más abajo */}
        <View style={styles.infoRow}>
          <Text style={styles.typeBadge}>
            <Text style={styles.boldText}>Altura:</Text> {contenido?.height || "N/A"} cm
          </Text>
          <Text style={styles.typeBadge}>
            <Text style={styles.boldText}>Experiencia:</Text> {contenido?.base_experience || "N/A"}
          </Text>
          <Text style={styles.typeBadge}>
            <Text style={styles.boldText}>Peso:</Text> {contenido?.weight || "N/A"} hg
          </Text>
        </View>

        <Animated.View style={[styles.imageBackgroundContainer, rotateStyle]}>
          <ImageBackground
            source={require("@/assets/images/pokebola.png")}
            style={styles.imageBackground}
            blurRadius={1.5}
          />
        </Animated.View>
        <Image
          style={styles.imagePokemon}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${codigo}.png`,
          }}
        />

        {/* Ajuste para mover "Acerca" más arriba */}
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>Acerca</Text>
          <Text style={styles.aboutText}>{speciesDescription}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  scrollContainer: {
    alignItems: "center",
    flexGrow: 1,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
  },
  pokemonName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  pokemonId: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  typesContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  typeBadge: {
    backgroundColor: "#fff",
    color: "#5f6a6a",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  imageBackgroundContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 250,
    flex: 1,
    marginTop: -50,
  },
  imageBackground: {
    width: 600,
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePokemon: {
    width: 400,
    height: 390,
    position: "absolute",
    top: 260,
  },
  aboutContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 40,
    alignItems: "center",
    marginTop: 60, // Ajusta el valor para moverlo más arriba
    flexWrap: "wrap",
    position: "absolute", // Asegura que esté encima de la Pokébola
    top: 600,  // Ajusta según necesites
    zIndex: 1, 
    
  },
  aboutTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",


  },
  aboutText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginLeft: 3,
    marginRight: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 30, // Mueve la fila más abajo
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default Details;