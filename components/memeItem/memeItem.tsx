import React, { FC } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../../config/firebase';
import { MemeItemProps } from '../../config/interfaces';
import { styles } from './memeItemStyles';

export const MemeItem: FC<MemeItemProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text children={props.meme} />
      <View style={styles.bottomContainer}>
        <Text children={props?.likes?.length} style={styles.likes} />
        <MaterialIcons
          size={24}
          onPress={() => console.log('presssed')}
          name='thumb-up'
          color={props.color}
        />
      </View>
    </View>
  );
};
