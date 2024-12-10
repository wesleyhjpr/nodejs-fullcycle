# Usando a imagem oficial do Node.js
FROM node:16

# Definindo diretório de trabalho
WORKDIR /app

# Copiar o package.json e instalar as dependências
COPY package.json ./
RUN npm install

# Copiar todo o código da aplicação para o contêiner
COPY . .

# Expor a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
