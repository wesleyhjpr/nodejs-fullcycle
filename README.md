# Projeto Node.js com MySQL e Nginx em Docker

Este projeto utiliza **Docker** para configurar uma aplicação que utiliza **Node.js**, **MySQL** e **Nginx**. A aplicação cria uma API simples para interagir com um banco de dados MySQL e exibir dados em uma página HTML através do Express.

## Requisitos

- Docker
- Docker Compose

## Estrutura do Projeto

- **Node.js**: Servidor Express que se conecta ao banco de dados MySQL, realiza operações de leitura e escrita.
- **MySQL**: Banco de dados utilizado para armazenar dados de pessoas (nome).
- **Nginx**: Servidor de proxy reverso que serve a aplicação Node.js.

## Como Executar o Projeto

### Passo 1: Clone o repositório

Clone o repositório para o seu computador:

```bash
git clone https://github.com/wesleyhjpr/golang-fullcycle.git
cd golang-fullcycle
```

### Passo 2: Iniciar os Contêineres com Docker Compose
No diretório raiz do projeto, execute o comando abaixo para iniciar a aplicação:

```bash
docker-compose up --build
```
Isso irá construir as imagens e iniciar os contêineres do Node.js, MySQL e Nginx.

### Passo 3: Acessar a Aplicação
A aplicação estará disponível em: http://localhost:80

A API tem duas rotas principais:

**GET /**: Exibe uma lista de pessoas cadastradas no banco de dados em uma página HTML. 

**POST /add**: Permite adicionar uma nova pessoa ao banco de dados (envie um JSON com o nome da pessoa).

### Passo 4: Testar a API
Listar pessoas:
Acesse http://localhost:80/ no seu navegador para visualizar as pessoas cadastradas.

Adicionar uma pessoa:
Use uma ferramenta como o Postman ou curl para adicionar uma nova pessoa via POST:

```bash
curl -X POST http://localhost:80/add -H "Content-Type: application/json" -d '{"nome": "Novo Nome"}'
```

### Passo 5: Parar os Contêineres
Quando terminar de testar, você pode parar os contêineres com o comando:

```bash
docker-compose down
```


### Explicações:
- **Passo 2 (Docker Compose)**: O comando `docker-compose up --build` cria as imagens e executa os contêineres, iniciando a aplicação. 
O Nginx será configurado como proxy reverso, encaminhando as requisições HTTP para o servidor Node.js na porta 3000.
- **Passo 4 (Testar a API)**: Exemplos de como testar a API tanto para listagem de dados como para adição de dados no banco de dados.