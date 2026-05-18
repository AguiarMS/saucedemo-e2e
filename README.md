# 🧪 SauceDemo E2E Automation

> Projeto profissional de automação de testes End-to-End desenvolvido com **Playwright** e **TypeScript**, cobrindo os fluxos críticos de negócio da aplicação SauceDemo com arquitetura Page Object Model, dados centralizados e documentação de nível sênior.

---

## Visão geral

Este projeto demonstra a construção completa de uma suíte de testes E2E — do levantamento de requisitos e análise de riscos até a implementação automatizada, geração de relatórios e documentação técnica. Foi desenvolvido como case de portfólio premium, simulando o trabalho real de um QA Engineer Sênior em um projeto de e-commerce.

A aplicação testada é o **SauceDemo** (`saucedemo.com`), uma plataforma de e-commerce simulada criada pela Sauce Labs especificamente para práticas de automação. O projeto cobre autenticação, catálogo de produtos, ordenação, carrinho, checkout completo e confirmação de pedido.

---

## Sistema testado

| Atributo | Valor |
|---|---|
| Aplicação | SauceDemo |
| URL | https://www.saucedemo.com |
| Tipo | E-commerce simulado |
| Fluxo principal | Login → Catálogo → Carrinho → Checkout → Confirmação |

---

## Escopo de cobertura

| Módulo | Cobertura | Tipo |
|---|---|---|
| Autenticação (login/logout) | ✅ Completa | E2E + Negativo |
| Catálogo de produtos | ✅ Completa | Funcional |
| Ordenação e filtros | ✅ Completa | Funcional |
| Detalhes do produto | ✅ Completa | Funcional + Navegação |
| Carrinho (adição/remoção) | ✅ Completa | Funcional + Estado |
| Checkout — etapa 1 | ✅ Completa | Validação + Negativo |
| Checkout — etapa 2 | ✅ Completa | Cálculo financeiro |
| Confirmação do pedido | ✅ Completa | E2E |
| Fluxo E2E completo | ✅ Completa | Regressão crítica |

---

## Stack utilizada

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Playwright](https://playwright.dev) | ^1.45.0 | Framework de automação E2E |
| [TypeScript](https://www.typescriptlang.org) | ^5.4.0 | Tipagem estática e segurança de código |
| Node.js | 18 LTS+ | Runtime de execução |
| npm | — | Gerenciamento de pacotes |
| HTML Reporter | Embutido | Relatórios visuais de execução |

---

## Arquitetura do projeto

```
saucedemo-e2e/
├── tests/
│   ├── login.spec.ts          # Cenários de autenticação
│   ├── inventory.spec.ts      # Catálogo, ordenação e filtros
│   ├── product.spec.ts        # Detalhes do produto
│   ├── cart.spec.ts           # Gerenciamento do carrinho
│   └── checkout.spec.ts       # Checkout completo e fluxo E2E
├── pages/
│   ├── LoginPage.ts           # Page Object — tela de login
│   ├── InventoryPage.ts       # Page Object — catálogo
│   ├── ProductPage.ts         # Page Object — detalhes do produto
│   ├── CartPage.ts            # Page Object — carrinho
│   ├── CheckoutPage.ts        # Page Object — etapas de checkout
│   └── ConfirmationPage.ts    # Page Object — confirmação do pedido
├── data/
│   └── testData.ts            # Centralização de dados de teste
├── utils/
│   └── helpers.ts             # Funções auxiliares reutilizáveis
├── constants/
│   └── messages.ts            # Mensagens de erro e textos esperados
├── playwright.config.ts       # Configuração global
├── package.json
├── tsconfig.json
└── README.md
```

O padrão arquitetural adotado é o **Page Object Model (POM)**, que separa a lógica de interação com a interface (Page Objects) da lógica de especificação dos cenários (specs). Isso garante que mudanças na interface da aplicação impactem apenas um arquivo, não toda a suíte de testes.

---

## Pré-requisitos

- Node.js 18 LTS ou superior
- npm 9+
- Git

---

## Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/saucedemo-e2e.git
cd saucedemo-e2e

# 2. Instalar dependências
npm install

# 3. Instalar os browsers do Playwright
npx playwright install
```

---

## Execução dos testes

### Modo padrão (headless)
```bash
npm test
```

### Com browser visível
```bash
npm run test:headed
```

### Com interface visual do Playwright (modo UI)
```bash
npm run test:ui
```

### Modo debug (passo a passo com DevTools)
```bash
npm run test:debug
```

### Executar apenas um módulo
```bash
npm run test:login
npm run test:inventory
npm run test:cart
npm run test:checkout
```

---

## Visualização do relatório

Após a execução, um relatório HTML completo é gerado automaticamente:

```bash
npm run report
```

O relatório inclui resultado de cada teste, screenshots em caso de falha, trace viewer para análise de falhas e duração de cada cenário.

---

## Evidências em falhas

O Playwright está configurado para capturar automaticamente:

- **Screenshot** — capturado imediatamente ao falhar
- **Vídeo** — gravado na primeira tentativa de retry
- **Trace** — gravado na primeira tentativa de retry para análise no [Trace Viewer](https://playwright.dev/docs/trace-viewer)

Todos os artefatos são salvos em `test-results/` e referenciados no relatório HTML.

Para abrir um trace manualmente:

```bash
npx playwright show-trace test-results/<nome-do-trace>/trace.zip
```

---

## Casos de teste implementados

| ID | Descrição | Prioridade |
|---|---|---|
| TC-001 | Login com credenciais válidas | Alta |
| TC-002 | Login com usuário bloqueado | Alta |
| TC-003 | Login sem preencher nenhum campo | Alta |
| TC-004 | Login sem preencher a senha | Alta |
| TC-005 | Login com senha incorreta | Alta |
| TC-006 | Catálogo exibe 6 produtos após login | Alta |
| TC-007 | Ordenação por preço crescente | Média |
| TC-008 | Ordenação por preço decrescente | Média |
| TC-009 | Ordenação por nome A→Z | Média |
| TC-010 | Ordenação por nome Z→A | Média |
| TC-011 | Adicionar produto atualiza contador do carrinho | Alta |
| TC-012 | Remover produto limpa contador do carrinho | Alta |
| TC-013 | Página de detalhes exibe informações completas | Média |
| TC-014 | Adicionar ao carrinho pela página de detalhes | Alta |
| TC-015 | Carrinho preserva itens durante navegação | Média |
| TC-016 | Produto aparece no carrinho com dados corretos | Alta |
| TC-017 | "Continue Shopping" retorna ao catálogo | Média |
| TC-018 | Checkout valida First Name obrigatório | Alta |
| TC-019 | Checkout valida Last Name obrigatório | Alta |
| TC-020 | Checkout valida Postal Code obrigatório | Alta |
| TC-021 | Total = subtotal + taxa (cálculo financeiro) | Alta |
| TC-022 | Cancelar na etapa 1 retorna ao carrinho | Média |
| TC-023 | Cancelar na etapa 2 retorna ao catálogo | Média |
| TC-024 | **Fluxo E2E completo: login → confirmação** | Alta |
| TC-025 | Logout encerra sessão corretamente | Média |

---

## Boas práticas aplicadas

**Sem sleeps arbitrários.** Todas as esperas são baseadas em estado da aplicação usando as asserções assíncronas nativas do Playwright (`toBeVisible`, `toHaveURL`, `toHaveText`), eliminando flakiness por timing.

**Seletores por `data-test`.** Sempre que disponível, os locators utilizam atributos `data-test` — mais estáveis que classes CSS ou XPaths posicionais.

**Dados centralizados.** Nenhuma string de dado de teste aparece diretamente nos arquivos de spec. Todos os valores vivem em `data/testData.ts` e `constants/messages.ts`.

**Page Object Model.** Cada página da aplicação tem uma classe dedicada. Mudanças na interface impactam apenas um arquivo.

**Helpers reutilizáveis.** O setup de login comum é extraído em `loginAsStandardUser()`, evitando duplicação entre specs.

**Assertions significativas.** Além de verificar que um elemento existe, os testes verificam seu conteúdo, valor e estado corretos.

**Separação de responsabilidades.** Pages interagem com a UI. Specs descrevem comportamentos. Utils resolvem problemas técnicos. Constants guardam strings.

---

## Diferenciais técnicos

- Cobertura completa do fluxo E2E de ponta a ponta em um único teste de regressão crítica
- Validação de cálculo financeiro com extração e comparação programática de valores monetários
- Múltiplos usuários de teste cobrindo fluxos positivos e negativos nativamente
- Configuração preparada para CI/CD com retries inteligentes e artefatos de debug automáticos
- Documentação de nível profissional incluindo plano de testes, cenários, casos e matriz de rastreabilidade

---

## Próximos passos

- [ ] Integração com GitHub Actions para execução em cada pull request
- [ ] Execução cross-browser (Firefox e WebKit)
- [ ] Testes orientados a dados com múltiplos conjuntos de entrada
- [ ] Cobertura dos perfis `problem_user` e `error_user`
- [ ] Testes de acessibilidade com axe-core
- [ ] Testes visuais com Percy ou Applitools
- [ ] Publicação automática do relatório HTML via GitHub Pages
- [ ] Lint com ESLint e formatação com Prettier
- [ ] Conventional Commits e badges de status no README

---

## Autor

Desenvolvido como projeto de portfólio premium por **[Seu Nome]**.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/vitor-aguiar-3370351b7/)
[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat&logo=github)](https://github.com/AguiarMS).