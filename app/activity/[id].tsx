import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { activityDetails } from "@/constants/activities";

export default function ActivityDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const activity = activityDetails.find((item) => item.id === id);

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
            <Ionicons name="chevron-back" size={24} color="#fff" />
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
  container: { flex: 1, backgroundColor: "#ececec" },
  content: { paddingBottom: 24 },
  header: {
    backgroundColor: "#e58a24",
    paddingTop: 46,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  image: {
    width: "100%",
    height: 220,
  },
  title: {
    marginTop: 14,
    marginHorizontal: 16,
    color: "#0f3a64",
    fontSize: 28,
    fontWeight: "900",
  },
  subtitle: {
    marginHorizontal: 16,
    color: "#435b75",
    marginTop: 4,
    marginBottom: 10,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#d0d8df",
  },
  sectionTitle: { color: "#0f3a64", fontSize: 17, fontWeight: "900", marginBottom: 8 },
  item: { color: "#3a4b5d", marginBottom: 5 },
  bookButton: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#1f4ab0",
    borderRadius: 12,
    paddingVertical: 13,
  },
  bookButtonText: { color: "#fff", textAlign: "center", fontWeight: "800", fontSize: 17 },
  errorTitle: {
    marginTop: 80,
    textAlign: "center",
    color: "#0f3a64",
    fontSize: 24,
    fontWeight: "900",
  },
  backButton: {
    marginTop: 16,
    marginHorizontal: 40,
    backgroundColor: "#1f4ab0",
    borderRadius: 10,
    paddingVertical: 12,
  },
  backButtonText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
