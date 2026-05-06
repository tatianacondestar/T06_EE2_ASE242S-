import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  fetchCustomers,
  activateCustomer,
  deactivateCustomer,
  createCustomer,
  updateCustomer,
  getCustomerId,
  type CustomerBackend,
} from '@/src/api/customer.api';

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
  { key: 'all', label: 'Todos' },
  { key: 'active', label: 'Activos' },
  { key: 'inactive', label: 'Inactivos' },
];

const DOC_TYPES = ['DNI', 'Pasaporte', 'CE'];

type FormState = {
  name: string;
  lastName: string;
  docType: string;
  docNumber: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
};

const EMPTY_FORM: FormState = {
  name: '', lastName: '', docType: 'DNI',
  docNumber: '', email: '', phoneNumber: '', birthDate: '',
};

function customerToForm(c: CustomerBackend): FormState {
  return {
    name: c.name ?? '',
    lastName: c.lastName ?? '',
    docType: c.docType ?? 'DNI',
    docNumber: c.docNumber ?? '',
    email: c.email ?? '',
    phoneNumber: c.phoneNumber ?? '',
    birthDate: c.birthDate ?? '',
  };
}

// ─── Customer Form Modal ──────────────────────────────────────────────────────

type CustomerModalProps = {
  visible: boolean;
  editTarget: CustomerBackend | null;
  onClose: () => void;
  onSaved: (customer: CustomerBackend) => void;
};

function CustomerModal({ visible, editTarget, onClose, onSaved }: CustomerModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (visible) setForm(editTarget ? customerToForm(editTarget) : EMPTY_FORM);
  }, [visible, editTarget]);

  const set = (key: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    if (!form.name || !form.lastName || !form.email) {
      Alert.alert('Campos requeridos', 'Nombre, apellido y email son obligatorios.');
      return;
    }
    setIsSaving(true);
    try {
      const payload: Partial<CustomerBackend> = {
        name: form.name, lastName: form.lastName,
        docType: form.docType, docNumber: form.docNumber,
        email: form.email, phoneNumber: form.phoneNumber,
        birthDate: form.birthDate,
      };
      const result = editTarget
        ? await updateCustomer(getCustomerId(editTarget), payload)
        : await createCustomer(payload);
      onSaved(result);
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'No se pudo guardar el cliente.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={modalStyles.container}>
        <View style={modalStyles.navBar}>
          <TouchableOpacity onPress={onClose} disabled={isSaving}>
            <Text style={modalStyles.cancelBtn}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={modalStyles.navTitle}>
            {editTarget ? 'Editar Cliente' : 'Nuevo Cliente'}
          </Text>
          <TouchableOpacity onPress={handleSave} disabled={isSaving}>
            {isSaving
              ? <ActivityIndicator size="small" color={IOS.brand} />
              : <Text style={modalStyles.saveBtn}>Guardar</Text>
            }
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={modalStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={modalStyles.sectionHeader}>DATOS PERSONALES</Text>
          <View style={modalStyles.formCard}>
            <View style={modalStyles.fieldRow}>
              <Text style={modalStyles.fieldLabel}>Nombre</Text>
              <TextInput
                style={modalStyles.fieldInput}
                value={form.name}
                onChangeText={set('name')}
                placeholder="Nombre"
                placeholderTextColor={IOS.textTertiary}
                returnKeyType="next"
              />
            </View>
            <View style={modalStyles.fieldSeparator} />
            <View style={modalStyles.fieldRow}>
              <Text style={modalStyles.fieldLabel}>Apellido</Text>
              <TextInput
                style={modalStyles.fieldInput}
                value={form.lastName}
                onChangeText={set('lastName')}
                placeholder="Apellido"
                placeholderTextColor={IOS.textTertiary}
                returnKeyType="next"
              />
            </View>
          </View>

          <Text style={modalStyles.sectionHeader}>DOCUMENTO</Text>
          <View style={modalStyles.formCard}>
            <View style={modalStyles.fieldRow}>
              <Text style={modalStyles.fieldLabel}>Tipo</Text>
              <View style={modalStyles.docTypeRow}>
                {DOC_TYPES.map((dt) => (
                  <TouchableOpacity
                    key={dt}
                    style={[modalStyles.docTypeBtn, form.docType === dt && modalStyles.docTypeBtnActive]}
                    onPress={() => set('docType')(dt)}
                    activeOpacity={0.7}
                  >
                    <Text style={[modalStyles.docTypeBtnText, form.docType === dt && modalStyles.docTypeBtnTextActive]}>
                      {dt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={modalStyles.fieldSeparator} />
            <View style={modalStyles.fieldRow}>
              <Text style={modalStyles.fieldLabel}>Número</Text>
              <TextInput
                style={[modalStyles.fieldInput, { textAlign: 'right', color: IOS.textSecondary }]}
                value={form.docNumber}
                onChangeText={set('docNumber')}
                placeholder="Número de documento"
                placeholderTextColor={IOS.textTertiary}
                keyboardType="numeric"
                textAlign="right"
              />
            </View>
          </View>

          <Text style={modalStyles.sectionHeader}>CONTACTO</Text>
          <View style={modalStyles.formCard}>
            <View style={modalStyles.fieldRow}>
              <Text style={modalStyles.fieldLabel}>Email</Text>
              <TextInput
                style={[modalStyles.fieldInput, { textAlign: 'right', color: IOS.textSecondary }]}
                value={form.email}
                onChangeText={set('email')}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={IOS.textTertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                textAlign="right"
              />
            </View>
            <View style={modalStyles.fieldSeparator} />
            <View style={modalStyles.fieldRow}>
              <Text style={modalStyles.fieldLabel}>Teléfono</Text>
              <TextInput
                style={[modalStyles.fieldInput, { textAlign: 'right', color: IOS.textSecondary }]}
                value={form.phoneNumber}
                onChangeText={set('phoneNumber')}
                placeholder="Ej: 987654321"
                placeholderTextColor={IOS.textTertiary}
                keyboardType="phone-pad"
                textAlign="right"
              />
            </View>
          </View>

          <Text style={modalStyles.sectionHeader}>NACIMIENTO</Text>
          <View style={modalStyles.formCard}>
            <View style={modalStyles.fieldRow}>
              <Text style={modalStyles.fieldLabel}>Fecha</Text>
              <TextInput
                style={[modalStyles.fieldInput, { textAlign: 'right', color: IOS.textSecondary }]}
                value={form.birthDate}
                onChangeText={set('birthDate')}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={IOS.textTertiary}
                textAlign="right"
              />
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </Modal>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function AdminUsers() {
  const router = useRouter();
  const [customers, setCustomers] = useState<CustomerBackend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState<FilterTab>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [editTarget, setEditTarget] = useState<CustomerBackend | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (err: any) {
      setError(err?.message ?? 'Error al cargar clientes');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = customers.filter((c) => {
    const fullName = `${c.name ?? ''} ${c.lastName ?? ''}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      (c.email ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.docNumber ?? '').includes(searchQuery);
    const matchTab =
      tab === 'all' ? true : tab === 'active' ? c.state === true : c.state === false;
    return matchSearch && matchTab;
  });

  const openCreate = () => { setEditTarget(null); setModalVisible(true); };
  const openEdit = (c: CustomerBackend) => { setEditTarget(c); setModalVisible(true); };

  const handleSaved = (saved: CustomerBackend) => {
    setCustomers((prev) => {
      const savedId = getCustomerId(saved);
      const exists = prev.find((c) => getCustomerId(c) === savedId);
      return exists
        ? prev.map((c) => (getCustomerId(c) === savedId ? saved : c))
        : [saved, ...prev];
    });
    setModalVisible(false);
  };

  const handleToggleState = (customer: CustomerBackend) => {
    const willActivate = !customer.state;
    const action = willActivate ? 'activar' : 'desactivar';
    const customerId = getCustomerId(customer);
    Alert.alert(
      `${willActivate ? 'Activar' : 'Desactivar'} cliente`,
      `¿Deseas ${action} a ${customer.name} ${customer.lastName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: willActivate ? 'Activar' : 'Desactivar',
          style: willActivate ? 'default' : 'destructive',
          onPress: async () => {
            try {
              let updated: CustomerBackend;
              try {
                updated = willActivate
                  ? await activateCustomer(customerId)
                  : await deactivateCustomer(customerId);
              } catch {
                // Fallback: PUT con state
                updated = await updateCustomer(customerId, {
                  ...customer,
                  state: willActivate,
                });
              }
              setCustomers((prev) =>
                prev.map((c) => (getCustomerId(c) === customerId ? updated : c))
              );
            } catch (err: any) {
              Alert.alert('Error', err?.message ?? `No se pudo ${action} el cliente`);
            }
          },
        },
      ]
    );
  };

  const renderCustomer = ({ item }: { item: CustomerBackend }) => (
    <TouchableOpacity
      style={styles.customerCard}
      onPress={() => openEdit(item)}
      activeOpacity={0.75}
    >
      <View style={styles.customerRow}>
        <View style={[styles.avatarCircle, !item.state && styles.avatarInactive]}>
          <Text style={styles.avatarText}>{(item.name?.[0] ?? '?').toUpperCase()}</Text>
        </View>
        <View style={styles.customerInfo}>
          <View style={styles.nameBadgeRow}>
            <Text style={styles.customerName} numberOfLines={1}>
              {item.name} {item.lastName}
            </Text>
            <View style={[styles.stateBadge, item.state ? styles.stateActive : styles.stateInactive]}>
              <Text style={styles.stateText}>{item.state ? 'Activo' : 'Inactivo'}</Text>
            </View>
          </View>
          <Text style={styles.customerEmail} numberOfLines={1}>{item.email}</Text>
          {!!item.docNumber && (
            <Text style={styles.customerMeta}>{item.docType}: {item.docNumber}</Text>
          )}
          {!!item.phoneNumber && (
            <Text style={styles.customerMeta}>{item.phoneNumber}</Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={16} color={IOS.textTertiary} />
      </View>

      <View style={styles.cardSeparator} />

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtn, item.state ? styles.deactivateBtn : styles.activateBtn]}
          onPress={() => handleToggleState(item)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={item.state ? 'eye-off-outline' : 'eye-outline'}
            size={13}
            color={item.state ? IOS.orange : IOS.green}
          />
          <Text style={[styles.actionBtnText, { color: item.state ? IOS.orange : IOS.green }]}>
            {item.state ? 'Desactivar' : 'Activar'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={26} color={IOS.brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Clientes</Text>
        <TouchableOpacity onPress={load} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="refresh" size={22} color={IOS.brand} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color={IOS.textSecondary} />
          <TextInput
            placeholder="Buscar por nombre, email o documento..."
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

      {isLoading && customers.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={IOS.brand} />
          <Text style={styles.loadingText}>Cargando clientes...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => getCustomerId(item)}
          renderItem={renderCustomer}
          contentContainerStyle={styles.list}
          refreshing={isLoading}
          onRefresh={load}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.largeTitle}>Clientes</Text>}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay clientes para mostrar</Text>}
        />
      )}

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={openCreate} activeOpacity={0.85}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <CustomerModal
        visible={modalVisible}
        editTarget={editTarget}
        onClose={() => setModalVisible(false)}
        onSaved={handleSaved}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

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
  customerCard: {
    backgroundColor: IOS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: IOS.border,
    marginBottom: 12,
    padding: 14,
  },
  customerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: IOS.brand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInactive: { backgroundColor: IOS.textSecondary },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  customerInfo: { flex: 1 },
  nameBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  customerName: { fontSize: 15, fontWeight: '600', color: IOS.textPrimary, flex: 1 },
  stateBadge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  stateActive: { backgroundColor: IOS.green },
  stateInactive: { backgroundColor: IOS.textSecondary },
  stateText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  customerEmail: { fontSize: 12, color: IOS.textSecondary, marginBottom: 2 },
  customerMeta: { fontSize: 12, color: IOS.textTertiary, marginBottom: 1 },
  cardSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: IOS.separator,
    marginBottom: 10,
  },
  actionRow: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  activateBtn: { borderColor: IOS.green, backgroundColor: '#f0fff4' },
  deactivateBtn: { borderColor: IOS.orange, backgroundColor: '#fff8f0' },
  deleteBtn: { borderColor: IOS.red, backgroundColor: '#fff5f5' },
  actionBtnText: { fontSize: 12, fontWeight: '600' },
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

const modalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: IOS.bg },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 14,
    backgroundColor: IOS.card,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: IOS.separator,
  },
  navTitle: { fontSize: 17, fontWeight: '600', color: IOS.textPrimary },
  cancelBtn: { fontSize: 17, color: IOS.textSecondary },
  saveBtn: { fontSize: 17, fontWeight: '600', color: IOS.brand },
  scrollContent: { paddingHorizontal: 20 },
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
  fieldLabel: { fontSize: 16, color: IOS.textPrimary, flex: 1 },
  fieldInput: { flex: 1, fontSize: 16, color: IOS.textPrimary, padding: 0 },
  fieldSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: IOS.separator,
    marginLeft: 16,
  },
  docTypeRow: { flexDirection: 'row', gap: 6 },
  docTypeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: IOS.border,
    backgroundColor: IOS.bg,
  },
  docTypeBtnActive: { backgroundColor: IOS.brand, borderColor: IOS.brand },
  docTypeBtnText: { fontSize: 13, fontWeight: '500', color: IOS.textSecondary },
  docTypeBtnTextActive: { color: '#fff', fontWeight: '600' },
});
