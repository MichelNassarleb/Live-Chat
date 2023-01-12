import React, { useEffect, FC, useState, useMemo } from 'react';
import { Text, Alert, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { styles } from './HomeStyles';
import { auth, database } from '../../config/firebase';
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../../redux/slices/RTDBSlice';
import { FlatList } from 'react-native-gesture-handler';
import { MemeItem } from '../../components/memeItem/memeItem';
import { onAuthStateChanged } from 'firebase/auth';
import { authenticationSignOut } from '../../services/signout';
import { RootState } from '../../redux/store';
import { MemeItemProps } from '../../config/interfaces';
import SegmentedControl from '@react-native-community/segmented-control';

export const Home: FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const dataMemes = useSelector((state: RootState) => state.RTDB.memes);
  const [memes, setMemes] = useState(dataMemes);
  const [allMemes, setAllMemes] = useState(dataMemes);
  const ArabicMemes = useMemo(() => {
    return memes.filter((meme) => meme.language == 'Arabic');
  }, [dataMemes]);
  const FrenchMemes = useMemo(() => {
    return memes.filter((meme) => meme.language == 'French');
  }, [dataMemes]);
  const EnglishMemes = useMemo(() => {
    return memes.filter((meme) => meme.language == 'English');
  }, [dataMemes]);
  // console.log(allMemes);
  const onLikePress = (item: MemeItemProps) => {
    const memeReference = doc(database, 'memes', item.meme);
    if (
      auth.currentUser?.email &&
      !item.likes.includes(auth.currentUser.email)
    ) {
      const likes = [...item.likes];
      likes.push(auth.currentUser?.email);
      updateDoc(memeReference, {
        likes,
      });
    }
    if (
      auth.currentUser?.email &&
      item.likes.includes(auth.currentUser.email)
    ) {
      const likes = [...item.likes];
      const likesFiltered = likes.filter(
        (like) => like != auth.currentUser?.email
      );
      updateDoc(memeReference, {
        likes: likesFiltered,
      });
    } else if (!auth.currentUser?.email) {
      Alert.alert('You must be logged in');
    }
  };
  const onDislikePress = (item: MemeItemProps) => {
    const memeReference = doc(database, 'memes', item.meme);
    if (
      auth.currentUser?.email &&
      !item?.dislikes.includes(auth.currentUser.email)
    ) {
      const dislikes = [...item.dislikes];
      dislikes.push(auth.currentUser?.email);
      updateDoc(memeReference, {
        dislikes,
      });
    }
    if (
      auth.currentUser?.email &&
      item.dislikes.includes(auth.currentUser.email)
    ) {
      const dislikes = [...item.dislikes];
      const dislikesFiltered = dislikes.filter(
        (dislike) => dislike != auth.currentUser?.email
      );
      updateDoc(memeReference, {
        dislikes: dislikesFiltered,
      });
    } else if (!auth.currentUser?.email) {
      Alert.alert('You must be logged in');
    }
  };
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
    const chatsRef = collection(database, 'chats');
    const q = query(chatsRef, orderBy('createdAt', 'desc'));
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

  const items = [memes, []];
  useEffect(() => {
    setMemes(dataMemes);
    setAllMemes(dataMemes);
  }, [dataMemes]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    });
    return () => unsubscribe();
  }, []);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [languageSelectedIndex, setLanguageSelectedIndex] = useState<number>(0);

  return (
    <View style={styles.container}>
      <SegmentedControl
        style={{ marginTop: 15 }}
        backgroundColor={'#fff'}
        tintColor='orange'
        fontStyle={{ color: 'black' }}
        activeFontStyle={{
          color: 'white',
        }}
        values={['Memes', 'Meditation Quotes']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      {selectedIndex == 0 ? (
        <SegmentedControl
          style={{ marginTop: 15 }}
          backgroundColor={'#fff'}
          tintColor='orange'
          fontStyle={{ color: 'black' }}
          activeFontStyle={{
            color: 'white',
          }}
          values={['All', 'Arabic', 'French', 'English']}
          selectedIndex={languageSelectedIndex}
          onChange={(event) => {
            setLanguageSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            if (event.nativeEvent.selectedSegmentIndex == 0) {
              setMemes(allMemes);
            } else if (event.nativeEvent.selectedSegmentIndex == 1) {
              setMemes(ArabicMemes);
            } else if (event.nativeEvent.selectedSegmentIndex == 2) {
              setMemes(FrenchMemes);
            } else if (event.nativeEvent.selectedSegmentIndex == 3) {
              setMemes(EnglishMemes);
            }
          }}
        />
      ) : null}
      <FlatList
        data={items[selectedIndex]}
        renderItem={(item: { item: MemeItemProps }) => {
          return (
            <MemeItem
              likes={item?.item?.likes}
              dislikes={item?.item?.dislikes}
              meme={item?.item?.meme}
              createdAt={item?.item?.createdAt}
              onLikePress={() => onLikePress(item.item)}
              onDislikesPress={() => onDislikePress(item.item)}
              color={
                item?.item?.likes?.filter(
                  (item) => item == auth.currentUser?.email
                ).length > 0
                  ? 'red'
                  : 'grey'
              }
              dislikesColor={
                item?.item?.dislikes?.filter(
                  (item) => item == auth.currentUser?.email
                ).length > 0
                  ? 'red'
                  : 'grey'
              }
            />
          );
        }}
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
