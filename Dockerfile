# ---- Build Stage ----
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ---- Run Stage ----
FROM node:22-alpine
WORKDIR /app

# Install static file server
RUN npm install -g serve

# Copy build output
COPY --from=builder /app/dist ./dist

EXPOSE 10000

CMD ["serve", "-s", "dist", "-l", "10000"]
