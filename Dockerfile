FROM ubuntu:22.04

WORKDIR /app

# Update package list
RUN apt update

# Install curl and rsync
RUN apt install -y -q curl
RUN apt install -y -q rsync

# Install net-tools
RUN apt install net-tools

# Install curl, gnupg, Node.js and npm
RUN apt-get update && \
    apt-get install -y curl gnupg && \
    mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm
RUN npm install -g npm-check-updates

COPY . .

RUN pnpm install -q

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]