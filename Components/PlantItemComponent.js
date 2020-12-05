import React from "react";
import { Image, StyleSheet, View, Text } from 'react-native';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const PlantItemComponent = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: props.plant.imageUrl }} />
      <View style={styles.informationContainer}>
        <Text style={styles.commonNameText} numberOfLines={1} ellipsizeMode='tail'>{props.plant.commonName}</Text>
        <Text style={styles.scientificNamesText} numberOfLines={1} ellipsizeMode='tail'>{props.plant.scientificNames.join(', ')}</Text>
        <View style={styles.categoryButtonContainer}>
          {props.plant.categories.map((value, index) => {
            return <View style={styles.categoryButton}>
                <Text style={styles.categoryButtonText} numberOfLines={1} ellipsizeMode='tail'>{value}</Text>
              </View>
          })}
        </View>
      </View>
    </View>
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
  },
  categoryButton: {
    height: 35,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    backgroundColor: Colors.GRAY,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryButtonText: {
    fontSize: 15,
    fontFamily: Fonts.NORMAL,
    color: Colors.WHITE
  },
});

export default PlantItemComponent;