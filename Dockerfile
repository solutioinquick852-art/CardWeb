# 單一 Dockerfile - 整合後端和前端

# ==================== 階段 1：構建前端 ====================
FROM node:18-alpine AS frontend-builder

WORKDIR /app

COPY frontend/package*.json ./

RUN npm ci

COPY frontend/ ./

RUN npm run build

# ==================== 階段 2：準備後端 ====================
FROM node:18-alpine AS backend-prep

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci --only=production

COPY backend/ ./

# ==================== 最終階段：整合 ====================
FROM node:18-alpine

RUN apk add --no-cache dumb-init nginx

WORKDIR /app

ENV NODE_ENV=production

COPY --from=backend-prep /app /app

COPY --from=frontend-builder /app/build /app/build


RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'node /app/index.js &' >> /app/start.sh && \
    echo 'nginx -g "daemon off;" &' >> /app/start.sh && \
    echo 'wait $(jobs -p)' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 80

ENTRYPOINT ["dumb-init", "--"]
CMD ["/app/start.sh"]
