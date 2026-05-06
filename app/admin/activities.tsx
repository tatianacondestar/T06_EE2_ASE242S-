import { useActivities } from '@/context/activity-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Activity } from '@/context/activity-context';

const IOS = {
  bg: '#f2f2f7',
  card: '#ffffff',
  border: '#e5e5ea',
  separator: '#c6c6c8',
  brand: '#0A4A7A',
  textPrimary: '#1c1c1e',
  textSecondary: '#8e8e93',
  textTertiary: '#6e6e73',
  green: '#34c759',
  red: '#ff3b30',
  orange: '#ff9500',
};

type FilterTab = 'all' | 'active' | 'inactive';

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'active', label: 'Activas' },
  { key: 'inactive', label: 'Inactivas' },
];

export default function AdminActivities() {
  const router = useRouter();
  const { activities, isLoading, error, deleteActivity, restoreActivityById, reload } =
    useActivities();
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<FilterTab>('all');

  const filtered = activities.filter((a) => {
    const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTab =
      tab === 'all' ? true : tab === 'active' ? a.state === true : a.state === false;
    return matchSearch && matchTab;
  });

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Desactivar actividad', `¿Desactivar "${name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Desactivar',
        style: 'destructive',
        onPress: async () => {
          try { await deleteActivity(id); }
          catch { Alert.alert('Error', 'No se pudo desactivar la actividad'); }
        },
      },
    ]);
  };

  const handleRestore = (id: string, name: string) => {
    Alert.alert('Restaurar actividad', `¿Restaurar "${name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Restaurar',
        onPress: async () => {
          try { await restoreActivityById(id); }
          catch { Alert.alert('Error', 'No se pudo restaurar la actividad'); }
        },
      },
    ]);
  };

  const renderActivity = ({ item }: { item: Activity }) => (
    <View style={[styles.activityCard, !item.state && styles.activityCardInactive]}>
      <View style={styles.activityTitleRow}>
        <Text style={styles.activityName} numberOfLines={1}>{item.name}</Text>
        <View style={[styles.stateBadge, item.state ? styles.stateActive : styles.stateInactive]}>
          <Text style={styles.stateText}>{item.state ? 'Activa' : 'Inactiva'}</Text>
        </View>
      </View>

      {!!item.description && (
        <Text style={styles.activityDesc} numberOfLines={2}>{item.description}</Text>
      )}

      <View style={styles.metaRow}>
        {!!item.durationHours && (
          <View style={styles.metaPill}>
            <Ionicons name="time-outline" size={11} color={IOS.textSecondary} />
            <Text style={styles.metaText}>{item.durationHours}h</Text>
          </View>
        )}
        {!!item.price && (
          <View style={styles.metaPill}>
            <Ionicons name="cash-outline" size={11} color={IOS.textSecondary} />
            <Text style={styles.metaText}>S/ {item.price}</Text>
          </View>
        )}
        {!!item.difficulty && (
          <View style={styles.metaPill}>
            <Ionicons name="speedometer-outline" size={11} color={IOS.textSecondary} />
            <Text style={styles.metaText}>Dif. {item.difficulty}</Text>
          </View>
        )}
      </View>

      <View style={styles.cardSeparator} />

      <View style={styles.activityActions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => router.push({ pathname: '/admin/activity-edit', params: { id: item.id } })}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil-outline" size={14} color={IOS.brand} />
          <Text style={styles.editBtnText}>Editar</Text>
        </TouchableOpacity>

        {item.state ? (
          <TouchableOpacity
            style={styles.destructiveBtn}
            onPress={() => handleDelete(item.id, item.name)}
            activeOpacity={0.7}
          >
            <Ionicons name="eye-off-outline" size={14} color={IOS.red} />
            <Text style={styles.destructiveBtnText}>Desactivar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.restoreBtn}
            onPress={() => handleRestore(item.id, item.name)}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh-outline" size={14} color={IOS.green} />
            <Text style={styles.restoreBtnText}>Restaurar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Nav bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={26} color={IOS.brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Actividades</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color={IOS.textSecondary} />
          <TextInput
            placeholder="Buscar actividad..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor={IOS.textSecondary}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={IOS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Segmented control */}
      <View style={styles.segmentedSection}>
        <View style={styles.segmentedControl}>
          {TABS.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={[styles.segment, tab === t.key && styles.segmentActive]}
              onPress={() => setTab(t.key)}
              activeOpacity={0.8}
            >
              <Text style={[styles.segmentText, tab === t.key && styles.segmentTextActive]}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {!!error && (
        <View style={styles.errorBanner}>
          <Ionicons name="warning-outline" size={15} color="#fff" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {isLoading && activities.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={IOS.brand} />
          <Text style={styles.loadingText}>Cargando actividades...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderActivity}
          contentContainerStyle={styles.list}
          refreshing={isLoading}
          onRefresh={reload}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.largeTitle}>Actividades</Text>}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay actividades para mostrar</Text>}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/admin/activity-create')}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: IOS.bg },
  header: {
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
  headerTitle: { fontSize: 17, fontWeight: '600', color: IOS.textPrimary },
  searchSection: {
    backgroundColor: IOS.card,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9e9eb',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  searchInput: { flex: 1, fontSize: 15, color: IOS.textPrimary, padding: 0 },
  segmentedSection: {
    backgroundColor: IOS.card,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: IOS.separator,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#e9e9eb',
    borderRadius: 9,
    padding: 2,
  },
  segment: { flex: 1, paddingVertical: 6, alignItems: 'center', borderRadius: 7 },
  segmentActive: {
    backgroundColor: IOS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: { fontSize: 13, fontWeight: '500', color: IOS.textSecondary },
  segmentTextActive: { color: IOS.textPrimary, fontWeight: '600' },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: IOS.red,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  errorText: { color: '#fff', fontSize: 13 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { color: IOS.textSecondary, fontSize: 14 },
  list: { padding: 16, paddingBottom: 100 },
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: IOS.textPrimary,
    marginBottom: 16,
    marginTop: 4,
  },
  activityCard: {
    backgroundColor: IOS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: IOS.border,
    marginBottom: 12,
    padding: 14,
  },
  activityCardInactive: { opacity: 0.6 },
  activityTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: IOS.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  stateBadge: { borderRadius: 999, paddingHorizontal: 9, paddingVertical: 3 },
  stateActive: { backgroundColor: IOS.green },
  stateInactive: { backgroundColor: IOS.textSecondary },
  stateText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  activityDesc: { fontSize: 13, color: IOS.textSecondary, marginBottom: 10, lineHeight: 18 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: IOS.bg,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: IOS.border,
  },
  metaText: { fontSize: 11, color: IOS.textSecondary, fontWeight: '500' },
  cardSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: IOS.separator,
    marginBottom: 10,
  },
  activityActions: { flexDirection: 'row', gap: 10 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: IOS.brand,
    backgroundColor: '#f0f4f8',
  },
  editBtnText: { fontSize: 13, fontWeight: '600', color: IOS.brand },
  destructiveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: IOS.red,
    backgroundColor: '#fff5f5',
  },
  destructiveBtnText: { fontSize: 13, fontWeight: '600', color: IOS.red },
  restoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: IOS.green,
    backgroundColor: '#f0fff4',
  },
  restoreBtnText: { fontSize: 13, fontWeight: '600', color: IOS.green },
  emptyText: { textAlign: 'center', color: IOS.textSecondary, marginTop: 48, fontSize: 15 },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: IOS.brand,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
});
