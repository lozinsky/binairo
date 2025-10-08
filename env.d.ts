/// <reference types="@react-router/node" />
/// <reference types="vite/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_BASE_PATH: string | undefined;
      VITEST: 'true' | undefined;
    }
  }
}

export {};
