from pydantic import BaseModel

class Entry(BaseModel):
    id: int
    nickname: str
    message: str
    date: str
    time: str
