from pydantic import BaseModel

class todo(BaseModel):
    id: int
    item: str