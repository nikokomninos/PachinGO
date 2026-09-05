FROM node:22-bookworm-slim AS build

WORKDIR /app
RUN npm install --global pnpm@11.9.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:22-bookworm-slim

WORKDIR /app
ENV NODE_ENV=production \
    PORT=9000 \
    PYTHON_PATH=/opt/venv/bin/python \
    SCRIPT_PATH=/app/scripts

RUN apt-get update \
    && apt-get install --no-install-recommends -y python3 python3-venv \
    && rm -rf /var/lib/apt/lists/* \
    && python3 -m venv /opt/venv

COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
RUN npm install --global pnpm@11.9.0 \
    && pnpm install --prod --frozen-lockfile \
    && pnpm store prune

COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/scripts ./scripts
COPY --from=build /app/scripts/requirements.txt /tmp/requirements.txt
RUN /opt/venv/bin/pip install --no-cache-dir -r /tmp/requirements.txt

USER node
EXPOSE 9000
CMD ["node", "dist/app.js"]
