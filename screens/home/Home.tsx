import React, { useEffect, FC, useState } from 'react';
import { Text, Alert, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { styles } from './HomeStyles';
import { auth, database } from '../../config/firebase';
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../redux/slices/RTDBSlice';
import { FlatList } from 'react-native-gesture-handler';
import { MemeItem } from '../../components/memeItem/memeItem';
import { onAuthStateChanged } from 'firebase/auth';
import { authenticationSignOut } from '../../services/signout';
import { RootState } from '../../redux/store';

export const Home: FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={styles.loginContainer}
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
                    navigation.navigate('Login');
                  },
                },
              ]);
            } else navigation.navigate('Login');
          }}
        >
          {auth.currentUser ? (
            <Text style={{ color: 'white', fontWeight: 'bold' }}> LOGOUT</Text>
          ) : (
            <Text style={{ color: 'white', fontWeight: 'bold' }}> LOGIN</Text>
          )}

          <View style={styles.lockContainer}>
            {auth.currentUser?.email ? (
              <AntDesign name='logout' color={'orange'} size={20} />
            ) : (
              <MaterialIcons name='lock' size={24} color={'orange'} />
            )}
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <MaterialIcons
          name='pets'
          color={'orange'}
          size={24}
          onPress={() => {
            if (
              auth.currentUser?.email?.toLowerCase() ==
              'michelnassar371@gmail.com'
            ) {
              navigation.navigate('Admin');
            } else Alert.alert('Woof! woof!');
          }}
          style={{ marginRight: 10 }}
        />
      ),
    });
  }, [
    navigation,
    auth?.currentUser?.email?.length,
    Object.keys(auth).length,
    user,
  ]);
  useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      dispatch(
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    });
    return () => unsubscribe();
  }, []);
  const data = useSelector((state: RootState) => state.RTDB.memes);
  console.log(data);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    });
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={(item) => (
          <MemeItem
            likes={item.item.likes}
            meme={item.item.meme}
            color={
              item.item.likes.filter((item) => item == auth.currentUser?.email)
                .length > 0
                ? 'red'
                : 'grey'
            }
          />
        )}
      />
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => {
          if (auth.currentUser?.email) navigation.navigate('Chat');
          else {
            Alert.alert('You need to login first', '', [
              {
                text: 'Cancel',
                onPress: () => null,
              },
              {
                text: 'Go to the login page',
                onPress: () => navigation.navigate('Login'),
              },
            ]);
          }
        }}
      >
        <Entypo name='chat' size={24} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};
