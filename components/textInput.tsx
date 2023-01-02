import React, { FC } from 'react';
import { TextInput as TextInputPaper } from 'react-native-paper';

export const TextInput: FC<any> = (props) => {
  return (
    <TextInputPaper
      label={props.label}
      mode={props.mode}
      placeholderTextColor={props.placeholder}
      activeOutlineColor={props.activeOutlineColor}
      textColor={props.textColor}
      outlineColor={props.outlineColor}
      theme={{
        colors: {
          placeholder: 'white',
          text: 'white',
          primary: 'white',
          outlineColor: 'transparent',
          background: 'white',
        },
      }}
      onChangeText={props.onChange}
      style={[props.style, { width: '90%' }]}
      contentStyle={props.contentStyle}
    />
  );
};
