from fastapi import FastAPI
from routes.auth import auth_router
from routes.question import question_router


app = FastAPI()

app.include_router(auth_router, prefix="/auth")
app.include_router(question_router, prefix="/question")

@app.get("/")
def root():
    # 메인 페이지를 보여준다. (질문 리스트)
    return {"root"}
