import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import axios from 'axios';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';


const WelcomeScreen = ({navigation}: any) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.push('Login');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(userData => {
      setUser(userData);
      if (initializing) {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (initializing) {
    return null;
  }
  return (
    <View style={styles.Container}>
      <Image 
        style={styles.Image} 
        // source={{uri: 'https://marketplace.canva.com/EAFLU7Mm3FI/1/0/1600w/canva-brown-and-beige-simple-minimalist-coffee-shop-circle-logo-ww1u6OsW_3o.jpg'}}
        source={require('../assets/app_images/logo.png')}
      />
      <Text style={styles.studentInfo}>Họ tên: Bùi Quang Vinh</Text>
      <Text style={styles.studentInfo}>MSV: PH33437</Text>
      <Text style={styles.studentInfo}>Lớp: MD18306</Text>
      <Text style={styles.coffeeShopInfo}>
        Chào mừng bạn đến với Coffee Shop - nơi bạn có thể thưởng thức những ly cà phê ngon và các món đồ uống hấp dẫn.
      </Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryWhiteHex,
  },
  Image: {
    width: 300,
    height: 300,
    marginVertical: 15,
  },
  studentInfo: {
    fontSize: 18,
    marginVertical: 10,
  },
  coffeeShopInfo: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
});
