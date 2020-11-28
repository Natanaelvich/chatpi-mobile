import React from 'react';
import * as Sentry from 'sentry-expo';
import Main from './src';
import env from './env';

Sentry.init({
  dsn: env.SENTRY_DNS,
  enableInExpoDevelopment: true,
  debug: false,
});

const App: React.FC = () => {
  return <Main />;
};

export default App;
