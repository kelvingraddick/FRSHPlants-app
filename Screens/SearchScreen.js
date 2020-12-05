import React, { useState, useEffect } from "react";
import { StatusBar, View, TextInput, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import IconButtonComponent from "../Components/IconButtonComponent";
import PlantItemComponent from "../Components/PlantItemComponent";
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState();
  const [plants, setPlants] = useState();

  useEffect(() => {
    const plants = firestore()
      .collection('plants')
      .onSnapshot(collectionSnapshot => {
        const plants = [];
        collectionSnapshot.forEach(documentSnapshot => {
          plants.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        console.info(plants);
        setPlants(plants);
      });
    return () => plants();
  }, []);

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
          onChangeText={text => setQuery(text)}
          value={query}
        />
        <View style={styles.iconButtonContainer}>
          <IconButtonComponent text='Plants' image={require('../Images/plants-icon.png')} />
          <IconButtonComponent text='Flowers' image={require('../Images/flowers-icon.png')} />
        </View>
        <View style={styles.iconButtonContainer}>
          <IconButtonComponent text='Fruits' image={require('../Images/fruits-icon.png')} />
          <IconButtonComponent text='Vegetables' image={require('../Images/vegetables-icon.png')} />
        </View>
        <FlatList
          data={plants}
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
    flexDirection: 'row'
  }
});


export default SearchScreen;