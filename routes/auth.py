from fastapi import APIRouter, Request

auth_router = APIRouter(
    tags=["Auth"],
)

@app.post("/signup")
def signup():
    # 자체 회원가입 서비스
    return {"signup"}

@app.post("/login")
def login():
    # 자체 로그인 서비스
    return {"login"}

# 추가 구현 사항

# @app.post("/login/github")
# def login_github():
#     # 깃허브 로그인 서비스
#     return {"login_github"}