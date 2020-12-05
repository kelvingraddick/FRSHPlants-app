import React from "react";
import { Image, StyleSheet, View, Text } from 'react-native';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const IconButtonComponent = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={props.image} />
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    marginBottom: 20
  },
  image: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  text: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK,
    alignSelf: 'center'
  }
});

export default IconButtonComponent;