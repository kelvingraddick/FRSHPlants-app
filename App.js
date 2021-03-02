/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-ionicons';
import LoadingScreen from './Screens/LoadingScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import SearchScreen from './Screens/SearchScreen';
import MyPlantsScreen from './Screens/MyPlantsScreen';
import SettingsScreen from './Screens/SettingsScreen';
import PlantScreen from './Screens/PlantScreen';
import HeaderComponent from './Components/HeaderComponent';
import Colors from './Constants/Colors';

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search plants" component={SearchScreen} options={{ header: props => <HeaderComponent {...props} /> }} />
      <SearchStack.Screen name="Plant" component={PlantScreen} />
    </SearchStack.Navigator>
  );
}

const MyPlantsStack = createStackNavigator();
function MyPlantsStackScreen() {
  return (
    <MyPlantsStack.Navigator>
      <MyPlantsStack.Screen name="My plants" component={MyPlantsScreen} options={{ header: props => <HeaderComponent {...props} /> }} />
      <MyPlantsStack.Screen name="Plant" component={PlantScreen} />
    </MyPlantsStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
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
                <BottomTab.Navigator tabBarOptions={{ activeTintColor: Colors.DARK_GREEN, inactiveTintColor: Colors.GRAY }}>
                  <BottomTab.Screen name="Search plants" component={SearchStackScreen} options={{ 
                    tabBarIcon: ({ focused, horizontal, tintColor }) => {
                      return <Icon style={[styles.tabIcon, focused ? styles.tabIconFocused : styles.tabIconNormal ]} name="eye" />;
                    }
                  }} />
                  <BottomTab.Screen name="My plants" component={MyPlantsStackScreen} options={{ 
                    tabBarIcon: ({ focused, horizontal, tintColor }) => {
                      return <Icon style={[styles.tabIcon, focused ? styles.tabIconFocused : styles.tabIconNormal ]} name="leaf" />;
                    }
                  }} />
                  <BottomTab.Screen name="Settings" component={SettingsStackScreen} options={{ 
                    tabBarIcon: ({ focused, horizontal, tintColor }) => {
                      return <Icon style={[styles.tabIcon, focused ? styles.tabIconFocused : styles.tabIconNormal ]} name="cog" />;
                    }
                  }} />
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

const styles = StyleSheet.create({
  tabIcon: {
    padding: 5
  },
  tabIconNormal: {
    color: Colors.GRAY
  },
  tabIconFocused: {
    color: Colors.LIGHT_GREEN
  }
});

export default App;
