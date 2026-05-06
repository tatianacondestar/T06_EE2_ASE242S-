import { AppColors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useActivities } from "@/context/activity-context";

const categories = [
  { label: "Canotaje", icon: "boat-outline" as const },
  { label: "Zip Line", icon: "flash-outline" as const },
  { label: "Cuatrimoto", icon: "car-sport-outline" as const },
  { label: "Caballos", icon: "paw-outline" as const },
];

const BOOKING_CARD_WIDTH = 210;
const BOOKING_CARD_GAP = 12;
const BOOKING_SNAP = BOOKING_CARD_WIDTH + BOOKING_CARD_GAP;
const MAPS_URL = "https://maps.app.goo.gl/7DwdBsMNQSTEny1y8";
const MAP_PREVIEW =
  "https://staticmap.openstreetmap.de/staticmap.php?center=-12.9726,-76.1437&zoom=14&size=800x320&markers=-12.9726,-76.1437,red-pushpin";

const bookingOptions = [
  {
    id: "canotaje",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/97/59/a0.jpg",
  },
  {
    id: "zip-line",
    image:
      "https://expedicioneslunahuana.com/wp-content/uploads/2026/02/dasd-2.png",
  },
  {
    id: "cuatrimotos",
    image:
      "https://adventur.pe/wp-content/uploads/2024/08/paseo-en-cuatrimoto.webp",
  },
];

export default function Home() {
  const router = useRouter();
  const { activities } = useActivities();
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeBookingIndex, setActiveBookingIndex] = useState(0);

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
            <Ionicons name="chevron-back" size={24} color="#8e8e93" />
            <TouchableOpacity
              onPress={() => setMenuVisible((prev) => !prev)}
              style={styles.menuButton}
            >
              <Ionicons name="menu" size={24} color="#8e8e93" />
            </TouchableOpacity>
          </View>

          {menuVisible ? (
            <View style={styles.menuPanel}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setMenuVisible(false)}
              >
                <Ionicons name="home-outline" size={18} color="#1c1c1e" />
                <Text style={styles.menuItemText}>Inicio</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  router.replace("/login");
                }}
              >
                <Ionicons name="log-out-outline" size={18} color="#1c1c1e" />
                <Text style={styles.menuItemText}>Cerrar sesion</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <Text style={styles.heroTitle}>HOLA BIENVENIDO</Text>
          <Text style={styles.heroSubtitle}>
            Aventura premium con estilo y seguridad
          </Text>
          <View style={styles.weatherCard}>
            <View>
              <Text style={styles.weatherTitle}>Hoy en Lunahuana</Text>
              <Text style={styles.weatherSub}>27 C · Cielo despejado</Text>
              <Text style={styles.weatherSub}>
                Rio Canete: condiciones favorables
              </Text>
            </View>
            <Ionicons name="sunny-outline" size={28} color="#0a84ff" />
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <View style={styles.categoryRow}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.label}
                style={styles.categoryItem}
              >
                <Ionicons name={category.icon} size={20} color="#0a84ff" />
                <Text style={styles.categoryLabel}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bookingSection}>
          <Text style={styles.bookingEyebrow}>Destacados</Text>
          <Text style={styles.bookingTitle}>Reserva tus actividades</Text>
          <Text style={styles.bookingSubtitle}>
            Experiencias premium en Lunahuana seleccionadas para hoy
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={BOOKING_SNAP}
            decelerationRate="fast"
            bounces={false}
            onMomentumScrollEnd={(event) => {
              const x = event.nativeEvent.contentOffset.x;
              const index = Math.round(x / BOOKING_SNAP);
              setActiveBookingIndex(index);
            }}
            contentContainerStyle={styles.bookingList}
          >
{bookingOptions.map((item, index) => {
              const act = activities.find((a) => a.id === item.id);
              return (
                <View key={item.id ?? index} style={styles.bookingCardWrap}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.bookingCard}
                  />
                  <View style={styles.bookingOverlay}>
                    <Text style={styles.bookingCardTitle}>
                      {act?.name ?? "Actividad"}
                    </Text>
                    <Text style={styles.bookingCardSub}>
                      {act?.short ?? "Aventura en Lunahuana"}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.paginationRow}>
            {bookingOptions.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.paginationDot,
                  index === activeBookingIndex && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Conoce las actividades</Text>
          <Text style={styles.sectionSubtitle}>
            Selecciona una experiencia para ver detalle, nivel y duracion
          </Text>
        </View>

<View style={styles.grid}>
           {activities.map((activity) => (
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
              <Image source={{ uri: activity.image }} style={styles.gridImage} />
              <View style={styles.gridOverlay}>
                <Text style={styles.gridLabel}>{activity.name}</Text>
                <Text style={styles.gridShort}>{activity.short}</Text>
                <View style={styles.gridMetaRow}>
                  <View style={styles.gridMetaPill}>
                    <Ionicons name="time-outline" size={12} color="#fff" />
                    <Text style={styles.gridMetaText}>{activity.duration}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Informacion util</Text>
          <TouchableOpacity
            style={styles.mapCard}
            onPress={() => Linking.openURL(MAPS_URL)}
          >
            <Image source={{ uri: MAP_PREVIEW }} style={styles.mapImage} />
            <View style={styles.mapOverlay}>
              <Ionicons name="location" size={16} color="#fff" />
              <Text style={styles.mapOverlayText}>Ubicacion de encuentro</Text>
            </View>
            <View style={styles.mapActionRow}>
              <Text style={styles.mapAddress}>Av. Malecon Araoz N 101 · Lunahuana</Text>
              <View style={styles.mapButton}>
                <Text style={styles.mapButtonText}>Abrir mapa</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.quickInfoRow}>
            <View style={styles.quickInfoItem}>
              <Ionicons name="location-outline" size={17} color="#0a84ff" />
              <View style={styles.quickInfoTextWrap}>
                <Text style={styles.quickInfoLabel}>Ubicacion</Text>
                <Text style={styles.quickInfoValue}>Av. Malecon Araoz N 101</Text>
              </View>
            </View>
            <View style={styles.quickInfoItem}>
              <Ionicons name="time-outline" size={17} color="#0a84ff" />
              <View style={styles.quickInfoTextWrap}>
                <Text style={styles.quickInfoLabel}>Horario</Text>
                <Text style={styles.quickInfoValue}>9:00 am a 6:00 pm</Text>
              </View>
            </View>
            <View style={styles.quickInfoItem}>
              <Ionicons name="call-outline" size={17} color="#0a84ff" />
              <View style={styles.quickInfoTextWrap}>
                <Text style={styles.quickInfoLabel}>Contacto</Text>
                <Text style={styles.quickInfoValue}>+51 955 427 834</Text>
              </View>
            </View>
            <View style={styles.quickInfoItem}>
              <Ionicons name="mail-outline" size={17} color="#0a84ff" />
              <View style={styles.quickInfoTextWrap}>
                <Text style={styles.quickInfoLabel}>Correo</Text>
                <Text style={styles.quickInfoValue}>info@expedicioneslunahuana.com</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Ionicons name="home" size={24} color={AppColors.primaryAction} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons name="search" size={24} color="#8e8e93" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/saved")}>
          <Ionicons name="bookmark" size={22} color="#8e8e93" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="person" size={24} color="#8e8e93" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  menuBackdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 4,
  },
  hero: {
    backgroundColor: AppColors.surface,
    paddingBottom: 14,
    paddingHorizontal: 24,
    paddingTop: 44,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border,
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
    backgroundColor: "#ffffff",
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
    color: AppColors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  heroTitle: {
    color: "#1c1c1e",
    fontWeight: "700",
    fontSize: 34,
    marginTop: 14,
  },
  heroSubtitle: {
    color: AppColors.textSecondary,
    fontSize: 15,
    marginTop: 4,
    marginBottom: 10,
  },
  weatherCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
    backgroundColor: "#fbfbfd",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherTitle: {
    color: AppColors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 3,
  },
  weatherSub: {
    color: AppColors.textSecondary,
    fontSize: 12,
  },
  sectionBlock: {
    marginTop: 14,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#1c1c1e",
    fontWeight: "700",
    fontSize: 24,
  },
  sectionSubtitle: {
    marginTop: 4,
    color: "#6e6e73",
    fontSize: 13,
  },
  categoryRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  categoryItem: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5ea",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    width: "23%",
  },
  categoryLabel: {
    fontSize: 11,
    color: "#1c1c1e",
    marginTop: 6,
    textAlign: "center",
  },
  bookingSection: {
    backgroundColor: "#f2f2f7",
    paddingTop: 14,
  },
  bookingEyebrow: {
    color: "#8e8e93",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.4,
    paddingHorizontal: 20,
    marginBottom: 3,
  },
  bookingTitle: {
    color: "#1c1c1e",
    fontSize: 29,
    fontWeight: "700",
    paddingHorizontal: 20,
  },
  bookingSubtitle: {
    color: "#6e6e73",
    fontSize: 14,
    paddingHorizontal: 20,
    marginTop: 3,
    marginBottom: 10,
  },
  bookingList: {
    paddingHorizontal: 20,
    gap: BOOKING_CARD_GAP,
    paddingBottom: 6,
  },
  bookingCardWrap: {
    width: BOOKING_CARD_WIDTH,
    borderRadius: 14,
    overflow: "hidden",
  },
  bookingCard: {
    height: 250,
    borderWidth: 1,
    borderColor: "#e5e5ea",
  },
  bookingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  bookingCardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  bookingCardSub: {
    color: "#f8f8f8",
    fontSize: 12,
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#d1d1d6",
  },
  paginationDotActive: {
    width: 20,
    backgroundColor: "#0a84ff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    rowGap: 14,
    columnGap: 10,
  },
  gridItem: {
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5ea",
  },
  gridImage: {
    width: "100%",
    height: 148,
  },
  gridOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.42)",
  },
  gridLabel: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  gridShort: {
    color: "#f2f2f7",
    fontSize: 11,
    marginTop: 2,
  },
  gridMetaRow: {
    marginTop: 8,
    flexDirection: "row",
  },
  gridMetaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(10,132,255,0.85)",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  gridMetaText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  infoSection: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  infoTitle: {
    color: "#1c1c1e",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 8,
  },
  infoText: {
    color: "#3a3a3c",
    fontSize: 13,
    marginBottom: 4,
  },
  quickInfoRow: {
    marginTop: 10,
    gap: 8,
  },
  mapCard: {
    marginTop: 2,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e5ea",
    backgroundColor: "#fff",
  },
  mapImage: {
    width: "100%",
    height: 130,
  },
  mapOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  mapOverlayText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  mapActionRow: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  mapAddress: {
    flex: 1,
    color: "#1c1c1e",
    fontSize: 12,
    fontWeight: "500",
  },
  mapButton: {
    borderRadius: 999,
    backgroundColor: "#e9f2ff",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  mapButtonText: {
    color: "#0a84ff",
    fontSize: 11,
    fontWeight: "700",
  },
  quickInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 10,
    backgroundColor: "#fbfbfd",
    borderWidth: 1,
    borderColor: "#e5e5ea",
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  quickInfoTextWrap: {
    flex: 1,
  },
  quickInfoLabel: {
    color: "#6e6e73",
    fontSize: 11,
    marginBottom: 1,
  },
  quickInfoValue: {
    color: "#1c1c1e",
    fontSize: 13,
    fontWeight: "500",
  },
  bottomBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: "#ffffff",
    height: 58,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e5ea",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
});
