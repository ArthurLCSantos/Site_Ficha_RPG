# Sistema de Fichas - Gachiakuta RPG

Um sistema web para gerenciamento de fichas de personagens e **Personarmas**, desenvolvido para campanhas de RPG ambientadas no universo de **Gachiakuta**.

## 📖 Sobre o projeto

Este projeto tem como objetivo facilitar a criação, edição e gerenciamento de fichas de personagens utilizadas em campanhas de RPG inspiradas no universo de *Gachiakuta*. O sistema centraliza todas as informações dos jogadores em um único lugar, permitindo que mestres acompanhem o desenvolvimento das campanhas.

## ✨ Funcionalidades

### Usuários

* Cadastro de conta.
* Login seguro.
* Criação de personagens.
* Edição de personagens.
* Exclusão de personagens.
* Criação de Personarmas.
* Edição de Personarmas.
* Exclusão de Personarmas.
* Visualização apenas das próprias fichas.

### Administradores

Os administradores são destinados aos **mestres das campanhas** e **desenvolvedores do sistema**.

Além de todas as funcionalidades disponíveis para usuários comuns, eles também podem:

* Visualizar as fichas de todos os usuários.
* Gerenciar seus próprios personagens e Personarmas.
* Acompanhar o progresso geral das campanhas.

---

## 🛠️ Tecnologias utilizadas

### Front-end

* React
* Next.js
* TypeScript
* Tailwind CSS

### Back-end

* Next.js API Routes
* Prisma ORM
* PostgreSQL
* NextAuth (Autenticação)

---

## ⚠️ Informações importantes

### Contas de Administrador

Atualmente, contas com permissões de **Administrador** não podem ser criadas pela interface do sistema. Sua criação deve ser realizada diretamente no banco de dados.

---

### Alteração de dados da conta

Nesta versão do sistema, as seguintes informações da conta **não podem ser alteradas pela interface**:

* Nome de usuário;
* E-mail;
* Senha.

Caso seja necessário alterar qualquer um desses dados, a modificação deverá ser feita diretamente no banco de dados.

#### Alteração de senha

As senhas **não são armazenadas em texto puro**. Antes de serem salvas no banco de dados, elas são criptografadas utilizando hash.

Ao alterar uma senha manualmente, é **obrigatório** gerar um novo hash utilizando o mesmo algoritmo empregado pela aplicação. Caso contrário, o usuário não conseguirá realizar login.

Exemplo utilizado pelo sistema:

```ts
const senhaHash = await crypto.hash(senha, 10);
```

---

## 🔐 Sistema de permissões

O sistema possui dois níveis de acesso:

| Cargo         | Permissões                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------- |
| Usuário       | Gerencia apenas seus próprios personagens e Personarmas.                                    |
| Administrador | Possui acesso às fichas de todos os usuários, além de todas as funções de um usuário comum. |

---

## 🚀 Como executar o projeto

### Pré-requisitos

* Node.js
* PostgreSQL
* npm ou yarn

### Instalação

Clone o repositório:

```bash
git clone https://github.com/ArthurLCSantos/Site_Ficha_RPG
```

Entre na pasta do projeto:

```bash
cd Site_Ficha_RPG
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com as variáveis necessárias.

Execute as migrações do banco:

```bash
npx prisma migrate dev
```

Inicie o projeto:

```bash
npm run dev
```

---

## 📂 Estrutura geral

```
src/
├── prisma/
├── public/
└── src/
    ├── components/
    ├── app/
    ├── lib/
    └── types/
```

---

## 🔮 Funcionalidades planejadas

Algumas funcionalidades previstas para versões futuras:

* Sistema de campanhas.
* Compartilhamento de fichas.
* Exportação das fichas em PDF.

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e para utilização em campanhas de RPG inspiradas em *Gachiakuta*.

*Gachiakuta* é uma obra de Kei Urana e Hideyoshi Andou. Este projeto é independente e não possui qualquer vínculo oficial com seus autores ou detentores dos direitos da obra.
