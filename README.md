# codyssey-b4-1-portfolio

순수 HTML, CSS, JavaScript로 구현한 반응형 포트폴리오 웹사이트입니다. GitHub API로 저장소 데이터를 불러오고, 다크 모드, 햄버거 메뉴, 스크롤 인터랙션, 폼 유효성 검사를 직접 구현했습니다.

## 1. 프로젝트 소개

이 프로젝트는 웹 기초와 프론트엔드 학습 과제의 결과물입니다. 브라우저 기본 기술인 HTML, CSS, JavaScript만 사용해 포트폴리오 사이트를 만들었습니다.

주요 목표는 사용자 이벤트가 상태를 바꾸고, 바뀐 상태가 DOM 업데이트로 이어지는 흐름을 코드로 구현하는 것입니다. 이 흐름은 React 같은 프론트엔드 도구를 배우기 전 이해해야 하는 핵심 기초입니다.

## 2. 배포 링크

- GitHub Pages: https://mov-hyun.github.io/codyssey-b4-1-portfolio/
- GitHub Repository: https://github.com/mov-hyun/codyssey-b4-1-portfolio

## 3. 사용 기술

| 기술 | 사용 위치 | 사용 이유 |
| --- | --- | --- |
| HTML5 | `index.html` | `header`, `nav`, `main`, `section`, `article`, `footer`로 문서 구조를 의미 있게 나누기 위해 사용했습니다. |
| CSS3 | `css/style.css` | 색상, 간격, 배치, 반응형 레이아웃, 다크 모드 스타일을 관리하기 위해 사용했습니다. |
| CSS Variables | `:root`, `[data-theme="dark"]` | 반복되는 색상과 간격 값을 한 곳에서 관리하고, 테마 전환을 쉽게 처리하기 위해 사용했습니다. |
| Flexbox | 네비게이션, 버튼 그룹, Footer | 한 줄 정렬과 요소 간 간격 제어가 필요한 영역에 사용했습니다. |
| CSS Grid | Skills, Projects 카드 목록 | 화면 너비에 따라 카드 열 개수가 자동으로 바뀌도록 사용했습니다. |
| JavaScript ES6+ | `js/main.js` | DOM 선택, 이벤트 연결, 상태 변경, 화면 업데이트를 구현하기 위해 사용했습니다. |
| Fetch API | GitHub 저장소 목록 호출 | 외부 API에서 비동기 데이터를 가져오기 위해 사용했습니다. |
| async/await | GitHub API 호출 흐름 | 비동기 코드를 순서대로 읽기 쉽게 작성하기 위해 사용했습니다. |
| try/catch | API 에러 처리 | API 요청 실패와 레이트 리밋 상황을 에러 UI로 표시하기 위해 사용했습니다. |
| localStorage | 다크 모드 저장 | 사용자가 선택한 테마를 새로고침 후에도 유지하기 위해 사용했습니다. |
| Intersection Observer | 스크롤 등장 애니메이션 | 섹션이 화면에 들어오는 시점을 감지해 애니메이션을 적용하기 위해 사용했습니다. |
| GitHub REST API | Projects 섹션 | 실제 GitHub 저장소 데이터를 카드 UI로 동적으로 렌더링하기 위해 사용했습니다. |

## 4. 주요 기능

- Hero, About, Skills, Projects, Contact, Footer 섹션 구성
- 모바일, 태블릿, 데스크톱 화면에 맞춘 반응형 레이아웃
- 모바일 화면용 햄버거 메뉴
- 메뉴 클릭 시 부드러운 섹션 이동
- 스크롤 60px 이후 헤더 스타일 변경
- 스크롤 300px 이후 맨 위로 가기 버튼 표시
- 다크 모드 토글과 `localStorage` 저장
- Intersection Observer 기반 스크롤 등장 애니메이션
- GitHub API 저장소 목록 렌더링
- API 로딩, 성공, 에러, 빈 상태 UI 처리
- 저장소 언어 필터링
- Contact 폼 필수값과 이메일 형식 검증

## 5. 프로젝트 구조

```text
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── profile.svg
├── screenshots/
│   └── .gitkeep
└── README.md
```

`index.html`은 문서 구조와 콘텐츠를 담당합니다. `css/style.css`는 색상, 간격, 배치, 반응형 레이아웃을 담당합니다. `js/main.js`는 사용자 이벤트, 상태 변경, DOM 업데이트를 담당합니다.

파일을 분리하면 각 파일의 역할이 분명해집니다. HTML 구조를 수정할 때 스타일 로직을 함께 읽을 필요가 줄고, JavaScript 동작을 수정할 때 문서 구조와 표현 코드를 분리해서 확인할 수 있습니다.

## 6. 구현 상세 설명

### 6.1 HTML 구조

전체 문서는 `header`, `main`, `footer`로 큰 영역을 나누었습니다. `header` 안에는 주요 메뉴를 담당하는 `nav`를 배치했습니다. 본문 안의 Hero, About, Skills, Projects, Contact는 각각 독립된 주제를 가지므로 `section`으로 구성했습니다.

Skills 카드와 GitHub 저장소 카드는 독립적으로 읽을 수 있는 반복 항목입니다. 그래서 각 카드는 `article`로 작성했습니다. 폼 입력 요소는 `label`의 `for` 값과 입력 요소의 `id` 값을 연결해 접근성을 높였습니다.

### 6.2 CSS 설계

CSS는 모바일 퍼스트 방식으로 작성했습니다. 기본 스타일은 작은 화면을 기준으로 두고, `768px`, `1024px` 미디어 쿼리에서 태블릿과 데스크톱 레이아웃을 확장했습니다.

`:root`에는 색상, 폰트, 간격, 반지름 같은 공통 값을 변수로 정의했습니다. 다크 모드는 `[data-theme="dark"]`에서 같은 변수 이름의 값을 다시 정의합니다. JavaScript는 `data-theme` 값만 바꾸고, CSS가 현재 테마에 맞는 색상을 적용합니다.

네비게이션은 로고, 메뉴, 버튼을 한 줄에 배치해야 하므로 Flexbox를 사용했습니다. Skills와 Projects 카드 목록은 화면 너비에 따라 열 개수가 바뀌어야 하므로 Grid의 `repeat(auto-fit, minmax())`를 사용했습니다.

### 6.3 JavaScript 설계

JavaScript는 `querySelector`, `querySelectorAll`로 DOM 요소를 선택합니다. 이벤트는 HTML 인라인 속성 대신 `addEventListener`로 연결했습니다. 이 방식은 HTML은 구조에 집중하고, JavaScript는 동작에 집중하게 만듭니다.

화면에 영향을 주는 값은 `appState` 객체에 모았습니다. 현재 테마, GitHub 저장소 목록, API 요청 상태, 언어 필터, 폼 오류 메시지를 한 곳에서 관리합니다. 이벤트 함수는 상태를 바꾸고, 렌더링 함수는 상태를 읽어 화면을 갱신합니다.

### 6.4 GitHub API 연동

Projects 섹션은 GitHub REST API의 `https://api.github.com/users/mov-hyun/repos` 데이터를 사용합니다. `fetchRepositories()` 함수는 `async/await`로 API 응답을 기다립니다.

요청 전에는 `projectStatus`를 `loading`으로 바꾸고 로딩 문구를 표시합니다. 요청이 성공하면 JSON 배열을 받아 `repositories` 상태에 저장하고 카드 목록을 렌더링합니다. 요청이 실패하면 `catch` 블록에서 `projectStatus`를 `error`로 바꾸고 재시도 버튼을 표시합니다.

저장소 배열은 `filter()`로 fork와 archived 저장소를 제외합니다. 화면에 표시할 저장소 배열은 `map(createProjectCard)`로 카드 HTML 문자열로 변환하고, `join("")`으로 합쳐 DOM에 삽입합니다.

### 6.5 폼 유효성 검사

Contact 폼은 이름, 이메일, 메시지를 입력받습니다. `input` 이벤트가 발생할 때마다 현재 필드의 값을 검사합니다. 이름과 이메일은 필수값이며, 이메일은 정규식으로 형식을 확인합니다. 메시지는 10자 이상 입력해야 합니다.

검증 결과는 `appState.formErrors`에 저장됩니다. 오류가 있으면 입력 필드 근처에 메시지를 표시하고, 오류가 사라지면 메시지를 지웁니다. 제출 시에는 `event.preventDefault()`로 기본 제출 동작을 막고, 검증이 통과하면 성공 메시지를 표시합니다.

## 7. 상태 관리 흐름

### 7.1 다크 모드

사용자가 다크 모드 버튼을 클릭합니다. `toggleTheme()` 함수가 다음 테마 값을 계산합니다. `setTheme()` 함수가 `appState.theme`을 바꾸고 `localStorage`에 저장합니다. `renderTheme()` 함수가 `document.documentElement.dataset.theme`을 갱신합니다. CSS 변수 값이 바뀌며 화면 색상이 변경됩니다.

### 7.2 API 호출

페이지가 로드되면 `fetchRepositories()`가 실행됩니다. 요청 시작 시 `projectStatus`는 `loading`이 됩니다. 요청 성공 시 `repositories`에 저장소 배열이 저장되고 `projectStatus`는 `success`가 됩니다. 요청 실패 시 `projectStatus`는 `error`가 됩니다. `renderProjects()`는 이 상태를 기준으로 로딩 문구, 카드 목록, 에러 메시지, 빈 상태 메시지를 표시합니다.

### 7.3 폼 입력

사용자가 폼에 입력합니다. `input` 이벤트가 발생합니다. `updateFieldState()`가 해당 필드의 오류 메시지를 계산합니다. 오류 메시지는 `appState.formErrors`에 저장됩니다. `renderFieldError()`가 필드 근처의 오류 메시지를 표시하거나 숨깁니다.

### 7.4 프로젝트 필터

사용자가 언어 필터 버튼을 클릭합니다. `languageFilter` 상태가 선택한 언어로 변경됩니다. `getFilteredProjects()`가 저장소 배열에 `filter()`를 적용합니다. `renderProjects()`가 필터링된 저장소만 카드로 다시 렌더링합니다.

## 8. 평가 기준 대응표

| 평가 기준 | 구현 위치 | 확인 내용 |
| --- | --- | --- |
| 브라우저 창 크기를 줄였을 때 모바일 레이아웃으로 변경되는가 | `css/style.css` | 모바일 기본 스타일과 `768px`, `1024px` 미디어 쿼리를 적용했습니다. |
| 다크/라이트 모드가 전환되고 새로고침 후 유지되는가 | `js/main.js`, `css/style.css` | `theme` 상태, `data-theme`, `localStorage`를 연결했습니다. |
| 햄버거 메뉴, 스크롤 애니메이션, Top 버튼이 동작하는가 | `js/main.js`, `css/style.css` | `classList.toggle()`, `scroll` 이벤트, Intersection Observer를 사용했습니다. |
| GitHub API 데이터와 로딩/에러/빈 상태가 표시되는가 | `js/main.js` | `projectStatus` 값에 따라 Projects UI를 분기합니다. |
| 필수 입력값과 이메일 형식 오류 피드백이 표시되는가 | `js/main.js` | `input`, `submit` 이벤트에서 검증하고 오류 메시지를 표시합니다. |
| HTML, CSS, JavaScript가 분리되어 있고 역할을 설명할 수 있는가 | `index.html`, `css/style.css`, `js/main.js` | 구조, 표현, 동작을 파일별로 나누었습니다. |
| 시맨틱 태그를 사용했고 선택 기준을 설명할 수 있는가 | `index.html` | 문서 영역의 의미에 맞춰 `header`, `nav`, `main`, `section`, `article`, `footer`를 사용했습니다. |
| CSS 변수를 정의했고 이점을 설명할 수 있는가 | `css/style.css` | `:root`와 `[data-theme="dark"]`에서 공통 스타일 값을 관리합니다. |
| `onclick` 대신 `addEventListener`를 사용한 이유를 설명할 수 있는가 | `js/main.js` | 구조와 동작을 분리하고, 이벤트 연결을 JavaScript에서 관리합니다. |
| 이벤트, 상태 변경, 화면 업데이트 흐름을 설명할 수 있는가 | `js/main.js` | 다크 모드, API 호출, 폼 검증, 필터 기능에서 같은 흐름을 사용합니다. |
| `async/await`와 `try/catch` 분기 처리를 설명할 수 있는가 | `js/main.js` | GitHub API 요청 성공과 실패를 `try/catch`로 처리합니다. |
| `map`, `filter`로 카드 UI 변환 과정을 설명할 수 있는가 | `js/main.js` | 저장소 배열을 필터링하고 카드 HTML로 변환합니다. |
| Flexbox와 Grid 적용 위치와 선택 이유를 설명할 수 있는가 | `css/style.css` | 네비게이션은 Flexbox, 카드 목록은 Grid를 사용했습니다. |
| 상태 객체를 따로 관리한 이유를 설명할 수 있는가 | `js/main.js` | `appState`에 화면 렌더링에 필요한 값을 모았습니다. |
| 모바일 퍼스트 작성 이유를 설명할 수 있는가 | `css/style.css` | 작은 화면의 필수 구조를 먼저 보장하고 넓은 화면에서 확장합니다. |

## 9. 실행 방법

VS Code의 Live Server 확장으로 실행합니다.

1. VS Code에서 프로젝트 폴더를 엽니다.
2. `index.html`을 선택합니다.
3. Live Server로 실행합니다.
4. 브라우저에서 화면과 인터랙션을 확인합니다.

정적 웹사이트이므로 GitHub Pages 배포 환경에서도 같은 파일 구조로 실행됩니다.

## 10. 스크린샷

배포 후 제출용 스크린샷을 아래 경로에 추가합니다.

- `screenshots/desktop.png`
- `screenshots/mobile.png`
- `screenshots/dark.png`

## 11. 회고

이번 프로젝트를 통해 HTML, CSS, JavaScript가 각각 어떤 역할을 맡는지 정리했습니다. DOM 요소를 선택하고 이벤트를 연결한 뒤, 상태를 변경하고 화면을 다시 그리는 흐름을 직접 구현했습니다.

GitHub API 연동 과정에서는 비동기 요청의 성공과 실패를 분기하는 방식도 확인했습니다. 이 프로젝트는 React 학습 전 필요한 이벤트 처리, 상태 관리, 렌더링 흐름을 이해하기 위한 기초 작업입니다.
