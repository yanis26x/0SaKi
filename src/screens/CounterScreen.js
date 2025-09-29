import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// même palette noire que ton AppNavigator
const COLORS = {
  bg: "#000000",
  card: "#0c0c0c",
  text: "#ffffff",
  sub: "#9CA3AF",
  border: "#1a1a1a",
  accent: "#3B82F6",
};

const W = Dimensions.get("window").width;
const GAP = 10;
const COLS = 2;
const ITEM_W = Math.floor((W - GAP * (COLS + 1)) / COLS);
const ITEM_H = Math.floor(ITEM_W * 1.1);

// Ajoute/retire des images ici
const IMAGES = [
  require("../../assets/lisa.jpg"),
  require("../../assets/CestTriste.jpg"),
  require("../../assets/BloodMask.jpeg"),
  require("../../assets/242pfp.jpeg"),
  require("../../assets/manhunt.jpg"),
  require("../../assets/loneCover.jpg"),
  require("../../assets/addicted_track_cover.jpg"),
  require("../../assets/archive2Cover.jpg"),
  require("../../assets/parental1.jpg"),
  require("../../assets/parental2.jpg"),
];

export default function CounterScreen() {
  const [preview, setPreview] = useState(null); // source require(...) sélectionnée

  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => setPreview(item)}
      style={({ pressed }) => [
        styles.card,
        {
          opacity: pressed ? 0.85 : 1,
          marginLeft: GAP,
          marginTop: GAP,
          width: ITEM_W,
          height: ITEM_H,
        },
      ]}
    >
      <Image source={item} style={styles.thumb} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Galerie</Text>

      <FlatList
        data={IMAGES}
        keyExtractor={(_, i) => String(i)}
        numColumns={COLS}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16, paddingRight: GAP }}
        showsVerticalScrollIndicator={false}
      />

      {/* Preview plein écran */}
      <Modal
        visible={!!preview}
        transparent
        animationType="fade"
        onRequestClose={() => setPreview(null)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setPreview(null)}>
          <View style={styles.modalCard} pointerEvents="box-none">
            {preview && (
              <Image source={preview} style={styles.full} resizeMode="contain" />
            )}
            <Pressable style={styles.closeBtn} onPress={() => setPreview(null)}>
              <Text style={styles.closeText}>Fermer</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 16 },
  title: { color: COLORS.text, fontSize: 22, fontWeight: "800", marginBottom: 6 },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  thumb: { width: "100%", height: "100%" },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  full: { width: "100%", height: Dimensions.get("window").height * 0.75 },
  closeBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  closeText: { color: COLORS.text, fontWeight: "800" },
});
