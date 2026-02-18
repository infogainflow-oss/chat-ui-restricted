# Use Caddy to serve static files
FROM caddy:alpine

# Copy Caddy config
COPY Caddyfile /etc/caddy/Caddyfile

# Copy static site files
COPY . /srv

EXPOSE 80

