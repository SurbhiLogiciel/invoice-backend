declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    NODE_ENV: "development" | "production" | "test";
    URL: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    EMAIL_HOST: string;
    EMAIL_PORT: string;
    EMAIL_USER: string;
    EMAIL_PASS: string;
    API_KEY?: string;
    CLIENT_URL?: string;
    DEBUG?: string;
    CORS_ORIGIN: string;
    CORS_METHODS: string;
    CORS_HEADERS: string;
  }
}
