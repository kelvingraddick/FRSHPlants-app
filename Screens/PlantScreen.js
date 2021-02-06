import React, { useState, useEffect } from "react";
import { StatusBar, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CategoryButtonComponent from "../Components/CategoryButtonComponent";
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const PlantScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [plant, setPlant] = useState();

  useEffect(() => {
    getPlant();
    return () => getPlant();
  }, []);

  const getPlant = async function() {
    await firestore()
      .collection('plants')
      .doc(id)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          var plant = documentSnapshot.data();
          setPlant(plant);
          console.info('Retrieved plant from database: ' + JSON.stringify(plant));
        }
      });
  };

  const addPlant = async function() {

  };

  return (
    <>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titleText}>{plant?.commonName}</Text>
        <Text style={styles.subTitleText}>{plant?.scientificNames?.join(', ')}</Text>
        <Image style={styles.image} source={{ uri: plant?.imageUrl }} />
        <TouchableOpacity
          style={styles.addPlantButton}
          onPress={() => addPlant()}
          underlayColor='#fff'>
          <Text style={styles.addPlantButtonText}>Add Plant</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>Care</Text>
        <Text style={styles.subTitleText}>Days between watering · {plant?.daysBetweenWatering}</Text>
        <Text style={styles.subTitleText}>Days between resoiling · {plant?.daysBetweenResoiling}</Text>
        <Text style={styles.subTitleText}>Days between repoting · {plant?.daysBetweenRepoting}</Text>
        <Text style={styles.titleText}>Categories</Text>
        <View style={styles.categoryButtonContainer}>
          { plant?.categories?.map(category => (
            <CategoryButtonComponent category={category} onPress={() => {}} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: Colors.WHITE,
    alignItems: 'stretch',
    alignContent: 'center'
  },
  titleText: {
    padding: 20,
    paddingBottom: 0,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 25
  },
  subTitleText: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 3,
    color: Colors.GRAY,
    fontFamily: Fonts.MEDIUM,
    fontSize: 17,
    opacity: 0.75
  },
  image: {
    height: 300,
    marginTop: 20,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  addPlantButton: {
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 0,
    backgroundColor: Colors.LIGHT_GREEN,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addPlantButtonText: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    color: Colors.WHITE
  },
  categoryButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
  }
});


export default PlantScreen;