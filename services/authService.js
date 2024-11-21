// authService.js
import { auth } from '@/services/firebaseConfig';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth';
import { createTrainer } from '@/services/dbService';


export const getCurrentUser = async() => {
  const currentUser = auth.currentUser;
  return currentUser;
};

export const register = async (email, password, username) => {
  try {
    email = email.trim()
    password = password.trim()
    username = username.trim()
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user || auth.currentUser;
    if (user) {

      await createTrainer(user, username); // Ensure to pass the username
      await updateProfile(user, { displayName: username });
    } else {
      console.log("No user was found");
    }
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const logIn = async (email, password) => {
  try {
    email = email.trim()
    password = password.trim()
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};


export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
