// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';

// export default function SearchScreen({ navigation }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [race, setRace] = useState([
//     'lisa',
//     'CestTriste',
//     'BloodMask',
//     '242g',
//   ]);

//   const filtrerRace = race.filter((race) =>
//     race.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   function addNewRace(newRace) {
//     setRace([...race, newRace]);
//     setSearchQuery('');
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Search</Text>

//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search here..."
//         value={searchQuery}
//         onChangeText={(text) => setSearchQuery(text)}
//       />

//       <FlatList
//         data={filtrerRace}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('Details', { race: item })}
//           >
//             <Text style={styles.text}>{item}</Text>
//           </TouchableOpacity>
//         )}

//         ListEmptyComponent={() => (
//         <View>

//           <Text style={{ marginTop: 10, fontStyle: 'italic', color: '#888' }}>
//           Aucune race trouvée
//           </Text>
//           <TouchableOpacity 
//             style={styles.buttonAdd}
//             onPress={() => addNewRace(searchQuery)}
//           >
//             <Text style={styles.text}>
//               Ajouté a la nouvelle race
//             </Text>
//           </TouchableOpacity>
//         </View>

//       )}
//       />

//       <View style={styles.row}>
//         <Button title="Reset" onPress={() => setSearchQuery('')} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     marginBottom: 16,
//     color: '#0649ffff',
//   },
//   searchInput: {
//     width: '100%',
//     height: 40,
//     borderColor: '#bbbbbbff',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingLeft: 8,
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#3981c9ff',
//     borderRadius: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     marginVertical: 5,
//     borderWidth: 1,
//     borderColor: '#ffe7efff',
//   },
//   buttonAdd: {
//     backgroundColor: '#1c5f97ff',
//     borderRadius: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     marginVertical: 5,
//     borderWidth: 1,
//     borderColor: '#3e9aa7ff',
//   },
//   text: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#ffffffff',
//     fontWeight: '600',
//   },
//   row: {
//     flexDirection: 'row',
//     marginTop: 20,
//     alignItems: 'center',
//   },
// });
