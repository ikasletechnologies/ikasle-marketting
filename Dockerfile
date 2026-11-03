# syntax=docker/dockerfile:1
# Production image (IKAS-505): one small Node process serves the built site and the API.
#   docker build --build-arg SITE_URL=https://www.example.com -t ikasle-marketing .
#   docker run -p 5000:5000 --env-file server/.env -v ikasle-data:/data ikasle-marketing

# ---- Build stage: install everything, build the static site ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Absolute URLs in sitemap.xml, robots.txt and per-route meta tags.
ARG SITE_URL
ENV SITE_URL=${SITE_URL}
RUN npm run build

# ---- Runtime stage: only the server, its one dependency, and dist/ ----
FROM node:24-alpine AS runtime
ENV NODE_ENV=production \
    PORT=5000 \
    DATA_DIR=/data
WORKDIR /app
# The server's only runtime dependency is nodemailer, which has no dependencies of its
# own: copy the lockfile-pinned copy instead of installing the front-end toolchain.
COPY --from=build /app/node_modules/nodemailer ./node_modules/nodemailer
COPY server/index.mjs ./server/index.mjs
COPY server/lib ./server/lib
COPY --from=build /app/dist ./dist
RUN mkdir -p /data && chown node:node /data
USER node
VOLUME ["/data"]
EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server/index.mjs"]
