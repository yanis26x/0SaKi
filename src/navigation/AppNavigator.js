import React from "react";
import { Image, StatusBar } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen";
import CounterScreen from "../screens/CounterScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MusicScreen from "../screens/MusicScreen";
import QrCodeScreen from "../screens/QrCodeScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Palette noire
const NAV = {
  bg: "#000000", // fond global + zones notch/home
  card: "#000000", // header + tab bar
  text: "#FFFFFF",
  subtext: "#9CA3AF",
  border: "#000000",
};

// Thème pour virer le blanc par défaut
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: NAV.bg,
    card: NAV.card,
    text: NAV.text,
    border: NAV.border,
    primary: NAV.text,
    notification: NAV.text,
  },
};

function Tabs() {
  return (
    // Colorie la safe area du haut en noir (pas le bas pour ne pas pousser la tab bar)
    <SafeAreaView style={{ flex: 1, backgroundColor: NAV.bg }} edges={["top"]}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: NAV.text,
          tabBarInactiveTintColor: NAV.subtext,
          sceneContainerStyle: { backgroundColor: NAV.bg },

          // Tab bar full black + pas de bordure blanche
          tabBarStyle: {
            backgroundColor: NAV.card,
            borderTopWidth: 0,
            height: 60,
            paddingTop: 6,
            paddingBottom: 8,
            // iOS shadow off
            shadowOpacity: 0,
            // Android elevation off
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "0SaKi26x",
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={require("../../assets/addicted_track_cover.jpg")}
                style={{
                  width: size,
                  height: size,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.6,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Counter"
          component={CounterScreen}
          options={{
            title: "Gallerie26x",
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={require("../../assets/icons/Photos.png")}
                style={{
                  width: size,
                  height: size,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.6,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings26x",
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={require("../../assets/icons/Settings.png")}
                style={{
                  width: size,
                  height: size,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.6,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Music"
          component={MusicScreen}
          options={{
            title: "Music26x",
            // si tu as une icône “musique”, remplace le 426.png
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={require("../../assets/242pfp.jpeg")}
                style={{
                  width: size,
                  height: size,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.6,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="QrCode"
          component={QrCodeScreen}
          options={{
            title: "QrCode26x",
            tabBarIcon: ({ focused, size }) => (
              <Image
                source={require("../../assets/archive2Cover.jpg")}
                style={{
                  width: size,
                  height: size,
                  resizeMode: "contain",
                  opacity: focused ? 1 : 0.6,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        {/* Status bar claire sur fond noir */}
        <StatusBar barStyle="light-content" backgroundColor={NAV.bg} />

        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: NAV.card },
            headerTitleStyle: { color: NAV.text, fontWeight: "800" },
            headerTintColor: NAV.text,
            contentStyle: { backgroundColor: NAV.bg },

            // supprime la petite ligne/ombre blanche du header iOS
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
