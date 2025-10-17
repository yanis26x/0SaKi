import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* --------- Thème (aligné avec MusicScreen/Home) --------- */
const COLORS = {
  bg: "#000000",
  card: "#0c0c0c",
  text: "#ffffff",
  sub: "#9CA3AF",
  primary: "#3B82F6",
  border: "#1a1a1a",
};

/* --------- Réseaux sociaux (réordonné + site ajouté) --------- */
const socials = [
  { label: "Instagram", value: "@yanis26x", url: "https://www.instagram.com/yanis26x/" },
  { label: "Site Web", value: "yanis26x.github.io", url: "https://yanis26x.github.io/yanis26x/" },
  { label: "GitHub", value: "@yanis26x", url: "https://github.com/yanis26x" },
  { label: "LinkedIn", value: "@Yanis26x", url: "https://www.linkedin.com/in/yanis-djenadi-058964307/" },
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
      {/* Titre top-left */}
      <Text style={styles.title}>Paramètres</Text>

      {/* Info card */}
      <View style={styles.card}>
        <Text style={styles.desc}>
          Cette page n’est pas encore prête — reviens plus tard.{"\n"}
          {/* <Text style={styles.italic}>uh, what? Tryna beat that pussy up, tryna get that pussy wet </Text> */}
          {/* friendly version */}
          <Text style={styles.italic}>Do—dope sick, I'm having withdrawals, I feel uneasy</Text>
        </Text>
      </View>

      {/* Socials */}
      <View style={styles.linksCard}>
        <Text style={styles.sectionTitle}>Mes réseaux</Text>

        {socials.map((s, i) => (
          <View key={i}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.row}
              onPress={() => openLink(s.url)}
            >
              <View style={styles.rowTextWrap}>
                <Text style={styles.rowLabel}>{s.label}</Text>
                <Text style={styles.rowValue}>{s.value}</Text>
              </View>
              <Text style={styles.rowAction}>Ouvrir →</Text>
            </TouchableOpacity>

            {i < socials.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, paddingHorizontal: 16 },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 6,
    marginBottom: 12,
  },

  /* Carte info */
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
  },
  desc: { color: COLORS.text, fontSize: 14, lineHeight: 20, fontWeight: "600" },
  italic: { color: COLORS.sub, fontStyle: "italic" },

  /* Carte des liens */
  linksCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTextWrap: { flexDirection: "column" },
  rowLabel: { color: COLORS.text, fontWeight: "800", fontSize: 16 },
  rowValue: { color: COLORS.sub, fontSize: 13, marginTop: 2, fontWeight: "600" },
  rowAction: { color: COLORS.primary, fontWeight: "900" },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginHorizontal: 14,
  },
});

