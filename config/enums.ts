import { TextStyle } from 'react-native';

export interface TextInputProps {
  label?: string;
  mode?: string;
  placeholderTextColor?: TextStyle;
  activeOutlineColor?: string;
  textColor?: string;
  outlineColor?: string;
  onChangeText?: () => void;
  contentStyle?: any;
}
