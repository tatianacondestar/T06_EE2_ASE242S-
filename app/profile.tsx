import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppColors } from "@/constants/colors";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Ionicons name="person-circle" size={76} color={AppColors.primaryAction} />
          <Text style={styles.name}>Expediciones Lunahuana</Text>
          <Text style={styles.role}>Operador turistico de aventura</Text>
          <Text style={styles.memberTag}>Cuenta verificada</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>20+</Text>
            <Text style={styles.statLabel}>Años experiencia</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Actividades</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5.0</Text>
            <Text style={styles.statLabel}>Calificacion</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Contacto</Text>
          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={16} color={AppColors.primaryAction} />
            <Text style={styles.infoText}>+51 955 427 834</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={16} color={AppColors.primaryAction} />
            <Text style={styles.infoText}>info@expedicioneslunahuana.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color={AppColors.primaryAction} />
            <Text style={styles.infoText}>
              Av. Malecon Araoz N 101 · Lunahuana
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Acciones rapidas</Text>
          <TouchableOpacity style={styles.actionRow}>
            <Ionicons name="calendar-outline" size={18} color={AppColors.textPrimary} />
            <Text style={styles.actionText}>Mis reservas</Text>
            <Ionicons name="chevron-forward" size={16} color="#c2c2c7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Ionicons name="heart-outline" size={18} color={AppColors.textPrimary} />
            <Text style={styles.actionText}>Favoritos y wishlist</Text>
            <Ionicons name="chevron-forward" size={16} color="#c2c2c7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={18}
              color={AppColors.textPrimary}
            />
            <Text style={styles.actionText}>Soporte y ayuda</Text>
            <Ionicons name="chevron-forward" size={16} color="#c2c2c7" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => router.replace("/login")}
        >
          <Ionicons name="log-out-outline" size={17} color="#ff3b30" />
          <Text style={styles.logoutText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="home" size={24} color="#8e8e93" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons name="search" size={24} color="#8e8e93" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/saved")}>
          <Ionicons name="bookmark" size={22} color="#8e8e93" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color={AppColors.primaryAction} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.background },
  content: { paddingBottom: 92 },
  header: {
    backgroundColor: AppColors.surface,
    paddingTop: 52,
    paddingBottom: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  name: { color: AppColors.textPrimary, fontSize: 24, fontWeight: "700", marginTop: 2 },
  role: { color: AppColors.textSecondary, fontSize: 14, marginTop: 3 },
  memberTag: {
    marginTop: 10,
    color: AppColors.primaryAction,
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: "#e9f2ff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statsRow: {
    marginHorizontal: 18,
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { color: AppColors.textPrimary, fontSize: 16, fontWeight: "700" },
  statLabel: { color: AppColors.textSecondary, fontSize: 11, marginTop: 2 },
  statDivider: { width: 1, height: 24, backgroundColor: "#ececf1" },
  infoCard: {
    marginHorizontal: 18,
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  sectionTitle: {
    color: AppColors.textPrimary,
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 17,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  infoText: { color: "#3a3a3c", flex: 1 },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f3",
    paddingVertical: 12,
  },
  actionText: { flex: 1, color: AppColors.textPrimary, fontSize: 14, fontWeight: "500" },
  logoutBtn: {
    marginHorizontal: 18,
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ffd8d5",
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  logoutText: { color: "#ff3b30", fontWeight: "600", fontSize: 14 },
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: AppColors.surface,
    height: 58,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: AppColors.border,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
});
