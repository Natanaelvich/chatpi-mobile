export interface OptionsProps {
  darkMode: boolean;
}
interface ReducerProps {
  darkMode: boolean;
  type: string;
}

const initialState = {
  darkMode: false,
} as OptionsProps;

export default (
  state = initialState,
  { type, darkMode }: ReducerProps,
): OptionsProps => {
  switch (type) {
    case '@options/DARK_MODE':
      return {
        ...state,
        darkMode,
      };

    default:
      return state;
  }
};
