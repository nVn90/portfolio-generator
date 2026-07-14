FROM node:18-alpine

WORKDIR /app

# Install libc6-compat (needed for compatibility on Alpine)
RUN apk add --no-cache libc6-compat

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the application source code
COPY . .

# Build arguments (injected at build time via --build-arg)
ARG GROQ_API_KEY

# Make them available as environment variables at runtime
ENV GROQ_API_KEY=$GROQ_API_KEY

# Build the Next.js application
RUN npm run build

# Expose port 8005
EXPOSE 8005

# Start the application
CMD ["npm", "start"]

