from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pipeline import run_research_pipeline

app = FastAPI()

class ResearchRequest(BaseModel):
    topic: str

@app.get("/")
def home():
    return {"message": "AI Multi-Agent Research API Running"}

@app.post("/research")
def research(request: ResearchRequest):
    try:
        result = run_research_pipeline(request.topic)

        return {
            "success": True,
            "data": result
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))