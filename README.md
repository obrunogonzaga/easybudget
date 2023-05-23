# Easy Budget

## Descrição

Easy Budget é um projeto de API para um aplicativo de rastreamento de orçamento. Ele permite que os usuários criem, leiam, atualizem e excluam itens de orçamento.

## Tecnologias Utilizadas

- Node.js
- Express
- MariaDB (usando Docker Compose)
- Jest (para testes)

## Instalação

1. Clone o repositório em sua máquina local:
git clone https://github.com/obrunogonzaga/easybudget.git

2. Navegue até o diretório do projeto:
``cd easy-budget``

3. Instale as dependências do projeto:
``npm install``

4. Inicie o ambiente do Docker Compose para o banco de dados MariaDB e a aplicação Easy Budget:
``docker-compose up``

## Uso

Certifique-se de que o ambiente do Docker Compose esteja em execução (etapa 4 da seção de instalação).

Agora você pode fazer requisições para `http://localhost:3000/budget`.

Os seguintes endpoints estão disponíveis:

- `POST /budget`: Cria um novo item de orçamento
- `GET /budget`: Retorna todos os itens de orçamento
- `PUT /budget/:id`: Atualiza um item de orçamento existente pelo id
- `DELETE /budget/:id`: Exclui um item de orçamento existente pelo id

## Tabelas do Banco de Dados

O Easy Budget utiliza um banco de dados MariaDB através do Docker Compose. Duas tabelas estão sendo utilizadas:

### Tabela `budget`

Esta tabela armazena os itens de orçamento. Ela possui as seguintes colunas:

- `id`: O identificador único do item de orçamento (autoincrementado).
- `category`: A categoria do item de orçamento.
- `description`: A descrição do item de orçamento.
- `amount`: O valor do item de orçamento.
- `date`: A data do item de orçamento.

## Testes

Para rodar os testes, execute o seguinte comando:
npm test

## Contribuição

Contribuições são bem-vindas! Por favor, leia as [diretrizes de contribuição](CONTRIBUTING.md) antes de enviar uma pull request.

## Licença

Este projeto está sob a licença [MIT](LICENSE.md).