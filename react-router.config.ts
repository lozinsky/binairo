import type { Config } from '@react-router/dev/config';

const config: Config = {
  basename: process.env.PUBLIC_BASE_PATH ?? '/',
  ssr: false,
};

export default config;
