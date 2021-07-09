import { markActionsOffline } from 'redux-offline-queue';
import { MessageProps } from './reducer';

export const OfflineQueueActions = {
  SendMessage: (
    message: MessageProps,
  ): {
    type: string;
    message: MessageProps;
  } => ({
    type: '@messages/SEND_MESSAGE',
    message,
  }),
};

export const ActionsTrack = ['SendMessage'];

markActionsOffline(OfflineQueueActions, ActionsTrack);
