import { auth } from '../config/firebase';
import { Alert } from 'react-native';
export const authenticationSignOut = () => {
  auth
    .signOut()
    .then(() => {
      Alert.alert('Successfully signed out');
    })
    .catch(() => {
      Alert.alert('Please try again.');
    });
};
