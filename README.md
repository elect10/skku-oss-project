## skku-oss-project
2024 1학기 오픈소스소프트웨어 실습 개인 프로젝트

### 구현 목표
질문을 남기고 각 질문에 대한 답변을 남긴 뒤 조회가 가능하도록 구성한 웹사이트입니다.

### 구현 기능
- 회원가입 및 로그인 기능 구현
- 질문 생성 및 답변 기능 구현
- 전체 질문 조회 기능 구현
- 특정 질문과 그에 대한 답변 조회 기능 구현

### Reference
- [Express](https://github.com/expressjs/express)
- [EJS](https://github.com/mde/ejs)

### 지원 os
|os|지원 여부|
|--|--|
|window|⭕️|
|Mac|⭕️|
|Linux|⭕️|
### 실행 방법
- Node 설치
  
  `node v22.2.0` 설치
- MySQL 설치

  [Window](https://goddaehee.tistory.com/277) / [Mac](https://velog.io/@mingle_1017/Mysql-%EC%84%A4%EC%B9%98-%EB%B0%8F-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0%EB%A7%A5%EB%B6%81-%EB%B2%84%EC%A0%84) / [Linux](https://velog.io/@hyeri_hello/%EB%A6%AC%EB%88%85%EC%8A%A4-MySQL-%EC%84%A4%EC%B9%98)
- 데이터베이스 구조

  [ERD 참고](https://www.erdcloud.com/d/xuyeHLXoAHH9Tcb34)

- 프로젝트 세팅 및 실행

  프로젝트 루트 디렉토리 이동

  **필요 패키지 설치 (최초 1회)**
  ```bash
  npm install
  ```
  **프로젝트 루트 디렉토리에 `.env` 파일 생성**

  예시 형태
  ```env
  DB_HOST=localhost
  DB_USER=본인이 설정한 DB 사용자명
  DB_PASS=본인이 설정한 비밀번호
  DB_NAME=본인이 설정한 DB 이름
  ```
  **프로젝트 실행**
  ```bash
  npm start
  ```
  localhost:3000 에서 서버 실행
### 실행 예시
https://github.com/yaongmeow/skku-oss-project/assets/138637345/83f9808a-5f7d-42a6-bf51-8fa326ce0014
### 코드 설명
#### app.js
서버 구동
#### middleware.js
미들웨어 함수 모음 (현재는 로그인 확인용 함수만 존재)
#### utils.js
기타 유용한 함수 모음 (현재는 솔트 생성용 함수만 존재)
#### routes
각 URI에 해당하는 라우터 모음
#### views
템플릿 엔진 ejs 파일 모음
### 권장 Todo
- [ ] 질문글 시간순 정렬
- [ ] 질문글 페이지네이션
- [ ] 질문과 답변 수정 및 삭제
- [ ] 질문과 답변 일자 표시
- [ ] 질문자와 답변자 닉네임 표시
- [ ] 나의 질문 모아보기

---
### phase 2 수정사항

TABLE.sql 생성 및 연결 필요
.env 파일 생성
question 의 TABLE 에는 존재하지만 question.js 에서 인자로 date 를 받지 않아 에러가 나는 부분 fix
내 질문 필터링 기능
내 질문 필터링시 다시 모든 질문 로딩 기능
질문 박스 시간별 정렬
답변시 작성자, 익명의 답변자 구분
로그인 실패시 서버 죽는 문제 해결

