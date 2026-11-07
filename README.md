# 🌧️ Estoque Seguro

**Sistema de gestão de estoque para pequenos comércios em áreas sujeitas a alagamentos.**

O **Estoque Seguro** foi criado para ajudar comerciantes a controlar seus produtos e se preparar para períodos de chuva. O sistema reúne o controle de estoque e informações de risco em um único lugar, facilitando a identificação de produtos que precisam de reposição ou proteção.

## 📌 Sobre o projeto

Em pequenos comércios, o controle de produtos muitas vezes é feito por anotações ou pela memória do responsável. Isso dificulta saber o que realmente está disponível, o que precisa ser comprado e quais produtos devem receber atenção antes de um possível alagamento.

O Estoque Seguro busca tornar esse processo mais simples, permitindo que o comerciante acompanhe seu estoque e receba informações que auxiliem na preparação do estabelecimento.

## ✨ Principais recursos

* 📦 Cadastro de produtos
* ➕ Registro de entradas
* ➖ Registro de saídas
* 🔎 Consulta do estoque
* ⚠️ Identificação de produtos que precisam de atenção
* 🌧️ Alertas relacionados à chuva e risco de alagamento
* 👤 Controle de acesso para proprietário e funcionário
* 📊 Visualização das informações do estoque

## 🖥️ Como funciona

O fluxo principal do sistema é:

```text
Cadastro do comércio
        ↓
Cadastro dos produtos
        ↓
Registro das entradas e saídas
        ↓
Atualização do estoque
        ↓
Consulta dos produtos
        ↓
Alerta de chuva / alagamento
        ↓
Identificação dos produtos que precisam ser protegidos
```



## 👥 Equipe

**Estoque Seguro**

* Caio Pedrosa
* Rildo Neto
* David Henrique
* Alberto

**Organização parceira:** ACP
**Projeto:** 2026

## 🎯 Objetivo

Facilitar o controle de estoque de pequenos comércios e ajudar os responsáveis a tomar medidas preventivas para proteger mercadorias durante períodos de chuva e possíveis alagamentos.

## 📍 Contexto

O projeto tem como contexto inicial pequenos comércios de **Palmares, Pernambuco**, município que possui histórico de enchentes e alagamentos que podem afetar estabelecimentos comerciais.


---

**Estoque Seguro 🌧️📦**
*Mais organização para o estoque. Mais preparo para a possíveis enchentes.*



## Executar o backend e a entrega de entidades

Use Node.js 24 e PostgreSQL. Crie estoque_seguro e estoque_seguro_teste no pgAdmin. Dentro de backend, execute npm ci, copie .env.example para .env somente se o arquivo ainda nao existir e configure as duas conexoes com suas credenciais locais. O arquivo .env nao deve ser versionado.

A sequencia e: npm run migration:run, npm run seed e npm run start:dev. Para verificar, execute npm run lint, npm test, npm run test:e2e e npm run verify:entrega. O teste integrado usa TEST_DATABASE_URL em banco exclusivo. O roteiro de reversao em banco descartavel esta em [docs/EXECUCAO-ENTREGA.md](docs/EXECUCAO-ENTREGA.md).

A listagem GET /produtos?pagina=1&tamanho=5 devolve itens, total, pagina e tamanho, incluindo estoque e categorias. O tamanho maximo e 100.

Escopo implementado: produtos, locais, movimentacoes, alertas manuais e classificacoes N-N demonstradas por migracao e seed. Autenticacao, integracao meteorologica externa e CRUD completo de categorias sao evolucoes futuras. A lista de funcionalidades proposta no inicio deste README nao significa que esses recursos futuros ja estao implementados.

O modelo fica em [docs/modelo-de-dados.md](docs/modelo-de-dados.md). A verificacao executada e registrada por verify:entrega em docs/verificacao-entrega.md.
