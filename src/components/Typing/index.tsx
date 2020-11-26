import React from 'react';
import LottieView from 'lottie-react-native';

import { View } from 'react-native';
import typing from '../../assets/typing.json';

const Typing: React.FC = () => {
  return (
    <View
      style={{
        borderRadius: 12,
        alignSelf: 'flex-start',
        backgroundColor: '#eee',
        padding: 6,
        borderBottomLeftRadius: 0,
      }}
    >
      <LottieView
        style={{
          width: 30,
          height: 30,
          borderRadius: 12,
        }}
        autoPlay
        source={typing}
        autoSize
      />
    </View>
  );
};

export default Typing;
