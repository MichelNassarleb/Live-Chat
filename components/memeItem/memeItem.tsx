import React, { FC } from 'react';
import { Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { auth } from '../../config/firebase';
import { MemeItemProps } from '../../config/interfaces';

export const MemeItem: FC<MemeItemProps> = (props) => {
  return (
    <View
      style={{
        margin: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'orange',
        borderRadius: 5,
      }}
    >
      <Text children={props.meme} />
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
      >
        <Text children={props?.likes?.length} style={{ marginRight: 10 }} />
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
