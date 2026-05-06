import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppColors } from '@/constants/colors';
import { useAuth } from '@/context/auth-context';

const BRAND_LOGO_URI = 'https://expedicioneslunahuana.com/wp-content/uploads/2025/11/Logo-Expediciones-Lunahuana-blanco-1.webp';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const router = useRouter();
  const { register, isLoading, error } = useAuth();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    // Navigation is handled inside auth-context after successful register
    await register(name, email, password, role);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: BRAND_LOGO_URI }} style={styles.brandLogo} resizeMode="contain" />
      </View>

      <View style={styles.formLayer}>
        <View style={styles.card}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Registra tus datos para comenzar tu aventura</Text>

          {!!error && (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={16} color={AppColors.danger} />
              <Text style={styles.errorBoxText}>{error}</Text>
            </View>
          )}

          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color={AppColors.textSecondary} />
            <TextInput
              placeholder="Nombre"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor={AppColors.textSecondary}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={AppColors.textSecondary} />
            <TextInput
              placeholder="Usuario / Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor={AppColors.textSecondary}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={AppColors.textSecondary} />
            <TextInput
              placeholder="Contrasena"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor={AppColors.textSecondary}
            />
          </View>

          <View style={styles.roleSelector}>
            <Text style={styles.roleLabel}>Tipo de usuario</Text>
            <View style={styles.roleOptions}>
              <TouchableOpacity
                style={[styles.roleOption, role === 'user' && styles.roleOptionActive]}
                onPress={() => setRole('user')}
              >
                <Text style={[styles.roleText, role === 'user' && styles.roleTextActive]}>Usuario</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.roleOption, role === 'admin' && styles.roleOptionActive]}
                onPress={() => setRole('admin')}
              >
                <Text style={[styles.roleText, role === 'admin' && styles.roleTextActive]}>Admin</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Registrarme</Text>
            )}
          </TouchableOpacity>

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
    backgroundColor: AppColors.background,
  },
  header: {
    paddingTop: 52,
    paddingBottom: 18,
    alignItems: 'center',
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
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: AppColors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
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
  roleSelector: {
    marginTop: 12,
  },
  roleLabel: {
    color: AppColors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  roleOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  roleOption: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f2f2f7',
    borderRadius: 10,
    alignItems: 'center',
  },
  roleOptionActive: {
    backgroundColor: AppColors.primaryAction,
  },
  roleText: {
    color: AppColors.textSecondary,
    fontWeight: '600',
  },
  roleTextActive: {
    color: '#fff',
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
    marginBottom: 4,
  },
  errorBoxText: {
    color: AppColors.danger,
    fontSize: 13,
    flex: 1,
  },
});