import { format } from 'date-fns';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MemeItemProps } from '../../config/interfaces';
import { styles } from './memeItemStyles';

export const MemeItem: FC<MemeItemProps> = (props) => {
  return props.meme ? (
    <View style={styles.container}>
      <View style={styles.date}>
        {props.createdAt ? (
          <Text
            children={format(
              new Date(props?.createdAt),
              'yyyy-MM-dd HH:mm:ss a'
            )}
          />
        ) : null}
      </View>
      {props.meme ? <Text children={props.meme} /> : null}

      <View style={styles.bottomContainer}>
        <View style={styles.bottomLeftContainer}>
          <Text children={props?.likes?.length} style={styles.likes} />

          <MaterialIcons
            size={24}
            onPress={() => props.onLikePress()}
            name='thumb-up'
            color={props.color}
          />
        </View>
        <View style={styles.bottomLeftContainer}>
          <Text children={props?.dislikes?.length} style={styles.likes} />

          <MaterialIcons
            size={24}
            onPress={() => props.onDislikesPress()}
            name='thumb-down'
            color={props.dislikesColor}
          />
        </View>
      </View>
    </View>
  ) : null;
};
