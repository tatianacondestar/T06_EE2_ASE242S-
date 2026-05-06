import { useActivities } from '@/context/activity-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IOS = {
  bg: '#f2f2f7',
  card: '#ffffff',
  border: '#e5e5ea',
  separator: '#c6c6c8',
  brand: '#0A4A7A',
  textPrimary: '#1c1c1e',
  textSecondary: '#8e8e93',
  textTertiary: '#6e6e73',
};

export default function ActivityEdit() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activities, updateActivityById, isLoading } = useActivities();

  const activity = activities.find((a) => a.id === id);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [durationHours, setDurationHours] = useState('');
  const [maxQuota, setMaxQuota] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [activityDate, setActivityDate] = useState('');

  useEffect(() => {
    if (activity) {
      setName(activity.name);
      setDescription(activity.description || activity.short || '');
      setDurationHours(String(activity.durationHours || ''));
      setMaxQuota(String(activity.maxQuota || ''));
      setPrice(String(activity.price || ''));
      setLocation(activity.location || '');
      setDifficulty(String(activity.difficulty || ''));
      setActivityDate(activity.activityDate || '');
    }
  }, [activity]);

  const handleSave = async () => {
    if (!name || !description || !durationHours || !price) {
      Alert.alert('Campos requeridos', 'Completa nombre, descripción, duración y precio.');
      return;
    }
    try {
      await updateActivityById(id!, {
        name,
        description,
        durationHours: Number(durationHours),
        maxQuota: Number(maxQuota) || 0,
        price: Number(price),
        location,
        difficulty: Number(difficulty) || 1,
        activityDate,
        short: description,
        duration: `${durationHours} hora(s)`,
        level: `Nivel ${difficulty || 1}`,
      });
      Alert.alert('Actividad actualizada', 'Los cambios fueron guardados correctamente.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert('Error', 'No se pudo actualizar la actividad. Verifica la conexión al servidor.');
    }
  };

  if (!activity) {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={26} color={IOS.brand} />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Editar Actividad</Text>
          <View style={{ width: 26 }} />
        </View>
        <View style={styles.centered}>
          <Ionicons name="alert-circle-outline" size={48} color={IOS.textSecondary} />
          <Text style={styles.notFoundText}>Actividad no encontrada</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={26} color={IOS.brand} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Editar Actividad</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.largeTitle}>Editar Actividad</Text>

        <Text style={styles.sectionHeader}>INFORMACIÓN BÁSICA</Text>
        <View style={styles.formCard}>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Nombre</Text>
            <TextInput
              style={styles.fieldInput}
              value={name}
              onChangeText={setName}
              placeholder="Ej: Canotaje en Lunahuaná"
              placeholderTextColor={IOS.textTertiary}
            />
          </View>
          <View style={styles.fieldSeparator} />
          <View style={styles.fieldRowMultiline}>
            <Text style={styles.fieldLabel}>Descripción</Text>
            <TextInput
              style={styles.fieldInputMultiline}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe la actividad..."
              placeholderTextColor={IOS.textTertiary}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </View>

        <Text style={styles.sectionHeader}>DETALLES</Text>
        <View style={styles.formCard}>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Duración (horas)</Text>
            <TextInput
              style={[styles.fieldInput, styles.fieldInputRight]}
              value={durationHours}
              onChangeText={setDurationHours}
              placeholder="Ej: 2"
              placeholderTextColor={IOS.textTertiary}
              keyboardType="numeric"
              textAlign="right"
            />
          </View>
          <View style={styles.fieldSeparator} />
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Cupo máximo</Text>
            <TextInput
              style={[styles.fieldInput, styles.fieldInputRight]}
              value={maxQuota}
              onChangeText={setMaxQuota}
              placeholder="Ej: 20"
              placeholderTextColor={IOS.textTertiary}
              keyboardType="numeric"
              textAlign="right"
            />
          </View>
          <View style={styles.fieldSeparator} />
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Precio (S/)</Text>
            <TextInput
              style={[styles.fieldInput, styles.fieldInputRight]}
              value={price}
              onChangeText={setPrice}
              placeholder="Ej: 80"
              placeholderTextColor={IOS.textTertiary}
              keyboardType="numeric"
              textAlign="right"
            />
          </View>
          <View style={styles.fieldSeparator} />
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Dificultad (1–5)</Text>
            <TextInput
              style={[styles.fieldInput, styles.fieldInputRight]}
              value={difficulty}
              onChangeText={setDifficulty}
              placeholder="Ej: 3"
              placeholderTextColor={IOS.textTertiary}
              keyboardType="numeric"
              textAlign="right"
            />
          </View>
        </View>

        <Text style={styles.sectionHeader}>UBICACIÓN Y FECHA</Text>
        <View style={styles.formCard}>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Ubicación</Text>
            <TextInput
              style={[styles.fieldInput, styles.fieldInputRight]}
              value={location}
              onChangeText={setLocation}
              placeholder="Ej: Lunahuaná, Cañete"
              placeholderTextColor={IOS.textTertiary}
              textAlign="right"
            />
          </View>
          <View style={styles.fieldSeparator} />
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Fecha actividad</Text>
            <TextInput
              style={[styles.fieldInput, styles.fieldInputRight]}
              value={activityDate}
              onChangeText={setActivityDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={IOS.textTertiary}
              textAlign="right"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Actualizar Actividad</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: IOS.bg },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    backgroundColor: IOS.card,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: IOS.separator,
  },
  navTitle: { fontSize: 17, fontWeight: '600', color: IOS.textPrimary },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  notFoundText: { fontSize: 16, color: IOS.textSecondary },
  scrollContent: { paddingHorizontal: 20 },
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: IOS.textPrimary,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: IOS.textSecondary,
    letterSpacing: 0.5,
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  formCard: {
    backgroundColor: IOS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: IOS.border,
    overflow: 'hidden',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
  },
  fieldRowMultiline: { paddingHorizontal: 16, paddingVertical: 12 },
  fieldLabel: { fontSize: 16, color: IOS.textPrimary, flex: 1 },
  fieldInput: { flex: 1, fontSize: 16, color: IOS.textPrimary, padding: 0 },
  fieldInputRight: { textAlign: 'right', color: IOS.textSecondary },
  fieldInputMultiline: {
    fontSize: 15,
    color: IOS.textPrimary,
    marginTop: 6,
    minHeight: 72,
    padding: 0,
  },
  fieldSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: IOS.separator,
    marginLeft: 16,
  },
  saveButton: {
    backgroundColor: IOS.brand,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonDisabled: { opacity: 0.55 },
  saveButtonText: { color: '#fff', fontSize: 17, fontWeight: '600' },
});
