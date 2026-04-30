import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";

const savedPlans = [
  { name: "Pack Aventura: Canotaje + Zip Line", price: "S/ 120" },
  { name: "Ruta Cuatrimoto Off-Road", price: "S/ 80" },
  { name: "Paseo a Caballo Familiar", price: "S/ 60" },
];

export default function SavedScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const topRightCircleSize = Math.max(width * 0.78, 250);
  const bottomLeftCircleSize = Math.max(width * 0.9, 290);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundLayer} pointerEvents="none">
        <View style={styles.orangeTop}>
          <View
            style={[
              styles.topRightCircle,
              {
                width: topRightCircleSize,
                height: topRightCircleSize,
                borderRadius: topRightCircleSize / 2,
                right: -topRightCircleSize * 0.5,
                bottom: -topRightCircleSize * 0.48,
              },
            ]}
          />
        </View>
        <View
          style={[
            styles.bottomLeftCircle,
            {
              width: bottomLeftCircleSize,
              height: bottomLeftCircleSize,
              borderRadius: bottomLeftCircleSize / 2,
              left: -bottomLeftCircleSize * 0.48,
              bottom: -bottomLeftCircleSize * 0.25,
            },
          ]}
        />
      </View>

      <Text style={styles.title}>Mis guardados</Text>
      <Text style={styles.subtitle}>Experiencias favoritas en Lunahuana</Text>

      {savedPlans.map((plan, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{plan.name}</Text>
          <Text style={styles.cardPrice}>{plan.price}</Text>
        </View>
      ))}

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Reserva flexible</Text>
        <Text style={styles.noteText}>
          Puedes solicitar cambio de fecha segun clima o imprevistos.
        </Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="home" size={24} color="#d7f2ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons name="search" size={24} color="#d7f2ff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="person" size={24} color="#d7f2ff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ececec", paddingTop: 56, paddingHorizontal: 20, overflow: "hidden" },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  orangeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 190,
    backgroundColor: "#e58a24",
  },
  topRightCircle: {
    position: "absolute",
    backgroundColor: "#1f4ab0",
  },
  bottomLeftCircle: {
    position: "absolute",
    backgroundColor: "#0f9ba7",
  },
  title: { fontSize: 31, fontWeight: "900", color: "#e28723", marginBottom: 4 },
  subtitle: { fontSize: 14, color: "#48607a", marginBottom: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#1f4ab0",
  },
  cardTitle: { color: "#203954", fontWeight: "700", marginBottom: 6 },
  cardPrice: { color: "#0f9ba7", fontWeight: "800" },
  noteBox: {
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#d0d8df",
  },
  noteTitle: { color: "#0f3a64", fontWeight: "900", marginBottom: 6 },
  noteText: { color: "#3a4b5d" },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0799a4",
    height: 64,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
