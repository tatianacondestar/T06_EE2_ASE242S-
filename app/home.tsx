import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Bienvenido</Text>
      <Text style={styles.subtitle}>Has ingresado correctamente</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2f7',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 20,
    color: '#777',
  },
  button: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});