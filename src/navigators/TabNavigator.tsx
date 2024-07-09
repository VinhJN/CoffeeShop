import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import CustomIcon from '../components/CustomIcon';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import SettingScreen from '../screens/SettingScreen';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(userState => {
      setUser(userState);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>Please login</Text>;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView overlayColor="" blurAmount={15} style={styles.BlurView} />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="home"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="cart"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="like"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="bell"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="menu"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}
            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
