import { signInWithEmailAndPassword } from 'firebase/auth';
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
import { Chat } from '../chat/Chat';
import { styles } from './loginStyles';

export const Login: FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const backgroundImage = require('../../assets/background.jpg');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onHandleLogin = async () => {
    try {
      if (!!email && !!password) {
        setIsLoading(true);
        const res = await signInWithEmailAndPassword(auth, email, password);
        if (res) {
          setIsLoading(false);
          Alert.alert('Login successful!');
          setEmail('');
          setPassword('');
          navigation.navigate('Chat');
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
    <KeyboardAvoidingView behavior='height' style={styles.container}>
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
          style={{ width: '90%', marginVertical: 20 }}
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
          style={{ width: '90%', justifyContent: 'center' }}
          contentStyle={[styles.input]}
          onChangeText={setPassword}
        />
        {isLoading ? (
          <ActivityIndicator
            testID='button-activityIndicator'
            style={[styles.button]}
            color={'white'}
            size={30}
          />
        ) : (
          <TouchableOpacity
            disabled={!(!!email && !!password)}
            style={[
              styles.button,
              !(!!email && !!password) && { backgroundColor: 'grey' },
            ]}
            onPress={onHandleLogin}
          >
            <Text
              style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}
              children={'Log in'}
            />
          </TouchableOpacity>
        )}
        <View style={styles.footerContainer}>
          <Text
            children={"Don't have an account? "}
            style={{ fontWeight: '600', color: 'grey', fontSize: 16 }}
          />
          <TouchableOpacity onPress={() => navigation.push('Signup')}>
            <Text
              style={{ fontWeight: '600', color: 'orange', fontSize: 16 }}
              children={'Sign Up'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
