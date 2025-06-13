declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_WEATHER_API_KEY: string;
      Node_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};