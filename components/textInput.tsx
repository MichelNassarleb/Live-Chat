import React, { FC } from 'react';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { TextInputPaperProps } from '../config/interfaces';

export const TextInput: FC<TextInputPaperProps> = (props) => {
  return (
    <TextInputPaper
      label={props.label}
      mode={props.mode}
      placeholderTextColor={props.placeholderTextColor}
      activeOutlineColor={props.activeOutlineColor}
      textColor={props.textColor}
      secureTextEntry={props.secureTextEntry}
      outlineColor={props.outlineColor}
      value={props.value}
      theme={{
        colors: {
          placeholder: 'white',
          text: 'white',
          primary: 'white',
          outlineColor: 'transparent',
          background: 'white',
        },
      }}
      onChangeText={props.onChangeText}
      style={[props.style, { width: '90%' }]}
      contentStyle={props.contentStyle}
    />
  );
};
