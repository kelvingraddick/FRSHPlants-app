import React, { useState, useEffect } from "react";
import { StatusBar, View, TextInput, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import IconButtonComponent from "../Components/IconButtonComponent";
import PlantItemComponent from "../Components/PlantItemComponent";
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const SearchScreen = ({ navigation }) => {
  const [databasePlants, setDatabasePlants] = useState();
  const [filteredPlants, setFilteredPlants] = useState();
  const [filterText, setFilterText] = useState();
  const [filterCategory, setFilterCategory] = useState();

  useEffect(() => {
    getPlants();
    return () => getPlants();
  }, []);

  const getPlants = async function() {
    await firestore()
      .collection('plants')
      .get()
      .then(collectionSnapshot => {
        const plants = [];
        collectionSnapshot.forEach(documentSnapshot => {
          plants.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        setDatabasePlants(plants);
        setFilteredPlants(plants);
        console.info('Retrieved plants from database: ' + JSON.stringify(plants));
      });
  };

  const filterPlantsByText = function(text) {
    console.info('Filter plants by text: ' + text);
    setFilterText(text);
    filterPlants(text, filterCategory);
  };

  const filterPlantsByCategory = function(category) {
    console.info('Filter plants by category: ' + category);
    setFilterCategory(category != filterCategory ? category : null);
    filterPlants(filterText, category);
  };

  const filterPlants = function(text, category) {
    const plants = [];
    databasePlants.forEach(databasePlant => {
      if ((!text || (databasePlant.commonName && databasePlant.commonName.toLowerCase().includes(text))) &&
          (!category || (databasePlant.categories && databasePlant.categories.includes(category)))) {
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
          placeholder='Search for plants..'
          placeholderTextColor={Colors.GRAY}
          autoCapitalize='none'
          keyboardType='web-search'
          onChangeText={text => filterPlantsByText(text)}
        />
        <View style={styles.iconButtonContainer}>
          <IconButtonComponent text='Plants' image={require('../Images/plants-icon.png')} isSelected={filterCategory == null || filterCategory == 'plant'} onPress={() => filterPlantsByCategory('plant')} />
          <IconButtonComponent text='Flowers' image={require('../Images/flowers-icon.png')} isSelected={filterCategory == null || filterCategory == 'flower'} onPress={() => filterPlantsByCategory('flower')} />
          <IconButtonComponent text='Fruits' image={require('../Images/fruits-icon.png')} isSelected={filterCategory == null || filterCategory == 'fruit'} onPress={() => filterPlantsByCategory('fruit')} />
          <IconButtonComponent text='Vegetables' image={require('../Images/vegetables-icon.png')} isSelected={filterCategory == null || filterCategory == 'vegetable'} onPress={() => filterPlantsByCategory('vegetable')} />
        </View>
        <FlatList
          data={filteredPlants}
          keyExtractor={item => item.id}
          renderItem={({ item, index, separators }) => <PlantItemComponent plant={item} /> }
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
  },
  iconButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});


export default SearchScreen;