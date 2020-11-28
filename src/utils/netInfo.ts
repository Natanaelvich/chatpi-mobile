import NetInfo from '@react-native-community/netinfo';

const isConnected = async (): Promise<boolean | null | undefined> => {
  const infoInternet = (await NetInfo.fetch()).isInternetReachable;
  return infoInternet;
};

export { isConnected };
