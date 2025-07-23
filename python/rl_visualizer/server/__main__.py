from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RL Visualizer", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(questions.router)
app.include_router(benchmarks.router)
app.include_router(leaderboard.router)


@app.get("/")
async def root():
    return {"message": "Hello!"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
