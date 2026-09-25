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

# 8. 🔎 Pesquisa e rotas da API

A API do **Playlist+** disponibiliza endpoints RESTful para gerenciamento de usuários, artistas, álbuns, gêneros e músicas.

Todas as rotas REST possuem como endereço base:

```text
http://localhost:3000/api
```

As requisições são organizadas de acordo com o recurso que será manipulado.

---

## 🔐 Autenticação

As rotas relacionadas aos usuários e autenticação estão disponíveis em:

```text
/api/auth
```

### Rotas disponíveis

| Método | Rota                 | Descrição                               | Autenticação |
| ------ | -------------------- | --------------------------------------- | ------------ |
| `POST` | `/api/auth/register` | Cadastra um novo usuário                | Não          |
| `POST` | `/api/auth/login`    | Realiza o login e gera um token JWT     | Não          |
| `GET`  | `/api/auth/me`       | Retorna os dados do usuário autenticado | Sim          |

### `POST /api/auth/register`

Realiza o cadastro de um novo usuário.

**Dados recebidos no corpo da requisição:**

```text
name
email
password
```

---

### `POST /api/auth/login`

Realiza a autenticação do usuário.

**Dados recebidos no corpo da requisição:**

```text
email
password
```

Após o login, a API retorna um **token JWT**, utilizado para acessar recursos que exigem autenticação.

---

### `GET /api/auth/me`

Retorna os dados do usuário atualmente autenticado.

Essa rota exige o envio do token JWT através do cabeçalho:

```text
Authorization: Bearer SEU_TOKEN
```

---

# 🎤 Artistas

As rotas relacionadas aos artistas estão disponíveis em:

```text
/api/artists
```

### Rotas disponíveis

| Método   | Rota                      | Descrição                      |
| -------- | ------------------------- | ------------------------------ |
| `POST`   | `/api/artists`            | Cadastra um artista            |
| `GET`    | `/api/artists`            | Lista os artistas              |
| `GET`    | `/api/artists/:id`        | Busca um artista pelo ID       |
| `PUT`    | `/api/artists/:id`        | Atualiza um artista            |
| `DELETE` | `/api/artists/:id`        | Exclui um artista              |
| `GET`    | `/api/artists/:id/albums` | Lista os álbuns de um artista  |
| `GET`    | `/api/artists/:id/songs`  | Lista as músicas de um artista |

### Pesquisa de artistas

A listagem de artistas possui um parâmetro opcional de pesquisa:

```text
GET /api/artists?search=termo
```

O parâmetro `search` permite pesquisar artistas de acordo com o termo informado.

### Dados para criação e atualização

As operações `POST` e `PUT` utilizam:

```text
name
bio
```

---

# 💿 Álbuns

As rotas relacionadas aos álbuns estão disponíveis em:

```text
/api/albums
```

### Rotas disponíveis

| Método   | Rota                    | Descrição                    |
| -------- | ----------------------- | ---------------------------- |
| `POST`   | `/api/albums`           | Cadastra um álbum            |
| `GET`    | `/api/albums`           | Lista os álbuns              |
| `GET`    | `/api/albums/:id`       | Busca um álbum pelo ID       |
| `PUT`    | `/api/albums/:id`       | Atualiza um álbum            |
| `DELETE` | `/api/albums/:id`       | Exclui um álbum              |
| `GET`    | `/api/albums/:id/songs` | Lista as músicas de um álbum |

### Pesquisa de álbuns

A listagem de álbuns possui um parâmetro opcional de pesquisa:

```text
GET /api/albums?search=termo
```

O parâmetro `search` permite pesquisar álbuns pelo termo informado.

### Dados para criação e atualização

As operações `POST` e `PUT` utilizam:

```text
title
releaseYear
artist
```

O campo `artist` corresponde ao identificador do artista relacionado ao álbum.

---

# 🎼 Gêneros

As rotas relacionadas aos gêneros musicais estão disponíveis em:

```text
/api/genres
```

### Rotas disponíveis

| Método   | Rota                    | Descrição                     |
| -------- | ----------------------- | ----------------------------- |
| `POST`   | `/api/genres`           | Cadastra um gênero            |
| `GET`    | `/api/genres`           | Lista os gêneros              |
| `GET`    | `/api/genres/:id`       | Busca um gênero pelo ID       |
| `PUT`    | `/api/genres/:id`       | Atualiza um gênero            |
| `DELETE` | `/api/genres/:id`       | Exclui um gênero              |
| `GET`    | `/api/genres/:id/songs` | Lista as músicas de um gênero |

### Dados para criação e atualização

As operações `POST` e `PUT` utilizam:

```text
name
```

---

# 🎵 Músicas

As rotas relacionadas às músicas estão disponíveis em:

```text
/api/songs
```

### Rotas disponíveis

| Método   | Rota             | Descrição                |
| -------- | ---------------- | ------------------------ |
| `POST`   | `/api/songs`     | Cadastra uma música      |
| `GET`    | `/api/songs`     | Lista as músicas         |
| `GET`    | `/api/songs/:id` | Busca uma música pelo ID |
| `PUT`    | `/api/songs/:id` | Atualiza uma música      |
| `DELETE` | `/api/songs/:id` | Exclui uma música        |

### Pesquisa e filtros de músicas

A rota de listagem de músicas possui quatro parâmetros opcionais:

```text
GET /api/songs?search=termo
GET /api/songs?genre=ID
GET /api/songs?artist=ID
GET /api/songs?album=ID
```

Também é possível utilizar mais de um filtro na mesma requisição:

```text
GET /api/songs?search=termo&genre=ID&artist=ID&album=ID
```

Os parâmetros disponíveis são:

| Parâmetro | Função                                |
| --------- | ------------------------------------- |
| `search`  | Pesquisa músicas pelo termo informado |
| `genre`   | Filtra músicas por gênero             |
| `artist`  | Filtra músicas por artista            |
| `album`   | Filtra músicas por álbum              |

### Dados para criação e atualização

As operações `POST` e `PUT` utilizam:

```text
title
duration
artist
album
genre
```

Os campos `artist`, `album` e `genre` representam os identificadores dos registros relacionados.

---

# 🏠 Rota principal

Além das rotas dos recursos, a API possui uma rota inicial:

```text
GET /
```

Essa rota pode ser utilizada para verificar se a API está funcionando corretamente.

Quando acessada, retorna uma mensagem indicando que a **Playlist+ API está funcionando**.

---

# 📊 Resumo de todas as rotas REST

Abaixo estão reunidas **todas as rotas REST implementadas no backend**:

| Método   | Endpoint                  | Função                           |
| -------- | ------------------------- | -------------------------------- |
| `GET`    | `/`                       | Verifica o funcionamento da API  |
| `POST`   | `/api/auth/register`      | Cadastro de usuário              |
| `POST`   | `/api/auth/login`         | Login                            |
| `GET`    | `/api/auth/me`            | Dados do usuário autenticado     |
| `POST`   | `/api/artists`            | Criar artista                    |
| `GET`    | `/api/artists`            | Listar/pesquisar artistas        |
| `GET`    | `/api/artists/:id`        | Buscar artista                   |
| `PUT`    | `/api/artists/:id`        | Atualizar artista                |
| `DELETE` | `/api/artists/:id`        | Excluir artista                  |
| `GET`    | `/api/artists/:id/albums` | Álbuns do artista                |
| `GET`    | `/api/artists/:id/songs`  | Músicas do artista               |
| `POST`   | `/api/albums`             | Criar álbum                      |
| `GET`    | `/api/albums`             | Listar/pesquisar álbuns          |
| `GET`    | `/api/albums/:id`         | Buscar álbum                     |
| `PUT`    | `/api/albums/:id`         | Atualizar álbum                  |
| `DELETE` | `/api/albums/:id`         | Excluir álbum                    |
| `GET`    | `/api/albums/:id/songs`   | Músicas do álbum                 |
| `POST`   | `/api/genres`             | Criar gênero                     |
| `GET`    | `/api/genres`             | Listar gêneros                   |
| `GET`    | `/api/genres/:id`         | Buscar gênero                    |
| `PUT`    | `/api/genres/:id`         | Atualizar gênero                 |
| `DELETE` | `/api/genres/:id`         | Excluir gênero                   |
| `GET`    | `/api/genres/:id/songs`   | Músicas do gênero                |
| `POST`   | `/api/songs`              | Criar música                     |
| `GET`    | `/api/songs`              | Listar/pesquisar/filtrar músicas |
| `GET`    | `/api/songs/:id`          | Buscar música                    |
| `PUT`    | `/api/songs/:id`          | Atualizar música                 |
| `DELETE` | `/api/songs/:id`          | Excluir música                   |

---

# 📝 Observação

A API RESTful é responsável principalmente pelas operações de **CRUD e pesquisa** de usuários, artistas, álbuns, gêneros e músicas.

Já o GraphQL amplia as funcionalidades do sistema, permitindo operações relacionadas a **playlists, favoritos, avaliações, colaboradores e consultas personalizadas**, utilizando uma única rota `/graphql`.


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

O projeto possui integração com **GraphQL** utilizando **Apollo Server**.

Diferentemente da API REST, que possui uma rota diferente para cada recurso, o GraphQL utiliza **uma única rota** para realizar as consultas e alterações:

```text
http://localhost:3000/graphql
```

Por exemplo, na API REST temos rotas diferentes:

```text
GET /api/songs
GET /api/artists
GET /api/albums
GET /api/genres
```

No GraphQL, todas essas operações são realizadas através de:

```text
POST /graphql
```

O que muda é o conteúdo enviado na requisição. Dentro dela, informamos **qual informação queremos consultar ou alterar**.

---

## 📁 Arquivos do GraphQL

A implementação do GraphQL está localizada em:

```text
src/graphql
```

Os principais arquivos são:

```text
src/graphql/typeDefs.js
src/graphql/resolvers.js
```

### `typeDefs.js`

O arquivo `typeDefs.js` define o **schema do GraphQL**.

Ele informa quais operações podem ser realizadas e quais dados podem ser solicitados.

De forma simplificada, podemos pensar no `typeDefs.js` como o **contrato da API GraphQL**.

É nele que ficam definidos conceitos como:

```text
Query
Mutation
Song
Artist
Album
Genre
```

Os nomes exatos das operações disponíveis devem ser consultados nesse arquivo.

---

### `resolvers.js`

O arquivo `resolvers.js` contém a implementação das operações definidas no schema.

Enquanto o `typeDefs.js` informa:

> "Essa consulta existe."

O `resolvers.js` informa:

> "É assim que essa consulta será executada."

O resolver normalmente acessa os models e serviços da aplicação para buscar ou alterar os dados no MongoDB.

---

# 🧪 Como acessar o GraphQL

Com o projeto executando:

```bash
npm run dev
```

acesse:

```text
http://localhost:3000/graphql
```

O Apollo Server disponibiliza uma interface onde é possível escrever e executar consultas GraphQL.

Essa interface facilita os testes porque permite visualizar as operações disponíveis e executar as consultas diretamente no navegador.

---

# 🔎 Como funcionam as consultas no GraphQL

No GraphQL, uma consulta é chamada de **Query**.

Uma Query é utilizada quando queremos **buscar informações**.

Por exemplo, podemos ter consultas relacionadas a:

```text
Músicas
Artistas
Álbuns
Gêneros
```

A principal diferença em relação ao REST é que não precisamos criar uma URL diferente para cada consulta.

No REST:

```http
GET /api/songs
```

No GraphQL:

```http
POST /graphql
```

E dentro do corpo da requisição informamos qual informação queremos:

```graphql
query {
  songs {
    title
  }
}
```

> O nome `songs` acima é um exemplo de como uma Query pode ser estruturada. Para utilizar o nome correto no Playlist+, consulte as operações definidas em `src/graphql/typeDefs.js`.

---

# 🎵 Pesquisa de músicas

A pesquisa de músicas no GraphQL funciona através de uma **Query** que recebe os parâmetros definidos no schema.

A ideia é semelhante à pesquisa REST:

```http
GET /api/songs?search=summer
```

No GraphQL, em vez de colocar `search=summer` na URL, o valor é enviado como argumento da Query.

Exemplo conceitual:

```graphql
query {
  songs(search: "summer") {
    title
  }
}
```

Nesse exemplo:

```text
songs
```

representa a consulta de músicas.

```text
search: "summer"
```

representa o termo pesquisado.

```text
title
```

indica que queremos receber o título das músicas encontradas.

O GraphQL permite ainda escolher exatamente quais campos queremos receber.

Por exemplo:

```graphql
query {
  songs(search: "summer") {
    title
    duration
  }
}
```

Nesse caso, a resposta pode conter somente:

```text
title
duration
```

Isso evita receber informações que não são necessárias.

> A sintaxe e os argumentos disponíveis devem seguir exatamente o que estiver definido em `typeDefs.js`.

---

# 🎤 Pesquisa de artistas

A mesma lógica pode ser utilizada para pesquisar artistas.

No REST, a aplicação possui:

```http
GET /api/artists?search=nome
```

No GraphQL, a pesquisa é realizada através de uma Query dentro de:

```text
http://localhost:3000/graphql
```

Exemplo conceitual:

```graphql
query {
  artists(search: "nome") {
    name
  }
}
```

Nesse exemplo, estamos solicitando artistas que correspondam ao termo pesquisado.

Também podemos solicitar outros campos disponíveis no schema.

Por exemplo:

```graphql
query {
  artists(search: "nome") {
    name
    id
  }
}
```

O ponto importante é que **os campos disponíveis precisam existir no tipo `Artist` definido em `typeDefs.js`**.

---

# 💿 Pesquisa de álbuns

Na API REST, a pesquisa de álbuns pode ser realizada através de:

```http
GET /api/albums?search=titulo
```

No GraphQL, a ideia é semelhante.

Exemplo conceitual:

```graphql
query {
  albums(search: "titulo") {
    title
  }
}
```

Podemos solicitar outros dados do álbum, caso estejam definidos no schema:

```graphql
query {
  albums(search: "titulo") {
    title
    id
  }
}
```

Novamente, os nomes dos campos devem ser conferidos em:

```text
src/graphql/typeDefs.js
```

---

# 🎼 Pesquisa de gêneros

Também é possível consultar gêneros através do GraphQL caso essa operação esteja definida no schema.

Exemplo conceitual:

```graphql
query {
  genres {
    name
  }
}
```

A consulta retorna os gêneros disponíveis e permite solicitar somente os campos necessários.

---

# 🎧 Pesquisas e relacionamentos

Uma das principais vantagens do GraphQL é poder solicitar informações relacionadas em uma única consulta.

No Playlist+, existem relacionamentos entre:

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

```text
Artista
Álbum
Gênero
```

No GraphQL, caso esses relacionamentos estejam definidos no schema, podemos solicitar os dados relacionados dentro da mesma consulta.

Por exemplo, uma consulta pode seguir este conceito:

```graphql
query {
  songs {
    title
    artist {
      name
    }
    album {
      title
    }
    genre {
      name
    }
  }
}
```

Assim, em uma única consulta, podemos solicitar:

```text
Nome da música
    ↓
Artista
    ↓
Álbum
    ↓
Gênero
```

Isso é uma das principais diferenças em relação a uma API REST tradicional, onde muitas vezes seriam necessárias várias requisições para obter informações relacionadas.

> O exemplo acima representa a estrutura conceitual. Os nomes dos campos e relacionamentos devem corresponder exatamente ao schema definido no projeto.

---

# ✏️ Mutations

Enquanto as **Queries** são utilizadas para consultar dados, as **Mutations** são utilizadas para realizar alterações.

Por exemplo:

```text
Criar
Atualizar
Excluir
```

Uma Mutation também é enviada para:

```text
POST /graphql
```

Por exemplo, conceitualmente:

```graphql
mutation {
  createSong(...) {
    title
  }
}
```

Nesse caso, estamos solicitando a criação de uma música.

Da mesma forma, podem existir mutations para:

```text
Criar música
Atualizar música
Excluir música

Criar artista
Atualizar artista
Excluir artista

Criar álbum
Atualizar álbum
Excluir álbum

Criar gênero
Atualizar gênero
Excluir gênero
```

Os nomes exatos dessas mutations devem ser consultados em:

```text
src/graphql/typeDefs.js
```

---

# 🧑‍💻 Como fazer uma consulta no Apollo Server

Para testar uma operação:

### 1. Inicie o projeto

```bash
npm run dev
```

### 2. Abra o GraphQL

Acesse:

```text
http://localhost:3000/graphql
```

### 3. Verifique as operações disponíveis

O Apollo Server permite consultar o schema para descobrir:

```text
Queries disponíveis
Mutations disponíveis
Tipos
Argumentos
Campos
```

Isso é importante porque o GraphQL é **fortemente tipado**.

Ou seja, não podemos simplesmente inventar uma Query ou um campo.

Se o schema não possuir:

```graphql
songs
```

por exemplo, essa consulta não funcionará.

---

# 📌 GraphQL x REST

No Playlist+, as duas abordagens podem ser entendidas da seguinte forma:

| REST                               | GraphQL                             |
| ---------------------------------- | ----------------------------------- |
| Possui várias rotas                | Utiliza uma rota principal          |
| `/api/songs`                       | `/graphql`                          |
| `/api/artists`                     | `/graphql`                          |
| `/api/albums`                      | `/graphql`                          |
| `/api/genres`                      | `/graphql`                          |
| Parâmetros geralmente ficam na URL | Argumentos ficam na Query           |
| Resposta definida pelo endpoint    | Cliente escolhe os campos desejados |
| GET para consultas                 | Query para consultas                |
| POST/PUT/DELETE para alterações    | Mutation para alterações            |

### Exemplo REST

Para buscar músicas:

```http
GET http://localhost:3000/api/songs
```

Para pesquisar músicas:

```http
GET http://localhost:3000/api/songs?search=summer
```

### Exemplo GraphQL

Para ambas as operações, utilizamos:

```http
POST http://localhost:3000/graphql
```

E informamos no corpo da requisição o que queremos consultar.

---

# 🔍 Como descobrir as "rotas" disponíveis no GraphQL

É importante entender que **GraphQL não possui uma rota específica para músicas, outra para artistas e outra para álbuns**.

Existe apenas:

```text
http://localhost:3000/graphql
```

Dentro dessa rota existem diferentes **operações**.

Para descobrir quais operações o Playlist+ realmente disponibiliza:

1. Abra:

```text
src/graphql/typeDefs.js
```

2. Procure por:

```graphql
type Query
```

3. As operações dentro de `type Query` são as consultas disponíveis.

4. Depois procure por:

```graphql
type Mutation
```

5. As operações dentro de `type Mutation` são as alterações disponíveis.

Por exemplo, se o schema possuir:

```graphql
type Query {
  songs: [Song]
  artists: [Artist]
  albums: [Album]
}
```

significa que existem consultas para:

```text
songs
artists
albums
```

Todas elas, entretanto, são acessadas através de:

```text
POST /graphql
```

Da mesma forma, se existir:

```graphql
type Mutation {
  createSong(...): Song
  updateSong(...): Song
  deleteSong(...): Song
}
```

essas são as operações responsáveis pelas alterações.

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

# 🎨 Frontend (React + Vite)

A interface web fica na pasta `frontend/` e consome as duas APIs do backend:

| Recurso | Integração |
|---|---|
| Login, cadastro e sessão | REST — `/api/auth/login`, `/api/auth/register`, `/api/auth/me` |
| Buscar músicas e filtrar por gênero | REST — `GET /api/songs?search=&genre=`, `GET /api/genres` |
| Início, playlists, colaboradores, favoritas e avaliações | GraphQL (Apollo Client) — `/graphql` |

O token JWT recebido no login é salvo no navegador e enviado no cabeçalho `Authorization: Bearer <token>` de todas as requisições. As telas internas só abrem para usuários autenticados.

> 🎧 O player do rodapé é **apenas ilustrativo**: nenhuma música é reproduzida (streaming está fora do escopo do projeto).

## Executar o frontend

Com o backend já rodando na porta `3000`, em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Acesse:

```text
http://localhost:5173
```

## Telas

| Rota | Tela |
|---|---|
| `/login` | Login |
| `/cadastro` | Cadastro de usuário |
| `/` | Início — resumo do usuário, suas playlists e músicas do catálogo |
| `/buscar` | Pesquisa de músicas com filtro por gênero; favoritar, avaliar e adicionar à playlist |
| `/favoritas` | Músicas favoritadas pelo usuário |
| `/playlist/:id` | Detalhes da playlist — editar, excluir, remover músicas e gerenciar colaboradores |

A interface é responsiva: no computador a navegação fica na barra lateral; no celular, em uma barra inferior.

## Playlist colaborativa

1. O dono cria (ou edita) a playlist com visibilidade **Colaborativa**.
2. O dono abre a playlist e clica no ícone de **colaboradores**.
3. Informa o ID do usuário colaborador (a mutation `adicionarColaborador` recebe `userId`).
4. A partir daí, o colaborador vê a playlist na biblioteca e pode adicionar e remover músicas.

## Estrutura do frontend

```text
frontend/src/
├── components/   # Sidebar, PlayerBar, TrackList, PlaylistForm, AddToPlaylist...
├── context/      # AuthContext (sessão JWT), PlayerContext, ToastContext
├── graphql/      # queries.js e mutations.js
├── hooks/        # useFavorites, useRatings
├── layouts/      # AppLayout (sidebar + conteúdo + player)
├── pages/        # Login, Register, Home, Search, Favorites, PlaylistDetail
├── services/     # apollo.js (GraphQL), api.js (REST), token.js
└── utils/        # formatação de duração, normalização de dados
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
