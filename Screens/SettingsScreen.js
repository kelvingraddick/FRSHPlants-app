import React from "react";
import { StatusBar, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../Constants/Colors';
import Fonts from '../Constants/Fonts';

const SettingsScreen = () => {

  const signOut = function() {
    auth()
      .signOut()
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        var errorMessage = 'Please try again.';
        Alert.alert("There was an error.", errorMessage, [{ text: "OK" }]);
        console.error(error);   
      });
  };

  return (
    <>
      <StatusBar hidden />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>More settings screens coming soon!</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => signOut()}
					underlayColor='#fff'>
					<Text style={styles.buttonText}>Sign Out</Text>
				</TouchableOpacity>
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
  button: {
    height: 60,
		borderRadius: 30,
		marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    backgroundColor: Colors.GRAY,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    color: Colors.WHITE
  }
});


export default SettingsScreen;