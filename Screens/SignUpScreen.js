import React, { useState } from "react";
import { StatusBar, View, Image, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const SignUpScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState();
  const [password, setPassword] = useState();

  const signUp = function() {
    auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        var errorMessage = 'Please try again.';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'That email address is already in use. Please try another.';
        }
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'That email address is invalid. Please try another.';
        }
        if (error.code === 'auth/weak-password') {
          errorMessage = 'That password was too weak. Please try another.';
        }
        Alert.alert("There was an error.", errorMessage, [{ text: "OK" }]);
        console.error(error);
      });
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <ImageBackground style={styles.backgroundImage} source={require('../Images/plants-background-1.jpg')}>
          <Image style={styles.logoImage} source={require('../Images/FRSHPlants-logo-white-1.png')} />
        </ImageBackground>
        <Text style={styles.titleText}>Keep all of your plants FRSH</Text>
        <View style={styles.footer}>
          <TextInput
            style={styles.textBox}
            placeholder='Email'
            placeholderTextColor={Colors.GRAY}
            autoCompleteType='email'
            autoCapitalize='none'
            keyboardType='email-address'
            onChangeText={text => setEmailAddress(text)}
            value={emailAddress}
          />
          <TextInput
            style={styles.textBox}
            placeholder='Password'
            placeholderTextColor={Colors.GRAY}
            autoCompleteType='password'
            autoCapitalize='none'
            textContentType='newPassword'
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => signUp()}
            underlayColor='#fff'>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <Text style={styles.footerText} onPress={() => navigation.navigate('Sign In')}>Have an account? Sign in instead.</Text>
        </View>
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
  backgroundImage: {
    height: 400,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoImage: {
    height: 43,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  titleText: {
    marginTop: 20,
    alignSelf: 'center',
    color: Colors.GRAY,
    fontFamily: Fonts.MEDIUM,
    fontSize: 20,
    //opacity: 0.75
  },
  footer: {
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'flex-end'
  },
  textBox: {
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.WHITE,
    padding: 20,
    margin: 20,
    marginTop: 0,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: Fonts.BOLD,
    color: Colors.GRAY,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    backgroundColor: Colors.LIGHT_GREEN,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    color: Colors.WHITE
  },
  footerText: {
    marginTop: 0,
    alignSelf: 'center',
    color: Colors.GRAY,
    fontFamily: Fonts.MEDIUM,
    fontSize: 17,
    opacity: 0.75
  },
});


export default SignUpScreen;