from fastapi import FastAPI

@app.get("/")
def root():
    # 메인 페이지를 보여준다. (질문 리스트)
    return {"root"}

@app.post("/auth/signup")
def signup():
    # 자체 회원가입 서비스
    return {"signup"}

@app.post("/auth/login")
def login():
    # 자체 로그인 서비스
    return {"login"}

@app.post("/question")
def question():
    # 질문 작성
    return {"question"}

@app.get("/question/{question_id}")
def question_detail(question_id: int):
    # 질문 상세보기
    return {"question_detail"}

@app.delete("/question/{question_id}")
def question_delete(question_id: int):
    # 질문 삭제
    return {"question_delete"}

@app.post("/question/{question_id}/answer")
def answer(question_id: int):
    # 답변 작성
    return {"answer"}

@app.delete("/question/{question_id}/answer/{answer_id}")
def answer_delete(question_id: int, answer_id: int):
    # 답변 삭제
    return {"answer_delete"}

# 추가 구현 사항

# @app.post("/auth/login/github")
# def login_github():
#     # 깃허브 로그인 서비스
#     return {"login_github"}

# @app.post("/question/{question_id}/select")
# def question_select(question_id: int):
#     # 질문 채택
#     return {"question_select"}

# @app.post("/question/{question_id}/like")
# def question_like(question_id: int):
#     # 질문 좋아요
#     return {"question_like"}

# @app.post("/question/{question_id}/answer/{answer_id}/like")
# def answer_like(question_id: int, answer_id: int):
#     # 답변 좋아요
#     return {"answer_like"}



