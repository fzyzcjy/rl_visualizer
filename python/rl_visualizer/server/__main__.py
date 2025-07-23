from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import sample, step
from .data_source import DataSource

app = FastAPI(title="RL Visualizer", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sample.router)
app.include_router(step.router)

@app.on_event("startup")
def startup_event():
    app.state.data_source = DataSource()

@app.get("/")
async def root():
    return {"message": "Hello!"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
