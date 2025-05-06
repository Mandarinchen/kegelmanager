from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, schemas, database

models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/players/", response_model=list[schemas.PlayerSchema])
def read_players(db: Session = Depends(get_db)):
    return db.query(models.Player).all()