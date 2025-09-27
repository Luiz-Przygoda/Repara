# Guia de Deploy - Repara

Este guia explica como fazer o deploy do projeto Repara usando **Vercel** para o frontend e **Railway** para o backend.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Conta no [Railway](https://railway.app)
- Projeto no GitHub (recomendado)

## 🚀 Deploy do Backend (Railway)

### 1. Preparação do Backend

O backend já está configurado com:
- ✅ `railway.json` - Configuração do Railway
- ✅ Variáveis de ambiente configuradas
- ✅ Suporte a `DATABASE_URL` do Railway

### 2. Deploy no Railway

1. **Acesse [Railway.app](https://railway.app)** e faça login
2. **Clique em "New Project"**
3. **Selecione "Deploy from GitHub repo"**
4. **Escolha seu repositório** e selecione a pasta `repara-backend`
5. **Configure as variáveis de ambiente:**
   - `NODE_ENV=production`
   - `PORT=3001` (opcional, Railway define automaticamente)

### 3. Configurar Banco de Dados

1. **No dashboard do Railway, clique em "New"**
2. **Selecione "Database" → "MySQL"**
3. **Railway criará automaticamente a `DATABASE_URL`**
4. **Execute as migrations:**
   ```bash
   # No terminal do Railway ou localmente
   npm run migration:run
   ```

### 4. Obter URL do Backend

Após o deploy, anote a URL do seu backend (ex: `https://seu-projeto.railway.app`)

## 🌐 Deploy do Frontend (Vercel)

### 1. Preparação do Frontend

O frontend já está configurado com:
- ✅ `vercel.json` - Configuração do Vercel
- ✅ Variáveis de ambiente configuradas
- ✅ API configurada para usar variáveis de ambiente

### 2. Deploy no Vercel

1. **Acesse [Vercel.com](https://vercel.com)** e faça login
2. **Clique em "New Project"**
3. **Importe seu repositório do GitHub**
4. **Configure o projeto:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `repara-frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### 3. Configurar Variáveis de Ambiente

No dashboard do Vercel:
1. **Vá em Settings → Environment Variables**
2. **Adicione:**
   - `NEXT_PUBLIC_API_URL` = `https://seu-backend-url.railway.app`

### 4. Deploy

1. **Clique em "Deploy"**
2. **Aguarde o build completar**
3. **Teste a aplicação**

## 🔧 Configurações Adicionais

### CORS (se necessário)

Se houver problemas de CORS, adicione no backend:

```typescript
// main.ts
app.enableCors({
  origin: ['https://seu-frontend.vercel.app'],
  credentials: true,
});
```

### Domínio Personalizado

#### Vercel:
1. **Settings → Domains**
2. **Adicione seu domínio**
3. **Configure DNS conforme instruções**

#### Railway:
1. **Settings → Domains**
2. **Adicione domínio personalizado**
3. **Configure DNS**

## 🐛 Troubleshooting

### Backend não conecta ao banco
- Verifique se `DATABASE_URL` está configurada
- Execute migrations: `npm run migration:run`

### Frontend não conecta ao backend
- Verifique `NEXT_PUBLIC_API_URL`
- Teste a URL do backend diretamente
- Verifique CORS

### Build falha
- Verifique logs no Vercel/Railway
- Teste build localmente: `npm run build`

## 📝 Comandos Úteis

```bash
# Backend - Build local
cd repara-backend
npm run build
npm run start:prod

# Frontend - Build local
cd repara-frontend
npm run build
npm run start

# Migrations
cd repara-backend
npm run migration:run
npm run migration:generate -- NomeDaMigration
```

## 🔄 Deploy Automático

Com GitHub conectado:
- **Push para `main`** = Deploy automático
- **Pull Requests** = Preview deployments (Vercel)

## 📊 Monitoramento

- **Vercel:** Analytics, Performance, Logs
- **Railway:** Metrics, Logs, Database

---

## 🎉 Pronto!

Seu projeto estará disponível em:
- **Frontend:** `https://seu-projeto.vercel.app`
- **Backend:** `https://seu-projeto.railway.app`

Para atualizações, basta fazer push para o GitHub!
