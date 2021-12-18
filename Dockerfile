# Get node to build
FROM node:16.13.1-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

# Build vue
RUN [ "yarn", "build" ]

# Get nginx to serve
FROM nginxinc/nginx-unprivileged:stable

# Set up nginx conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy dist to default location for nginxinc/nginx-unprivileged
COPY --from=builder /app/build /usr/share/nginx/html

# Open port
EXPOSE 8080

#Start
CMD ["nginx", "-g", "daemon off;"]