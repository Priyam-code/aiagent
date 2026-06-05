from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from pipeline import run_research_pipeline

app = FastAPI(title="ResearchCo Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # simpler during dev — "http://localhost:5173" for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchRequest(BaseModel):
    topic: str

@app.post("/api/research")
def research(request: ResearchRequest):
    # Run your real 4-agent Python pipeline
    result = run_research_pipeline(request.topic)

    return {
        "topic": request.topic,
        "search_results": result.get("search_results", ""),
        "scraped_content": result.get("scraped_content", ""),
        "report": result.get("report", ""),
        "feedback": result.get("feedback", ""),
    }