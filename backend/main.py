from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    id: int
    title: str
    done: bool = False
    note: str | None = None
    created_at: datetime = datetime.now()
    category_id: int | None = None

db: list[Task] = []

@app.get("/tasks")
def list_tasks():
    return db

@app.get("/tasks/{task_id}")
def get_task(task_id: int):
    for task in db:
        if task.id == task_id:
            return task
    raise HTTPException(404, "Task not found")

@app.post("/tasks", status_code=201)
def create_task(task: Task):
    if any(t.id == task.id for t in db):
        raise HTTPException(400, "ID already exists")
    
    if task.category_id is not None and not any(c.id == task.category_id for c in db_categories):
        raise HTTPException(400, "Category does not exist")
    
    db.append(task)
    return task

@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated: Task):
    for i, t in enumerate(db):
        if t.id == task_id:
            if updated.category_id is not None and not any(c.id == updated.category_id for c in db_categories):
                raise HTTPException(400, "Category does not exist")

            db[i] = updated
            return updated
    raise HTTPException(404, "Task not found")

@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    global db
    before = len(db)
    db = [t for t in db if t.id != task_id]
    if len(db) == before:
        raise HTTPException(404, "Task not found")
    

class Category(BaseModel):
    id: int
    name: str
    color: str | None = None
    created_at: datetime = datetime.now()

db_categories: list[Category] = []

@app.get("/categories")
def list_categories():
    return db_categories

@app.get("/categories/{category_id}")
def get_category(category_id: int):
    for cat in db_categories:
        if cat.id == category_id:
            return cat
    raise HTTPException(404, "Category not found")

@app.post("/categories", status_code=201)
def create_category(category: Category):
    if any(c.id == category.id for c in db_categories):
        raise HTTPException(400, "ID already exists")
    db_categories.append(category)
    return category

@app.put("/categories/{category_id}")
def update_category(category_id: int, updated: Category):
    for i, c in enumerate(db_categories):
        if c.id == category_id:
            db_categories[i] = updated
            return updated
    raise HTTPException(404, "Category not found")

@app.delete("/categories/{category_id}", status_code=204)
def delete_category(category_id: int):
    global db_categories
    before = len(db_categories)
    db_categories = [c for c in db_categories if c.id != category_id]
    if len(db_categories) == before:
        raise HTTPException(404, "Category not found")

@app.get("/categories/{category_id}/tasks")
def get_tasks_by_category(category_id: int):
    if not any(c.id == category_id for c in db_categories):
        raise HTTPException(404, "Category not found")
    return [t for t in db if t.category_id == category_id]