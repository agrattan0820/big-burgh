from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from backend import crud, models, schemas
from backend.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    if not users:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(status_code=404, detail=f"Users could not be retrieved")
    return users


@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.User, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    print("db_user", db_user)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    result = crud.create_user(db=db, user=user)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(status_code=404, detail=f"User could not be created")
    return result


@app.get("/resources/", response_model=List[schemas.Resource])
def read_resources(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    resources = crud.get_resources(db, skip=skip, limit=limit)
    if not resources:
        raise HTTPException(status_code=404, detail=f"Resources could not be retrieved")
    return resources
