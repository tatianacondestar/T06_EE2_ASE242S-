import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AppColors } from "@/constants/colors";
import { useActivities } from "@/context/activity-context";

export default function ActivityDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activities } = useActivities();
  const activity = activities.find((item) => item.id === id);

  if (!activity) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Actividad no encontrada</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/home")}>
          <Text style={styles.backButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={AppColors.primaryAction} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalle</Text>
          <View style={{ width: 24 }} />
        </View>

        <Image source={{ uri: activity.image }} style={styles.image} />
        <Text style={styles.title}>{activity.name}</Text>
        <Text style={styles.subtitle}>{activity.short}</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informacion general</Text>
          <Text style={styles.item}>Duracion: {activity.duration}</Text>
          <Text style={styles.item}>Nivel: {activity.level}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Incluye</Text>
          {activity.includes.map((detail, index) => (
            <Text key={index} style={styles.item}>
              - {detail}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Reservar actividad</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.background },
  content: { paddingBottom: 24 },
  header: {
    backgroundColor: AppColors.surface,
    paddingTop: 46,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
  },
  headerTitle: { color: AppColors.textPrimary, fontSize: 20, fontWeight: "700" },
  image: {
    width: "100%",
    height: 220,
  },
  title: {
    marginTop: 14,
    marginHorizontal: 16,
    color: AppColors.textPrimary,
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginHorizontal: 16,
    color: AppColors.textSecondary,
    marginTop: 4,
    marginBottom: 10,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  sectionTitle: { color: AppColors.textPrimary, fontSize: 17, fontWeight: "700", marginBottom: 8 },
  item: { color: AppColors.textSecondary, marginBottom: 5 },
  bookButton: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: AppColors.primaryAction,
    borderRadius: 14,
    paddingVertical: 13,
  },
  bookButtonText: { color: "#fff", textAlign: "center", fontWeight: "700", fontSize: 17 },
  errorTitle: {
    marginTop: 80,
    textAlign: "center",
    color: "#1c1c1e",
    fontSize: 24,
    fontWeight: "700",
  },
  backButton: {
    marginTop: 16,
    marginHorizontal: 40,
    backgroundColor: "#0a84ff",
    borderRadius: 12,
    paddingVertical: 12,
  },
  backButtonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
