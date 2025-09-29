import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CounterScreen from '../screens/CounterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Accueil' ,
          tabBarIcon: ({ focused }) => (
      <Image 
        source={require('../../assets/icons/426.png')} 
        style={{
          width: 28, 
          height: 28,
        }}
      />
    )
        }} 

        
      />
      <Tab.Screen 
        name="Counter" 
        component={CounterScreen} 
        options={{ title: 'Compteur',
          tabBarIcon: ({ focused }) => (
      <Image 
        source={require('../../assets/icons/390.png')}
            
        style={{
          width: 28, 
          height: 28,
        }}
      />
    )
         }} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ title: 'Search',
          tabBarIcon: ({ focused }) => (
      <Image 
        source={require('../../assets/icons/396.png')}
        style={{
          width: 28,
          height: 28,
        }}
      />
    )
         }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Paramètres',
          tabBarIcon: ({ focused }) => (
      <Image 
        source={require('../../assets/icons/353.png')}
        style={{
          width: 28,
          height: 28,
        }}
      />
    )
         }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Tabs" 
          component={Tabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
