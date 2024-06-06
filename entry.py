from fastapi import APIRouter, Path, HTTPException
from model import Entry

entry_router = APIRouter()

entries = []
entry_counter = 0

@entry_router.post("/entries")
async def add_entry(entry: Entry) -> dict:
    global entry_counter
    entry.id = entry_counter = entry_counter + 1
    entries.append(entry)
    return {
        "msg": "Entry added successfully"
    }

@entry_router.get("/entries")
async def get_entries() -> dict:
    return {
        "entries": entries
    }

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
