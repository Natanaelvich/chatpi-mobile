import { MessageProps } from './reducer';

export const addMessage = (
  message: MessageProps,
): {
  type: string;
  message: MessageProps;
} => ({
  type: '@messages/ADD_MESSAGE',
  message,
});
export const addMessages = (
  messages: string,
): {
  type: string;
  messages: string;
} => ({
  type: '@messages/ADD_MESSAGES',
  messages,
});
export const readMessage = (
  message: MessageProps,
): {
  type: string;
  message: MessageProps;
} => ({
  type: '@messages/READ_MESSAGE',
  message,
});
export const deleteMessage = (
  user: string,
): {
  type: string;
  user: string;
} => ({
  type: '@messages/DELETE_MESSAGE',
  user,
});
export const updateMessageSended = (
  messageId: string | number[],
): {
  type: string;
  messageId: string | number[];
} => ({
  type: '@messages/UPDATE_MESSAGE_SENDED',
  messageId,
});
export const deleteAllMessage = (): {
  type: string;
} => ({
  type: '@messages/DELETE_ALL_MESSAGES',
});
