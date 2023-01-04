import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { Alert, Text } from 'react-native';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { auth, database } from '../../config/firebase';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { authenticationSignOut } from '../home/Home';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setMessages } from '../../redux/slices/RTDBSlice';
export const Chat = () => {
  // const [messages, setMessages] = useState<
  //   Array<{ _id: string; createdAt: any; text: string; user: string }>
  // >([]);
  const messages = useSelector((state: RootState) => state.RTDB.messages);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign
          name='logout'
          color={'orange'}
          size={24}
          onPress={() => {
            if (auth.currentUser?.email) {
              Alert.alert('Are you sure you want to sign out?', '', [
                {
                  text: 'Cancel',
                  onPress: () => null,
                },
                {
                  text: 'Sign out',
                  onPress: () => {
                    authenticationSignOut();
                    navigation.navigate('Home');
                  },
                },
              ]);
            }
          }}
          style={{ marginRight: 10 }}
        />
      ),
      headerLeft: () => (
        <MaterialIcons
          onPress={() => navigation?.navigate('Home')}
          color={'orange'}
          size={35}
          name='arrow-back'
        />
      ),
    });
  }, [navigation, auth]);
  const dispatch = useDispatch();
  const onSend = useCallback((messages: any) => {
    dispatch((prev) => setMessages(GiftedChat.append(prev, messages)));
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      onSend={onSend}
      messages={messages}
      user={{
        _id: auth.currentUser?.email?.split('@')[0],
        name: auth.currentUser?.email?.split('@')[0],
      }}
      showAvatarForEveryMessage={true}
      imageStyle={{ justifyContent: 'center', alignItems: 'center' }}
      renderUsernameOnMessage={true}
    />
  );
};
