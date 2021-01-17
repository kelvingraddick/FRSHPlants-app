import React from "react";
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const IconButtonComponent = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onPress}
      underlayColor='#fff'
      >
      <Image style={styles.image} source={props.image} />
      <Text style={[styles.text, { fontFamily: props.isSelected ? Fonts.BOLD : Fonts.NORMAL }]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: Colors.BLACK
  }
});

export default IconButtonComponent;