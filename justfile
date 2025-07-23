run-backend:
    cd python && uv run python -m rl_visualizer.server

generate-client:
    openapi-ts --input http://localhost:8000/openapi.json --output ./src/client --client axios
