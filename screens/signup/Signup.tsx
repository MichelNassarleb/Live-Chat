import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { FC, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import { TextInput } from '../../components/textInput';
import { auth } from '../../config/firebase';
import { styles } from './signupStyles';

export const Signup: FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const backgroundImage = require('../../assets/background.jpg');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onHandleSignUp = async () => {
    try {
      if (!!email && !!password) {
        setIsLoading(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        if (res) {
          setIsLoading(false);
          Alert.alert('Signup successful!');
          setEmail('');
          setPassword('');
          navigation.pop();
        }
      }
    } catch (err: any) {
      if (err.message.toLowerCase().includes('invalid-email')) {
        Alert.alert(`Login failed: Invalid email`);
      } else Alert.alert(err.message);
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.Image} source={backgroundImage} />
      <View style={styles.whiteSheet} />
      <View style={styles.inputsConatiner}>
        <TextInput
          label={'Enter Email'}
          mode='outlined'
          placeholderTextColor={'orange'}
          activeOutlineColor={'orange'}
          textColor={'white'}
          outlineColor={'orange'}
          onChangeText={setEmail}
          style={{ width: '90%', marginTop: 20 }}
          contentStyle={styles.input}
        />
        <TextInput
          label={'Enter Password'}
          textColor={'white'}
          mode='outlined'
          secureTextEntry={true}
          placeholderTextColor={'orange'}
          activeOutlineColor={'orange'}
          outlineColor={'orange'}
          style={{ width: '90%', justifyContent: 'center', marginVertical: 20 }}
          contentStyle={[styles.input]}
          onChangeText={setPassword}
        />

        <TextInput
          label={'Confirm Password'}
          textColor={'white'}
          mode='outlined'
          secureTextEntry={true}
          placeholderTextColor={'orange'}
          activeOutlineColor={'orange'}
          outlineColor={'orange'}
          style={{ width: '90%', justifyContent: 'center' }}
          contentStyle={[styles.input]}
          onChangeText={setConfirmPassword}
        />
        {confirmPassword && password != confirmPassword && (
          <Text
            style={{
              color: 'red',
              width: '90%',
            }}
            children={'Make sure you enter the correct password'}
          />
        )}
        {isLoading ? (
          <ActivityIndicator
            testID='button-activityIndicator'
            style={[styles.button]}
            color={'white'}
            size={30}
          />
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              !(
                !!email &&
                !!password &&
                !!confirmPassword &&
                confirmPassword == password
              ) && {
                backgroundColor: 'grey',
              },
            ]}
            disabled={
              !(
                !!email &&
                !!password &&
                !!confirmPassword &&
                confirmPassword == password
              )
            }
            onPress={onHandleSignUp}
          >
            <Text
              style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}
              children={'Sign Up'}
            />
          </TouchableOpacity>
        )}
        <View style={styles.footerContainer}>
          <Text
            children={'Already registered? '}
            style={{ fontWeight: '600', color: 'grey', fontSize: 16 }}
          />
          <TouchableOpacity onPress={() => navigation.push('Login')}>
            <Text
              style={{ fontWeight: '600', color: 'orange', fontSize: 16 }}
              children={'Log In'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
