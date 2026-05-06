import { useAuth } from '@/context/auth-context';
import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IOS = {
  bg: '#f2f2f7',
  card: '#ffffff',
  border: '#e5e5ea',
  separator: '#c6c6c8',
  blue: '#0a84ff',
  brand: '#0A4A7A',
  textPrimary: '#1c1c1e',
  textSecondary: '#8e8e93',
  textTertiary: '#6e6e73',
  green: '#34c759',
  red: '#ff3b30',
  orange: '#ff9500',
};

type MenuItem = {
  label: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  route: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Actividades',
    subtitle: 'Gestionar actividades turísticas',
    icon: 'map-outline',
    iconBg: IOS.brand,
    route: '/admin/activities',
  },
  {
    label: 'Clientes',
    subtitle: 'Administrar clientes registrados',
    icon: 'people-outline',
    iconBg: '#5856d6',
    route: '/admin/users',
  },
  {
    label: 'Reservas',
    subtitle: 'Ver y gestionar reservas',
    icon: 'calendar-outline',
    iconBg: '#30b0c7',
    route: '/admin/bookings',
  },
  {
    label: 'Ver Sitio',
    subtitle: 'Cambiar a vista de usuario',
    icon: 'eye-outline',
    iconBg: '#8e8e93',
    route: '/home',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Large title header */}
        <View style={styles.titleSection}>
          <Text style={styles.largeTitle}>Panel Admin</Text>
          <Text style={styles.greeting}>Bienvenido, {user?.name ?? 'Administrador'}</Text>
        </View>

        {/* Grouped menu list */}
        <Text style={styles.sectionLabelText}>MENÚ PRINCIPAL</Text>
        <View style={styles.card}>
          {MENU_ITEMS.map((item, index) => (
            <View key={item.route}>
              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => router.push(item.route as any)}
                activeOpacity={0.6}
              >
                <View style={[styles.iconSquare, { backgroundColor: item.iconBg }]}>
                  <Ionicons name={item.icon} size={20} color="#fff" />
                </View>
                <View style={styles.menuTextBlock}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={17} color={IOS.textTertiary} />
              </TouchableOpacity>
              {index < MENU_ITEMS.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>

        {/* Logout */}
        <Text style={[styles.sectionLabelText, { marginTop: 28 }]}>SESIÓN</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.menuRow} onPress={logout} activeOpacity={0.6}>
            <View style={[styles.iconSquare, { backgroundColor: IOS.red }]}>
              <Ionicons name="log-out-outline" size={20} color="#fff" />
            </View>
            <View style={styles.menuTextBlock}>
              <Text style={[styles.menuLabel, { color: IOS.red }]}>Cerrar Sesión</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: IOS.bg,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  titleSection: {
    paddingTop: 56,
    paddingBottom: 8,
  },
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: IOS.textPrimary,
    letterSpacing: 0.3,
  },
  greeting: {
    fontSize: 15,
    color: IOS.textSecondary,
    marginTop: 4,
  },
  sectionLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: IOS.textSecondary,
    letterSpacing: 0.5,
    marginTop: 28,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: IOS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: IOS.border,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 14,
  },
  iconSquare: {
    width: 34,
    height: 34,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTextBlock: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: IOS.textPrimary,
  },
  menuSubtitle: {
    fontSize: 12,
    color: IOS.textSecondary,
    marginTop: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: IOS.separator,
    marginLeft: 64,
  },
});
