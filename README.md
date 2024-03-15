# TODO List API Server
* GitHub URL: (https://github.com/uzoolove/todoapi)

## Github 레퍼지토리 복사
* VSCode의 File > New Window > View > Source Control > Clone Repository 선택
* <nohyper>https</nohyper>://github.com/uzoolove/todoapi.git 입력
* 복사할 적당한 폴더 선택 후 Select as Repository Destination 선택
* Open 선택

## 프로젝트 구조
* API 서버: node.js의 express 기반으로 개발
* DB: lowdb(JSON 파일 기반 로컬 DB. 따로 설치할 필요 없이 프로젝트에 내장되어 있음)

## api 서버 구동
* 프로젝트 루트에서 실행
```
cd api
npm i
npm run dev
```

## api 문서 확인
* http://localhost:33020/apidocs
