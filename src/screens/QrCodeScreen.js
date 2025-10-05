import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

/* --------- Thème --------- */
const COLORS = {
  bg: "#000000",
  card: "#0c0c0c",
  text: "#ffffff",
  sub: "#9CA3AF",
  primary: "#3B82F6",
  border: "#1a1a1a",
};

export default function QrCodeScreen() {
  const [value, setValue] = useState("https://github.com/yanis26x");
  const qrRef = useRef(null);

  const handleShare = async () => {
    try {
      await Share.share({ message: value });
    } catch {
      Alert.alert("Oups", "Le partage a échoué.");
    }
  };

  const dismissKeyboard = () => Keyboard.dismiss();

  const saveQrToPhotos = async () => {
    try {
      // 1) Permission Photos
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (!perm.granted) {
        Alert.alert("Permission requise", "J’ai besoin d’accéder à ta galerie pour enregistrer l’image.");
        return;
      }

      // 2) Récupérer le PNG en base64
      if (!qrRef.current) {
        Alert.alert("Oups", "QR non prêt.");
        return;
      }
      qrRef.current.toDataURL(async (data) => {
        try {
          const pngUri = FileSystem.documentDirectory + "qr_code.png";
          await FileSystem.writeAsStringAsync(pngUri, data, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // 3) Sauver dans la galerie
          await MediaLibrary.saveToLibraryAsync(pngUri);
          Alert.alert("Enregistré ✅", "Le QR a été enregistré dans tes Photos.");
        } catch (e) {
          Alert.alert("Erreur", "Impossible d’enregistrer le QR.");
        }
      });
    } catch (e) {
      Alert.alert("Erreur", "Une erreur est survenue lors de l’enregistrement.");
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 24 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Titre */}
            <Text style={styles.title}>Générateur de QR</Text>

            {/* Saisie */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Contenu</Text>
              <TextInput
                value={value}
                onChangeText={setValue}
                placeholder="Tape un lien ou un texte"
                placeholderTextColor={COLORS.sub}
                style={styles.input}
                // Pas multiline => 'Terminé' du clavier ferme l’input
                multiline={false}
                blurOnSubmit
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
              />
              <View style={styles.inline}>
                <Text style={styles.helper}>Skittles got me feeling tranquil, they're so relieving</Text>

              </View>
            </View>

            {/* Aperçu */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Aperçu</Text>
              <View style={styles.qrWrap}>
                <View style={styles.qrInner}>
                  <QRCode
                    value={value || " "}
                    size={220}           // taille fixe
                    ecl="M"              // correction fixe
                    backgroundColor="transparent"
                    color={COLORS.text}
                    getRef={(c) => (qrRef.current = c)}
                  />
                </View>
              </View>
            </View>

            {/* Actions */}
<View style={styles.linksCard}>
  <Text style={styles.sectionTitle}>Actions</Text>

  {/* Bouton Enregistrer */}
  <TouchableOpacity activeOpacity={0.85} style={styles.row}>
    <View style={styles.rowTextWrap}>
      <Text style={styles.rowLabel}>Enregistrer dans Photos</Text>
      <Text style={styles.rowValue}>Sauvegarde le QR en image PNG</Text>
    </View>

    <TouchableOpacity
      onPress={saveQrToPhotos}
      activeOpacity={0.9}
      style={styles.smallBlueBtn}
    >
      <Text style={styles.smallBlueBtnText}>Enregistrer</Text>
    </TouchableOpacity>
  </TouchableOpacity>

  <View style={styles.divider} />

  {/* Bouton Partager */}
  <TouchableOpacity activeOpacity={0.85} style={styles.row}>
    <View style={styles.rowTextWrap}>
      <Text style={styles.rowLabel}>Partager</Text>
      <Text style={styles.rowValue}>Envoie le contenu via les apps</Text>
    </View>

    <TouchableOpacity
      onPress={handleShare}
      activeOpacity={0.9}
      style={styles.smallBlueBtn}
    >
      <Text style={styles.smallBlueBtnText}>Partager</Text>
    </TouchableOpacity>
  </TouchableOpacity>
</View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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

  /* Cartes */
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
  },
  linksCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    marginBottom: 16,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "900",
    paddingHorizontal: 2,
    paddingTop: 2,
    paddingBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    color: COLORS.text,
    backgroundColor: "#0e0e0e",
    minHeight: 50,
    fontWeight: "600",
  },
  helper: { color: COLORS.sub, fontSize: 12 },
  inline: { marginTop: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  smallBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  smallBtnText: { color: COLORS.text, fontWeight: "800", fontSize: 12 },

  qrWrap: { alignItems: "center", justifyContent: "center", paddingVertical: 6 },
  qrInner: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#0a0a0a",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  row: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTextWrap: { flexDirection: "column", flex: 1, paddingRight: 10 },
  rowLabel: { color: COLORS.text, fontWeight: "800", fontSize: 16 },
  rowValue: { color: COLORS.sub, fontSize: 13, marginTop: 2, fontWeight: "600" },
  rowAction: { color: COLORS.primary, fontWeight: "900" },

  divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.border, marginHorizontal: 14 },
  smallBlueBtn: {
  backgroundColor: COLORS.primary,
  borderRadius: 8,
  paddingHorizontal: 14,
  paddingVertical: 8,
  alignItems: "center",
  justifyContent: "center",
},
smallBlueBtnText: {
  color: "#fff",
  fontWeight: "800",
  fontSize: 13,
},
});
