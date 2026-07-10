FROM node:18-alpine

WORKDIR /app

# Install libc6-compat (needed for compatibility on Alpine)
RUN apk add --no-cache libc6-compat

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

