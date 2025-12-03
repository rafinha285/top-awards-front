# Estágio 1: Build (Construção)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependência
COPY package.json package-lock.json ./

# Instala dependências
RUN npm ci

# Copia todo o código fonte
COPY . .

# Gera a pasta 'dist' (Build de produção)
# Se o seu script de build for diferente, ajuste aqui (ex: npm run build:prod)
RUN npm run build

# Estágio 2: Servidor (Nginx)
FROM nginx:alpine

# Remove configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa configuração customizada
COPY nginx.conf /etc/nginx/conf.d

# Copia os arquivos gerados no estágio 1 para o Nginx
# ATENÇÃO: Vite cria a pasta 'dist'. Se usar CRA, mude para 'build'
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]