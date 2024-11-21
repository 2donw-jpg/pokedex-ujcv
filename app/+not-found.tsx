import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const NotFound: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/favicon.png')} // Add your Pokéball image to the assets folder
        style={styles.image} 
      />
      <Text style={styles.title}>Oops! Pokémon Not Found!</Text>
      <Text style={styles.message}>It seems we couldn't find the Pokémon you were looking for.</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Link href="/" style={styles.buttonText}>Return to Home</Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default NotFound;
