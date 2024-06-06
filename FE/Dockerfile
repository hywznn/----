# Dockerfile for frontend using NGINX
FROM nginx:alpine

# NGINX 기본 설정 파일 삭제
RUN rm -rf /usr/share/nginx/html/*

# 현재 디렉토리의 모든 파일을 NGINX 웹 루트로 복사
COPY . /usr/share/nginx/html

# NGINX가 포트를 노출하도록 설정
EXPOSE 80

# NGINX가 포그라운드에서 실행되도록 설정
CMD ["nginx", "-g", "daemon off;"]
