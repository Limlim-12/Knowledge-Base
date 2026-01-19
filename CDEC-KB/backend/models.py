from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

Base = declarative_base()


# Enums help keep data clean
class ModuleType(enum.Enum):
    MANIFEST = "manifest"
    CUSDEC = "cusdec"
    PAYMENT = "payment"
    RELEASE = "release"


class StatusDefinition(Base):
    __tablename__ = "status_definitions"

    id = Column(Integer, primary_key=True, index=True)
    status_name = Column(String(100), nullable=False)  # e.g., "CLEARED"
    module = Column(Enum(ModuleType), nullable=False)  # e.g., "CUSDEC"
    description = Column(Text)

    # The "Knowledge" part
    trigger_conditions = Column(Text)
    required_checks = Column(Text)
    next_actions = Column(Text)
    owner_role = Column(String(50))


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
