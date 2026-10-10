# Portfólio Web — Suzana Casa & Conforto

Aplicação web em **Next.js** para demonstrar o projeto da loja **Suzana Casa & Conforto**, incluindo:

- vitrine pública com catálogo de produtos;
- área administrativa para gestão de produtos e configurações;
- autenticação para acesso administrativo.

> **Escopo importante:** este repositório é do portfólio/demonstração e **não altera DNS, domínio ou produção** de `suzanacasaeconforto.com.br`.

---

### Proposta do projeto

Este projeto representa a proposta de catálogo digital + gestão administrativa para a Suzana Casa & Conforto:

- **Catálogo público** com categorias, destaques, busca e contato via WhatsApp;
- **Painel administrativo** para criar/editar/remover produtos;
- **Configurações dinâmicas** de conteúdo institucional (banner, texto “Sobre”, etc.);
- **Upload de imagens** via URL assinada (S3).

---

### Tecnologias em uso (confirmadas no código)

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Prisma ORM**
- **NextAuth (Auth.js)** com provider de credenciais
- **PostgreSQL** (via `DATABASE_URL`)
- **AWS SDK (S3)** para upload de imagens

---

### Pré-requisitos

- **Node.js >= 20.9.0**
- **npm** (gerenciador padronizado neste repositório)
- Banco PostgreSQL acessível
- (Opcional) Bucket S3 para upload de imagens

---

### Instalação passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/edivaldoeugenio/portfolio-web.git
cd portfolio-web
```

2. Instale dependências com npm:

```bash
npm install
```

3. Crie o arquivo de ambiente com base no exemplo:

```bash
cp .env.example .env
```

4. Preencha as variáveis do `.env`.

5. Gere o client do Prisma:

```bash
npx prisma generate
```

---

### Rodando em desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em `http://localhost:3000`.

---

### Build e execução em produção

1. Gerar build:

```bash
npm run build
```

2. Iniciar servidor:

```bash
npm run start
```

---

### Variáveis de ambiente (`.env`)

Abaixo estão as variáveis esperadas pela aplicação, com finalidade e exemplo **sem segredos reais**:

| Variável | Obrigatória | Finalidade | Exemplo |
|---|---|---|---|
| `DATABASE_URL` | Sim | Conexão do Prisma com PostgreSQL | `postgresql://usuario:senha@host:5432/database?schema=public&sslmode=require` |
| `DB_QUERY_TIMEOUT_MS` | Não | Timeout (ms) das consultas públicas antes do fallback local | `3000` |
| `AUTH_SECRET` | Sim | Segredo de sessão/token do NextAuth | `troque-por-um-segredo-forte` |
| `NEXTAUTH_URL` | Sim | URL base usada pela autenticação/metadados | `http://localhost:3000` |
| `AWS_REGION` | Não* | Região do bucket S3 (upload) | `us-west-2` |
| `AWS_BUCKET_NAME` | Não* | Nome do bucket S3 | `meu-bucket` |
| `AWS_FOLDER_PREFIX` | Não* | Prefixo de pastas no bucket | `suzana/` |
| `AWS_ACCESS_KEY_ID` | Não* | Credencial AWS para upload em ambientes sem role | `SUA_ACCESS_KEY` |
| `AWS_SECRET_ACCESS_KEY` | Não* | Segredo da credencial AWS | `SUA_SECRET_KEY` |
| `NEXT_PUBLIC_AWS_BUCKET_NAME` | Não | Nome do bucket exposto ao front (se necessário) | `meu-bucket` |

\* Obrigatórias somente se o fluxo de upload S3 estiver habilitado.

---

### Fallback quando o banco estiver indisponível

Para evitar erro 500 no catálogo público, o projeto usa fallback local quando não consegue conectar no banco (ou estoura timeout):

- Dados mock ficam em: **`lib/fallback-catalog.ts`**
- Lógica de carregamento com fallback fica em: **`lib/public-catalog.ts`**
- Página pública usa essa lógica em: **`app/page.tsx`**
- APIs públicas também usam fallback em:
  - **`app/api/products/route.ts`**
  - **`app/api/settings/route.ts`**

Quando o banco volta a responder, os dados do banco são usados automaticamente.

Para substituir mock por dados reais: ajuste `DATABASE_URL`, valide acesso do banco e mantenha os registros reais nas tabelas `Product` e `SiteConfig`.

---

### Estrutura resumida de pastas

```text
app/
  api/
    auth/
    products/
    settings/
    upload/
  admin/
  _components/
lib/
  db.ts
  public-catalog.ts
  fallback-catalog.ts
prisma/
  schema.prisma
public/
scripts/
```

---

### Contribuição

1. Crie uma branch de feature.
2. Faça commits pequenos e descritivos.
3. Abra um Pull Request com contexto técnico e evidências de teste.

---

### Licença

Sem licença definida no momento. Caso necessário, adicione uma licença explícita (ex.: MIT) em arquivo `LICENSE`.
