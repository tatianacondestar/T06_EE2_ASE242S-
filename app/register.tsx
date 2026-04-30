import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

const BRAND_LOGO_URI = 'https://expedicioneslunahuana.com/wp-content/uploads/2025/11/Logo-Expediciones-Lunahuana-blanco-1.webp';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const headerHeight = Math.min(Math.max(height * 0.34, 220), 300);
  const topRightCircleSize = Math.max(width * 0.78, 250);
  const bottomLeftCircleSize = Math.max(width * 0.9, 290);

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    Alert.alert("Registro exitoso", "Cuenta creada correctamente", [
      { text: "OK", onPress: () => router.push('/home') }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer} pointerEvents="none">
        <View style={[styles.orangeTop, { height: headerHeight }]}>
          <Image
            source={{ uri: BRAND_LOGO_URI }}
            style={[styles.brandLogo, { width: Math.min(width * 0.7, 315), height: Math.min(width * 0.32, 140) }]}
            resizeMode="contain"
          />
          <View
            style={[
              styles.topRightCircle,
              {
                width: topRightCircleSize,
                height: topRightCircleSize,
                borderRadius: topRightCircleSize / 2,
                right: -topRightCircleSize * 0.5,
                bottom: -topRightCircleSize * 0.48,
              },
            ]}
          />
        </View>

        <View
          style={[
            styles.bottomLeftCircle,
            {
              width: bottomLeftCircleSize,
              height: bottomLeftCircleSize,
              borderRadius: bottomLeftCircleSize / 2,
              left: -bottomLeftCircleSize * 0.48,
              bottom: -bottomLeftCircleSize * 0.25,
            },
          ]}
        />
      </View>

      <View style={[styles.formLayer, { paddingTop: headerHeight - 26 }]}>
        <View style={[styles.card, { width: Math.min(width - 42, 430) }]}>
          <Text style={[styles.title, { fontSize: Math.max(width * 0.085, 28) }]}>REGISTRATE</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#d65d16" />
            <TextInput
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#3c3c3c"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#d65d16" />
            <TextInput
              placeholder="Usuario / Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#3c3c3c"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#d65d16" />
            <TextInput
              placeholder="Contrasena"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor="#3c3c3c"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={[styles.buttonText, { fontSize: Math.max(width * 0.052, 18) }]}>CREAR</Text>
          </TouchableOpacity>

          <Text style={styles.separator}>o</Text>
          <View style={styles.separatorLine} />
          <Text style={styles.socialTitle}>Registra con redes sociales</Text>
          <View style={styles.socialRow}>
            <Ionicons name="logo-google" size={21} color="#ea4335" />
            <Ionicons name="logo-facebook" size={21} color="#1877f2" />
            <View style={styles.socialX}>
              <Text style={styles.socialXText}>X</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.link}>Ya tengo cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    overflow: 'hidden',
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  orangeTop: {
    backgroundColor: '#e58a24',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  brandLogo: {
    zIndex: 3,
  },
  topRightCircle: {
    position: 'absolute',
    backgroundColor: '#1f4ab0',
  },
  bottomLeftCircle: {
    position: 'absolute',
    backgroundColor: '#0f9ba7',
  },
  formLayer: {
    width: '100%',
    flex: 1,
    paddingBottom: 26,
    alignItems: 'center',
  },
  card: {
    borderWidth: 2,
    borderColor: '#ea6c28',
    borderRadius: 28,
    backgroundColor: '#f5f5f5',
    padding: 22,
    zIndex: 5,
  },
  title: {
    color: '#d65d16',
    fontSize: 42,
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ea6c28',
    backgroundColor: '#e9e3d8',
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    color: '#1d1d1d',
  },
  button: {
    backgroundColor: '#1f4ab0',
    height: 46,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    borderWidth: 2.5,
    borderColor: '#9ec7ef',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    textAlign: 'center',
    color: '#444',
    marginTop: 12,
    marginBottom: 4,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#9c9c9c',
    marginBottom: 12,
  },
  socialTitle: {
    textAlign: 'center',
    color: '#505050',
    fontSize: 12,
    marginBottom: 10,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    alignItems: 'center',
  },
  socialX: {
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialXText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  link: {
    textAlign: 'center',
    marginTop: 14,
    color: '#1f4ab0',
    fontWeight: '700',
  },
});