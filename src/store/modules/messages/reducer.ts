export interface MessageProps {
  user: string;
  toUser: string;
  message: string;
}
interface ReducerProps {
  messages: MessageProps[];
}
interface InitialStateProps {
  message: MessageProps;
  type: string;
}

const initialState = {
  messages: [],
};

export default (
  state = initialState,
  { type, message }: InitialStateProps,
): ReducerProps => {
  switch (type) {
    case '@messages/ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, message],
      };

    default:
      return state;
  }
};
