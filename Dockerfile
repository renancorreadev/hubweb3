# Dockerfile para Next.js com multi-stage build
FROM node:22-alpine AS base

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Yarn já vem instalado na imagem node:alpine

# Copiar arquivos de configuração de dependências
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Instalar dependências baseado no package manager detectado
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Stage de build
FROM base AS builder
WORKDIR /app

# Copiar código fonte
COPY . .

# Desabilitar telemetria do Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Build da aplicação
RUN \
    if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Stage de produção
FROM node:22-alpine AS runner
WORKDIR /app

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários
COPY --from=builder /app/public ./public

# Criar diretório .next e configurar permissões
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copiar build da aplicação com permissões corretas
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Configurar variáveis de ambiente
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=1000
ENV HOSTNAME="0.0.0.0"

# Mudar para usuário não-root
USER nextjs

# Expor porta
EXPOSE 1000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
