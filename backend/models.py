from sqlalchemy import Column, ForeignKey, Integer, String, Text, Table, Float
from sqlalchemy.orm import relationship

from backend.database import Base


resource_filter = Table(
    "resource_filter",
    Base.metadata,
    Column("filter_id", ForeignKey("filter.id"), primary_key=True),
    Column("resource_id", ForeignKey("resource.id"), primary_key=True),
)


class Resource(Base):
    __tablename__ = "resource"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    recommended_for = Column(Text)
    requirements = Column(Text)
    phone_number = Column(String)
    address = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    type_id = Column(Integer, ForeignKey("type.id"))  # Remove if many-to-many
    creator_id = Column(Integer, ForeignKey("user.id"))

    type = relationship("Type", back_populates="resources")  # Remove if many-to-many
    creator = relationship("User", back_populates="resources")
    filters = relationship(
        "Filter", secondary=resource_filter, back_populates="resources"
    )


class Filter(Base):
    __tablename__ = "filter"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    resources = relationship(
        "Resource", secondary=resource_filter, back_populates="filters"
    )


class Type(Base):
    __tablename__ = "type"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

    resources = relationship("Resource", back_populates="type")


# Many-to-many relationship for resources and types?
# class Resource_Type(Base):
#     __tablename__ = "resource_type"
#     type_id = Column(Integer, ForeignKey("type.id"))
#     resource_id = Column(Integer, ForeignKey("resource.id"))

#     type = relationship("Type", back_populates="resource_type")
#     resource = relationship("Resource", back_populates="resource_type")


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True, unique=True)
    password = Column(String)
    first_name = Column(String)
    last_name = Column(String)

    resources = relationship("Resource", back_populates="creator")
