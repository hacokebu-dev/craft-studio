

## robots.txt 이미지 차단 해제

### 변경 내용
`public/robots.txt`에서 이미지 파일 차단 규칙 2줄을 제거합니다.

**제거할 줄:**
```
Disallow: /assets/*.jpg$
Disallow: /assets/*.png$
```

이렇게 하면 Googlebot을 포함한 모든 크롤러가 `/assets/` 내 이미지에 접근할 수 있게 되어, Google 이미지 검색 노출과 Search Console 경고 해소가 가능합니다.

