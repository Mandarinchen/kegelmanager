from pydantic import BaseModel

class PlayerSchema(BaseModel):
    id: int
    name: str
    average_score: float

    class Config:
        orm_mode = True