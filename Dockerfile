# Use lightweight nginx to serve static files
FROM nginx:alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy all static site files
COPY . /usr/share/nginx/html/

# Copy custom nginx config (overwrite after the COPY above)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
