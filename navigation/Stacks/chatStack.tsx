import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Chat } from '../../screens/chat/Chat';
import { Login } from '../../screens/login/Login';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export const ChatStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        title: 'Login',
        headerTintColor: 'orange',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <MaterialIcons
            onPress={() => navigation?.pop()}
            color={'orange'}
            size={35}
            name='arrow-back'
          />
        ),
      })}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  );
};
