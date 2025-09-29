import React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* --------- Thème (aligné avec MusicScreen) --------- */
const COLORS = {
  bg: "#000000",
  text: "#ffffff",
  sub: "#9CA3AF",
  card: "#0c0c0c",
  border: "#1a1a1a",
  primary: "#3B82F6",
};

function AppButton({ label, onPress, subtitle }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, pressed && { opacity: 0.9 }]}
    >
      <Text style={styles.btnText}>{label}</Text>
      {subtitle ? <Text style={styles.btnSub}>{subtitle}</Text> : null}
    </Pressable>
  );
}

export default function HomeScreen({ navigation }) {
  const goTab = (tabName) => {
    const parent = navigation.getParent?.();
    if (parent) parent.navigate("Tabs", { screen: tabName });
    else navigation.navigate(tabName);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Titre en haut à gauche */}
      <Text style={styles.title}>0Saki26x</Text>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Boutons bleus */}
        <AppButton
          label="Galerie"
          subtitle="Voir toutes les images"
          onPress={() => navigation.navigate("Counter")}
        />
        <AppButton
          label="Ajouter une image"
          subtitle="Depuis la caméra ou la galerie"
          onPress={() => navigation.navigate("AddImage")}
        />
        <AppButton
          label="Music"
          subtitle="Lecteur audio .mp4/.mp3"
          onPress={() => goTab("Music")}
        />

        {/* Bloc pro à la place du message simple */}
        <View style={styles.aboutCard}>
          <Text style={styles.aboutHeading}>À propos de 0Saki26x</Text>
          <Text style={styles.aboutText}>
            0Saki26x est une application mobile minimaliste qui réunit une galerie
            performante, l’ajout rapide d’images (caméra ou pellicule) et un lecteur
            audio compatible MP4/MP3. Pensée pour la vitesse et la clarté, elle adopte
            une interface sombre rehaussée d’accents bleus, optimisée pour iOS et Android.
          </Text>
          <Text style={styles.aboutBullets}>
            {"• Galerie : consultation fluide et plein écran.\n"}
            {"• Ajout : import instantané depuis tes médias.\n"}
            {"• Audio : lecture simple et fiable (.mp4/.m4a/.mp3)."}
          </Text>
          <Text style={styles.aboutFootnote}>Version interne — fonctionnalités en évolution.</Text>
        </View>
      </ScrollView>
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
  content: {
    paddingBottom: 20,
    gap: 12,
  },

  /* Boutons bleus */
  btn: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  btnText: { color: COLORS.text, fontSize: 16, fontWeight: "900" },
  btnSub: { color: COLORS.bg, opacity: 0.9, marginTop: 4, fontSize: 12, fontWeight: "700" },

  /* Bloc pro */
  aboutCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
  },
  aboutHeading: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },
  aboutText: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  aboutBullets: {
    color: COLORS.sub,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  aboutFootnote: {
    color: COLORS.sub,
    fontSize: 12,
    marginTop: 8,
  },
});
