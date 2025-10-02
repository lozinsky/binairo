/// <reference types="@react-router/node" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-comlink/client" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUBLIC_BASE_PATH: string | undefined;
      VITEST: 'true' | undefined;
    }
  }
}

export {};
