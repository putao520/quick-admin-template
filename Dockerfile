FROM node:20-alpine AS builder
WORKDIR /app

# Skip strict env validation during Docker build
ENV SKIP_ENV_VALIDATION=1

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

# Prune dev dependencies to reduce size for runtime
RUN npm prune --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copy only what's needed to run
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/src/types/image/loader.ts ./src/types/image/loader.ts

EXPOSE 3000
CMD ["npm", "run", "start"]
