# Use official Node.js image base: Starts from a Node 18 environment
FROM node:18

# Set working directory inside container: Everything will now happen inside /app folder in the container
WORKDIR /app

# Copy package.json and package-lock.json: Only copies package files first (to leverage cachine)
COPY package*.json ./

# Install dependencies: Installs dependencies in the container
RUN npm install

# Copy the rest of your code: Copies your entire project into /app
COPY . .

# Expose the port your app runs on: Tells docker this app runs on port 5000
EXPOSE 5000

# Start the app: Tells docker how to start your app - in this case npm run dev
CMD ["npm", "run", "dev"]