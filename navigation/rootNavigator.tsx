import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useContext, createContext, useState } from 'react';
import { auth } from '../config/firebase';
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
  return (
    <AuthenticatedUserProvider>
      <NavigationContainer>
        <ChatStack />
      </NavigationContainer>
    </AuthenticatedUserProvider>
  );
};
