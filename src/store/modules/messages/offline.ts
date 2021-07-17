import { markActionsOffline } from 'redux-offline-queue';

const OfflineQueueActions = {
  SendMessage: (
    messageJsonString: string,
  ): {
    type: string;
    messageJsonString: string;
  } => ({
    type: '@messages/SEND_MESSAGE',
    messageJsonString,
  }),
};

const ActionsTrack = ['SendMessage'];

markActionsOffline(OfflineQueueActions, ActionsTrack);

export { OfflineQueueActions };
