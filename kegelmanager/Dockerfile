# Build React
FROM node:18 AS frontend-builder
WORKDIR /app
COPY frontend/ .
RUN npm install && npm run build

# Build Python backend
FROM python:3.10-slim as backend
WORKDIR /app
COPY backend/ ./backend
COPY --from=frontend-builder /app/build ./frontend_build
RUN pip install --no-cache-dir -r backend/requirements.txt

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]