# 🛋️ Suzana Casa & Conforto - Aplicação Web

Aplicação web desenvolvida para a loja **Suzana Casa & Conforto**, com catálogo de produtos, área administrativa e autenticação de usuários.

---

### 🚀 Tecnologias Utilizadas

- **Next.js** (React Framework)
- **TypeScript**
- **Tailwind CSS** (Estilização moderna)
- **Prisma ORM** (Gerenciamento de banco de dados)
- **NextAuth.js** (Autenticação segura com JWT e Bcrypt)

---

### 📦 Funcionalidades Principais

- Catálogo online de produtos com layout responsivo
- Painel administrativo com controle de acesso (`/admin/login`)
- Estrutura preparada para integração de banco de dados com Prisma
- Design focado em conforto e experiência do cliente
- ---
### 🛠️ Como executar localmente

1. Clone este repositório.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto.
4. Configure as variáveis de ambiente necessárias.
5. Gere o Prisma Client:

   ```bash
   npx prisma generate
   ```

6. Inicie o projeto:

   ```bash
   npm run dev
   ```

O projeto estará disponível em `http://localhost:3000`.

### 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as variáveis utilizadas pela aplicação:

```env
DATABASE_URL=
AWS_PROFILE=
AWS_REGION=
AWS_BUCKET_NAME=
AWS_FOLDER_PREFIX=
NEXTAUTH_SECRET=
AUTH_SECRET=
```


---

### 👨‍💻 Desenvolvedor

Desenvolvido por **Edivaldo Eugênio**  
GitHub: [@edivaldoeugenio](https://github.com/edivaldoeugenio)
