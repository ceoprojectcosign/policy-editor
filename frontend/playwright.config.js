/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: './tests/e2e',
    timeout: 30 * 1000,
    expect: {
      timeout: 5000,
    },
    use: {
      baseURL: 'http://localhost:5173',
      headless: true,
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    },
  };
  
  export default config;