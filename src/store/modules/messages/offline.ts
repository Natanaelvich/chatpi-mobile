import { markActionsOffline } from 'redux-offline-queue';

const OfflineQueueActions = {
  SendMessage: (
    message: string,
    socket: SocketIOClient.Socket,
  ): {
    type: string;
    payload: {
      message: string;
      socket: SocketIOClient.Socket;
    };
  } => ({
    type: '@messages/SEND_MESSAGE',
    payload: {
      message,
      socket,
    },
  }),
};

const ActionsTrack = ['SendMessage'];

markActionsOffline(OfflineQueueActions, ActionsTrack);

export { OfflineQueueActions };
