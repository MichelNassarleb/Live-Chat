import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import React, { useEffect, useContext, createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, database } from '../config/firebase';
import { setMemes } from '../redux/slices/RTDBSlice';
import { RootState } from '../redux/store';
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
  const memesRef = collection(database, 'memes');
  const qMemes = query(memesRef);
  const memes = useSelector((state: RootState) => state.RTDB.memes);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onSnapshot(qMemes, (snap) => {
      console.log(snap.docChanges().length);
      if (snap.docChanges().length > 0) {
        snap.docChanges().map((doc: any) => {
          dispatch(
            setMemes({
              meme: doc.doc.data().meme,
              likes: [...doc.doc.data().likes],
              createdAt: doc.doc.data().createdAt.toDate(),
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
