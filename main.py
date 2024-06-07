from fastapi import FastAPI, APIRouter, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from typing import List

class Entry(BaseModel):
    id: int
    nickname: str
    message: str
    date: str
    time: str

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

entry_router = APIRouter()

entries: List[Entry] = []
entry_counter = 0

@entry_router.post("/entries")
async def add_entry(entry: Entry) -> dict:
    global entry_counter
    entry.id = entry_counter = entry_counter + 1
    entries.append(entry)
    return {"msg": "Entry added successfully"}

@entry_router.get("/entries")
async def get_entries() -> dict:
    return {"entries": entries}

@entry_router.get("/entries/{entry_id}")
async def get_single_entry(entry_id: int = Path(..., title="ID")) -> dict:
    for entry in entries:
        if entry.id == entry_id:
            return {"entry": entry}
    raise HTTPException(status_code=404, detail="Entry with supplied ID doesn't exist")

@entry_router.delete("/entries/{entry_id}")
async def delete_entry(entry_id: int = Path(..., title="The ID of the entry to delete")) -> dict:
    for index, entry in enumerate(entries):
        if entry.id == entry_id:
            del entries[index]
            return {"msg": f"Entry with ID {entry_id} deleted successfully"}
    raise HTTPException(status_code=404, detail="Entry with supplied ID doesn't exist")

app.include_router(entry_router)

@app.get("/")
async def welcome() -> dict:
    return {"msg": "hello world?"}

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
