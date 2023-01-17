import { NavigationContainer } from '@react-navigation/native';
import {
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useContext, createContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { database } from '../config/firebase';
import {
  setMeditationQuotes,
  setMemes,
  updateMemes,
} from '../redux/slices/RTDBSlice';
import { ChatStack } from './Stacks/chatStack';

const AuthenticatedUserContext = createContext({});
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState<any>('aa');
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

export const RootNavigator = () => {
  const memesRef = collection(database, 'memes', '');
  const qMemes = query(memesRef, orderBy('createdAt', 'desc'));
  const medtationRef = collection(database, 'meditation');
  const meditationQuotes = query(medtationRef, orderBy('createdAt', 'desc'));
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onSnapshot(qMemes, (snap) => {
      if (snap.docChanges().length > 0) {
        snap.docChanges().map((doc: any) => {
          if (doc.type == 'modified') {
            dispatch(
              updateMemes({
                meme: doc.doc.data().meme,
                likes: [...doc.doc.data().likes],
                dislikes: [...doc.doc.data().dislikes],
              })
            );
          } else
            dispatch(
              setMemes({
                meme: doc.doc.data().meme,
                likes: [...doc.doc.data().likes],
                createdAt: doc.doc.data().createdAt.toDate(),
                dislikes: [...doc.doc.data().dislikes],
                language: doc.doc.data().language,
              })
            );
        });
      } else {
        snap.docs.map((doc) => {
          dispatch(
            setMemes({
              meme: doc.data().meme,
              likes: [...doc.data().likes],
              createdAt: doc.data().createdAt.toDate(),
              dislikes: [...doc.data().dislikes],
              ...doc,
            })
          );
        });
      }
    });
    return () => unsub();
  }, []);
  useEffect(() => {
    const unsub = onSnapshot(qMemes, (snap) => {
      {
        snap.docs.map((doc) => {
          dispatch(
            setMeditationQuotes({
              text: doc.data().meme,
              createdAt: doc.data().createdAt.toDate(),
            })
          );
        });
      }
    });
    return () => unsub();
  }, []);
  return (
    <AuthenticatedUserProvider>
      <NavigationContainer>
        <ChatStack />
      </NavigationContainer>
    </AuthenticatedUserProvider>
  );
};
