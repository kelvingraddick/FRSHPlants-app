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
import SearchScreen from './Screens/SearchScreen';
import SettingsScreen from './Screens/SettingsScreen';
import HeaderComponent from './Components/HeaderComponent';

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search plants" component={SearchScreen} options={{ header: props => <HeaderComponent {...props} /> }} />
    </SearchStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Search plants" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();
const SignUpStack = createStackNavigator();

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
                <BottomTab.Navigator>
                  <BottomTab.Screen name="Search plants" component={SearchStackScreen} />
                  <BottomTab.Screen name="Settings" component={SettingsStackScreen} />
                </BottomTab.Navigator>
              ) :
              ( 
                <SignUpStack.Navigator>
                  <SignUpStack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
                  <SignUpStack.Screen name="Sign In" component={SignInScreen} options={{
                    title: '',
                    headerStyle: {
                      backgroundColor: '#102D1B',
                    },
                    headerTintColor: '#fff'
                  }} />
                </SignUpStack.Navigator>
              )
          )
      }
    </NavigationContainer>
  );
}

export default App;
