import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useState, useCallback, useRef } from 'react';
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
import constants from '../../config/constants.json';
import { Picker } from '@react-native-picker/picker';

export const Admin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [memeInput, setMemeInput] = useState<string>('');
  const [meditation, setMeditation] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState(
    constants.languages[0].value
  );
  const onSubmit = useCallback((meme: string, language: string) => {
    setIsLoading(true);
    const memeRef = collection(database, 'memes');
    setDoc(doc(memeRef, meme), {
      meme,
      likes: [],
      createdAt: new Date(),
      dislikes: [],
      language,
    })
      .then(() => {
        setIsLoading(false);
        Alert.alert('Meme added successfully');
        setMemeInput('');
      })
      .catch((er) => {
        Alert.alert(er);
        setMemeInput('');
        setIsLoading(false);
      });
  }, []);
  const onMeditationSubmit = useCallback((meditation: string) => {
    setIsLoading(true);
    const meditationRef = collection(database, 'meditation');
    setDoc(doc(meditationRef, meditation), {
      meditation,
      createdAt: new Date(),
    })
      .then(() => {
        setIsLoading(false);
        Alert.alert('Meditation quote added successfully');
        setMeditation('');
      })
      .catch((er) => {
        Alert.alert(er);
        setMeditation('');
        setIsLoading(false);
      });
  }, []);

  const pickerRef = useRef(null);

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
      <Picker
        style={{ width: '30%', height: 20 }}
        onValueChange={(item) => {
          setSelectedLanguage(item);
        }}
        selectedValue={selectedLanguage}
        ref={pickerRef}
      >
        {constants.languages.map((item) => {
          return (
            <Picker.Item key={item.id} value={item.value} label={item.label} />
          );
        })}
      </Picker>
      {isLoading ? (
        <ActivityIndicator
          testID='button-activityIndicator'
          style={[styles.button]}
          color={'white'}
          size={30}
        />
      ) : (
        <TouchableOpacity
          disabled={!(!!memeInput && !!selectedLanguage)}
          style={[
            styles.button,
            !(!!memeInput && !!selectedLanguage) && { backgroundColor: 'grey' },
          ]}
          onPress={() => onSubmit(memeInput, selectedLanguage)}
        >
          <Text
            style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}
            children={'Post'}
          />
        </TouchableOpacity>
      )}
      <TextInput
        label={'Enter meditation quote'}
        numberOfLines={5}
        mode='outlined'
        placeholderTextColor={'orange'}
        activeOutlineColor={'orange'}
        textColor={'white'}
        outlineColor={'orange'}
        value={meditation}
        onChangeText={setMeditation}
        style={{ width: '90%', marginVertical: 20 }}
        contentStyle={styles.input}
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
          disabled={!!!meditation}
          style={[styles.button, !!!meditation && { backgroundColor: 'grey' }]}
          onPress={() => onMeditationSubmit(meditation)}
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
