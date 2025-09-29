import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

const COLORS = {
  bg: "#000000",
  text: "#ffffff",
  sub: "#9CA3AF",
  card: "#0c0c0c",
  border: "#1a1a1a",
  accent: "#3B82F6",
};

export default function MusicScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.center}>
        <Text style={styles.title}>Music</Text>
        <Text style={styles.sub}>À venir… (playlist / lecteur)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { color: COLORS.text, fontSize: 24, fontWeight: "800" },
  sub: { color: COLORS.sub, marginTop: 6 },
});
