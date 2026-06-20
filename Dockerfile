FROM nginx:alpine

# Copy static files to nginx serve directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY questions.js /usr/share/nginx/html/
COPY game.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# nginx serves on port 80 by default
CMD ["nginx", "-g", "daemon off;"]
