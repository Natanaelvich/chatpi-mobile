export interface OptionsProps {
  typers: Record<string, unknown> | null;
  usersLoggeds: Record<string, unknown> | null;
  socket: SocketIOClient.Socket | null;
}
interface ReducerProps {
  typers: Record<string, unknown>;
  type: string;
  socket: SocketIOClient.Socket | null;
  usersLoggeds: Record<string, unknown> | null;
}

const initialState = {
  socket: null,
  typers: {},
  usersLoggeds: {},
} as OptionsProps;

export default (
  state = initialState,
  { type, typers, usersLoggeds, socket }: ReducerProps,
): OptionsProps => {
  switch (type) {
    case '@socket/ADD_TYPERS':
      return {
        ...state,
        typers,
      };
    case '@socket/ADD_USERS_LOGGEDS':
      return {
        ...state,
        usersLoggeds,
      };
    case '@socket/ADD_SOCKET':
      return {
        ...state,
        socket,
      };

    default:
      return state;
  }
};
