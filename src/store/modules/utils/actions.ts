export const modalDeleteDataVisible = (
  modalDeleteData: boolean,
): {
  type: string;
  modalDeleteData: boolean;
} => ({
  type: '@utils/UTILS_MODAL_DELETE_DATA',
  modalDeleteData,
});
