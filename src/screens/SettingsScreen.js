import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* --------- Palette (bleu + contraste) --------- */
const COLORS = {
  bg: "#0A2540",
  card: "#112B4A",
  cardSoft: "#163457",
  text: "#E6F0FF",
  subtext: "#94A3B8",
  primary: "#3B82F6",
  border: "#1F3B66",
  white: "#FFFFFF",
};

const socials = [
  { label: "GitHub", value: "@yanis26x", url: "https://github.com/yanis26x" },
  { label: "LinkedIn", value: "@Yanis26x", url: "https://www.linkedin.com/in/yanis-djenadi-058964307/" },
  { label: "Instagram", value: "@yanis26x", url: "https://www.instagram.com/yanis26x/" },
  
];

export default function SettingsScreen() {
  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert("Oups", "Impossible d’ouvrir le lien.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.card}>
        <Text style={styles.title}>Paramètres</Text>
        <Text style={styles.desc}>
          Cette page n’est pas encore prête — reviens plus tard.{"\n"}
          <Text style={styles.italic}>Not done yet, come back later…</Text>
        </Text>
      </View>

      <View style={styles.cardSoft}>
        <Text style={styles.sectionTitle}>Mes réseaux</Text>

        {socials.map((s, i) => (
          <TouchableOpacity key={i} style={styles.row} onPress={() => openLink(s.url)} activeOpacity={0.8}>
            <View style={styles.rowTextWrap}>
              <Text style={styles.rowLabel}>{s.label}</Text>
              <Text style={styles.rowValue}>{s.value}</Text>
            </View>
            <Text style={styles.rowAction}>Ouvrir →</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardSoft: {
    backgroundColor: COLORS.cardSoft,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 22,
  },
  italic: {
    color: COLORS.subtext,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(17,43,74,0.5)",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTextWrap: {
    flexDirection: "column",
  },
  rowLabel: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 16,
  },
  rowValue: {
    color: COLORS.subtext,
    fontSize: 14,
    marginTop: 2,
  },
  rowAction: {
    color: COLORS.primary,
    fontWeight: "800",
  },
});
