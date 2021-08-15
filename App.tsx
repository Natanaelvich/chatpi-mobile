import React from 'react';
import { LogBox } from 'react-native';

import Main from './src';

LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified.',
  'Animated.event now requires a second argument for options',
]);

const App: React.FC = () => {
  return <Main />;
};

export default App;
