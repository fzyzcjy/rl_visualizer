run-backend:
    cd python && uv run uvicorn rl_visualizer.server.main:app --reload

run-frontend:
    cd frontend && PORT=3001 npm run dev

generate-client:
    openapi-ts --input http://localhost:8000/openapi.json --output TODO --client axios
