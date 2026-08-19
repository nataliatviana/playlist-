# 🎵 Playlist+

O **Playlist+** é uma aplicação Web para gerenciamento e organização de músicas e playlists. O sistema permite que usuários pesquisem músicas, artistas e álbuns, criem playlists personalizadas, favoritem e avaliem músicas e participem de playlists colaborativas.

O projeto tem como foco a **integração entre frontend, backend, banco de dados e serviços Web**, utilizando APIs RESTful e GraphQL.

---

## 📌 Sobre o Projeto

O Playlist+ foi desenvolvido com o objetivo de centralizar o gerenciamento de conteúdos musicais em uma única plataforma.

A aplicação permite que o usuário:

* 🔐 Crie uma conta e faça login
* 👤 Gerencie seu perfil
* 🎵 Pesquise músicas, artistas e álbuns
* 🎶 Crie e gerencie playlists
* ⭐ Favorite músicas
* ⭐ Avalie músicas
* 🤝 Participe de playlists colaborativas
* 🔎 Utilize filtros por gênero
* 📊 Acompanhe estatísticas através de um dashboard

> **Importante:** o Playlist+ não realiza streaming ou reprodução de músicas. O objetivo do projeto é demonstrar a integração entre diferentes tecnologias e serviços Web.

---

## 🚀 Funcionalidades

### 🔐 Autenticação e Usuários

* Cadastro de usuários
* Login
* Autenticação utilizando JWT
* Visualização e edição do perfil
* Controle de acesso a recursos protegidos

### 🎵 Catálogo Musical

* Cadastro e gerenciamento de músicas
* Cadastro e gerenciamento de artistas
* Cadastro e gerenciamento de álbuns
* Cadastro e gerenciamento de gêneros
* Pesquisa de músicas, artistas e álbuns
* Filtros por gênero

### 📋 Playlists

* Criação de playlists
* Edição de playlists
* Exclusão de playlists
* Adição e remoção de músicas
* Definição de nome e descrição
* Controle de visibilidade
* Playlists públicas, privadas e colaborativas

### ⭐ Interações

* Favoritar músicas
* Remover músicas dos favoritos
* Avaliar músicas
* Visualizar avaliações
* Participar de playlists colaborativas

### 📊 Dashboard

O dashboard apresenta um resumo das informações do usuário, como:

* Quantidade de playlists
* Músicas favoritas
* Avaliações realizadas
* Estatísticas relacionadas ao conteúdo musical

---

## 🏗️ Arquitetura

```text
┌──────────────────────────┐
│        Frontend          │
│          React           │
└────────────┬─────────────┘
             │
             │ REST / GraphQL
             ▼
┌──────────────────────────┐
│         Backend          │
│    Node.js + Express     │
│    Apollo Server         │
│          JWT             │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│        Database          │
│         MongoDB          │
└──────────────────────────┘
```

---

## 🛠️ Tecnologias

| Camada             | Tecnologia           |
| ------------------ | -------------------- |
| Frontend           | React                |
| Backend            | Node.js              |
| Framework Web      | Express              |
| API                | RESTful              |
| API                | GraphQL              |
| GraphQL Server     | Apollo Server        |
| Banco de Dados     | MongoDB              |
| Autenticação       | JSON Web Token (JWT) |
| Controle de versão | Git / GitHub         |

---

## 📂 Estrutura do Projeto

```text
playlist-plus/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   ├── graphql/
│   │   └── config/
│   │
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

> A estrutura poderá ser ajustada durante o desenvolvimento do projeto.

---

## 🔗 Principais Endpoints REST

### Autenticação

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

### Músicas

```http
POST   /api/songs
GET    /api/songs
GET    /api/songs/:id
PUT    /api/songs/:id
DELETE /api/songs/:id
```

### Artistas

```http
POST   /api/artists
GET    /api/artists
GET    /api/artists/:id
PUT    /api/artists/:id
DELETE /api/artists/:id
```

### Álbuns

```http
POST   /api/albums
GET    /api/albums
GET    /api/albums/:id
PUT    /api/albums/:id
DELETE /api/albums/:id
```

### Playlists

```http
POST   /api/playlists
GET    /api/playlists
GET    /api/playlists/:id
PUT    /api/playlists/:id
DELETE /api/playlists/:id
```

### Músicas em Playlists

```http
POST   /api/playlists/:id/songs
DELETE /api/playlists/:id/songs
```

### Favoritos e Avaliações

```http
POST   /api/songs/:id/favorite
DELETE /api/songs/:id/favorite

POST   /api/songs/:id/rating
GET    /api/songs/:id/rating
```

---

## 🔑 Autenticação

O Playlist+ utiliza **JWT (JSON Web Token)** para autenticação.

Após realizar o login, o usuário recebe um token que deve ser enviado nas requisições que exigem autenticação.

```http
Authorization: Bearer <token>
```

Os principais recursos protegidos incluem:

* Criação e gerenciamento de playlists
* Edição do perfil
* Favoritar músicas
* Avaliar músicas
* Recursos de playlists colaborativas

---

## 🗃️ Modelagem de Dados

O sistema possui oito entidades principais:

| Entidade      | Descrição                                             |
| ------------- | ----------------------------------------------------- |
| **Usuário**   | Dados de autenticação e informações cadastrais        |
| **Artista**   | Representa o artista responsável pelas músicas        |
| **Álbum**     | Representa um álbum e suas informações                |
| **Música**    | Armazena informações das faixas musicais              |
| **Gênero**    | Classifica as músicas por estilo musical              |
| **Playlist**  | Coleção de músicas criada e organizada por um usuário |
| **Avaliação** | Nota atribuída por um usuário a uma música            |
| **Favorito**  | Relacionamento que registra músicas favoritas         |

### Relacionamentos

* Um usuário pode possuir várias playlists.
* Uma playlist pode conter várias músicas.
* Uma música pode pertencer a várias playlists.
* Um artista pode possuir vários álbuns e músicas.
* Um álbum pode conter várias músicas.
* Uma música pertence a um gênero.
* Um usuário pode avaliar e favoritar várias músicas.
* Uma música pode possuir uma avaliação e um favorito por usuário.

---

## 🖥️ Interfaces

As principais telas previstas são:

* 🏠 Tela inicial / exploração
* 🔐 Login
* 📝 Cadastro
* 📊 Dashboard
* 🎵 Lista de músicas
* 🎵 Detalhes da música
* 🎤 Lista de artistas
* 🎤 Detalhes do artista
* 💿 Lista de álbuns
* 📋 Minhas playlists
* ➕ Criação e edição de playlists
* 🎶 Detalhes da playlist
* ⭐ Músicas favoritas
* 👤 Perfil do usuário

---

## 📋 Escopo

### ✅ Incluído

* Gerenciamento de usuários
* Autenticação JWT
* Gerenciamento de músicas
* Gerenciamento de artistas
* Gerenciamento de álbuns
* Gerenciamento de gêneros
* Playlists personalizadas
* Playlists colaborativas
* Favoritos
* Avaliações
* Pesquisa e filtros
* Dashboard
* APIs RESTful
* GraphQL

### ❌ Fora do Escopo

* Streaming ou reprodução de músicas completas
* Upload de arquivos de áudio
* Download de músicas
* Sistema de assinatura ou pagamento
* Chat em tempo real
* Integração com Spotify ou YouTube
* Sistema avançado de recomendação baseado em IA
* Aplicativo mobile nativo

---

## 🔄 Etapas de Desenvolvimento

### Fase 1 — Backend + Banco de Dados

* [ ] Modelagem das entidades
* [ ] Configuração do MongoDB
* [ ] Configuração do Node.js + Express
* [ ] Implementação das APIs RESTful
* [ ] Implementação do GraphQL
* [ ] Implementação das regras de negócio
* [ ] Implementação da autenticação JWT
* [ ] Testes dos serviços

### Fase 2 — Frontend + Integração

* [ ] Desenvolvimento das interfaces em React
* [ ] Integração com APIs RESTful
* [ ] Integração com GraphQL
* [ ] Implementação do login
* [ ] Controle de sessão
* [ ] Desenvolvimento das telas de músicas
* [ ] Desenvolvimento das telas de artistas
* [ ] Desenvolvimento das telas de álbuns
* [ ] Desenvolvimento das playlists
* [ ] Desenvolvimento do dashboard
* [ ] Testes de integração

---

## 🎯 Objetivo Acadêmico

O Playlist+ foi desenvolvido como projeto da disciplina de **Integração de Interfaces e Serviços Web**, com o objetivo de aplicar conceitos relacionados ao desenvolvimento de aplicações Web modernas, incluindo:

* Desenvolvimento Frontend
* Desenvolvimento Backend
* APIs RESTful
* GraphQL
* Autenticação e autorização
* Banco de dados NoSQL
* Integração entre serviços
* Arquitetura de aplicações Web

---

## 👩‍💻 Projeto

Projeto acadêmico desenvolvido para fins educacionais.

**Playlist+ — Organize suas músicas. Crie suas playlists. Compartilhe suas preferências. 🎵**
