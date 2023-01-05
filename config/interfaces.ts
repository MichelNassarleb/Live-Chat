import { TextStyle } from 'react-native';

export interface TextInputPaperProps {
  label?: string;
  mode?: 'flat' | 'outlined';
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  activeOutlineColor?: string;
  textColor?: string;
  numberOfLines?: number;
  outlineColor?: string;
  onChangeText?: any;
  contentStyle?: any;
  value?: string;
  style?: any;
}

export interface RTDBSliceInterface {
  messages: Array<{
    _id?: string;
    createdAt?: Date;
    text?: string;
    user?: {
      _id?: string;
      name?: string;
    };
  }>;
  memes: Array<{
    meme: string;
    likes: [string];
  }>;
}

export interface MemeItemProps {
  meme: string;
  likes: Array<string>;
  color?: string;
}
