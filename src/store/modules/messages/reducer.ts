export interface MessageProps {
  user: string | undefined;
  toUser: string;
  message: string;
  readed: boolean;
  id: string;
  date: Date;
}
interface InitialStateMessageProps {
  messages: MessageProps[];
}
interface ReducerProps {
  message: MessageProps;
  messages: string;
  type: string;
}

const initialState = {
  messages: [],
} as InitialStateMessageProps;

export default (
  state = initialState,
  { type, message, messages }: ReducerProps,
): InitialStateMessageProps => {
  switch (type) {
    case '@messages/ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, message],
      };
    case '@messages/ADD_MESSAGES': {
      const messagesParse = JSON.parse(messages) as MessageProps[];
      const messagesTemp = messagesParse.map(m => ({
        ...m,
        id: m.user,
      })) as MessageProps[];

      console.tron('state.messages');
      console.tron(state.messages);
      console.tron('messagesTemp');
      console.tron(messagesTemp);
      console.tron('messagesParse');
      console.tron(messagesParse);

      return {
        ...state,
        messages: state.messages.concat(messagesTemp),
      };
    }
    case '@messages/READ_MESSAGE':
      return {
        ...state,
        messages: state.messages.map(m =>
          m.id === message.id ? { ...m, readed: true } : m,
        ),
      };

    default:
      return state;
  }
};
