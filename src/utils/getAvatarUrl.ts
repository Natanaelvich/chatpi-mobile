export default function getAvatarUrl(url: string): string | null {
  if (!url) {
    return null;
  }

  if (!__DEV__) {
    return url;
  }

  return String(url).replace('localhost', '10.0.3.2');
}
