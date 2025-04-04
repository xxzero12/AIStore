import uvicorn
from fastapi import FastAPI

# Create a FastAPI instance
app = FastAPI(
    title="AIStore API",
    description="A simple API for the AIStore application",
    version="0.1.0",
)

@app.get("/")
async def index():
   return {"message": "Hello World"}

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
   uvicorn.run("server:app", host="127.0.0.1", port=8000, reload=True)