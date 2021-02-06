import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CategoryButtonComponent from "../Components/CategoryButtonComponent";
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const PlantItemComponent = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} underlayColor='#fff'>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: props.plant.imageUrl }} />
        <View style={styles.informationContainer}>
          <Text style={styles.commonNameText} numberOfLines={1} ellipsizeMode='tail'>{props.plant.commonName}</Text>
          <Text style={styles.scientificNamesText} numberOfLines={1} ellipsizeMode='tail'>{props.plant.scientificNames.join(', ')}</Text>
          <View style={styles.categoryButtonContainer}>
            {props.plant.categories.map((value, index) => {
              return <CategoryButtonComponent category={value} onPress={() => {}} />
            })}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row'
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
    resizeMode: 'cover',
    alignSelf: 'center'
  },
  informationContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  commonNameText: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK
  },
  scientificNamesText: {
    marginBottom: 10,
    fontSize: 15,
    fontFamily: Fonts.NORMAL,
    color: Colors.GRAY
  },
  categoryButtonContainer: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default PlantItemComponent;