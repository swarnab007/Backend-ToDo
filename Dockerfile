FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Copy the application code
COPY . .

# Install the application dependencies
RUN npm install

# Set the application entrypoint
ENTRYPOINT [ "node", "server.js" ]