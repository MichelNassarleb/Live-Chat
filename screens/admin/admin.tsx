import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState, useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import { TextInput } from '../../components/textInput';
import { database } from '../../config/firebase';
import { styles } from './adminStyles';
import constants from '../../config/constants.json';
export const Admin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memeInput, setMemeInput] = useState<string>('');
  const [memeLanguage, setMemeLanguage] = useState<string>('');
  const [constantsLanguage, setConstansLanguage] = useState(
    constants.languages
  );
  const onCheckBoxPress = (item: {
    name: string;
    status: 'checked' | 'unchecked' | 'indeterminate';
    id: number;
  }) => {
    if (item.status == 'unchecked') {
      setConstansLanguage(
        constantsLanguage.map((language) => {
          if (language.name == item.name) {
            return { ...language, status: 'checked' };
          } else return language;
        })
      );
    } else if (item.status == 'checked') {
      setConstansLanguage(
        constantsLanguage.map((language) => {
          if (language.name == item.name) {
            return { ...language, status: 'unchecked' };
          } else {
            return language;
          }
        })
      );
    }
  };
  const onSubmit = useCallback((meme: string) => {
    setIsLoading(true);

    const memeRef = collection(database, 'memes');
    setDoc(doc(memeRef, meme), {
      meme,
      likes: [],
      createdAt: new Date(),
      dislikes: [],
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
      {constantsLanguage.map(
        (item: {
          name: string;
          status: 'checked' | 'unchecked' | 'indeterminate';
          id: number;
        }) => {
          return (
            <View style={{ flexDirection: 'row' }} key={item.id.toString()}>
              <Text children={item.name} />
              <Checkbox
                onPress={() => onCheckBoxPress(item)}
                uncheckedColor={'orange'}
                color={'orange'}
                status={item.status}
              />
            </View>
          );
        }
      )}
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
