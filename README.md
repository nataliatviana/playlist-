# 🎵 Playlist+

API REST para gerenciamento de um catálogo musical, desenvolvida em Node.js, Express e MongoDB.

O sistema permite cadastrar, consultar, atualizar e excluir músicas, artistas, álbuns e gêneros, além de possuir autenticação de usuários, playlists, pesquisa, filtros e integração com GraphQL.

---

## 📋 Funcionalidades

- 🎵 CRUD de músicas
- 🎤 CRUD de artistas
- 💿 CRUD de álbuns
- 🎼 CRUD de gêneros
- 👤 Cadastro e autenticação de usuários
- 🔐 Autenticação utilizando JWT
- 📋 Recursos de playlists
- 🔎 Pesquisa de músicas
- 🎧 Filtros de músicas por gênero, artista e álbum
- 🔗 Relacionamentos entre músicas, artistas, álbuns e gêneros
- 🚀 API GraphQL
- ⚠️ Tratamento de erros
- 🍃 Persistência de dados utilizando MongoDB Atlas

---

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- MongoDB
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- Apollo Server
- GraphQL
- CORS
- Nodemon
- Postman

---

# 🚀 Como executar o projeto

## 📌 Pré-requisitos

Antes de começar, é necessário ter instalado no computador:

- Node.js
- npm
- Git
- Postman

### Node.js

Baixe e instale o Node.js:

https://nodejs.org/

Depois da instalação, abra o terminal e verifique:

```bash
node --version
```

Também verifique o npm:

```bash
npm --version
```

Se os dois comandos retornarem uma versão, o Node.js e o npm estão instalados corretamente.

### Git

Verifique se o Git está instalado:

```bash
git --version
```

Caso não esteja instalado, acesse:

https://git-scm.com/

### Postman

O Postman é utilizado para testar os endpoints da API.

Download:

https://www.postman.com/downloads/

---

# 1. 📥 Clonar o projeto

Abra o terminal ou o terminal integrado do VS Code.

Clone o repositório:

```bash
git clone https://github.com/nataliatviana/playlist-.git
```

Entre na pasta do projeto:

```bash
cd playlist-
```

Entre na pasta do backend:

```bash
cd backend
```

---

# 2. 📦 Instalar as dependências

Dentro da pasta `backend`, execute:

```bash
npm install
```

Esse comando instala automaticamente todas as dependências necessárias para executar a aplicação.

Após a instalação, será criada a pasta:

```text
node_modules
```

As versões das dependências são controladas pelo arquivo:

```text
package-lock.json
```

> Não é necessário instalar cada biblioteca individualmente. O comando `npm install` instala todas as dependências definidas no `package.json`.

---

# 3. 🍃 Configurar o MongoDB Atlas

O Playlist+ utiliza o MongoDB Atlas como banco de dados.

Para executar o projeto, é necessário permitir que o computador utilizado tenha acesso ao banco.

## 3.1 Criar uma conta no MongoDB Atlas

Acesse:

https://www.mongodb.com/atlas

Crie uma conta ou faça login.

---

## 3.2 Acessar o projeto

Depois de entrar no MongoDB Atlas:

1. Acesse o projeto utilizado pelo Playlist+.
2. Entre em **Database & Network Access**.
3. Localize a opção **IP Access List**.

Essa área controla quais endereços IP podem acessar o banco de dados.

---

## 3.3 Adicionar o IP do computador

Clique em:

**+ ADD IP ADDRESS**

O MongoDB Atlas solicitará o endereço IP que terá permissão para acessar o banco.

Para descobrir o IP público do computador, acesse:

https://whatismyipaddress.com/

Procure pelo endereço:

**IPv4**

Por exemplo:

```text
200.18.146.2
```

No MongoDB Atlas, informe esse endereço no campo:

**Access List Entry**

Opcionalmente, adicione um comentário, por exemplo:

```text
Meu computador
```

Depois clique em:

**Confirm**

O endereço deverá aparecer na lista com o status:

**Active**

---

## ⚠️ Importante sobre o IP

O endereço IP pode mudar dependendo da conexão utilizada.

Por exemplo, pode ser necessário atualizar o IP caso o usuário:

- troque de Wi-Fi;
- utilize outra rede;
- mude de local;
- utilize outra conexão de internet.

Se a aplicação voltar a apresentar erro de conexão com o MongoDB Atlas, uma das primeiras coisas que deve ser verificada é o **IP Access List**.

---

# 4. 🔐 Configurar o arquivo `.env`

O projeto utiliza variáveis de ambiente para armazenar informações de configuração.

Na pasta:

```text
backend
```

deve existir um arquivo:

```text
.env
```

A estrutura das variáveis deve seguir o que está configurado no projeto.

Exemplo:

```env
MONGODB_URI=sua_string_de_conexao_do_mongodb
JWT_SECRET=sua_chave_secreta
```

> Os nomes das variáveis devem ser exatamente os utilizados pelo projeto.

> Nunca publique o arquivo `.env` no GitHub.

O arquivo `.env` pode conter informações privadas, como:

- senha do banco;
- string de conexão;
- chave JWT;
- outras configurações sensíveis.

Por esse motivo, o `.env` deve estar incluído no `.gitignore`.

---

# 5. 🔗 Como obter a conexão do MongoDB

No MongoDB Atlas:

1. Acesse o seu cluster.
2. Clique em **Connect**.
3. Escolha **Drivers**.
4. Selecione **Node.js**.
5. Copie a connection string disponibilizada pelo Atlas.

Ela terá uma estrutura semelhante a:

```text
mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/NOME_DO_BANCO
```

Essa informação deve ser utilizada na variável correspondente no arquivo `.env`.

> Nunca compartilhe publicamente uma connection string que contenha usuário e senha.

---

# 6. ▶️ Executar o projeto

Depois de configurar o MongoDB Atlas e o arquivo `.env`, certifique-se de estar dentro da pasta:

```text
backend
```

Execute:

```bash
npm run dev
```

O projeto utiliza o **Nodemon**, que reinicia automaticamente a aplicação quando algum arquivo é alterado.

Se estiver tudo configurado corretamente, a aplicação será iniciada e realizará a conexão com o MongoDB.

---

# 7. ✅ Testar se a API está funcionando

Com o servidor executando, abra o navegador ou o Postman e acesse:

```text
http://localhost:3000/
```

A API deverá retornar uma resposta semelhante a:

```json
{
  "message": "Playlist+ API funcionando!"
}
```

Isso significa que o servidor está funcionando corretamente.

---

# 8. 🧪 Testando a API pelo Postman

O Postman pode ser utilizado para testar todos os endpoints da aplicação.

A URL base da API é:

```text
http://localhost:3000
```

---

# 🎼 Gêneros

## Listar gêneros

```http
GET /api/genres
```

URL:

```text
http://localhost:3000/api/genres
```

Os gêneros possuem operações de:

- POST
- GET
- GET por ID
- PUT
- DELETE

---

# 🎤 Artistas

## Listar artistas

```http
GET /api/artists
```

URL:

```text
http://localhost:3000/api/artists
```

Os artistas possuem operações de:

- POST
- GET
- GET por ID
- PUT
- DELETE

---

# 💿 Álbuns

## Listar álbuns

```http
GET /api/albums
```

URL:

```text
http://localhost:3000/api/albums
```

Os álbuns possuem operações de:

- POST
- GET
- GET por ID
- PUT
- DELETE

---

# 🎵 Músicas

## Listar músicas

```http
GET /api/songs
```

URL:

```text
http://localhost:3000/api/songs
```

As músicas possuem operações de:

- POST
- GET
- GET por ID
- PUT
- DELETE

---

# 🔎 Pesquisa

A API permite pesquisar conteúdos do catálogo pelo nome ou título.

## Pesquisa de músicas

Exemplo:

```http
GET /api/songs?search=summer
```

URL:

```text
http://localhost:3000/api/songs?search=summer
```

A pesquisa permite localizar músicas de acordo com o termo informado.

## Pesquisa de artistas

```http
GET /api/artists?search=nome
```

## Pesquisa de álbuns

```http
GET /api/albums?search=titulo
```

---

# 🎧 Filtros de músicas

As músicas podem ser filtradas por:

- gênero;
- artista;
- álbum.

## Filtrar por gênero

Exemplo:

```http
GET /api/songs?genre=Rock
```

URL:

```text
http://localhost:3000/api/songs?genre=Rock
```

Também podem ser utilizados os filtros correspondentes a artista e álbum.

---

# 🔗 Relacionamentos do catálogo

O sistema possui relacionamentos entre as principais entidades do catálogo musical.

Os relacionamentos são:

```text
Artista
 ├── Álbuns
 └── Músicas

Álbum
 └── Músicas

Gênero
 └── Músicas
```

Uma música possui referências para:

- artista;
- álbum;
- gênero.

Essas referências são armazenadas utilizando os identificadores do MongoDB.

Exemplo de estrutura de uma música:

```json
{
  "title": "Nome da música",
  "duration": 240,
  "artist": "ID_DO_ARTISTA",
  "album": "ID_DO_ALBUM",
  "genre": "ID_DO_GENERO"
}
```

Dessa forma, uma música pode estar relacionada corretamente ao seu artista, álbum e gênero.

---

# 🔐 Autenticação

O projeto possui autenticação utilizando **JWT (JSON Web Token)**.

Os endpoints relacionados à autenticação estão disponíveis em:

```text
/api/auth
```

Após realizar o login, a API retorna um token que deve ser utilizado nas requisições que exigem autenticação.

## Utilizando o token no Postman

No Postman:

1. Abra a requisição que exige autenticação.
2. Acesse a aba **Authorization**.
3. Selecione:

```text
Bearer Token
```

4. Informe o token recebido no login.

O header será enviado no formato:

```text
Authorization: Bearer SEU_TOKEN
```

---

# 📋 Playlists

O projeto também possui recursos relacionados a playlists.

Esses recursos permitem trabalhar com músicas organizadas em listas dentro da aplicação.

As funcionalidades de playlist são implementadas utilizando os recursos disponíveis no projeto, incluindo integração com GraphQL.

---

# 🚀 GraphQL

O projeto possui integração com GraphQL utilizando Apollo Server.

O endpoint GraphQL é:

```text
http://localhost:3000/graphql
```

O GraphQL utiliza os tipos e resolvers definidos na pasta:

```text
src/graphql
```

Os principais arquivos são:

```text
src/graphql/typeDefs.js
src/graphql/resolvers.js
```

---

# ⚠️ Tratamento de erros

A aplicação possui middlewares responsáveis pelo tratamento de erros.

Entre eles estão:

```text
src/middlewares/errorMiddleware.js
src/middlewares/notFoundMiddleware.js
```

Esses middlewares permitem tratar situações como:

- rotas inexistentes;
- registros não encontrados;
- requisições inválidas;
- erros internos da aplicação;
- problemas de autenticação e autorização.

---

# 🗂️ Estrutura do projeto

A estrutura principal do backend é semelhante a:

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── albumController.js
│   │   ├── artistController.js
│   │   ├── authController.js
│   │   ├── genreController.js
│   │   └── songController.js
│   │
│   ├── graphql/
│   │   ├── typeDefs.js
│   │   └── resolvers.js
│   │
│   ├── middlewares/
│   │   ├── errorMiddleware.js
│   │   └── notFoundMiddleware.js
│   │
│   ├── models/
│   │
│   ├── routes/
│   │   ├── albumRoutes.js
│   │   ├── artistRoutes.js
│   │   ├── authRoutes.js
│   │   ├── genreRoutes.js
│   │   └── songRoutes.js
│   │
│   ├── services/
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

# 🧩 Principais pastas

## `controllers`

Responsável por receber as requisições HTTP e controlar o fluxo das operações.

## `services`

Contém a lógica de negócio da aplicação.

## `models`

Define a estrutura dos documentos armazenados no MongoDB.

## `routes`

Define as rotas e endpoints disponibilizados pela API.

## `middlewares`

Contém funções executadas durante o processamento das requisições, como autenticação e tratamento de erros.

## `config`

Contém configurações da aplicação, incluindo a conexão com o banco de dados.

## `graphql`

Contém os tipos e resolvers utilizados pela API GraphQL.

---

# ⚠️ Problemas comuns

## `Cannot find module`

Exemplo:

```text
Error: Cannot find module '@apollo/server'
```

Execute:

```bash
npm install
```

Depois tente novamente:

```bash
npm run dev
```

---

## Erro de conexão com MongoDB Atlas

Exemplo:

```text
MongooseServerSelectionError
```

Verifique:

1. Se o MongoDB Atlas está funcionando.
2. Se o usuário e senha do banco estão corretos.
3. Se a connection string está correta.
4. Se o IP do computador está cadastrado no **IP Access List**.
5. Se o arquivo `.env` está configurado corretamente.

---

## O servidor não inicia

Verifique se:

- as dependências foram instaladas;
- o arquivo `.env` está configurado;
- o MongoDB Atlas permite o acesso do seu IP;
- a porta utilizada pela aplicação não está sendo utilizada por outro processo.

Tente:

```bash
npm install
```

Depois:

```bash
npm run dev
```

---

# 💻 Comandos principais

## Clonar o projeto

```bash
git clone https://github.com/nataliatviana/playlist-.git
```

## Entrar no projeto

```bash
cd playlist-
```

## Entrar no backend

```bash
cd backend
```

## Instalar dependências

```bash
npm install
```

## Executar a aplicação

```bash
npm run dev
```

## Verificar o status do Git

```bash
git status
```

---

# 👥 Equipe

Projeto desenvolvido por:

- Natália
- Maria Júlia
- Júlia
- Vinicius

---

# 🎯 Objetivo do projeto

O Playlist+ tem como objetivo disponibilizar uma API para gerenciamento de um catálogo musical.

A aplicação permite realizar operações de cadastro, consulta, atualização e exclusão de músicas, artistas, álbuns e gêneros.

Além das operações básicas de CRUD, o sistema possui recursos de:

- autenticação de usuários;
- pesquisa;
- filtros;
- relacionamentos entre entidades;
- playlists;
- tratamento de erros;
- integração com GraphQL;
- persistência de dados utilizando MongoDB Atlas.

---

# 🚀 Playlist+

Projeto desenvolvido para aplicação prática de conceitos de desenvolvimento de APIs, banco de dados, autenticação, relacionamentos entre entidades, integração de serviços e arquitetura de aplicações.

```
