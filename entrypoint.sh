#!/bin/sh
# Substitute PORT env var into nginx config, then start nginx
: ${PORT:=80}

# Generate config with actual PORT value
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen $PORT;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF

echo "Starting nginx on port $PORT..."
exec nginx -g 'daemon off;'
