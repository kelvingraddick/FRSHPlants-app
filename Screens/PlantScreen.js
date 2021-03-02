import React, { useState, useEffect } from "react";
import { StatusBar, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CategoryButtonComponent from "../Components/CategoryButtonComponent";
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';
import { set } from "react-native-reanimated";

const PlantScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [plant, setPlant] = useState();
  const [add, setAdd] = useState();

  useEffect(() => {
    getPlant();
    getAdd();
  }, []);

  const getPlant = async function() {
    await firestore()
      .collection('plants')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot.exists) {
          var plant = documentSnapshot.data();
          setPlant(plant);
          console.info('Retrieved plant from database: ' + JSON.stringify(plant));
        }
      });
  };

  const getAdd = async function() {
    await firestore()
      .collection('adds')
      .where('userId', '==', auth().currentUser.uid)
      .where('plantId', '==', id)
      .limit(1)
      .onSnapshot(async collectionSnapshot => {
        const adds = [];
        collectionSnapshot.forEach(documentSnapshot => {
          adds.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
        const add = adds[0];
        if (add) {
          setAdd(add);
          console.info('Retrieved add from database: ' + JSON.stringify(add));
        } else {
          setAdd(undefined);
          console.info('Did not find add in database for plant ' + id + ' and user ' + auth().currentUser.uid);
        }
      });
  };

  const addPlant = async function() {
    firestore()
      .collection('adds')
      .add({
        userId: auth().currentUser.uid,
        plantId: id,
      })
      .then(() => {
        //getAdd();
        console.log('Plant ' + id + ' added for user ' + auth().currentUser.uid);
      });
  };

  const removePlant = async function() {
    firestore()
      .collection('adds')
      .doc(add.id)
      .delete()
      .then(() => {
        //getAdd();
        console.log('Add ' + add.id + ' removed for user ' + auth().currentUser.uid);
      });
  };

  return (
    <>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titleText}>{plant?.commonName}</Text>
        <Text style={styles.subTitleText}>{plant?.scientificNames?.join(', ')}</Text>
        <Image style={styles.image} source={{ uri: plant?.imageUrl }} />
        { !add &&
          <TouchableOpacity
            style={styles.addPlantButton}
            onPress={() => addPlant()}
            underlayColor='#fff'>
            <Text style={styles.addPlantButtonText}>Add Plant</Text>
          </TouchableOpacity>
        }
        { add &&
          <TouchableOpacity
            style={styles.addPlantButton}
            onPress={() => removePlant()}
            underlayColor='#fff'>
            <Text style={styles.addPlantButtonText}>Remove Plant</Text>
          </TouchableOpacity>
        }
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