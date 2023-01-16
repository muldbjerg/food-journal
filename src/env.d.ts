declare namespace NodeJS {
  /** Merge declaration with `process` in order to override the global-scoped env. */
  export interface ProcessEnv {
    /**
     * Built-in environment variable.
     * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
     */
    readonly NG_APP_ENV: string;
    NG_APP_FIREBASE_API_KEY: string;
    NG_APP_FIREBASE_AUTH_DOMAIN: string;
    NG_APP_FIREBASE_DB_URL: string;
    NG_APP_FIREBASE_PROJECT_ID: string;
    NG_APP_FIREBASE_STORAGE_BUCKET: string;
    NG_APP_FIREBASE_MESSAGING_SENDER_ID: string;
    NG_APP_FIREBASE_APP_ID: string;
  }
}
