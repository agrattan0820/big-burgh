from sqlalchemy.orm import Session
from backend import models, schemas
import bcrypt


# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()


# def get_users(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.User).offset(skip).limit(limit).all()


# def create_user(db: Session, user: schemas.UserCreate):
#     fake_hashed_password = user.password + "notReallyHashed"
#     db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user


# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Item).offset(skip).limit(limit).all()


# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item


# New Queries


def get_resource(db: Session, resource_id: int):
    return db.query(models.Resource).filter(models.Resource.id == resource_id).first()


def get_resources(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Resource).offset(skip).limit(limit).all()


def create_resource(
    db: Session, resource: schemas.Resource, type_id: int, user_id: int
):
    db_resource = models.Resource(
        **resource.dict(),
        type_id=type_id,
        creator_id=user_id,
    )
    db.add(db_resource)
    db.commit()
    db.refresh(db_resource)
    return db_resource


def get_resources_by_type(db: Session, type_id: int):
    return db.query(models.Resource).filter(models.Resource.type_id == type_id)


def get_resources_by_user(db: Session, user_id: int):
    return db.query(models.Resource).filter(models.Resource.user_id == user_id)


def get_type(db: Session, type_id: int):
    return db.query(models.Type).filter(models.Type.id == type_id)


def create_type(db: Session, type: schemas.Type):
    db_type = models.Type(
        **type.dict(),
    )
    db.add(db_type)
    db.commit()
    db.refresh(db_type)
    return db_type


def get_filter(db: Session, filter_id: int):
    return db.query(models.Filter).filter(models.Filter.id == filter_id)


def create_filter(db: Session, filter: schemas.Filter):
    db_filter = models.Filter(
        **filter.dict(),
    )
    db.add(db_filter)
    db.commit()
    db.refresh(db_filter)
    return db_filter


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id)


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user_by_email(db: Session, email: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    return user


def create_user(db: Session, user: schemas.User):
    hashed_passowrd = bcrypt.hashpw(user.password, bcrypt.gensalt())
    db_user = models.User(
        email=user.email,
        password=hashed_passowrd,
        first_name=user.first_name,
        last_name=user.last_name,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    print("db_user", db_user)
    return db_user
