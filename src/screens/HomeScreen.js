import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../../assets/appBackgound.jpg')} 
      style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}
    >
      <View style={styles.container}>


        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Details')}>
          <Text style={styles.btnText}>Détails</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Counter')}>
          <Text style={styles.btnText}>Gallerie26x</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 26, 
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
  },
  btn: {
    backgroundColor: '#0080ffff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 25,

    marginVertical: 8,
    width: 220,
    alignItems: 'center',


  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
})