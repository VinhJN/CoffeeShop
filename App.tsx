import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ThemeProvider} from './src/theme/ThemeProvider';
import SettingScreen from './src/screens/SettingScreen';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{animation: 'slide_from_bottom'}}></Stack.Screen>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{animation: 'slide_from_bottom'}}></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{animation: 'slide_from_bottom'}}></Stack.Screen>
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{animation: 'slide_from_bottom'}}></Stack.Screen>
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{animation: 'slide_from_bottom'}}></Stack.Screen>
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{animation: 'slide_from_bottom'}}></Stack.Screen>
            <Stack.Screen
              name="Setting"
              component={SettingScreen}
              options={{animation: 'slide_from_bottom'}}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
