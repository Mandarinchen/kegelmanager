
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Player

router = APIRouter(prefix="/players", tags=["players"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_players(db: Session = Depends(get_db)):
    return db.query(Player).all()

@router.post("/")
def create_player(player: Player, db: Session = Depends(get_db)):
    db.add(player)
    db.commit()
    db.refresh(player)
    return player

@router.put("/{player_id}")
def update_player(player_id: int, updated: Player, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Spieler nicht gefunden")
    player.name = updated.name
    player.technik = updated.technik
    player.ausdauer = updated.ausdauer
    db.commit()
    return player

@router.delete("/{player_id}")
def delete_player(player_id: int, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Spieler nicht gefunden")
    db.delete(player)
    db.commit()
    return {"ok": True}
