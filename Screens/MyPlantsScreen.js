import React, { useState, useEffect } from "react";
import { StatusBar, View, TextInput, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import IconButtonComponent from "../Components/IconButtonComponent";
import PlantItemComponent from "../Components/PlantItemComponent";
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const MyPlantsScreen = ({ navigation }) => {
  const [databasePlants, setDatabasePlants] = useState();
  const [filteredPlants, setFilteredPlants] = useState();
  const [filterText, setFilterText] = useState();

  useEffect(() => {
    getMyPlants();
    return () => getMyPlants();
  }, []);

  const getMyPlants = async function() {
    await firestore()
      .collection('adds')
      .where('userId', '==', auth().currentUser.uid)
      .get()
      .then(async collectionSnapshot => {
        const adds = [];
        collectionSnapshot.forEach(documentSnapshot => {
          adds.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        console.info('Retrieved adds from database: ' + JSON.stringify(adds));

        const plantIds = adds.map(add => add.plantId);
        await firestore()
          .collection('plants')
          .get()
          .then(collectionSnapshot => {
            const plants = [];
            collectionSnapshot.forEach(documentSnapshot => {
              if (plantIds.includes(documentSnapshot.id)) {
                plants.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
              }
            });
            
            setDatabasePlants(plants);
            setFilteredPlants(plants);
            console.info('Retrieved plants from database: ' + JSON.stringify(plants));
          });
      });
  };

  const filterPlantsByText = function(text) {
    console.info('Filter plants by text: ' + text);
    setFilterText(text);
    filterPlants(text);
  };

  const filterPlants = function(text) {
    const plants = [];
    databasePlants.forEach(databasePlant => {
      if (!text || (databasePlant.commonName && databasePlant.commonName.toLowerCase().includes(text))) {
        plants.push(databasePlant);
      }
    });
    setFilteredPlants(plants);
  }

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <TextInput
          style={styles.textBox}
          placeholder='Find my plant..'
          placeholderTextColor={Colors.GRAY}
          autoCapitalize='none'
          keyboardType='web-search'
          onChangeText={text => filterPlantsByText(text)}
        />
        <FlatList
          data={filteredPlants}
          keyExtractor={item => item.id}
          renderItem={({ item, index, separators }) => <PlantItemComponent plant={item} onPress={() => navigation.navigate('Plant', { id: item.id })} /> }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: Colors.LIGHT_GRAY,
    alignItems: 'stretch',
    alignContent: 'center'
  },
  titleText: {
    marginTop: 15,
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM,
    fontSize: 25
  },
  textBox: {
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.WHITE,
    padding: 20,
    margin: 20,
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: Colors.GRAY,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default MyPlantsScreen;