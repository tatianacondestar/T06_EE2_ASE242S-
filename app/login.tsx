import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { AppColors } from '@/constants/colors';
import { useAuth } from '@/context/auth-context';

const BRAND_LOGO_URI =
  'https://expedicioneslunahuana.com/wp-content/uploads/2025/11/Logo-Expediciones-Lunahuana-blanco-1.webp';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    await login(email.trim(), password);
    // Navigation is handled inside auth-context after successful login
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: BRAND_LOGO_URI }} style={styles.brandLogo} resizeMode="contain" />
      </View>

      <View style={styles.formLayer}>
        <View style={styles.card}>
          <Text style={styles.title}>Inicia sesión</Text>
          <Text style={styles.subtitle}>Bienvenido a Expediciones Lunahuana</Text>

          {/* Backend error */}
          {!!error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={16} color={AppColors.danger} />
              <Text style={styles.errorBoxText}>{error}</Text>
            </View>
          )}

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={AppColors.textSecondary} />
            <TextInput
              placeholder="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor={AppColors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={AppColors.textSecondary} />
            <TextInput
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor={AppColors.textSecondary}
            />
            <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={AppColors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={[styles.button, isLoading && styles.buttonDisabled]}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Ingresar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={styles.link}>¿No tienes cuenta? Crear cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    paddingTop: 52,
    paddingBottom: 18,
    alignItems: 'center',
    backgroundColor: AppColors.primaryAction,
  },
  brandLogo: {
    width: 220,
    height: 80,
  },
  formLayer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 20,
    backgroundColor: AppColors.surface,
    padding: 22,
    borderWidth: 1,
    borderColor: AppColors.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    color: AppColors.textPrimary,
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: AppColors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff0f0',
    borderWidth: 1,
    borderColor: AppColors.danger,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  errorBoxText: {
    color: AppColors.danger,
    fontSize: 13,
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.border,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    marginTop: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#1d1d1d',
  },
  button: {
    backgroundColor: AppColors.primaryAction,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    textAlign: 'center',
    marginTop: 16,
    color: AppColors.primaryAction,
    fontWeight: '600',
    fontSize: 14,
  },
});
