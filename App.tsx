import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './config/firebase';
import { RootNavigator } from './navigation/rootNavigator';
export default function App() {
  const AuthenticatedUserContext = createContext({});
  const AuthenticatedUserProvider = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    return (
      <AuthenticatedUserContext.Provider value={{ user, setUser }}>
        {children}
      </AuthenticatedUserContext.Provider>
    );
  };
  const { user, setUser }: any = useContext(AuthenticatedUserContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
    });
    unsubscribe();
    return () => unsubscribe();
  }, [user]);
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
