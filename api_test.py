# basic API with a single route

from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
def read_root():
    return {"message": "Hello, world!"}