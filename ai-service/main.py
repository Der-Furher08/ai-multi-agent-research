from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from pipeline import run_research_pipeline
from socket_client import connect_socket


@asynccontextmanager
async def lifespan(app: FastAPI):
    connect_socket()
    yield


app = FastAPI(lifespan=lifespan)


class ResearchRequest(BaseModel):
    topic: str


@app.get("/")
def home():
    return {
        "message": "AI Multi-Agent Research API Running"
    }


@app.post("/research")
def research(request: ResearchRequest):
    try:
        result = run_research_pipeline(request.topic)

        return {
            "success": True,
            "data": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )