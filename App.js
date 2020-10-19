/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoadingScreen from './Screens/LoadingScreen';
import SignInScreen from './Screens/SignInScreen';

state = {
  isLoading: true,
  isSignedIn: false
};

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setTimeout(function() {
      setIsLoading(false);
    }, 1500);
  });

  return (
    <NavigationContainer>
      {
        isLoading ? 
          (
            <LoadingScreen />
          ) :
          (
            isSignedIn ?
              (
                <Tab.Navigator>
                  <Tab.Screen name="Home" component={HomeScreen} />
                  <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
              ) :
              ( 
                <Stack.Navigator>
                  <Stack.Screen name="Sign In" component={SignInScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
              )
          )
      }
    </NavigationContainer>
  );
}

export default App;
