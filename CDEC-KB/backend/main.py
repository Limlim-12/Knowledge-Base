from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Base, StatusDefinition, Article, ModuleType
from pydantic import BaseModel

# !!! KEEP YOUR PASSWORD HERE !!!
DATABASE_URL = "postgresql://postgres:Iloveyeryer143!@localhost/cdec_kb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

app = FastAPI()

# --- 1. ENABLE CORS (Allow Frontend to talk to Backend) ---
origins = [
    "http://localhost:3000",  # Your Next.js Frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Pydantic Models (Data Validation) ---
class StatusCreate(BaseModel):
    status_name: str
    module: str
    description: str
    owner_role: str
    # New Fields
    trigger_conditions: str = ""
    required_checks: str = ""
    next_actions: str = ""


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"message": "CDEC System Online"}


# --- STATUS ENDPOINTS ---


@app.get("/status-definitions/")
def get_all_statuses(db: Session = Depends(get_db)):
    return db.query(StatusDefinition).all()


@app.post("/status-definitions/")
def create_status(status: StatusCreate, db: Session = Depends(get_db)):
    try:
        module_enum = ModuleType(status.module.lower())
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Module Type")

    new_status = StatusDefinition(
        status_name=status.status_name,
        module=module_enum,
        description=status.description,
        owner_role=status.owner_role,
        # Save the new fields
        trigger_conditions=status.trigger_conditions,
        required_checks=status.required_checks,
        next_actions=status.next_actions,
    )
    db.add(new_status)
    db.commit()
    return {"message": "Status Created Successfully"}


# --- ARTICLE ENDPOINTS (New) ---


class ArticleCreate(BaseModel):
    title: str
    content: str  # This will hold the detailed error fix or SOP
    category_id: int = 1  # Default category for now
    status: str = "published"


@app.get("/articles/")
def get_all_articles(db: Session = Depends(get_db)):
    # Fetch all articles, newest first
    return db.query(Article).order_by(Article.created_at.desc()).all()


@app.post("/articles/")
def create_article(article: ArticleCreate, db: Session = Depends(get_db)):
    new_article = Article(
        title=article.title,
        content=article.content,
        # We can expand categories later
    )
    db.add(new_article)
    db.commit()
    return {"message": "Article Created Successfully"}
