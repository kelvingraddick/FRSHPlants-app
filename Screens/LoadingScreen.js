import React from 'react';
import { StatusBar, View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const SignInScreen = () => {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Image style={styles.logoImage} source={require('../Images/FRSHPlants-icon-white.png')} />
        <ActivityIndicator size="large" color={Colors.WHITE} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: Colors.LIGHT_GREEN,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    height: 150,
    resizeMode: 'contain'
  }
});


export default SignInScreen;