import getIPhost from './getIPhost';

export default function getAvatarUrl(
  url: string | null | undefined,
): string | null {
  if (!url) {
    return null;
  }

  if (!__DEV__) {
    return url;
  }

  const hostname = getIPhost();

  return String(url).replace('localhost', hostname);
}
