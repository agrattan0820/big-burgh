from typing import Union

from pydantic import BaseModel


class Type(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class Filter(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class User(BaseModel):
    id: int
    email: str
    password: str
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class Resource(BaseModel):
    id: int
    name: str
    description: Union[str, None] = None
    recommended_for: Union[str, None] = None
    requirements: Union[str, None] = None
    phone_number: Union[str, None] = None
    location: Union[str, None] = None
    type_id: int
    creator_id: int
    type: Type
    creator: User

    class Config:
        orm_mode = True
