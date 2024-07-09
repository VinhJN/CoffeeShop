import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import auth, { firebase } from '@react-native-firebase/auth';
import { useTheme } from '../theme/ThemeProvider';

const SettingScreen = ({navigation}: any) => {

  const onSubmit = async () => {
    try {
      auth()
        .signOut()
        .then(() => {
          navigation.push('Login');
          Alert.alert('Logout Success.');
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login failed. Please check your credentials.');
    }
  };
  const changePassword = () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser && currentUser.email) {
      firebase
        .auth()
        .sendPasswordResetEmail(currentUser.email)
        .then(() => {
          Alert.alert('Password reset email sent');
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert('User email not available');
    }
  };
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={[styles.Container, { backgroundColor: theme === 'light' ? 'white' : 'black' }]}>
      <View style={styles.imageHeaderBarContainerWithBack}>
        <Text style={[styles.TextSetting, { color: theme === 'light' ? '#000000' : '#ffffff' }]}>Setting</Text>
        <View style={{ width: 30 }}></View>
      </View>
      {/* Thông tin cá nhân */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#000000' : '#ffffff' }]}>Thông tin cá nhân</Text>
        <View style={[styles.infoBlock,  { backgroundColor: theme === 'light' ? '#3498db' : '#e74c3c' }]}>
          <Text>Họ và tên: Bùi Quang Vinh</Text>
          <Text>Mã sinh viên: PH33437</Text>
          <Text>Lớp: MD18306</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#000000' : '#ffffff' }]}>Thông tin điện thoại</Text>
        <View style={[styles.infoBlock, { backgroundColor: theme === 'light' ? '#3498db' : '#e74c3c' }]}>
          <Text>Loại điện thoại: Iphone X</Text>
          <Text>Cấu hình: CPU XYZ, RAM XYZ, Bộ nhớ trong XYZ</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle,{ color: theme === 'light' ? '#000000' : '#ffffff' }]}>Thiết lập riêng</Text>
        <View style={styles.infoBlock}>
          <TouchableOpacity onPress={toggleTheme} style={[styles.button, { backgroundColor: theme === 'light' ? '#3498db' : '#e74c3c' }]}>
            <Text style={styles.buttonText}>Đổi theme</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit} style={[styles.button, { backgroundColor: theme === 'light' ? '#3498db' : '#e74c3c' }]}>
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={changePassword
            }
            style={[styles.button, { backgroundColor: theme === 'light' ? '#3498db' : '#e74c3c' }]}>
            <Text style={styles.buttonText}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
    padding: SPACING.space_15,
  },
  TextSetting: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryBlackHex,
    textAlign: 'center',
    marginTop: SPACING.space_15,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  section: {
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_15,
  },
  sectionTitle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: 'bold',
    marginBottom: SPACING.space_10,
  },
  infoBlock: {
    backgroundColor: COLORS.secondaryLightGreyHex,
    padding: SPACING.space_10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    borderRadius: 8,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  imageHeaderBarContainerWithBack: {
    flexDirection: 'row',
    marginTop: SPACING.space_15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
