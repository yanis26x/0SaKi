import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

/* --------- Thème sombre --------- */
const COLORS = {
  bg: "#000000",
  text: "#ffffff",
  sub: "#9CA3AF",
  card: "#0c0c0c",
  border: "#1a1a1a",
  primary: "#3B82F6",
};

/** 
 * Mets tes pistes ici :
 * - Pour un fichier LOCAL: { title: "Mon son", src: require("../../assets/music/monson.mp4") }
 * - Pour une URL (mp4/m4a/mp3): { title: "URL demo", src: "https://..." }
 */
const TRACKS = [
  // exemple URL (remplace par un lien .mp4 à toi)
  // { title: "Demo URL (mp4)", src: "https://your-cdn.com/audio/demo.mp4" },
  // exemple local:
  // { title: "Local MP4", src: require("../../assets/music/demo.mp4") },
  { title: "swamp4", src: require("../../assets/music/swamp4.wav") },
  { title: "swamp1", src: require("../../assets/music/swamp1.wav") },
  { title: "NaNa op", src: require("../../assets/music/nanaost.mp3") },
  { title: "H3Ll0!!", src: require("../../assets/music/helloOST.mp3") },
  { title: "hehehehe", src: require("../../assets/music/evil_laugh4.mp3") },
  { title: "fx1", src: require("../../assets/music/woooo.mp3") },
  { title: "swamp5", src: require("../../assets/music/swamp5.wav") },
  { title: "swamp6", src: require("../../assets/music/swamp6.wav") },
  
  
];

export default function MusicScreen() {
  const soundRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // progress
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(0);

  // ajouter une piste via URL
  const [url, setUrl] = useState("");

  // configure l’audio (iOS: jouer même en mode silencieux)
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    return () => {
      unloadSound();
    };
  }, []);

  const unloadSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.unloadAsync();
      } catch {}
      soundRef.current = null;
    }
  };

  const onStatusUpdate = (status) => {
    if (!status.isLoaded) return;
    setPositionMillis(status.positionMillis ?? 0);
    setDurationMillis(status.durationMillis ?? 0);
    if (status.didJustFinish) {
      // passe automatiquement à la suivante si dispo
      handleNext();
    }
  };

  const loadTrack = async (index, autoPlay = true) => {
    if (TRACKS.length === 0) return;
    const track = TRACKS[index];
    if (!track) return;

    await unloadSound();

    try {
      const { sound } = await Audio.Sound.createAsync(
        typeof track.src === "string" ? { uri: track.src } : track.src,
        { shouldPlay: autoPlay, progressUpdateIntervalMillis: 250 },
        onStatusUpdate
      );
      soundRef.current = sound;
      setCurrentIndex(index);
      setIsPlaying(autoPlay);
    } catch (e) {
      console.warn("Erreur chargement audio:", e);
    }
  };

  const handlePlayPause = async () => {
    if (!soundRef.current) {
      // si aucune piste chargée, on charge la première
      await loadTrack(currentIndex, true);
      return;
    }
    const status = await soundRef.current.getStatusAsync();
    if (!status.isLoaded) return;

    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleStop = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.setPositionAsync(0);
        setIsPlaying(false);
        setPositionMillis(0);
      } catch {}
    }
  };

  const handleNext = async () => {
    if (TRACKS.length <= 1) {
      // pas de suivante, on stoppe
      await handleStop();
      return;
    }
    const next = (currentIndex + 1) % TRACKS.length;
    await loadTrack(next, true);
  };

  const handlePrev = async () => {
    if (TRACKS.length <= 1) {
      await handleStop();
      return;
    }
    const prev = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    await loadTrack(prev, true);
  };

  const formatTime = (ms) => {
    const total = Math.floor((ms || 0) / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
    };

  // barre de progression cliquable (seek)
  const onSeekBarPress = async (evt) => {
    if (!durationMillis || !soundRef.current) return;
    const { locationX, nativeEvent } = evt;
    const width = nativeEvent?.target?._internalFiberInstanceHandleDEV?.stateNode?.getBoundingClientRect?.().width; // non fiable sur RN
    // → on va plutôt mesurer via onLayout :
    // onSeekBarPressWithLayout sera set au layout
  };

  const [progressWidth, setProgressWidth] = useState(0);
  const handleSeekFromLayout = async (evt) => {
    if (!durationMillis || !soundRef.current || !progressWidth) return;
    const x = evt.nativeEvent.locationX;
    const ratio = Math.min(Math.max(x / progressWidth, 0), 1);
    const newPos = Math.floor(durationMillis * ratio);
    try {
      await soundRef.current.setPositionAsync(newPos);
      setPositionMillis(newPos);
    } catch {}
  };

  const addUrlTrack = async () => {
    if (!url.trim()) return;
    // On pousse dans TRACKS pour la session courante (simple démo) :
    TRACKS.push({ title: "URL", src: url.trim() });
    setUrl("");
    await loadTrack(TRACKS.length - 1, true);
  };

  const currentTitle =
    TRACKS.length && TRACKS[currentIndex] ? TRACKS[currentIndex].title : "Aucune piste";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Music</Text>

      {/* Zone URL */}
      <View style={styles.row}>
        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="Colle une URL .mp4 / .m4a / .mp3"
          placeholderTextColor={COLORS.sub}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.btn} onPress={addUrlTrack}>
          <Text style={styles.btnText}>Load</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.nowPlaying} numberOfLines={1}>
          ▶︎ {currentTitle}
        </Text>

        {/* Progress + temps */}
        <Pressable
          onPress={handleSeekFromLayout}
          onStartShouldSetResponder={() => true}
          onLayout={(e) => setProgressWidth(e.nativeEvent.layout.width)}
          style={styles.progressWrap}
        >
          <View style={styles.progressBg} />
          <View
            style={[
              styles.progressFill,
              {
                width:
                  durationMillis > 0
                    ? `${(positionMillis / durationMillis) * 100}%`
                    : "0%",
              },
            ]}
          />
        </Pressable>

        <View style={styles.timeRow}>
          <Text style={styles.time}>{formatTime(positionMillis)}</Text>
          <Text style={styles.time}>{formatTime(durationMillis)}</Text>
        </View>

        {/* Contrôles */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.ctrlBtn} onPress={handlePrev}>
            <Text style={styles.ctrlText}>⏮︎</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.ctrlBtn, styles.primary]} onPress={handlePlayPause}>
            <Text style={[styles.ctrlText, styles.primaryText]}>
              {isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ctrlBtn} onPress={handleNext}>
            <Text style={styles.ctrlText}>⏭︎</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
          <Text style={styles.stopText}>Stop</Text>
        </TouchableOpacity>

        {/* Charger la première piste si tu en as une */}
        {TRACKS.length > 0 && !soundRef.current && (
          <TouchableOpacity style={styles.loadFirst} onPress={() => loadTrack(0, false)}>
            <Text style={styles.loadFirstText}>Charger la première piste</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.hint}>
        • Ajoute un fichier local : mets ton `.mp4` dans `assets/music/` puis{" "}
        <Text style={styles.mono}>
          {"{ title: 'Mon son', src: require('../../assets/music/monson.mp4') }"}
        </Text>{" "}
        dans <Text style={styles.mono}>TRACKS</Text>.{"\n"}
        • Les URLs `.mp4/.m4a/.mp3` marchent aussi (AAC conseillé).
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, padding: 16 },
  title: { color: COLORS.text, fontSize: 24, fontWeight: "800", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: COLORS.card,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: COLORS.text, fontWeight: "800" },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
  },
  nowPlaying: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 8,
  },

  progressWrap: {
    height: 10,
    borderRadius: 6,
    overflow: "hidden",
    position: "relative",
    marginTop: 4,
  },
  progressBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#222",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  time: { color: COLORS.sub, fontSize: 12 },

  controls: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ctrlBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    backgroundColor: "#111",
  },
  ctrlText: { color: COLORS.text, fontWeight: "800", fontSize: 16 },
  primary: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  primaryText: { color: COLORS.text },

  stopBtn: {
    marginTop: 10,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111",
  },
  stopText: { color: COLORS.text, fontWeight: "800" },

  loadFirst: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 8,
  },
  loadFirstText: { color: COLORS.sub, fontSize: 12 },

  hint: {
    color: COLORS.sub,
    fontSize: 13,
    marginTop: 12,
    lineHeight: 18,
  },
  mono: { fontFamily: "Courier", color: COLORS.text },
});
