import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { LayoutAnimation } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { BASE_URL } from '../../config';
import { addMessage, addMessages } from '../../store/modules/messages/actions';
import { MessageProps } from '../../store/modules/messages/reducer';
import { RootState } from '../../store/modules/rootReducer';
import { addTypers, addUsersLoggeds } from '../../store/modules/socket/actions';

interface ChatContextData {
  getLastMessage: (userMessage: any) => any;
  getMessagesNoReadedsArray: (attendant: any) => any[];
  messages: any[];
  users: any[];
  usersLoggeds: any;
  messagesUsers: {
    numberMessagesNoRead: number;
    lastMessage: MessageProps;
    id: string;
    name: string;
    email: string;
    avatar_url: string;
    clerk: string | null;
  }[];
  socket: SocketIOClient.Socket;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

const ChatProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  const { messages } = useSelector((state: RootState) => state.messages);
  const { users } = useSelector((state: RootState) => state.users);
  const { data: user } = useSelector((state: RootState) => state.auth);

  const { usersLoggeds } = useSelector((state: RootState) => state.socket);

  const socket = useMemo(() => {
    return io(BASE_URL as string, {
      query: { user: user?.user.id },
    });
  }, [user]);

  useEffect(() => {
    socket.on('usersLoggeds', (usersLoggedsSocket: string) => {
      dispatch(addUsersLoggeds(JSON.parse(usersLoggedsSocket)));
    });

    socket.on('typing', (typingSocket: string) => {
      dispatch(addTypers(JSON.parse(typingSocket)));
    });

    socket.on('messagesCache', (messagesCache: string) => {
      dispatch(addMessages(messagesCache));
    });

    socket.on('message', (messageSocket: string) => {
      const messageParse = JSON.parse(messageSocket);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      dispatch(
        addMessage({
          ...messageParse,
          readed: false,
          id: messageParse.user,
        }),
      );
    });
  }, [socket, dispatch]);

  const getLastMessage = useCallback(
    userMessage => {
      const messagesUser = messages.filter(m => m.id === userMessage.id);
      return messagesUser[messagesUser.length - 1];
    },
    [messages],
  );

  const messagesUsers = useMemo(() => {
    const usersTemp = users
      .filter(a => !!messages.find(m => m.id === a.id))
      .map(a => ({
        ...a,
        numberMessagesNoRead: messages
          .filter(m => m.id === a.id)
          .filter(m => m.readed === false).length,
        lastMessage: getLastMessage(a),
      }))
      .sort((a, b) =>
        getLastMessage(a)?.date > getLastMessage(b)?.date ? -1 : 1,
      );

    return usersTemp;
  }, [users, messages, getLastMessage]);

  const getMessagesNoReadedsArray = useCallback(
    attendant => {
      const messagesUser = messages
        .filter(m => m.id === attendant.id)
        .filter(m => m.readed === false);
      return messagesUser;
    },
    [messages],
  );

  return (
    <ChatContext.Provider
      value={{
        getLastMessage,
        getMessagesNoReadedsArray,
        messages,
        users,
        usersLoggeds,
        messagesUsers,
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

function useChat(): ChatContextData {
  const context = useContext(ChatContext);

  return context;
}

export { ChatProvider, useChat };
