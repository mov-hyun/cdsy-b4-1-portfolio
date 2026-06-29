# codyssey-b4-1-portfolio

순수 HTML/CSS/JavaScript로 구현한 반응형 포트폴리오 웹사이트입니다. GitHub API 연동, 다크 모드, 폼 검증, 스크롤 인터랙션을 포함합니다.

## 배포 URL

- GitHub Pages: https://mov-hyun.github.io/codyssey-b4-1-portfolio/
- GitHub 저장소: https://github.com/mov-hyun/codyssey-b4-1-portfolio

## 사용 기술

- HTML: 시맨틱 태그, 앵커 네비게이션, 접근성 속성, 폼 label 연결
- CSS: CSS 변수, Flexbox, Grid, 모바일 퍼스트 반응형 디자인
- JavaScript: DOM 조작, 이벤트 처리, localStorage, Intersection Observer, fetch, async/await
- API: GitHub REST API `https://api.github.com/users/mov-hyun/repos`

## 폴더 구조

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── profile.svg
└── README.md
```

## 구현 기능

- Hero, About, Skills, Projects, Contact, Footer 섹션을 구성했습니다.
- 모바일에서 햄버거 버튼으로 네비게이션 메뉴를 열고 닫습니다.
- 메뉴 클릭 시 각 섹션으로 부드럽게 이동합니다.
- 스크롤 60px 이후 헤더 배경과 그림자를 변경합니다.
- 스크롤 300px 이후 Top 버튼을 표시하고, 클릭 시 페이지 맨 위로 이동합니다.
- 다크 모드 설정을 `localStorage`에 저장하고 새로고침 후에도 유지합니다.
- Intersection Observer의 `threshold: 0.25`로 섹션 등장 애니메이션을 처리합니다.
- GitHub API에서 저장소 목록을 가져와 Projects 섹션에 동적으로 렌더링합니다.
- GitHub API의 로딩, 성공, 에러, 빈 상태를 각각 UI로 표시합니다.
- 저장소 언어 필터 버튼을 만들고 `array.filter()`로 목록을 갱신합니다.
- Contact 폼에서 이름, 이메일, 메시지 필수값과 이메일 형식을 검증합니다.

## 평가 기준 대응표

| 평가 기준 | 구현 위치 | 확인 내용 |
| --- | --- | --- |
| 반응형 레이아웃 | `css/style.css` | 모바일 기본 스타일을 먼저 작성하고 `768px`, `1024px` 미디어 쿼리로 화면을 확장했습니다. |
| 다크/라이트 모드 | `js/main.js`, `css/style.css` | 토글 버튼 클릭 시 `theme` 상태와 `data-theme` 값을 바꾸고 `localStorage`에 저장합니다. |
| 햄버거, 스크롤 애니메이션, Top 버튼 | `js/main.js`, `css/style.css` | `classList.toggle()`, `scroll` 이벤트, Intersection Observer로 동작을 연결했습니다. |
| GitHub API 상태 처리 | `js/main.js` | `loading`, `success`, `error`, 빈 목록 상태를 `projectStatus` 기준으로 표시합니다. |
| 폼 유효성 검사 | `js/main.js` | `input`, `submit` 이벤트에서 필수값과 이메일 형식을 검사하고 필드 근처에 오류를 표시합니다. |
| HTML/CSS/JS 분리 | `index.html`, `css/style.css`, `js/main.js` | 구조, 표현, 동작을 파일별로 나누어 역할을 분명하게 했습니다. |
| 시맨틱 태그 | `index.html` | `header`, `nav`, `main`, `section`, `article`, `footer`를 영역의 의미에 맞게 사용했습니다. |
| CSS 변수 | `css/style.css` | `:root`와 `[data-theme="dark"]`에서 색상, 폰트, 간격 값을 관리합니다. |
| addEventListener | `js/main.js` | HTML 인라인 이벤트를 쓰지 않고 JavaScript에서 이벤트를 연결합니다. |
| 이벤트 → 상태 → 화면 업데이트 | `js/main.js` | 다크 모드, API 호출, 폼 검증, 필터 기능이 같은 흐름으로 동작합니다. |
| async/await, try/catch | `js/main.js` | GitHub API 요청 성공과 실패를 `try/catch`로 분기합니다. |
| map/filter | `js/main.js` | 저장소 배열을 카드 HTML로 바꾸고, 언어 조건으로 필터링합니다. |
| Flexbox/Grid | `css/style.css` | 네비게이션 정렬은 Flexbox, 카드 목록은 Grid를 사용합니다. |
| 상태 객체 | `js/main.js` | `appState`에 테마, 프로젝트, 필터, 폼 오류 상태를 모아 관리합니다. |
| 모바일 퍼스트 | `css/style.css` | 작은 화면에서 필요한 스타일을 기본값으로 두고 넓은 화면에서 레이아웃을 확장합니다. |

## 상태 변경과 렌더링 흐름

### 1. 다크 모드

사용자가 다크 모드 버튼을 클릭하면 `theme` 상태가 변경됩니다. 변경된 상태는 `document.documentElement.dataset.theme`에 반영됩니다. CSS는 `[data-theme="dark"]`에 정의된 변수를 사용해 전체 화면 색상을 다시 표시합니다.

### 2. GitHub API 프로젝트

페이지가 로드되면 `fetchRepositories()`가 실행됩니다. 요청 전에는 `projectStatus`를 `loading`으로 바꾸고 로딩 문구를 표시합니다. 요청이 성공하면 저장소 배열을 `repositories` 상태에 저장하고 카드 목록을 렌더링합니다. 요청이 실패하면 `projectStatus`를 `error`로 바꾸고 재시도 버튼을 표시합니다.

### 3. Contact 폼 검증

사용자가 입력할 때마다 `input` 이벤트가 실행됩니다. 각 필드의 검증 결과는 `formErrors` 상태에 저장됩니다. 상태에 에러 메시지가 있으면 입력 필드 근처에 메시지를 표시하고, 에러가 없으면 메시지를 지웁니다.

### 4. 프로젝트 필터

언어 필터 버튼을 클릭하면 `languageFilter` 상태가 변경됩니다. 이후 저장소 배열에 `filter()`를 적용하고, 필터 결과만 Projects 섹션에 다시 렌더링합니다.

## 파일을 분리한 이유

`index.html`은 문서 구조와 콘텐츠를 담당합니다. `css/style.css`는 색상, 간격, 배치, 반응형 레이아웃을 담당합니다. `js/main.js`는 사용자 이벤트, 상태 변경, DOM 업데이트를 담당합니다.

파일을 분리하면 한 파일의 역할이 분명해집니다. HTML 구조를 수정할 때 스타일 로직을 건드릴 가능성이 줄고, JavaScript 동작을 수정할 때 문서 구조를 함께 읽는 부담도 줄어듭니다. 브라우저는 HTML을 읽은 뒤 외부 CSS와 `defer`로 연결된 JavaScript를 순서대로 적용합니다.

## HTML 구조 설계 기준

문서의 큰 영역은 `header`, `nav`, `main`, `section`, `article`, `footer`로 나누었습니다. 각 섹션은 제목과 내용을 함께 가지므로 `section`을 사용했습니다. GitHub 저장소와 기술 스택처럼 독립적으로 읽을 수 있는 반복 항목은 `article`로 구성했습니다.

## Flexbox와 Grid 사용 기준

네비게이션은 로고, 메뉴, 버튼을 한 줄에 정렬해야 하므로 Flexbox를 사용했습니다. Projects 카드와 Skills 카드는 화면 너비에 따라 열 개수가 바뀌어야 하므로 CSS Grid의 `repeat(auto-fit, minmax())`를 사용했습니다.

## CSS 변수를 사용한 이유

`:root`에 색상, 폰트, 간격, 반지름 값을 정의했습니다. 같은 값을 여러 곳에서 반복 작성하지 않고 변수 이름으로 재사용하기 위해서입니다. 색상 체계를 바꿀 때 변수 값만 수정하면 버튼, 카드, 배경, 텍스트 색상이 함께 바뀝니다.

다크 모드는 `[data-theme="dark"]`에서 같은 변수 이름의 값을 다시 정의합니다. JavaScript는 `data-theme` 속성만 바꾸고, CSS는 현재 테마에 맞는 변수 값을 자동으로 적용합니다.

## addEventListener를 사용한 이유

이 프로젝트는 HTML의 `onclick` 속성을 사용하지 않습니다. 모든 이벤트는 `js/main.js`에서 `addEventListener`로 연결합니다.

`addEventListener`를 사용하면 HTML은 구조에 집중하고 JavaScript는 동작에 집중합니다. 같은 요소에 여러 이벤트 핸들러를 연결할 수 있고, 조건에 따라 이벤트 연결 방식을 바꾸기도 쉽습니다. 인라인 `onclick`은 HTML 안에 동작 코드가 섞여 구조와 동작의 역할이 흐려집니다.

## async/await와 try/catch 흐름

`fetchRepositories()`는 `async` 함수입니다. 함수가 시작되면 `projectStatus`를 `loading`으로 바꾸고 로딩 문구를 표시합니다. `await fetch(GITHUB_API_URL)`로 GitHub API 응답을 기다립니다.

응답이 성공하면 `await response.json()`으로 JSON 배열을 읽습니다. 이후 `filter()`로 fork와 archived 저장소를 제외하고 `repositories` 상태에 저장합니다. 응답이 실패하거나 네트워크 오류가 발생하면 `catch` 블록에서 `projectStatus`를 `error`로 바꾸고 재시도 버튼을 표시합니다.

## map/filter 데이터 변환 과정

GitHub API는 저장소 객체 배열을 반환합니다. 먼저 `filter()`로 fork 저장소와 archived 저장소를 제외합니다. 언어 필터를 클릭하면 `languageFilter` 상태와 저장소의 `language` 값을 비교해 다시 `filter()`를 적용합니다.

화면에 표시할 배열이 정해지면 `map(createProjectCard)`로 각 저장소 객체를 카드 HTML 문자열로 변환합니다. 마지막에 `join("")`으로 문자열을 합치고 `projects__grid`의 `innerHTML`에 넣어 카드 목록을 렌더링합니다.

## 상태 객체를 사용한 이유

`appState`는 화면을 다시 그릴 때 필요한 값을 한 곳에 모읍니다. 현재 테마, 저장소 목록, API 요청 상태, 언어 필터, 폼 오류 메시지가 모두 `appState` 안에 있습니다.

상태를 여러 개의 독립 변수로 흩어두면 어떤 값이 화면에 영향을 주는지 추적하기 어렵습니다. 상태 객체를 사용하면 이벤트가 어떤 상태를 바꾸고, 렌더링 함수가 어떤 상태를 읽는지 한 흐름으로 확인할 수 있습니다. 이 구조는 React의 상태 기반 렌더링을 배우기 전 단계의 연습이 됩니다.

## 모바일 퍼스트로 작성한 이유

기본 CSS는 모바일 화면을 기준으로 작성했습니다. 작은 화면에서는 한 열 배치, 접히는 메뉴, 넓지 않은 여백이 먼저 필요합니다. 이후 `min-width: 768px`, `min-width: 1024px` 미디어 쿼리에서 태블릿과 데스크톱 레이아웃을 확장했습니다.

모바일 퍼스트 방식은 작은 화면의 필수 구조를 먼저 보장합니다. 넓은 화면에서는 여유 공간을 활용해 열을 늘리고, 메뉴를 펼치고, 섹션 간격을 키우는 방식으로 자연스럽게 확장할 수 있습니다.

## 실행 방법

VS Code Live Server 또는 정적 서버로 실행합니다.

```bash
python -m http.server 5500
```

브라우저에서 `http://localhost:5500`으로 접속합니다.

## 스크린샷

GitHub Pages 배포 후 데스크톱, 모바일, 다크 모드 화면을 캡처해 아래 경로에 추가합니다.

- `screenshots/desktop.png`
- `screenshots/mobile.png`
- `screenshots/dark.png`
