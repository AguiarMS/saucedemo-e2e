import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Diretório onde os arquivos de teste estão localizados
  testDir: './tests',

  // Timeout global por teste (30 segundos)
  timeout: 30_000,

  // Timeout para cada asserção individual
  expect: {
    timeout: 8_000,
  },

  // Execução paralela: desabilitada por padrão para evitar conflitos de estado
  fullyParallel: false,

  // Falha o build se test.only foi acidentalmente commitado
  forbidOnly: !!process.env.CI,

  // Retries: 1 em CI para absorver flakiness de rede; 0 localmente
  retries: process.env.CI ? 1 : 0,

  // Workers: 1 para garantir isolamento entre testes
  workers: process.env.CI ? 1 : 1,

  // Reporter: HTML para análise visual, lista para terminal
  reporter: [
    ['html', { outputFolder: 'reports', open: 'never' }],
    ['list'],
  ],

  use: {
    // URL base da aplicação testada
    baseURL: 'https://www.saucedemo.com',

    // Screenshot apenas em falhas
    screenshot: 'only-on-failure',

    // Vídeo em retry (útil para debugging em CI)
    video: 'on-first-retry',

    // Trace completo em retry para análise detalhada
    trace: 'on-first-retry',

    // Viewport padrão
    viewport: { width: 1280, height: 720 },

    // Aguarda que a rede esteja ociosa antes de considerar a navegação completa
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Descomente para execução cross-browser:
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  // Diretório para screenshots e traces gerados em falhas
  outputDir: 'test-results/',
});