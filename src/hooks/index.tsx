import React from 'react';

import { ChatProvider } from './modules/ChatContext';

const AppProvider: React.FC = ({ children }) => (
  <ChatProvider>{children}</ChatProvider>
);

export default AppProvider;
