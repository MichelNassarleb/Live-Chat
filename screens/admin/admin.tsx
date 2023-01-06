import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { TextInput } from '../../components/textInput';
import { database } from '../../config/firebase';
import { styles } from './adminStyles';
export const Admin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memeInput, setMemeInput] = useState<string>('');
  const [memeLanguage, setMemeLanguage] = useState<string>('');

  const onSubmit = useCallback((meme: string) => {
    setIsLoading(true);
    const memeRef = collection(database, 'memes');
    setDoc(doc(memeRef, meme), {
      meme,
      likes: [],
      createdAt: new Date(),
    })
      .then(() => {
        setIsLoading(false);
        Alert.alert('Meme added successfully');
        setMemeInput('');
        setMemeLanguage('');
      })
      .catch((er) => {
        Alert.alert(er);
        setMemeInput('');
        setIsLoading(false);
        setMemeLanguage('');
      });
  }, []);
  return (
    <View
      style={[
        styles.container,
        { justifyContent: 'flex-start', alignItems: 'center' },
      ]}
    >
      <TextInput
        label={'Enter meme'}
        numberOfLines={5}
        mode='outlined'
        placeholderTextColor={'orange'}
        activeOutlineColor={'orange'}
        textColor={'white'}
        outlineColor={'orange'}
        value={memeInput}
        onChangeText={setMemeInput}
        style={{ width: '90%', marginVertical: 20 }}
        contentStyle={styles.input}
      />
      <TextInput
        label={'Enter language'}
        textColor={'white'}
        value={memeLanguage}
        mode='outlined'
        secureTextEntry={true}
        placeholderTextColor={'orange'}
        activeOutlineColor={'orange'}
        outlineColor={'orange'}
        style={{ width: '90%', justifyContent: 'center' }}
        contentStyle={[styles.input]}
        onChangeText={setMemeLanguage}
      />
      {isLoading ? (
        <ActivityIndicator
          testID='button-activityIndicator'
          style={[styles.button]}
          color={'white'}
          size={30}
        />
      ) : (
        <TouchableOpacity
          disabled={!(!!memeInput && !!memeLanguage)}
          style={[
            styles.button,
            !(!!memeLanguage && !!memeInput) && { backgroundColor: 'grey' },
          ]}
          onPress={() => onSubmit(memeInput)}
        >
          <Text
            style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}
            children={'Post'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
