declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';
declare interface Window {
  webkit: any;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    [key: string]: any;
  }
}

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production';
    [key: string]: any;
  };
};
