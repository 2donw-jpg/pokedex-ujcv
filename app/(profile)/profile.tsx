import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { BlurView } from "expo-blur";
import { Link, router } from 'expo-router';
import { signIn } from '@/services/authService';

import background from '@/assets/images/backGround.jpg';
import logoLogin from '@/assets/images/logo.png';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signIn(username.concat("@pokedex.com"), password);
    router.push('/list');
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
            <Text style={styles.title}>Welcome to Pokedex</Text>

            <View>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                placeholderTextColor="#ccc"
                onChangeText={setUsername}
                value={username}
              />
            </View>
            <View>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <Link href="/register" style={styles.link}>
              Don't have an account? Register
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
    marginTop: 60,
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 250,
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
});

export default SignIn;
