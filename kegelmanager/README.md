# Kegelmanager

Ein einfacher Kegelmanager auf Basis von FastAPI (Python) und React (JavaScript), gestartet über Docker.

## Startanleitung

### 1. Frontend vorbereiten
```bash
cd frontend
npm install
npm run build
```

### 2. Mit Docker starten
```bash
docker compose up --build
```

### 3. Aufruf
- API: http://localhost:8000/players/
- Swagger UI: http://localhost:8000/docs