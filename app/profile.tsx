import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";

export default function ProfileScreen() {
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

      <View style={styles.header}>
        <Ionicons name="person-circle" size={76} color="#fff" />
        <Text style={styles.name}>Expediciones Lunahuana</Text>
        <Text style={styles.role}>Operador turistico de aventura</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Contacto</Text>
        <Text style={styles.infoText}>Telefono: +51 955 427 834</Text>
        <Text style={styles.infoText}>Correo: info@expedicioneslunahuana.com</Text>
        <Text style={styles.infoText}>Direccion: Av. Malecon Araoz N 101</Text>
        <Text style={styles.infoText}>LunahuanA - Canete</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Servicios principales</Text>
        <Text style={styles.infoText}>- Circuito en Cuatrimotos</Text>
        <Text style={styles.infoText}>- Zip Line</Text>
        <Text style={styles.infoText}>- Canotaje</Text>
        <Text style={styles.infoText}>- Paseo a Caballos</Text>
        <Text style={styles.infoText}>- Rapel y Tour Guiado</Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="home" size={24} color="#d7f2ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons name="search" size={24} color="#d7f2ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/saved")}>
          <Ionicons name="bookmark" size={22} color="#d7f2ff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ececec", overflow: "hidden" },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  orangeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
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
  header: {
    backgroundColor: "transparent",
    paddingTop: 52,
    paddingBottom: 24,
    alignItems: "center",
  },
  name: { color: "#fff", fontSize: 24, fontWeight: "900", marginTop: 2 },
  role: { color: "#fff", fontSize: 14, marginTop: 3 },
  infoCard: {
    marginHorizontal: 18,
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#d0d8df",
  },
  sectionTitle: { color: "#0f3a64", fontWeight: "900", marginBottom: 8, fontSize: 17 },
  infoText: { color: "#3a4b5d", marginBottom: 4 },
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
