import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";

const activities = [
  "Canotaje en el rio Canete",
  "Zip Line",
  "Circuito en Cuatrimotos",
  "Paseo a Caballos",
  "Rapel en Lunahuana",
  "Tour Guiado",
];

export default function SearchScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
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

      <Text style={styles.title}>Buscar actividades</Text>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#1f4ab0" />
        <TextInput
          placeholder="Ej: canotaje, rapel, cuatrimoto..."
          placeholderTextColor="#5c6b7d"
          style={styles.input}
        />
      </View>

      <Text style={styles.subtitle}>Sugerencias</Text>
      {activities.map((item, index) => (
        <View key={index} style={styles.item}>
          <Ionicons name="navigate-outline" size={17} color="#0f9ba7" />
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="home" size={24} color="#d7f2ff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/saved")}>
          <Ionicons name="bookmark" size={22} color="#d7f2ff" />
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
  title: { fontSize: 31, fontWeight: "900", color: "#e28723", marginBottom: 12 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#cfd9e3",
    height: 50,
  },
  input: { marginLeft: 8, flex: 1, color: "#1d1d1d" },
  subtitle: { marginTop: 22, marginBottom: 10, color: "#0f3a64", fontWeight: "800", fontSize: 18 },
  item: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemText: { color: "#2a3f59", fontWeight: "600" },
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
