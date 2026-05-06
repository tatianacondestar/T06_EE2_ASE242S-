import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchBookings, type BookingBackend } from '@/src/api/booking.api';

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
};

const PAYMENT_LABELS: Record<string, string> = {
  CASH: 'Efectivo', CARD: 'Tarjeta', TRANSFER: 'Transferencia',
  YAPE: 'Yape', PLIN: 'Plin', Efectivo: 'Efectivo', Yape: 'Yape',
};

export default function AdminBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingBackend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchBookings();
      setBookings(data);
    } catch (err: any) {
      setError(err?.message ?? 'Error al cargar reservas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('es-PE', {
        day: '2-digit', month: 'short', year: 'numeric',
      });
    } catch { return dateStr; }
  };

  const renderBooking = ({ item }: { item: BookingBackend }) => {
    const payMethod = item.payments?.[0]?.paymentMethod;
    const payLabel = payMethod ? (PAYMENT_LABELS[payMethod] ?? payMethod) : null;

    return (
      <View style={styles.bookingCard}>
        <View style={styles.customerRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(item.customer?.name?.[0] ?? '?').toUpperCase()}
            </Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{item.customer?.name ?? '—'}</Text>
            <Text style={styles.customerEmail}>{item.customer?.email ?? ''}</Text>
          </View>
          <View style={[styles.statusBadge, item.state ? styles.statusActive : styles.statusInactive]}>
            <Text style={styles.statusText}>{item.state ? 'Activa' : 'Inactiva'}</Text>
          </View>
        </View>

        <View style={styles.cardSeparator} />

        {item.details?.map((detail, idx) => (
          <View key={idx} style={styles.detailRow}>
            <Ionicons name="checkmark-circle" size={14} color={IOS.green} />
            <Text style={styles.detailText} numberOfLines={1}>{detail.activityName}</Text>
            <Text style={styles.detailQty}>×{detail.personnelQuantity}</Text>
            <Text style={styles.detailSubtotal}>S/ {detail.subTotal?.toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.cardSeparator} />

        <View style={styles.bookingFooter}>
          <View style={styles.footerLeft}>
            <View style={styles.footerItem}>
              <Ionicons name="calendar-outline" size={13} color={IOS.textSecondary} />
              <Text style={styles.footerText}>{formatDate(item.bookingDate)}</Text>
            </View>
            {payLabel && (
              <View style={styles.paymentBadge}>
                <Ionicons name="card-outline" size={11} color={IOS.brand} />
                <Text style={styles.paymentText}>{payLabel}</Text>
              </View>
            )}
          </View>
          <Text style={styles.totalText}>S/ {item.totalPay?.toFixed(2) ?? '0.00'}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={26} color={IOS.brand} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reservas</Text>
        <TouchableOpacity onPress={load} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="refresh" size={22} color={IOS.brand} />
        </TouchableOpacity>
      </View>

      {!!error && (
        <View style={styles.errorBanner}>
          <Ionicons name="warning-outline" size={15} color="#fff" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {isLoading && bookings.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={IOS.brand} />
          <Text style={styles.loadingText}>Cargando reservas...</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBooking}
          contentContainerStyle={styles.list}
          refreshing={isLoading}
          onRefresh={load}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<Text style={styles.largeTitle}>Reservas</Text>}
          ListEmptyComponent={<Text style={styles.emptyText}>No hay reservas registradas</Text>}
        />
      )}
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
  list: { padding: 16, paddingBottom: 40 },
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: IOS.textPrimary,
    marginBottom: 16,
    marginTop: 4,
  },
  bookingCard: {
    backgroundColor: IOS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: IOS.border,
    marginBottom: 12,
    padding: 14,
  },
  customerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: IOS.brand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  customerInfo: { flex: 1 },
  customerName: { fontSize: 16, fontWeight: '600', color: IOS.textPrimary },
  customerEmail: { fontSize: 12, color: IOS.textSecondary, marginTop: 1 },
  statusBadge: { borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4 },
  statusActive: { backgroundColor: IOS.green },
  statusInactive: { backgroundColor: IOS.textSecondary },
  statusText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  cardSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: IOS.separator,
    marginVertical: 10,
  },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 },
  detailText: { flex: 1, fontSize: 13, color: IOS.textPrimary },
  detailQty: { fontSize: 13, color: IOS.textSecondary, fontWeight: '500' },
  detailSubtotal: {
    fontSize: 13,
    color: IOS.textPrimary,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
  bookingFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontSize: 12, color: IOS.textSecondary },
  paymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#eef3f8',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: IOS.border,
  },
  paymentText: { fontSize: 11, color: IOS.brand, fontWeight: '600' },
  totalText: { fontSize: 16, fontWeight: '700', color: IOS.brand },
  emptyText: { textAlign: 'center', color: IOS.textSecondary, marginTop: 48, fontSize: 15 },
});
