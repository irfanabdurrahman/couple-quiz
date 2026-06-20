FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY questions.js /usr/share/nginx/html/
COPY game.js /usr/share/nginx/html/

# Replace nginx default config to listen on PORT env (Railway sets this)
RUN printf 'server {\n\
    listen $PORT;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    location / { try_files $uri $uri/ =404; }\n\
}\n' > /etc/nginx/conf.d/default.conf

# Remove the default nginx config that listens on port 80
RUN rm -f /etc/nginx/conf.d/default.conf.bak

# Entrypoint: substitute $PORT and start nginx
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
