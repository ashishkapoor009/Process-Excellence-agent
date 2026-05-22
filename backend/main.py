from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

from chain import get_process_excellence_chain

app = FastAPI(title="Process Excellence Copilot API")

# Allow CORS for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    process_name: str
    workflow_steps: str
    pain_points: str
    target_goal: str

@app.post("/api/analyze")
async def analyze_process(req: AnalyzeRequest):
    try:
        chain = get_process_excellence_chain()
        result = chain.invoke({
            "process_name": req.process_name,
            "workflow_steps": req.workflow_steps,
            "pain_points": req.pain_points,
            "target_goal": req.target_goal,
        })
        return result.model_dump()
    except Exception as e:
        print(f"Error during chain invoke: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Serve React frontend in production
frontend_dist = os.path.join(os.path.dirname(__file__), "dist")
if os.path.exists(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        return FileResponse(os.path.join(frontend_dist, "index.html"))
