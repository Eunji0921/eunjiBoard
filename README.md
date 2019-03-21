## 개요

> 지역구 지도 대시보드

## 빌드

``` bash
#노드모듈설치
npm install
#개발용 웹서버 빌드
npm run dev
#배포용 빌드
npm run build
```

## 공통 javascript 호출 방법
```javascript
//test.js
export function funcName (param) {
    console.log('함수');
}

//use.js
import importName as './common/test.js'
importName.funcName(param)
```

## 상대경로 대신 지정한 alias 목록

- 'Styles' 경로: ./src/assets/styles
- 'Images' 경로: ./src/assets/images
- 'Component' 경로: ./src/Component
- 'Config' 경로: ./src/config
- 'Util' 경로: ./src/util

## style 태그 안에서 css 호출 방법
```css
@import '~Assets/styles/header.css';
```

## package.json 모듈 등록시 주의사항
- dependencies(배포용) : 런타임 및 배포환경에 필요한 모듈
- devDependencies(개발용) : 개발 환경에 필요한 모듈
* 빌드시 용량에 영향을 줄 수 있으므로 주의하여야 한다.