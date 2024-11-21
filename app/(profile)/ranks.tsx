import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { getAllTrainers } from '@/services/dbService';
// Obtener dimensiones de la pantalla
const { width, height } = Dimensions.get('window');



const Ranking = () => {
  const [scores, setScores] = useState([]);

  const fetchScores = async () => {
    try {
      const trainers = await getAllTrainers();
      setScores(trainers); // Set the fetched trainers as the scores
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  useEffect(() => {
    fetchScores(); // Fetch scores on component mount
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={fetchScores}>
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>

      <View style={styles.divider} />
      <Text style={styles.title}>Ranking</Text>

      <FlatList
        data={scores}
        keyExtractor={(item) => item.id} // Use document ID as key
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.total_points}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: height > 600 ? 24 : 20,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: '#ffffff',
    marginBottom: 15,
  },
  refreshButton: {
    position: 'absolute', // Esto posiciona el botón de manera flotante
    top: height * 0.05, // Ajusta la distancia desde la parte superior
    right: width * 0.05, // Alinea el botón a la derecha
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e74c3c', // Mismo color rojo que el título
    borderRadius: 6,
    elevation: 3, // Sombra para el botón
  },
  refreshText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd', // Color gris claro para el divisor
    marginVertical: 10, // Espaciado para dar espacio entre el botón y el título
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: width * 0.03,
    marginVertical: 6,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  rank: {
    fontSize: height > 600 ? 16 : 14,
    fontWeight: 'bold',
  },
  name: {
    fontSize: height > 600 ? 16 : 14,
  },
  score: {
    fontSize: height > 600 ? 16 : 14,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default Ranking;
