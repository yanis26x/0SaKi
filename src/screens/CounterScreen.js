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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

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

// Ajoute/retire des images statiques ici
const IMAGES = [
  require("../../assets/lisa.jpg"),
  require("../../assets/CestTriste.jpg"),
  require("../../assets/BloodMask.jpeg"),
  require("../../assets/242pfp.jpeg"),
  require("../../assets/manhunt.jpg"),
  require("../../assets/loneCover.jpg"),
  require("../../assets/addicted_track_cover.jpg"),
  require("../../assets/lamp_cover.jpg"),
  require("../../assets/lucy_cover.png"),
  require("../../assets/parental2.jpg"),
];

export default function CounterScreen() {
  const [preview, setPreview] = useState(null);       // require(...) OU { uri }
  const [dynamicImages, setDynamicImages] = useState([]); // [{ uri: string }, ...]

  const addImage = () => {
    Alert.alert("Ajouter une image", "Source ?", [
      { text: "Caméra", onPress: takePhoto },
      { text: "Galerie", onPress: pickFromLibrary },
      { text: "Annuler", style: "cancel" },
    ]);
  };

  const pickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission requise", "Autorise l’accès à la galerie pour choisir une image.");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });

    if (!res.canceled && res.assets?.length) {
      setDynamicImages((prev) => [{ uri: res.assets[0].uri }, ...prev]);
    }
  };

  const takePhoto = async () => {
    const cam = await ImagePicker.requestCameraPermissionsAsync();
    if (!cam.granted) {
      Alert.alert("Permission requise", "Autorise l’accès à la caméra pour prendre une photo.");
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: false,
    });

    if (!res.canceled && res.assets?.length) {
      setDynamicImages((prev) => [{ uri: res.assets[0].uri }, ...prev]);
    }
  };

  // Data combinée: d’abord les images ajoutées, puis les statiques
  const DATA = [...dynamicImages, ...IMAGES];

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
      {/* Image accepte soit un require(number) soit { uri } */}
      <Image source={item} style={styles.thumb} />
    </Pressable>
  );

  const keyExtractor = (item, i) =>
    typeof item === "number" ? `static-${i}` : `dyn-${item.uri}`;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Galerie</Text>

      {/* Bouton Ajouter une image */}
      <Pressable style={styles.primaryBtn} onPress={addImage}>
        <Text style={styles.primaryBtnText}>Ajouter une image</Text>
        <Text style={styles.primaryBtnSub}>Depuis la caméra ou la galerie</Text>
      </Pressable>

      <FlatList
        data={DATA}
        keyExtractor={keyExtractor}
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

  // carte de tuile
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  thumb: { width: "100%", height: "100%" },

  // bouton "Ajouter une image"
  primaryBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
  primaryBtnSub: {
    color: "#E5E7EB",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 2,
  },

  // modal preview
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
