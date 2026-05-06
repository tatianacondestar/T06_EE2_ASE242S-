import { Platform } from 'react-native';

// Detecta automáticamente la URL según la plataforma
const getBaseUrl = () => {
  if (Platform.OS === 'web') {
    // Corriendo en navegador (Expo Web)
    return 'http://localhost:8081';
  }
  if (Platform.OS === 'android') {
    // Emulador Android Studio
    return 'http://10.0.2.2:8081';
  }
  // iOS simulator
  return 'http://localhost:8081';
};

export const BASE_URL = getBaseUrl();
