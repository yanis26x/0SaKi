import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

import lisaIMG from "../../assets/lisa.jpg";
import cestTristeIMG from "../../assets/CestTriste.jpg";
import bloodMaskIMG from "../../assets/BloodMask.jpeg";
import imgCustom from "../../assets/242pfp.jpeg";

export default function DetailsScreen({ route }) {
  const { initialItem } = route.params || {};
  const screenWidth = Dimensions.get("window").width;

  // Données par défaut (ex-"poidsParAge")
  const seriesByYearDefault = {
    Alpha: [10, 15, 20, 25, 35],
    Beta: [1, 2, 4, 5, 6],
    Gamma: [5, 6, 8, 9, 10],
  };
  const yearLabels = ["Année 1", "Année 2", "Année 3", "Année 4", "Année 5"];

  // États principaux
  const [selectedItem, setSelectedItem] = useState(
    initialItem || "Choisis un élément"
  );
  const [years, setYears] = useState(0);
  const [value, setValue] = useState(0);
  const [tagColor, setTagColor] = useState("");
  const [likesAlpha, setLikesAlpha] = useState(0);
  const [likesBeta, setLikesBeta] = useState(0);
  const [likesGamma, setLikesGamma] = useState(0);
  const [likes, setLikes] = useState(0);

  const [chartData, setChartData] = useState([]);

  // Animations like
  const [scaleAlpha] = useState(new Animated.Value(1));
  const [scaleBeta] = useState(new Animated.Value(1));
  const [scaleGamma] = useState(new Animated.Value(1));

  // Éléments personnalisés
  const [seriesByYear, setSeriesByYear] = useState(seriesByYearDefault);
  const [customItems, setCustomItems] = useState([]);

  // Modal ajout
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newYears, setNewYears] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newColor, setNewColor] = useState("");

  const animateLike = (scale) => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Sync infos affichées + graphe
  useEffect(() => {
    if (selectedItem === "Alpha") {
      setYears(3);
      setValue(30);
      setTagColor("Bleu foncé");
      setLikes(likesAlpha);
    } else if (selectedItem === "Beta") {
      setYears(2);
      setValue(3);
      setTagColor("Ciel");
      setLikes(likesBeta);
    } else if (selectedItem === "Gamma") {
      setYears(4);
      setValue(10);
      setTagColor("Glacier");
      setLikes(likesGamma);
    } else {
      // Élément perso ou placeholder
      const found = customItems.find((x) => x.name === selectedItem);
      if (found) {
        setYears(found.years);
        setValue(found.value);
        setTagColor(found.color);
        setLikes(0);
      } else {
        setYears(0);
        setValue(0);
        setTagColor("");
        setLikes(0);
      }
    }

    if (seriesByYear[selectedItem]) {
      setChartData(seriesByYear[selectedItem]);
    } else {
      setChartData(new Array(yearLabels.length).fill(0));
    }
  }, [
    selectedItem,
    likesAlpha,
    likesBeta,
    likesGamma,
    seriesByYear,
    customItems,
  ]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Bouton ajouter un élément */}
      <TouchableOpacity
        onPress={() => setModalOpen(true)}
        style={styles.primaryBtn}
      >
        <Text style={styles.primaryBtnText}>AJOUTER UN ÉLÉMENT</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{selectedItem}</Text>

      {/* Carte sélection + likes */}
      <View style={styles.card}>
        {/* LISA */}
        <Image style={styles.image} source={lisaIMG} />
        <TouchableOpacity
          onPress={() => setSelectedItem("Alpha")}
          style={styles.chip}
        >
          <Text style={styles.chipText}>Lisa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLikesAlpha((p) => p + 1);
            animateLike(scaleAlpha);
          }}
          style={styles.likeBtn}
        >
          <Animated.Text
            style={[styles.likeText, { transform: [{ scale: scaleAlpha }] }]}
          >
            ❤️ {likesAlpha}
          </Animated.Text>
        </TouchableOpacity>

        {/* cestTriste */}
        <Image style={styles.image} source={cestTristeIMG} />
        <TouchableOpacity
          onPress={() => setSelectedItem("Beta")}
          style={styles.chip}
        >
          <Text style={styles.chipText}>Cest Triste</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLikesBeta((p) => p + 1);
            animateLike(scaleBeta);
          }}
          style={styles.likeBtn}
        >
          <Animated.Text
            style={[styles.likeText, { transform: [{ scale: scaleBeta }] }]}
          >
            ❤️ {likesBeta}
          </Animated.Text>
        </TouchableOpacity>

        {/* bloodMask */}
        <Image style={styles.image} source={bloodMaskIMG} />
        <TouchableOpacity
          onPress={() => setSelectedItem("Gamma")}
          style={styles.chip}
        >
          <Text style={styles.chipText}>BloodMask</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setLikesGamma((p) => p + 1);
            animateLike(scaleGamma);
          }}
          style={styles.likeBtn}
        >
          <Animated.Text
            style={[styles.likeText, { transform: [{ scale: scaleGamma }] }]}
          >
            ❤️ {likesGamma}
          </Animated.Text>
        </TouchableOpacity>

        {/* Custom items */}
        {customItems.length > 0 &&
          customItems.map((it, idx) => (
            <View key={idx}>
              <Image style={styles.image} source={imgCustom} />
              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(it.name);
                  setYears(it.years);
                  setValue(it.value);
                  setTagColor(it.color);
                  setLikes(0);
                }}
                style={styles.chip}
              >
                <Text style={styles.chipText}>{it.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>

      {/* Détails */}
      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Détails</Text>
        <Text style={styles.detailLine}>
          <Text style={styles.detailLabel}>Nom : </Text>
          {selectedItem}
        </Text>
        <Text style={styles.detailLine}>
          <Text style={styles.detailLabel}>Années : </Text>
          {years}
        </Text>
        <Text style={styles.detailLine}>
          <Text style={styles.detailLabel}>Valeur : </Text>
          {value}
        </Text>
        <Text style={styles.detailLine}>
          <Text style={styles.detailLabel}>Couleur : </Text>
          {tagColor}
        </Text>
        <Text style={styles.detailLine}>
          <Text style={styles.detailLabel}>Likes : </Text>
          {likes}
        </Text>
      </View>

      {/* Graphique */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Évolution de l’élément</Text>
        {chartData.length === yearLabels.length && (
          <LineChart
            data={{
              labels: yearLabels,
              datasets: [
                { data: chartData.map((v) => (isFinite(v) ? Number(v) : 0)) },
              ],
            }}
            width={Math.max(screenWidth - 32, 300)}
            height={220}
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: COLORS.card,
              backgroundGradientFrom: COLORS.card,
              backgroundGradientTo: COLORS.card,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // bleu
              labelColor: (opacity = 1) => `rgba(15, 23, 42, ${opacity})`, // slate-900
              style: { borderRadius: 16 },
              propsForDots: { r: "5", strokeWidth: "2", stroke: COLORS.primary },
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        )}
      </View>

      {/* Modal ajout */}
      <Modal
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        transparent
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>ENTRE LES INFOS !</Text>
            <TextInput
              placeholder="NOM"
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
              placeholderTextColor="#64748B"
            />
            <TextInput
              placeholder="ANNÉES"
              keyboardType="numeric"
              value={newYears}
              onChangeText={setNewYears}
              style={styles.input}
              placeholderTextColor="#64748B"
            />
            <TextInput
              placeholder="VALEUR"
              keyboardType="numeric"
              value={newValue}
              onChangeText={setNewValue}
              style={styles.input}
              placeholderTextColor="#64748B"
            />
            <TextInput
              placeholder="COULEUR"
              value={newColor}
              onChangeText={setNewColor}
              style={styles.input}
              placeholderTextColor="#64748B"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalOpen(false)}
                style={styles.secondaryBtn}
              >
                <Text style={styles.secondaryBtnText}>ANNULER</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  const name = newName || "SANS NOM";
                  const yearsNum = Number(newYears) || 0;
                  const valueNum = Number(newValue) || 0;
                  const colorTxt = newColor || "SANS COULEUR";

                  setCustomItems((prev) => [
                    ...prev,
                    { name, years: yearsNum, value: valueNum, color: colorTxt },
                  ]);

                  const serie = Array(yearLabels.length).fill(valueNum);
                  setSeriesByYear((m) => ({ ...m, [name]: serie }));

                  setSelectedItem(name);
                  setYears(yearsNum);
                  setValue(valueNum);
                  setTagColor(colorTxt);
                  setLikes(0);

                  setNewName("");
                  setNewYears("");
                  setNewValue("");
                  setNewColor("");
                  setModalOpen(false);
                }}
                style={styles.primaryBtn}
              >
                <Text style={styles.primaryBtnText}>AJOUTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

/* --------- Palette (bleu + contraste) --------- */
const COLORS = {
  bg: "#0A2540", // fond bleu très foncé
  text: "#E6F0FF",
  subtext: "#94A3B8",
  card: "#112B4A",
  cardSoft: "#163457",
  primary: "#3B82F6",
  primaryDark: "#1E3A8A",
  accent: "#60A5FA",
  border: "#1F3B66",
  white: "#FFFFFF",
  black: "#000000",
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: COLORS.bg,
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 16,
    color: COLORS.text,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
    width: "90%",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 10,
    borderRadius: 16,
  },
  chip: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  chipText: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.white,
    fontWeight: "700",
  },
  likeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginVertical: 6,
  },
  likeText: {
    color: COLORS.white,
    fontWeight: "700",
    textAlign: "center",
  },
  detailsCard: {
    backgroundColor: COLORS.cardSoft,
    padding: 20,
    width: "90%",
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
    color: COLORS.text,
  },
  detailLine: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: COLORS.text,
  },
  detailLabel: {
    color: COLORS.accent,
    fontWeight: "800",
  },
  chartCard: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
  },
  chartTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    backgroundColor: COLORS.black,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryBtnText: {
    color: COLORS.white,
    fontWeight: "800",
    textAlign: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(2,6,23,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalCard: {
    width: "92%",
    backgroundColor: COLORS.cardSoft,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 17,
    textAlign: "center",
    color: COLORS.text,
    fontWeight: "800",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
    color: COLORS.text,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
