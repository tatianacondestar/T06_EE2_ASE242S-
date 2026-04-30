import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    Alert.alert("Login exitoso", "Bienvenido", [
      { text: "OK", onPress: () => router.push('/home') }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🔐</Text>
      <Text style={styles.title}>Bienvenido</Text>

      <TextInput
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#eef2f7',
  },
  logo: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    textAlign: 'center',
    marginTop: 15,
    color: '#4a90e2',
  },
});