# Budget Tracker API

## Descrição

Este é um projeto de API para um aplicativo de rastreamento de orçamento. Ele permite que os usuários criem, leiam, atualizem e excluam itens de orçamento.

## Tecnologias Utilizadas

- Node.js
- Express
- Jest (para testes)

## Instalação

1. Clone o repositório em sua máquina local:
``git clone https://github.com/seu-usuario/budget-tracker-api.git``
2. Navegue até o diretório do projeto:
``cd budget-tracker-api``
3. Instale as dependências do projeto:
``npm install``

## Uso

Inicie o servidor:
``npm start`

Agora você pode fazer requisições para `http://localhost:3000/budget`.

Os seguintes endpoints estão disponíveis:

- `POST /budget`: Cria um novo item de orçamento
- `GET /budget`: Retorna todos os itens de orçamento
- `PUT /budget/:id`: Atualiza um item de orçamento existente pelo id
- `DELETE /budget/:id`: Exclui um item de orçamento existente pelo id

## Testes

Para rodar os testes, execute o seguinte comando:

``npm test``


## Contribuição

Contribuições são bem-vindas! Por favor, leia as [diretrizes de contribuição](CONTRIBUTING.md) antes de enviar uma pull request.

## Licença

Este projeto está sob a licença [MIT](LICENSE.md).
