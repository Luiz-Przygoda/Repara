# Instruções de Deploy - Sistema Repara

## 🚀 Deploy Completo: Railway (MySQL) + Render (Backend) + Vercel (Frontend)

### 1. 🗄️ Banco de Dados MySQL no Railway

1. Acesse [Railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project" → "Provision MySQL"
4. Aguarde a criação do banco
5. Vá em "Variables" e copie as seguintes variáveis:
   - `MYSQL_HOST`
   - `MYSQL_PORT` 
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`
   - `MYSQL_URL` (connection string completa)

### 2. 🔧 Backend no Render

1. Acesse [Render.com](https://render.com)
2. Faça login com GitHub
3. Clique em "New" → "Web Service"
4. Conecte seu repositório GitHub
5. Configure:
   - **Name**: `repara-backend`
   - **Root Directory**: `repara-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`

6. **Variáveis de Ambiente** (Environment Variables):
   ```
   NODE_ENV=production
   DB_HOST=<MYSQL_HOST do Railway>
   DB_PORT=<MYSQL_PORT do Railway>
   DB_USERNAME=<MYSQL_USER do Railway>
   DB_PASSWORD=<MYSQL_PASSWORD do Railway>
   DB_DATABASE=<MYSQL_DATABASE do Railway>
   DATABASE_URL=<MYSQL_URL do Railway>
   ```

7. Clique em "Create Web Service"
8. Aguarde o deploy (pode demorar alguns minutos)
9. Anote a URL do backend (ex: `https://repara-backend.onrender.com`)

### 3. 🌐 Frontend no Vercel

1. Acesse [Vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Clique em "New Project"
4. Importe seu repositório
5. Configure:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `repara-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. **Variáveis de Ambiente**:
   ```
   NEXT_PUBLIC_API_URL=https://repara-backend.onrender.com
   ```

7. Clique em "Deploy"
8. Aguarde o deploy (geralmente mais rápido que o Render)

### 4. 🔄 Executar Migrações

Após o deploy do backend, execute as migrações:

1. No terminal local, configure as variáveis de ambiente do Railway:
   ```bash
   export DB_HOST=<MYSQL_HOST>
   export DB_PORT=<MYSQL_PORT>
   export DB_USERNAME=<MYSQL_USER>
   export DB_PASSWORD=<MYSQL_PASSWORD>
   export DB_DATABASE=<MYSQL_DATABASE>
   ```

2. Execute as migrações:
   ```bash
   cd repara-backend
   npm run migration:run
   ```

### 5. ✅ Verificação Final

1. **Backend**: Acesse `https://repara-backend.onrender.com` - deve retornar uma resposta da API
2. **Frontend**: Acesse a URL do Vercel - deve carregar a aplicação
3. **Banco**: Verifique no Railway se as tabelas foram criadas

### 🔧 Troubleshooting

**Backend não conecta ao banco:**
- Verifique se todas as variáveis de ambiente estão corretas
- Confirme se o banco MySQL está ativo no Railway

**Frontend não carrega dados:**
- Verifique se `NEXT_PUBLIC_API_URL` está apontando para o backend correto
- Confirme se o CORS está configurado no backend

**Migrações falham:**
- Execute localmente com as variáveis do Railway
- Verifique se o banco está acessível

### 📝 URLs Finais

- **Frontend**: `https://seu-projeto.vercel.app`
- **Backend**: `https://repara-backend.onrender.com`
- **Banco**: Gerenciado pelo Railway

### 💡 Dicas

- O Render pode demorar para "acordar" na primeira requisição (cold start)
- O Railway oferece um plano gratuito com limitações
- O Vercel tem excelente performance para Next.js
- Sempre teste localmente antes do deploy
