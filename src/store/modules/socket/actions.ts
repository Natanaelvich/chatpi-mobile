export const addTypers = (
  typers: Record<string, unknown>,
): {
  type: string;
  typers: Record<string, unknown>;
} => ({
  type: '@socket/ADD_TYPERS',
  typers,
});
export const addUsersLoggeds = (
  usersLoggeds: Record<string, unknown>,
): {
  type: string;
  usersLoggeds: Record<string, unknown>;
} => ({
  type: '@socket/ADD_USERS_LOGGEDS',
  usersLoggeds,
});
export const addSocket = (
  socket: SocketIOClient.Socket,
): {
  type: string;
  socket: SocketIOClient.Socket;
} => ({
  type: '@socket/ADD_SOCKET',
  socket,
});
