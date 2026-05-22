# Stage 1: Build the React Frontend
FROM node:18-alpine as frontend-builder

WORKDIR /app/frontend

# Copy frontend config files
COPY frontend/package*.json ./
COPY frontend/vite.config.js ./
COPY frontend/tailwind.config.js ./
COPY frontend/postcss.config.js ./
COPY frontend/index.html ./

# Install dependencies and build
RUN npm install

# Copy source code
COPY frontend/src/ ./src/

# Build the app
RUN npm run build


# Stage 2: Build the FastAPI Backend and Serve
FROM python:3.10-slim

WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/main.py .
COPY backend/chain.py .

# Copy built frontend assets from Stage 1
COPY --from=frontend-builder /app/frontend/dist /app/dist

# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080

# Run FastAPI via Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
