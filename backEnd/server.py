import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create a FastAPI instance
app = FastAPI(
    title="AIStore API",
    description="A simple API for the AIStore application",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def index():
   return {"message": "Hello World"}

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
   uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)