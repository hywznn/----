# Dockerfile for backend
FROM python:3.8-slim

WORKDIR /app

# 먼저 requirements.txt를 복사
COPY requirements.txt .

# 의존성 설치
RUN pip install -r requirements.txt

# 나머지 파일 복사
COPY . .

# 애플리케이션 실행
EXPOSE 80
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
