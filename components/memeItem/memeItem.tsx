import { format } from 'date-fns';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MemeItemProps } from '../../config/interfaces';
import { styles } from './memeItemStyles';

export const MemeItem: FC<MemeItemProps> = (props) => {
  return props.meme ? (
    <View style={styles.container}>
      {props.meme ? <Text children={props.meme} /> : null}
      {props.createdAt ? (
        <Text
          children={format(new Date(props?.createdAt), 'yyyy-MM-dd HH:mm:ss a')}
        />
      ) : null}
      <View style={styles.bottomContainer}>
        <Text children={props?.likes?.length} style={styles.likes} />

        <MaterialIcons
          size={24}
          onPress={() => props.onLikePress()}
          name='thumb-up'
          color={props.color}
        />
      </View>
    </View>
  ) : null;
};
