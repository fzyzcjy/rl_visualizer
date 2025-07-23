run-backend:
    cd python && uv run uvicorn rl_visualizer.server:app --reload

generate-client:
    openapi-ts --input http://localhost:8000/openapi.json --output ./src/client --client axios
