/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { Reactotron } from 'reactotron-core-client';
import { ReactotronReactNative } from 'reactotron-react-native';

declare module '*.png';

declare global {
  interface Console {
    tron: any;
  }
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(name: string, value: FormDataValue, fileName?: string): void;
    set(name: string, value: FormDataValue, fileName?: string): void;
  }
}
