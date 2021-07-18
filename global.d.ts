declare module NodeJS {
  interface Global {
    BROWSER: import('puppeteer').Browser | null,
    SERVER_HOST?: string
  }
}
