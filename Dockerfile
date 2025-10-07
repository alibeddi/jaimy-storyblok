# ---- Base image ----
FROM node:22-alpine AS base

# Add curl for debugging
RUN apk add --no-cache curl

# ---- Build stage ----
FROM base AS build

WORKDIR /usr/src/app

# Copy dependency files
COPY package.json package-lock.json ./
COPY tsconfig* *.config.* ./


RUN --mount=type=cache,target=/root/.npm \
    npm install --cache /root/.npm --prefer-offline

# Copy project files
COPY public ./public
COPY src ./src
COPY scripts ./scripts
COPY env.template ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./
COPY .env ./

# Build Next.js app
RUN --mount=type=secret,id=storyblok_token \
    export NEXT_PUBLIC_STORYBLOK_API_TOKEN=$(cat ./.env | grep NEXT_PUBLIC_STORYBLOK_API_TOKEN | cut -d '=' -f2) && \
    npm run build

# ---- Production stage ----
FROM base

WORKDIR /usr/src/app

# Copy only production deps & build output
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public

# Expose Next.js port
EXPOSE 3001

# Start app
CMD ["npm", "start"]
