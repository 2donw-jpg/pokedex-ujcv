import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Link, router } from 'expo-router';

import background from '@/assets/images/backGround.jpg';
import logoLogin from '@/assets/images/logo.png';

import { register } from '@/services/authService';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const email = username.concat("@pokemon.edu");
      await register(email, password, username); // Assume the register function returns a promise
      router.push('/pokemons');
    } catch (error) {
      if (error && error.code) {
        // Handle specific Firebase auth errors
        switch (error.code) {
          case 'auth/invalid-email':
            Alert.alert("Error", "El nombre de usuario tiene un formato incorrecto");
            break;
          case 'auth/email-already-in-use':
            Alert.alert("Error", "El nombre de usuario ya está en uso por otra cuenta.");
            break;
          case 'auth/weak-password':
            Alert.alert("Error", "La contraseña es demasiado débil. Se requiere mínimo 6 carácteres");
            break;
          case 'auth/missing-email':
            Alert.alert("Error", "Se requiere un nombre de usuario.");
            break;
          default:
            Alert.alert("Error", "Ha ocurrido un error, por favor intenta nuevamente.");
        }
      } else {
        Alert.alert("Error", "Ha ocurrido un error desconocido.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={background} style={[styles.image, StyleSheet.absoluteFill]} />
      <View style={styles.overlay} />

      <View style={styles.logoContainer}>
        <Image
          source={logoLogin}
          style={{
            height: 150,
            width: 150 * (600 / 180), // Maintain proportion
            resizeMode: 'contain',
          }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BlurView intensity={80} style={styles.blurContainer}>
          <View style={styles.register}>
            <Text style={styles.title}>Crea una cuenta</Text>

            <View>
              <Text style={styles.label}>Usuario</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#ccc"
                onChangeText={(text) => setUsername(text)}
                value={username}
              />
            </View>
            <View>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#ccc"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <Link href="/login" style={styles.link}>
              Ya tienes una cuenta? Inicia Sesión
            </Link>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoContainer: {
    marginTop: 90,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  blurContainer: {
    width: 350,
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    marginTop: -40,
  },
  register: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: '#a6acaf',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    backgroundColor: 'rgba(192, 192, 192, 0.7)',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212f3d',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  button: {
    width: 300,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#a93226',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  link: {
    fontSize: 16,
    color: '#212f3d',
    marginTop: 10,
  },
});

export default Register;
