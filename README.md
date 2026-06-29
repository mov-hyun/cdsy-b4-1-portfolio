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

## 상태 변경과 렌더링 흐름

### 1. 다크 모드

사용자가 다크 모드 버튼을 클릭하면 `theme` 상태가 변경됩니다. 변경된 상태는 `document.documentElement.dataset.theme`에 반영됩니다. CSS는 `[data-theme="dark"]`에 정의된 변수를 사용해 전체 화면 색상을 다시 표시합니다.

### 2. GitHub API 프로젝트

페이지가 로드되면 `fetchRepositories()`가 실행됩니다. 요청 전에는 `projectStatus`를 `loading`으로 바꾸고 로딩 문구를 표시합니다. 요청이 성공하면 저장소 배열을 `repositories` 상태에 저장하고 카드 목록을 렌더링합니다. 요청이 실패하면 `projectStatus`를 `error`로 바꾸고 재시도 버튼을 표시합니다.

### 3. Contact 폼 검증

사용자가 입력할 때마다 `input` 이벤트가 실행됩니다. 각 필드의 검증 결과는 `formErrors` 상태에 저장됩니다. 상태에 에러 메시지가 있으면 입력 필드 근처에 메시지를 표시하고, 에러가 없으면 메시지를 지웁니다.

### 4. 프로젝트 필터

언어 필터 버튼을 클릭하면 `languageFilter` 상태가 변경됩니다. 이후 저장소 배열에 `filter()`를 적용하고, 필터 결과만 Projects 섹션에 다시 렌더링합니다.

## HTML 구조 설계 기준

문서의 큰 영역은 `header`, `nav`, `main`, `section`, `article`, `footer`로 나누었습니다. 각 섹션은 제목과 내용을 함께 가지므로 `section`을 사용했습니다. GitHub 저장소와 기술 스택처럼 독립적으로 읽을 수 있는 반복 항목은 `article`로 구성했습니다.

## Flexbox와 Grid 사용 기준

네비게이션은 로고, 메뉴, 버튼을 한 줄에 정렬해야 하므로 Flexbox를 사용했습니다. Projects 카드와 Skills 카드는 화면 너비에 따라 열 개수가 바뀌어야 하므로 CSS Grid의 `repeat(auto-fit, minmax())`를 사용했습니다.

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
