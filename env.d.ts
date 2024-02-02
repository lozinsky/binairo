/// <reference types="@remix-run/cloudflare" />
/// <reference types="vite/client" />

declare module '@remix-run/cloudflare' {
  interface AppLoadContext {
    env: {
      readonly SESSION_SECRET: string;
    };
  }
}

export {};
