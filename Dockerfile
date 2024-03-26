# Define a imagem base usando a versão oficial do Node.js. Escolha a tag específica conforme necessário.
FROM node:21

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o arquivo package.json (e package-lock.json, se disponível) para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto. Note que não é necessário instalar globalmente as dependências de desenvolvimento como nodemon para a execução.
RUN npm install

# Se você estiver construindo seu código para produção, use:
# RUN npm ci --only=production

# Copia os arquivos e diretórios restantes para o diretório de trabalho no container
COPY . .

# Expõe a porta que sua aplicação utiliza. Substitua 3000 pela porta que sua aplicação escuta.
EXPOSE 3000

# Define o comando para executar sua aplicação. 
CMD [ "npm", "run", "dev" ]