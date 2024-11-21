import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { BlurView } from "expo-blur";
import { Link, router } from 'expo-router';

import background from '@/assets/images/backGround.jpg';
import logoLogin from '@/assets/images/logo.png';

import { logIn } from '@/services/authService';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null); // State to track login errors

  const handleLogin = async () => {
    const email = username.concat("@pokemon.edu");
    try {
      await logIn(email, password);  // Assuming logIn returns a promise
      router.push('/pokemons');  // Redirect to Pokémon list on success
    } catch (error) {
      const errorCode = error.code;
      let errorMessage = '';
  
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage = 'Usuario o contraseña errónea';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Tu cuenta ha sido deshabilitada por un administrador';
          break;
        case 'auth/user-not-found':
          errorMessage = 'La cuenta de usuario no existe';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Usuario o contraseña errónea';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Problemas de conexión, prueba de nuevo con una conexión estable.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Han sido muchos intentos. Prueba de nuevo en otra ocasión';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'El inicio de sesión está deshabilitado';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Usuario o contraseña incorrectas';
          break;
        default:
          errorMessage = 'Un error ha ocurrido, intenta de nuevo';
      }
  
      // Display error message to the user
      setLoginError(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={background} style={[styles.image, StyleSheet.absoluteFill]} />
      <View style={styles.overlay} />

      <View style={styles.logoContainer}>
        <Image source={logoLogin} style={styles.logo} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BlurView intensity={80} style={styles.blurContainer}>
          <View style={styles.login}>
            <View>
              <Text style={styles.label}>Usuario</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del usuario"
                placeholderTextColor="#ccc"
                onChangeText={setUsername}
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
                onChangeText={setPassword}
                value={password}
              />
            </View>

            {loginError && <Text style={styles.errorText}>{loginError}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <Link href="/register" style={styles.link}>
              No tienes una cuenta? Crea una cuenta
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  logoContainer: {
    marginTop: 90,
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 400,
    resizeMode: 'contain',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  login: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
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
    backgroundColor: '#00CFE9',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  link: {
    fontSize: 16,
    color: '#00CFE9',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SignIn;
