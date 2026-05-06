import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { activityDetails } from "@/constants/activities";
import { AppColors } from "@/constants/colors";

const filterChips = ["Todo", "Acuatico", "Aire", "Tierra", "Familiar", "Extremo"];
const recentSearches = ["Canotaje", "Zip Line", "Cuatrimotos"];

function mapCategory(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("canotaje")) return "Acuatico";
  if (lower.includes("zip")) return "Aire";
  if (lower.includes("rapel")) return "Extremo";
  if (lower.includes("caballo") || lower.includes("cuatrimoto")) return "Tierra";
  return "Familiar";
}

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todo");

  const displayed = useMemo(() => {
    return activityDetails.filter((item) => {
      const matchesQuery =
        query.trim().length === 0 ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.short.toLowerCase().includes(query.toLowerCase());
      const category = mapCategory(item.name);
      const matchesFilter = activeFilter === "Todo" || category === activeFilter;
      return matchesQuery && matchesFilter;
    });
  }, [query, activeFilter]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Buscar actividades</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={AppColors.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Canotaje, rapel, cuatrimoto..."
            placeholderTextColor={AppColors.textSecondary}
            style={styles.input}
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={18} color={AppColors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        <Text style={styles.sectionLabel}>Recientes</Text>
        <View style={styles.recentRow}>
          {recentSearches.map((term) => (
            <TouchableOpacity key={term} style={styles.recentChip} onPress={() => setQuery(term)}>
              <Text style={styles.recentText}>{term}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Filtrar por</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {filterChips.map((chip) => {
            const active = chip === activeFilter;
            return (
              <TouchableOpacity
                key={chip}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setActiveFilter(chip)}
              >
                <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{chip}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {displayed.length > 0 ? (
          <TouchableOpacity
            style={styles.featuredBlock}
            onPress={() => router.push({ pathname: "/activity/[id]", params: { id: displayed[0].id } })}
          >
            <Image source={{ uri: displayed[0].image }} style={styles.featuredImage} />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTag}>Mas reservada esta semana</Text>
              <Text style={styles.featuredTitle}>{displayed[0].name}</Text>
              <Text style={styles.featuredSubtitle} numberOfLines={2}>
                {displayed[0].short}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        <Text style={styles.sectionLabel}>Resultados</Text>
        {displayed.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="search-outline" size={24} color="#8e8e93" />
            <Text style={styles.emptyTitle}>No encontramos resultados</Text>
            <Text style={styles.emptySub}>Prueba con “Canotaje”, “Zip Line” o “Cuatrimotos”.</Text>
          </View>
        ) : (
          displayed.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.resultRow}
              onPress={() => router.push({ pathname: "/activity/[id]", params: { id: item.id } })}
            >
              <Image source={{ uri: item.image }} style={styles.resultThumb} />
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>{item.name}</Text>
                <Text style={styles.resultMeta}>{item.duration} · {item.level}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#c2c2c7" />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="home" size={24} color="#8e8e93" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#0a84ff" />
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
  container: { flex: 1, backgroundColor: AppColors.background },
  content: { paddingTop: 56, paddingHorizontal: 20, paddingBottom: 92 },
  title: { fontSize: 32, fontWeight: "700", color: AppColors.textPrimary, marginBottom: 12 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
    height: 50,
  },
  input: { marginLeft: 8, flex: 1, color: "#1d1d1d" },
  sectionLabel: {
    marginTop: 16,
    marginBottom: 8,
    color: AppColors.textPrimary,
    fontWeight: "600",
    fontSize: 17,
  },
  recentRow: {
    flexDirection: "row",
    gap: 8,
  },
  recentChip: {
    backgroundColor: AppColors.surface,
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  recentText: {
    color: "#3a3a3c",
    fontSize: 12,
    fontWeight: "500",
  },
  chipsRow: {
    gap: 8,
    paddingBottom: 2,
  },
  filterChip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5ea",
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: AppColors.primaryAction,
    borderColor: AppColors.primaryAction,
  },
  filterChipText: {
    color: "#3a3a3c",
    fontSize: 12,
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  featuredBlock: {
    marginTop: 12,
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
    overflow: "hidden",
  },
  featuredImage: {
    width: "100%",
    height: 132,
  },
  featuredContent: {
    padding: 12,
  },
  featuredTag: {
    color: "#0a84ff",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 2,
  },
  featuredTitle: {
    color: AppColors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  featuredSubtitle: {
    color: AppColors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  emptyBox: {
    backgroundColor: AppColors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: "center",
    paddingVertical: 22,
    paddingHorizontal: 16,
  },
  emptyTitle: {
    marginTop: 8,
    color: AppColors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  emptySub: {
    marginTop: 4,
    color: AppColors.textSecondary,
    fontSize: 12,
    textAlign: "center",
  },
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
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    color: "#1c1c1e",
    fontSize: 14,
    fontWeight: "600",
  },
  resultMeta: {
    color: "#6e6e73",
    marginTop: 2,
    fontSize: 12,
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
