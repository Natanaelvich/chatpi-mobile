const { BASE_URL_DEV } = process.env;
const { BASE_URL_PRO } = process.env;

const BASE_URL = !__DEV__ ? BASE_URL_DEV : BASE_URL_PRO;

export { BASE_URL };
