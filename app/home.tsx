import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { activityDetails, bookingOptions } from "@/constants/activities";

const commitments = [
  "Aventura garantizada en cuatrimotos, zip line y canotaje.",
  "Guias certificados con experiencia en rutas de Lunahuana.",
  "Seguridad primero con equipos certificados.",
  "Mejor precio directo y reserva flexible.",
];

export default function Home() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      {menuVisible ? (
        <Pressable
          style={styles.menuBackdrop}
          onPress={() => setMenuVisible(false)}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.hero}>
          <View style={styles.heroTopRow}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
            <TouchableOpacity
              onPress={() => setMenuVisible((prev) => !prev)}
              style={styles.menuButton}
            >
              <Ionicons name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {menuVisible ? (
            <View style={styles.menuPanel}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setMenuVisible(false)}
              >
                <Ionicons name="home-outline" size={18} color="#0f3a64" />
                <Text style={styles.menuItemText}>Inicio</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  router.replace("/login");
                }}
              >
                <Ionicons name="log-out-outline" size={18} color="#0f3a64" />
                <Text style={styles.menuItemText}>Cerrar sesion</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <Text style={styles.heroTitle}>Hola{"\n"}Bienvenido</Text>
          <Text style={styles.heroSubtitle}>Expediciones Lunahuana - 20 anos de experiencia</Text>
          <View style={styles.heroCorner} />
        </View>

        <View style={styles.bookingSection}>
          <Text style={styles.bookingTitle}>RESERVA TUS ACTIVIDADES</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={190}
            decelerationRate="fast"
            contentContainerStyle={styles.bookingList}
          >
            {bookingOptions.map((item, index) => (
              <View key={index} style={styles.bookingCardWrap}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.bookingCard}
                />
                <View style={styles.bookingOverlay}>
                  <Text style={styles.bookingCardTitle}>{item.title}</Text>
                  <Text style={styles.bookingCardSub}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.dotsRow}>
            <Text style={styles.dotArrow}>{"<"}</Text>
            <Text style={styles.dotArrow}>{">"}</Text>
          </View>
        </View>

        <View style={styles.activitiesHeader}>
          <Text style={styles.activitiesTitle}>CONOCE LAS ACTIVIDADES</Text>
        </View>

        <View style={styles.grid}>
          {activityDetails.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.gridItem}
              onPress={() =>
                router.push({
                  pathname: "/activity/[id]",
                  params: { id: activity.id },
                })
              }
            >
              <Image
                source={{ uri: activity.image }}
                style={styles.gridImage}
              />
              <Text style={styles.gridLabel}>{activity.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>INFORMACION UTIL</Text>
          <Text style={styles.infoText}>
            - Ubicacion: Lunahuana, provincia de Canete.
          </Text>
          <Text style={styles.infoText}>
            - Horario recomendado: 9:00 am a 6:00 pm.
          </Text>
          <Text style={styles.infoText}>
            - Incluye guiado turistico y equipos de seguridad.
          </Text>
          <Text style={styles.infoText}>
            - Ideal para familias, grupos y paseos de fin de semana.
          </Text>
          <Text style={styles.infoText}>
            - Direccion: Av. Malecon Araoz N 101, Lunahuana.
          </Text>
          <Text style={styles.infoText}>- Contacto: +51 955 427 834</Text>
          <Text style={styles.infoText}>
            - Correo: info@expedicioneslunahuana.com
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>COMPROMISOS DE AVENTURA</Text>
          {commitments.map((item, index) => (
            <Text key={index} style={styles.infoText}>
              - {item}
            </Text>
          ))}
        </View>

      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons name="search" size={24} color="#d7f2ff" />
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
  container: {
    flex: 1,
    backgroundColor: "#e9edf1",
    overflow: "hidden",
  },
  scrollContent: {
    paddingBottom: 90,
  },
  menuBackdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 4,
  },
  hero: {
    backgroundColor: "#e28723",
    height: 220,
    paddingHorizontal: 24,
    paddingTop: 44,
    justifyContent: "space-between",
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    padding: 4,
    zIndex: 7,
  },
  menuPanel: {
    position: "absolute",
    top: 78,
    right: 20,
    width: 170,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    zIndex: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuItemText: {
    color: "#0f3a64",
    fontSize: 15,
    fontWeight: "600",
  },
  heroTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 42,
    lineHeight: 44,
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 18,
  },
  heroCorner: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 88,
    height: 74,
    backgroundColor: "#e9edf1",
    borderTopLeftRadius: 74,
  },
  bookingSection: {
    backgroundColor: "#1f4ab0",
    paddingVertical: 14,
  },
  bookingTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 12,
  },
  bookingList: {
    paddingHorizontal: 10,
    gap: 10,
    paddingBottom: 6,
  },
  bookingCardWrap: {
    width: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  bookingCard: {
    height: 250,
    borderWidth: 3,
    borderColor: "#d8d8d8",
  },
  bookingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  bookingCardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  bookingCardSub: {
    color: "#f2f2f2",
    fontSize: 12,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 18,
  },
  dotArrow: {
    color: "#fff",
    fontSize: 30,
  },
  activitiesHeader: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9bb0c2",
    height: 80,
    borderTopRightRadius: 120,
  },
  activitiesTitle: {
    color: "#0f3a64",
    fontWeight: "900",
    fontSize: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    rowGap: 14,
  },
  gridItem: {
    width: "48%",
  },
  gridImage: {
    width: "100%",
    height: 95,
    borderRadius: 12,
  },
  gridLabel: {
    marginTop: 6,
    textAlign: "center",
    color: "#114069",
    fontWeight: "700",
    fontSize: 13,
  },
  infoSection: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#d0d8df",
  },
  infoTitle: {
    color: "#0f3a64",
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 8,
  },
  infoText: {
    color: "#3a4b5d",
    fontSize: 13,
    marginBottom: 4,
  },
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
