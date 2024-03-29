import React from 'react';
import LottieView from 'lottie-react-native';

import { View } from 'react-native';
import assets from '../../assets';

const Typing: React.FC = () => {
  return (
    <View
      style={{
        borderRadius: 12,
        alignSelf: 'flex-start',
        backgroundColor: '#F4F4F4',
        padding: 6,
        borderBottomLeftRadius: 0,
      }}
    >
      <LottieView
        style={{
          width: 30,
          height: 30,
        }}
        autoPlay
        source={assets.typing}
        autoSize
      />
    </View>
  );
};

export default Typing;
