# Home-server backend deployment

This Compose stack runs only the API and Cloudflare Tunnel. MongoDB, Cloudflare R2, and Resend remain external services.

## Server setup

1. Install Docker Engine with the Compose plugin and clone this repository.
2. Check out `home-server-backend`.
3. Copy `backend/.env.example` to a private file on the server, such as `/opt/pachingo/backend.env`, and populate it with the current production values. Keep `BETTER_AUTH_URL` and `BETTER_AUTH_DOMAIN` unchanged.
4. Copy `.env.example` to the repository root as `.env`. Set `TUNNEL_TOKEN` to the token Cloudflare supplied for `pachingo-home`, then set `BACKEND_ENV_FILE=/opt/pachingo/backend.env`.
5. Start the stack:

   ```sh
   docker compose up -d --build
   ```

The API has no published host port. Cloudflare Tunnel is its only production ingress.

## Verify before cutover

1. In Cloudflare, create the temporary published route `api-home.playpachingo.com` to `http://api:9000`.
2. Wait for the `pachingo-home` tunnel to become **Healthy**.
3. Run `curl -i https://api-home.playpachingo.com/healthz`; it should return `204 No Content`.
4. Check `docker compose logs api cloudflared` for MongoDB, R2, or Resend errors.

## Cut over and update

Once the temporary hostname is healthy, replace the existing `api.playpachingo.com` DNS/route with a published route to `http://api:9000`. The frontend stays configured for the same API hostname.

For later deployments:

```sh
git pull --ff-only
docker compose up -d --build
```
