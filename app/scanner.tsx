import {CameraView } from "expo-camera";
import { Stack, router, useFocusEffect } from "expo-router";
import { AppState, Platform, SafeAreaView, StatusBar, StyleSheet} from "react-native";
//import { Overlay } from "./Overlay"; 
import { useEffect, useRef } from "react";
import { addCaughtPokemon } from '@/services/dbService';

const REGEX = /^(0[0-9]{2}|1[0-4][0-9]|150|151)$/;

// * Main Component
export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  const handlePokemonScan = ({ data }: { data: string }) => {    
    if (REGEX.test(data) && !qrLock.current) {
      const pokemonId = parseInt(data, 10);
      qrLock.current = true;
      addCaughtPokemon(data);
      // @ts-ignore
      router.push(`/details?codigo=${pokemonId}`); 
    }
  };

  useFocusEffect(() => {
    qrLock.current = false;
  });


  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false; 
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // * Renderer
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview", 
          headerShown: false, 
        }}
      />

      {Platform.OS === "android" && <StatusBar hidden />}

      <CameraView
        style={StyleSheet.absoluteFillObject} 
        facing="back"                        
        onBarcodeScanned={handlePokemonScan} 
      />
    </SafeAreaView>
  );
}
