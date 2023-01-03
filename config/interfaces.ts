import { TextStyle } from 'react-native';

export interface TextInputPaperProps {
  label?: string;
  mode?: 'flat' | 'outlined';
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  activeOutlineColor?: string;
  textColor?: string;
  outlineColor?: string;
  onChangeText?: any;
  contentStyle?: any;
  style?: any;
}
