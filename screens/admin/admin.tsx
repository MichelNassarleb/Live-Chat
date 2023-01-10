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
  const [constantsLanguage, setConstansLanguage] = useState(
    constants.languages
  );
  const [selectedValue, setSelectedValue] = useState(
    constants.languages[0].value
  );

  const onSubmit = useCallback((meme: string) => {
    setIsLoading(true);

    const memeRef = collection(database, 'memes');
    setDoc(doc(memeRef, meme), {
      meme,
      likes: [],
      createdAt: new Date(),
      dislikes: [],
      language: selectedValue,
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
        onValueChange={(item) => setSelectedValue(item)}
        selectedValue={selectedValue}
        ref={pickerRef}
      >
        {constantsLanguage.map((item) => {
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
          disabled={!(!!memeInput && !!selectedValue)}
          style={[
            styles.button,
            !(!!memeInput && !!selectedValue) && { backgroundColor: 'grey' },
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
