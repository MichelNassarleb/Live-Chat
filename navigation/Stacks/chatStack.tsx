import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Chat } from '../../screens/chat/Chat';
import { Login } from '../../screens/login/Login';
import { Signup } from '../../screens/signup/Signup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Home } from '../../screens/home/Home';
import { Admin } from '../../screens/admin/admin';
export const ChatStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
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
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='Admin' component={Admin} />
    </Stack.Navigator>
  );
};
