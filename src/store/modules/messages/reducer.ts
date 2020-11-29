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
  type: string;
}

const initialState = {
  messages: [],
} as InitialStateMessageProps;

export default (
  state = initialState,
  { type, message }: ReducerProps,
): InitialStateMessageProps => {
  switch (type) {
    case '@messages/ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, message],
      };
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
