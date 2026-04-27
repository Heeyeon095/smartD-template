# HTML WYSIWYG Editor 퍼블리싱 가이드 (v2.0 Full Version)

## 1. 문서 정보

- 문서명: html_editor_publish_guide_v2.0.md
- 버전: v2.0
- 목적: 퍼블리셔가 HTML WYSIWYG Editor v2.0과 완전 호환되는 템플릿을 제작할 수 있도록 전체 규칙 제공.

---

# 2. 기본 원칙

1. 템플릿은 **header / content / footer** 구조를 **반드시** 갖춰야 한다.
2. 레이아웃 구조는 `id` 기반으로 통일한다.
3. 편집 가능한 요소는 반드시 `data-editable` 속성을 갖는다.
4. Undo/Redo 안정성을 위해 모든 편집 가능한 요소는 `data-uid`를 갖는다.
5. 특정 속성에 대해 `!important` 사용을 금지한다.
6. FIXATION 이미지는 교체 불가 이미지이다.
7. 템플릿 내 모든 페이지는 HtmlTemplateJson 구조를 따른다.

---

# 3. 레이아웃 구조 규칙 (필수)

## 3.1 기본 구조

```html
<body>
  <header id="layout-header">...</header>
  <main id="layout-content">...</main>
  <footer id="layout-footer">...</footer>
</body>
```

## 3.2 규칙

- 세 영역은 반드시 `<body>` 직계 자식이어야 한다.
- header는 **편집 불가 영역**.
- content / footer는 **편집 가능 영역**.
- id 값 변경 불가.

## 3.3 폴더 구조 (배포 패키지)

```
template-root/
├─ css/      # 공통 스타일 파일
├─ js/       # 공통 스크립트 파일
├─ images/   # 이미지 자산
├─ index.html  # 메인 페이지 (파일명 고정)
└─ sub01.html  # 서브 페이지 예시 (파일명 자유)
```

- 폴더/파일 이름은 소문자와 하이픈을 권장한다.
- `index.html`은 반드시 포함되어야 하며, 추가 페이지는 원하는 이름으로 자유롭게 늘릴 수 있다.
- 배포 시에는 위 구조를 그대로 유지한 채 `template-root` 폴더를 포함하여 ZIP으로 압축한다. (압축 해제 시 `template-root`가 최상단에 나타나야 함)

---

# 4. 편집 가능 요소 규칙

## 4.1 data-editable

| 값    | 설명                      |
| ----- | ------------------------- |
| text  | 텍스트 수정 가능          |
| image | 이미지 교체/alt 수정 가능 |
| false | 편집 불가능               |

예시:

```html
<h1 data-editable="text">상품 제목</h1>
<img data-editable="image" src="hero.jpg" alt="대표 이미지" />
<p data-editable="false">이 텍스트는 고정됨</p>
```

---

# 5. data-uid 규칙 (필수)

## 5.1 목적

Undo/Redo의 대상 요소를 절대적으로 식별하기 위함.

## 5.2 규칙

형식:

```
{pageId}-{영역}-{타입}-{번호}
```

### 영역

- hd: header
- ct: content
- ft: footer

### 타입

- txt: 텍스트
- img: 이미지
- btn: 버튼 등

### 예시

```html
<p data-editable="text" data-uid="home-ct-txt-1">소개 문구</p>
<img data-editable="image" data-uid="home-ct-img-2" src="..." alt="..." />
```

## 5.3 제약

- 템플릿 전체에서 data-uid 중복 불가
- 길이 5~50자
- 영문소문자/숫자/하이픈만 사용

---

# 6. 이미지 규칙

## 6.1 교체 가능 이미지

```html
<img data-editable="image" data-uid="home-ct-img-3" src="..." alt="..." />
```

## 6.2 FIXATION 이미지

교체 불가 이미지:

```html
<img data-object="FIXATION" src="logo.png" alt="브랜드 로고" />
```

## 6.3 alt 속성

- alt는 무조건 존재해야 함
- 너무 길거나 공백만 존재하면 안 됨
- 에디터에서 수정 가능

---

# 7. CSS 가이드라인

## 7.1 편집 대상 속성에 대한 !important 금지

아래 속성에는 절대 `!important` 사용 금지:

- font-weight
- font-style
- text-decoration
- font-size
- font-family
- color
- background-color

에디터가 inline-style로 스타일을 적용하기 때문.

## 7.2 레이아웃 관련 스타일

- 레이아웃(css grid, margin/padding 등)은 외부 CSS에서 관리
- content 내부 텍스트 스타일은 에디터가 적용하므로 외부 CSS 최소화

---

# 8. 멀티 페이지 템플릿 규칙

## 8.1 pages 배열 규칙

```json
{
  "pages": [
    { "pageId": "home", "fileName": "index.html", ... },
    { "pageId": "detail", "fileName": "detail.html", ... }
  ]
}
```

## 8.2 pageId 접두어 규칙

각 페이지 data-uid는 반드시 pageId를 포함해야 함.

```
home-ct-txt-1
detail-ct-img-2
```

---

# 9. 템플릿 작성 예시

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>상품 소개</title>
    <link rel="stylesheet" href="{{ASSET_CSS}}/layout.css" />
  </head>

  <body>
    <header id="layout-header">
      <img data-object="FIXATION" src="/images/logo.png" alt="브랜드 로고" />
    </header>

    <main id="layout-content">
      <h1 data-editable="text" data-uid="home-ct-txt-1">상품 소개</h1>

      <img data-editable="image" data-uid="home-ct-img-1" src="/images/hero.jpg" alt="메인 이미지" />

      <p data-editable="text" data-uid="home-ct-txt-2">상품 설명 문구입니다.</p>
    </main>

    <footer id="layout-footer">
      <p data-editable="text" data-uid="home-ft-txt-1">© 2025 회사명</p>
    </footer>
  </body>
</html>
```

---

# 10. 퍼블리셔 체크리스트 (v2.0)

## 10.1 레이아웃

- [ ] layout-header/content/footer 구조를 사용했는가?
- [ ] 세 영역이 body의 직계 자식인가?

## 10.2 data-editable

- [ ] text/image 요소에 data-editable이 있는가?
- [ ] editable="false"인 요소가 명확한가?

## 10.3 data-uid

- [ ] 중복이 없는가?
- [ ] pageId-영역-타입-번호 형식을 따르는가?
- [ ] 멀티페이지에서 pageId 접두어를 사용했는가?

## 10.4 이미지

- [ ] 교체 가능 이미지는 data-editable="image"인가?
- [ ] FIXATION 이미지는 data-object="FIXATION"인가?
- [ ] alt가 문맥에 맞는가?

## 10.5 CSS

- [ ] 편집 대상 속성에서 !important를 사용하지 않았는가?
- [ ] 레이아웃 스타일은 외부 CSS에서 관리했는가?

---

# 11. 결론

본 문서는 HTML Template이 Editor v2.0과 완전 호환되도록 보장하기 위한 **최종 퍼블리싱 가이드**이다.
퍼블리셔는 본 문서의 규칙을 반드시 준수해야 하며, 준수하지 않을 경우 편집 기능이 정상 작동하지 않는다.
