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
