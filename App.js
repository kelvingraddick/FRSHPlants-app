/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import { View, Text,  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import LoadingScreen from './Screens/LoadingScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import SettingsScreen from './Screens/SettingsScreen';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen coming soon!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function onAuthStateChanged(user) {
    setUser(user);
    if (isLoading) setIsLoading(false);
  }

  return (
    <NavigationContainer>
      {
        isLoading ? 
          (
            <LoadingScreen />
          ) :
          (
            user ?
              (
                <Tab.Navigator>
                  <Tab.Screen name="Home" component={HomeScreen} />
                  <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
              ) :
              ( 
                <Stack.Navigator>
                  <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Sign In" component={SignInScreen} options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: '#102D1B',
                    },
                    headerTintColor: '#fff'
                  }} />
                </Stack.Navigator>
              )
          )
      }
    </NavigationContainer>
  );
}

export default App;
