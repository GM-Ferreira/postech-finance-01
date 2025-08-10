# Postech Finance (ByteBank)

Um painel de controle financeiro moderno, desenvolvido como parte do curso de Pós-Graduação da FIAP. O projeto simula o dashboard de um controle financeiro digital, permitindo ao usuário visualizar seu saldo, extrato de transações, adicionar novas transações e gerenciar as existentes.

## Tabela de Conteúdos

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Rodando o Projeto Localmente](#rodando-o-projeto-localmente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Explicações de funcionalidades](#explicações-de-funcionalidades)

## Sobre o Projeto

Este projeto é uma Single-Page Application (SPA) construída com Next.js e TypeScript, focada em criar uma experiência de usuário rica e interativa para gerenciamento financeiro. A aplicação utiliza `localStorage` para persistência de dados no lado do cliente, permitindo que cada "usuário" (identificado por email) tenha sua própria conta e histórico de transações.

As principais funcionalidades incluem:

- Autenticação de usuário (fictícia).
- Visualização de saldo e extrato de transações com paginação.
- Adição de novas transações com validação de formulário em tempo real.
- Edição e exclusão de transações existentes através de uma interface modal interativa.
- Detecção do dispositivo do usuário para fins de auditoria.

## Tecnologias Utilizadas

A stack principal do projeto inclui:

### Frontend

- **Next.js 15+:** Framework React para renderização no lado do servidor (SSR) e componentização moderna (App Router).
- **React 19:** Biblioteca para construção da interface de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática ao código.
- **Tailwind CSS 4:** Framework CSS utility-first para estilização rápida e responsiva.
- **React Hook Form:** Gerenciamento de formulários complexos de forma performática.
- **Zod:** Validação de schemas e tipos de dados com inferência de tipos.
- **Bowser:** Biblioteca para detecção de navegador e sistema operacional do usuário.
- **React Currency Input Field:** Componente especializado para inputs de valores monetários.
- **SVGR:** Ferramenta para transformar arquivos SVG em componentes React.

### Ferramentas de Desenvolvimento (DevTools)

- **ESLint:** Linter para garantir a qualidade e a padronização do código.
- **Node.js:** Ambiente de execução para o servidor de desenvolvimento e build.

## Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados na sua máquina:

- **Node.js:** Versão **20 ou superior**. Você pode usar um gerenciador de versões como o [nvm](https://github.com/nvm-sh/nvm) para facilitar a troca de versões.
- **NPM** ou **Yarn** (ou outro gerenciador de pacotes de sua preferência).

## Rodando o Projeto Localmente

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento:

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/GM-Ferreira/postech-finance-01.git
    ```

2. **Navegue até a pasta do projeto:**

    ```bash
    cd postech-finance
    ```

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5. **Abra o navegador:**
    Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação em funcionamento.

## Scripts Disponíveis

No arquivo `package.json`, você encontrará os seguintes scripts:

- **`npm run dev`**: Inicia a aplicação em modo de desenvolvimento com hot-reloading.
- **`npm run build`**: Compila a aplicação para produção.
- **`npm run start`**: Inicia um servidor de produção com a versão compilada da aplicação.
- **`npm run lint`**: Executa o ESLint para analisar o código em busca de erros e problemas de estilo.

## Explicações de funcionalidades

### 1. Acesso à Conta

- Para iniciar, o sistema possui um fluxo de cadastro e de login simulados para acessar o painel financeiro de forma segura.

- O layout é responsivo para telas menores

### 2. Página Inicial e Visão Geral

- A página inicial dá as boas-vindas ao usuário.

- Ela exibe o saldo atual da conta corrente e um extrato das últimas transações.

- É possível ocultar e reexibir o saldo para maior privacidade.

- O layout é responsivo para telas menores

### 3. Adicionando uma Nova Transação

- A home também possui uma seção para iniciar uma nova transação, com opções de tipo, valor e data.

- O formulário de nova transação utiliza validação de schema para garantir a integridade dos dados.

- Existe feedback visual imediato caso os valores inseridos sejam inválidos, como campos obrigatórios ou valor zero.

- Ao submeter, a nova transação é adicionada ao banco de dados (localStorage) e o extrato é atualizado instantaneamente.

### 4. Extrato e Listagem de Transações

- O extrato na lateral exibe a lista de transações realizadas, ordenadas por data.

- Para listas longas, implementamos um botão 'Carregar Mais' para otimizar a performance inicial, que mostra as 10 transações mais recentes.

### 5. Detalhes e Edição de Transações

- É possível visualizar os detalhes de cada transação em um modal, clicando sobre o item na lista.

- Dentro do modal, a opção 'Editar' transforma a visualização em um formulário pré-preenchido.

- Os campos editáveis, como data, tipo e valor, também possuem validação para garantir a consistência.

- Após a edição, o modal e a lista principal são atualizados automaticamente com as novas informações.

### 6. Exclusão de Transações

- O sistema permite a exclusão de transações de forma individual ou em massa.

- Ao ativar o 'modo de exclusão', checkboxes aparecem ao lado de cada item, similar a aplicativos de mensagem.

- O usuário pode selecionar múltiplas transações e confirmar a remoção, com o saldo da conta sendo recalculado automaticamente.

- Uma mensagem de confirmação informa o número exato de itens removidos, seja no singular ou plural.

### 7. Arquitetura e Tecnologias

- A interface segue um Design System consistente, garantindo a reutilização de componentes como modais, botões e inputs.

- A lógica de negócio utiliza Programação Orientada a Objetos (POO), separando as regras de manipulação da conta da interface visual.

- O projeto usa Next.js para uma renderização inicial rápida no servidor (SSR), seguida de interatividade total no cliente.

- Como bônus, a descrição da transação salva automaticamente o navegador e o S.O. do usuário para fins de auditoria.
