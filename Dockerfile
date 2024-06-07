# 베이스 이미지로 python:3.8-slim 사용
FROM python:3.8-slim

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일을 복사
COPY requirements.txt .

# 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 파일을 복사
COPY . .

# 애플리케이션 실행에 필요한 포트 노출
EXPOSE 80

# 애플리케이션 실행 명령어
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
