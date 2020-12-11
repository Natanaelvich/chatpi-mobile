export interface UserProps {
  modalDeleteData: boolean;
}
interface ReducerProps {
  type: string;
  modalDeleteData: boolean;
}
interface InitialStateUserProps {
  modalDeleteData: boolean;
}

const initialState = {
  modalDeleteData: false,
} as InitialStateUserProps;

export default (
  state = initialState,
  { type, modalDeleteData }: ReducerProps,
): InitialStateUserProps => {
  switch (type) {
    case '@utils/UTILS_MODAL_DELETE_DATA':
      return {
        ...state,
        modalDeleteData,
      };

    default:
      return state;
  }
};
