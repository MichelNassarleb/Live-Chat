import React, { useEffect, FC } from 'react';
import { Text, Alert, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Entypo } from '@expo/vector-icons';
import { styles } from './HomeStyles';
export const Home: FC<any> = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>LOGIN</Text>
          <View style={styles.lockContainer}>
            <MaterialIcons name='lock' size={24} color={'orange'} />
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <MaterialIcons
          name='pets'
          color={'orange'}
          size={24}
          onPress={() => Alert.alert('Woof! woof!')}
          style={{ marginRight: 10 }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate('Chat')}
      >
        <Entypo name='chat' size={24} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};
