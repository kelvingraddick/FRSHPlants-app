import React from "react";
import {  Image, ImageBackground, StyleSheet } from 'react-native';

const HeaderComponent = () => {
  return (
    <ImageBackground style={styles.backgroundImage} source={require('../Images/plants-background-1.jpg')}>
      <Image style={styles.logoImage} source={require('../Images/FRSHPlants-logo-white-1.png')} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 90,
    paddingBottom: 15,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  logoImage: {
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
});

export default HeaderComponent;