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
    db.append(task)
    return task

@app.put("/tasks/{task_id}")
def update_task(task_id: int, updated: Task):
    for i, t in enumerate(db):
        if t.id == task_id:
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