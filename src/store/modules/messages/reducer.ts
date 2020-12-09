export interface MessageProps {
  user: string | undefined;
  toUser: string;
  message: string;
  readed: boolean;
  id: string;
  date: Date;
  name?: string;
}
interface InitialStateMessageProps {
  messages: MessageProps[];
}
interface ReducerProps {
  message: MessageProps;
  messages: string;
  user: string;
  type: string;
}

const initialState = {
  messages: [],
} as InitialStateMessageProps;

export default (
  state = initialState,
  { type, message, messages, user }: ReducerProps,
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
    case '@messages/DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(m => m.id !== user),
      };

    default:
      return state;
  }
};
