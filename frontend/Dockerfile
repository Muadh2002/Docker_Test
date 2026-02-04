# Use Node.js official image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all frontend files
COPY . .

# Set environment variable for API URL
# Can be overridden at runtime
ENV REACT_APP_API_URL=http://localhost:30800/api

# Expose port 3000
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
