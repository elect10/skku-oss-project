from fastapi import APIRouter, Request

question_router = APIRouter(
    tags=["Question"],
)

@app.post("/")
def question():
    # 질문 작성
    return {"question"}

@app.get("/{question_id}")
def question_detail(question_id: int):
    # 질문 상세보기
    return {"question_detail"}

@app.delete("/{question_id}")
def question_delete(question_id: int):
    # 질문 삭제
    return {"question_delete"}

@app.post("/{question_id}/answer")
def answer(question_id: int):
    # 답변 작성
    return {"answer"}

@app.delete("/{question_id}/answer/{answer_id}")
def answer_delete(question_id: int, answer_id: int):
    # 답변 삭제
    return {"answer_delete"}

# 추가 구현 사항

# @app.post("/{question_id}/select")
# def question_select(question_id: int):
#     # 질문 채택
#     return {"question_select"}

# @app.post("/{question_id}/like")
# def question_like(question_id: int):
#     # 질문 좋아요
#     return {"question_like"}

# @app.post("/{question_id}/answer/{answer_id}/like")
# def answer_like(question_id: int, answer_id: int):
#     # 답변 좋아요
#     return {"answer_like"}