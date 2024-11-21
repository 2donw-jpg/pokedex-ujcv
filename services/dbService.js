// dbService.js
import { doc, getDoc, setDoc, updateDoc, arrayUnion,  collection, getDocs, query, orderBy  } from "firebase/firestore"; 
import { db, auth } from '@/services/firebaseConfig';
import { getPokemonPoints } from "@/services/pokemonRanking";

//*GetUserProfile
export async function getUserProfile(user) {
  
  if (!user) {
    console.error("[dbService/getUserProfile] No user is currently logged in.");
    return null; 
  }

  const docRef = doc(db, "trainers", user.uid);
  
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('[dbService/getUserProfile] Document data:', docSnap.data());
      return docSnap.data(); 
    } else {
      console.log('[dbService/getUserProfile] No such document!');
      return null; 
    }
  } catch (error) {
    logError('[dbService/getUserProfile] Error getting document:', error);
    return null; 
  }
}

//*CreateTrainer
export async function createTrainer(user, username) {
  try {
    // Ensure that user.uid is available and correct
    console.log("User ID used to create the profile:", user.uid);

    const trainerDocRef = doc(db, "trainers", user.uid);

    // Set the data for the trainer
    await setDoc(trainerDocRef, {
      name: username,  // Assuming you want to store the username as the trainer's name
      pokemons: [],    // Initialize an empty array for pokemons
      total_points: 0  // Initialize total_points as 0
    });

    console.log(`Trainer created for userId: ${user.uid}`);
  } catch (error) {
    console.error("Error creating trainer:", error);
  }
}

// Add a caught Pokémon to the current user's profile
export async function addCaughtPokemon(pokemonId) {
  const user = auth.currentUser;

  if (!user) {
    console.error("[dbService/addCaughtPokemon] No user is currently logged in.");
    return;
  }

  const trainerDocRef = doc(db, "trainers", user.uid);
  
  try {
    const docSnap = await getDoc(trainerDocRef);

    if (docSnap.exists()) {
      const trainerData = docSnap.data();
      const currentPokemons = trainerData.pokemons || [];
      const currentTotalPoints = trainerData.total_points || 0;

      // Check if the Pokémon is already caught
      if (currentPokemons.includes(pokemonId)) {
        console.log(`Pokémon ID ${pokemonId} is already caught.`);
        return; 
      }

      // Calculate the points for the caught Pokémon
      const pokemonPoints = getPokemonPoints(pokemonId);
      
      // Update the trainer's data with the new Pokémon and updated points
      await updateDoc(trainerDocRef, {
        pokemons: arrayUnion(pokemonId),
        total_points: currentTotalPoints + pokemonPoints,
      });

      await getAllTrainers();

      console.log(`Pokémon ID ${pokemonId} added to trainer ${user.uid}. Points added: ${pokemonPoints}`);

      // Refresh the ranking
      await getAllTrainers();
    } else {
      console.log('No trainer document found for the current user.');
    }
  } catch (error) {
    logError("Error adding caught Pokémon:", error);
  }
}

export async function getAllTrainers() {
  try {
    // Reference the "trainers" collection
    const trainersRef = collection(db, "trainers");

    // Create a query to order trainers by total_points in descending order
    const trainersQuery = query(trainersRef, orderBy("total_points", "desc"));

    // Fetch all documents that match the query
    const querySnapshot = await getDocs(trainersQuery);

    // Map the documents into an array of trainer objects
    const trainers = querySnapshot.docs.map(doc => ({
      id: doc.id, // Document ID
      ...doc.data() // Document data
    }));

    return trainers;
  } catch (error) {
    console.error("Error fetching trainers:", error);
    return [];
  }
}

// Helper function for logging errors
const logError = (message, error) => {
  console.error(message, error);
};
