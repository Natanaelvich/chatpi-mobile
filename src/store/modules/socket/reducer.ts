export interface OptionsProps {
  typers: Record<string, unknown> | null;
  usersLoggeds: Record<string, unknown> | null;
}
interface ReducerProps {
  typers: Record<string, unknown>;
  type: string;
  usersLoggeds: Record<string, unknown> | null;
}

const initialState = {
  typers: {},
  usersLoggeds: {},
} as OptionsProps;

export default (
  state = initialState,
  { type, typers, usersLoggeds }: ReducerProps,
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

    default:
      return state;
  }
};
