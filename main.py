from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from entry import entry_router  # Import the entry router

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def welcome() -> dict:
    return {
        "msg": "hello world?"
    }

# Include the entry router
app.include_router(entry_router)

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=80, reload=True)
