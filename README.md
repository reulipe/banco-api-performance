# 🏦 banco-api-performance

Repositório dedicado aos testes de performance da API Banco, utilizando K6 como ferramenta principal de execução e análise de carga.

---

## 📖 Introdução

Este projeto tem como objetivo validar o comportamento e a resiliência da API Banco sob diferentes condições de carga, identificando gargalos de performance, limites de capacidade e possíveis pontos de falha antes que cheguem ao ambiente de produção.

Os testes são escritos em JavaScript e executados com o K6, uma ferramenta moderna e de alto desempenho para testes de carga, amplamente utilizada em pipelines de CI/CD e ambientes de QA.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|---|---|---|
| [K6](https://k6.io/) | Latest | Ferramenta de testes de performance |
| [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | ES6+ | Linguagem utilizada na escrita dos testes |
| [Node.js](https://nodejs.org/) | LTS | Ambiente de execução para utilitários auxiliares |

---

## 📁 Estrutura do Repositório

```
banco-api-performance/
├── config/
│   └── ...
├── fixtures/
│   └── ...
├── helpers/
│   └── ...
├── tests/
│   └── ...
├── utils/
│   └── ...
├── .gitignore
└── README.md
```

---

## 🎯 Objetivo de Cada Grupo de Arquivos

### `config/`
Contém os arquivos de configuração dos testes, como definições de thresholds (limites aceitáveis de performance), opções de execução do K6 (VUs, duração, rampa de carga) e parâmetros globais reutilizáveis entre os diferentes cenários de teste.

### `fixtures/`
Armazena os dados estáticos utilizados nos testes, como payloads de requisição, massa de dados de entrada (usuários, contas, valores de transferência) e qualquer outro conjunto de dados necessário para simular cenários reais de uso da API.

### `helpers/`
Agrupa funções auxiliares reutilizáveis que facilitam a construção dos testes, como funções para autenticação, montagem de headers HTTP, geração de tokens e outras abstrações que evitam repetição de código entre os scripts de teste.

### `tests/`
Diretório principal dos scripts de teste. Cada arquivo representa um cenário ou fluxo específico da API sendo testado (ex: login, consulta de saldo, transferência entre contas), contendo a lógica de execução, as chamadas HTTP e as validações de resposta (checks).

### `utils/`
Contém utilitários gerais de apoio ao projeto, como funções para formatação de dados, manipulação de strings, geração de valores dinâmicos (ex: CPFs, valores aleatórios) e outras ferramentas de suporte que não se enquadram diretamente na lógica de teste.

---

## ⚙️ Instalação

### Pré-requisitos

- [K6](https://k6.io/docs/get-started/installation/) instalado na máquina
- [Node.js](https://nodejs.org/) (versão LTS recomendada) — caso utilize scripts auxiliares

### Instalando o K6

**macOS (Homebrew):**
```bash
brew install k6
```

**Linux (Debian/Ubuntu):**
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Windows (Chocolatey):**
```bash
choco install k6
```

### Clonando o repositório

```bash
git clone https://github.com/reulipe/banco-api-performance.git
cd banco-api-performance
```

---

## ▶️ Execução dos Testes

### Configurando a BASE_URL

A URL base da API é resolvida pelo utilitário `utils/variaveis.js` através da função `pegarBaseUrl()`, que segue a seguinte ordem de prioridade:

1. **Variável de ambiente `BASE_URL`** — tem prioridade máxima e sobrescreve qualquer outra configuração
2. **Arquivo `config/config.local.json`** — usado como fallback quando a variável de ambiente não é fornecida

Isso permite dois modos de configuração:

#### Opção 1 — via `config.local.json` (recomendado para desenvolvimento local)

Edite o arquivo `config/config.local.json` com a URL do ambiente desejado:

```json
{
  "baseUrl": "http://localhost:3009"
}
```

Com o arquivo configurado, execute os testes sem nenhuma variável de ambiente adicional:

```bash
k6 run tests/nome-do-teste.js
```

#### Opção 2 — via variável de ambiente `BASE_URL` (recomendado para CI/CD)

Passe a `BASE_URL` diretamente na linha de comando. Ela sobrescreve o valor definido no `config.local.json`:

```bash
BASE_URL=https://sua-api.com k6 run tests/nome-do-teste.js
```

---

### Execução com dashboard em tempo real

Para acompanhar os resultados dos testes em tempo real através de um dashboard web interativo, utilize as variáveis de ambiente do K6 abaixo:

```bash
BASE_URL=https://sua-api.com K6_WEB_DASHBOARD=true k6 run tests/nome-do-teste.js
```

O dashboard ficará disponível em `http://localhost:5665` durante a execução.

### Execução com exportação de relatório HTML

Para gerar e exportar automaticamente um relatório completo em formato HTML ao final da execução:

```bash
BASE_URL=https://sua-api.com K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/nome-do-teste.js
```

O arquivo `html-report.html` será gerado no diretório atual ao término da execução e pode ser aberto em qualquer navegador para análise posterior dos resultados.

---

## 📚 Referências

- [Documentação oficial do K6](https://grafana.com/docs/k6/latest/)
- [Escrevendo seu primeiro teste com K6](https://grafana.com/docs/k6/latest/get-started/write-your-first-test/)
- [K6 Web Dashboard](https://grafana.com/docs/k6/latest/results-output/web-dashboard/)
