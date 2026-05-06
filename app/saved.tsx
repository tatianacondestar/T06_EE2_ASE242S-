import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "@/constants/colors";

const segments = ["Favoritos", "Para despues", "Recientes"] as const;

const savedPlans = [
  {
    name: "Canotaje en el rio Canete",
    price: "S/ 70",
    duration: "45 min",
    level: "Moderado",
    segment: "Favoritos",
    image:
      "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/97/59/a0.jpg",
  },
  {
    name: "Circuito en Cuatrimotos",
    price: "S/ 80",
    duration: "40 min",
    level: "Intermedio",
    segment: "Favoritos",
    image:
      "https://adventur.pe/wp-content/uploads/2024/08/paseo-en-cuatrimoto.webp",
  },
  {
    name: "Zip Line",
    price: "S/ 55",
    duration: "25 min",
    level: "Moderado",
    segment: "Para despues",
    image:
      "https://expedicioneslunahuana.com/wp-content/uploads/2026/02/dasd-2.png",
  },
  {
    name: "Paseo a Caballos",
    price: "S/ 60",
    duration: "35 min",
    level: "Familiar",
    segment: "Recientes",
    image:
      "https://www.jalara.pe/gallery/paseo-caballos/paseo-caballos.jpg",
  },
];

export default function SavedScreen() {
  const router = useRouter();
  const [activeSegment, setActiveSegment] = useState<(typeof segments)[number]>("Favoritos");

  const visiblePlans = useMemo(
    () => savedPlans.filter((plan) => plan.segment === activeSegment),
    [activeSegment]
  );

  const totalCost = visiblePlans.reduce((sum, item) => sum + Number(item.price.replace("S/ ", "")), 0);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Mis guardados</Text>
        <Text style={styles.subtitle}>Organiza tus aventuras en Lunahuana</Text>

        <View style={styles.segmentRow}>
          {segments.map((segment) => {
            const active = segment === activeSegment;
            return (
              <TouchableOpacity
                key={segment}
                style={[styles.segmentButton, active && styles.segmentButtonActive]}
                onPress={() => setActiveSegment(segment)}
              >
                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{segment}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{visiblePlans.length}</Text>
            <Text style={styles.statLabel}>Actividades</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>S/ {totalCost}</Text>
            <Text style={styles.statLabel}>Presupuesto aprox.</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Flexible</Text>
            <Text style={styles.statLabel}>Reserva</Text>
          </View>
        </View>

        {visiblePlans.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark-outline" size={26} color="#8e8e93" />
            <Text style={styles.emptyTitle}>Aun no guardaste actividades</Text>
            <TouchableOpacity style={styles.exploreBtn} onPress={() => router.replace("/search")}>
              <Text style={styles.exploreBtnText}>Explorar actividades</Text>
            </TouchableOpacity>
          </View>
        ) : (
          visiblePlans.map((plan, index) => (
            <View key={index} style={styles.resultRow}>
              <Image source={{ uri: plan.image }} style={styles.resultThumb} />
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>{plan.name}</Text>
                <Text style={styles.resultMeta}>{plan.duration} · {plan.level}</Text>
              </View>
              <View style={styles.resultActions}>
                <Text style={styles.resultPrice}>{plan.price}</Text>
                <TouchableOpacity
                  style={styles.bookBtnMini}
                  onPress={() => router.push("/activity/[id]")}
                >
                  <Text style={styles.bookBtnMiniText}>Reservar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>Te puede interesar</Text>
          <Text style={styles.noteText}>- Tour guiado por el valle</Text>
          <Text style={styles.noteText}>- Rapel en Lunahuana</Text>
          <Text style={styles.noteText}>- Zip Line para grupos</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="home" size={24} color="#8e8e93" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/search")}>
          <Ionicons name="search" size={24} color="#8e8e93" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark" size={22} color={AppColors.primaryAction} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Ionicons name="person" size={24} color="#8e8e93" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.background },
  content: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 92 },
  title: { fontSize: 32, fontWeight: "700", color: AppColors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 14, color: AppColors.textSecondary, marginBottom: 16 },
  segmentRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  segmentButton: {
    backgroundColor: AppColors.surface,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  segmentButtonActive: {
    backgroundColor: AppColors.primaryAction,
    borderColor: AppColors.primaryAction,
  },
  segmentText: {
    color: "#3a3a3c",
    fontSize: 12,
    fontWeight: "500",
  },
  segmentTextActive: {
    color: "#fff",
  },
  statsRow: {
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 14,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: { color: AppColors.textPrimary, fontSize: 14, fontWeight: "700" },
  statLabel: { color: AppColors.textSecondary, fontSize: 11, marginTop: 2 },
  statDivider: { width: 1, height: 24, backgroundColor: "#ececf1" },
  resultRow: {
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  resultThumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  resultInfo: { flex: 1 },
  resultTitle: { color: AppColors.textPrimary, fontSize: 14, fontWeight: "600" },
  resultMeta: { color: AppColors.textSecondary, marginTop: 2, fontSize: 12 },
  resultActions: { alignItems: "flex-end", gap: 6 },
  resultPrice: { color: AppColors.primaryAction, fontSize: 13, fontWeight: "700" },
  bookBtnMini: {
    backgroundColor: "#e9f2ff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  bookBtnMiniText: { color: AppColors.primaryAction, fontSize: 11, fontWeight: "700" },
  emptyState: {
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 10,
  },
  emptyTitle: { color: AppColors.textPrimary, fontWeight: "600", marginTop: 6, marginBottom: 8 },
  exploreBtn: {
    backgroundColor: AppColors.primaryAction,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  exploreBtnText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  noteBox: {
    marginTop: 8,
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
  },
  noteTitle: { color: AppColors.textPrimary, fontWeight: "700", marginBottom: 6 },
  noteText: { color: AppColors.textSecondary },
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
