run-backend:
    cd python && uv run python rl_visualizer

generate-client:
    openapi-ts --input http://localhost:8000/openapi.json --output ./src/client --client axios
