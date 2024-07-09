import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../theme/theme'
import auth from '@react-native-firebase/auth';
import { useTheme } from '../theme/ThemeProvider';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const onSubmit = async () => {
        try {
            if (!email.trim()) {
                setErrorPassword('Please enter your email');
                return;
            }
        
            if (!/\S+@\S+\.\S+/.test(email)) {
                setErrorPassword('Please enter a valid email');
                return;
            }
        
            if (!password.trim()) {
                setErrorPassword('Please enter your password');
                return;
            }
        
            if (password.length < 6) {
                setErrorPassword('Password must be at least 6 characters long');
                return;
            }

            auth().signInWithEmailAndPassword(email, password).then(() => {
                navigation.push('TabNavigator');
                Alert.alert('Login Success.');
            })
            .catch((err) => {
                console.log(err);
                
            });
            
        } catch (error) {
            console.error('Login failed:', error);
            Alert.alert('Login failed. Please check your credentials.');
        }
    };
    const { theme, toggleTheme } = useTheme();

    return (
        <View style={[styles.container,  { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
            <Image
                source={require('../assets/app_images/logo.png')}
                style={styles.containerImg}
            />
            <Text style={[styles.welcomeText, { color: theme === 'light' ? '#000000' : '#ffffff' }]}>Welcome to Coffee Shop!!</Text>
            <Text style={[styles.loginText,{ color: theme === 'light' ? '#000000' : '#ffffff' }]}>Login to continue</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Email Address'
                placeholderTextColor={theme === COLORS.primaryBlackHex? COLORS.primaryWhiteHex: COLORS.primaryBlackHex}
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType='email-address' />
            <TextInput
                style={[styles.textInput, { marginTop: 20 }]}
                placeholder='Password'
                placeholderTextColor={theme === COLORS.primaryBlackHex? COLORS.primaryWhiteHex: COLORS.primaryBlackHex}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true} />
            <TouchableOpacity
                style={[styles.buttonLogin, { backgroundColor: theme === 'lightgreen' ? 'lightgreen' : '#e74c3c' }]}
                onPress={onSubmit}>
                <Text style={[styles.signInText, { color: theme === 'light' ? '#000000' : '#ffffff' }]}>Sign in</Text>
            </TouchableOpacity>
            <View style={styles.containerRegisterAndReset}>
                <Text style={[styles.textBefore, { color: theme === 'light' ? '#000000' : '#ffffff' }]}>Don't have account? click </Text>
                <Text style={[styles.textAfter, { color: theme === '#D17842' ? '#000000' : '#D17842' }]} onPress={() => navigation.push('Register')}>Register</Text>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
        flexDirection: 'column',
        padding: 10,
    },
    containerImg: {
        width: 180,
        height: 180,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginTop: 50,
    },
    welcomeText: {
        fontFamily: 'Popins',
        color: COLORS.primaryBlackHex,
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: 16,
        marginTop: 10,
    },
    loginText: {
        fontFamily: 'Popins',
        color: 'grey',
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: 12,
        marginTop: 20,
    },
    textInput: {
        height: 48,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#1d212a',
        marginTop: 40,
        color: COLORS.primaryBlackHex,
        paddingLeft: 14,
    },
    buttonLogin: {
        height: 57,
        backgroundColor: 'lightgreen',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    signInText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    buttonLoginWithGoogle: {
        height: 57,
        backgroundColor: 'white',
        borderRadius: 15, justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        flexDirection: 'row',
    },
    ImageSocial: {
        width: 30,
        height: 30,
        marginEnd: 10,
    },
    textLoginWithGoogle: {
        color: 'black',
        fontWeight: 'bold',
    },
    containerRegisterAndReset: {
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
    },
    textBefore: {
        color: 'grey',
    },
    textAfter: {
        color: '#D17842',
    }
})
