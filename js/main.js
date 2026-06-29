const GITHUB_USERNAME = "mov-hyun";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`;

const appState = {
  theme: "light",
  repositories: [],
  projectStatus: "idle",
  projectError: "",
  languageFilter: "all",
  formErrors: {
    name: "",
    email: "",
    message: "",
  },
};

const elements = {
  body: document.body,
  header: document.querySelector(".site-header"),
  navToggle: document.querySelector(".nav__toggle"),
  navMenu: document.querySelector(".nav__menu"),
  navLinks: document.querySelectorAll(".nav__menu a"),
  themeToggle: document.querySelector(".theme-toggle"),
  themeToggleText: document.querySelector(".theme-toggle__text"),
  themeToggleIcon: document.querySelector(".theme-toggle__icon"),
  scrollTop: document.querySelector(".scroll-top"),
  revealItems: document.querySelectorAll(".reveal"),
  typingText: document.querySelector(".hero__typing"),
  projectGrid: document.querySelector(".projects__grid"),
  projectStatus: document.querySelector(".project-status"),
  projectRetry: document.querySelector(".project-retry"),
  projectFilters: document.querySelector(".project-filters"),
  contactForm: document.querySelector(".contact-form"),
  formSuccess: document.querySelector(".form-success"),
};

const typingMessages = [
  "시맨틱 HTML로 구조를 설계합니다.",
  "CSS Grid와 Flexbox로 반응형 화면을 만듭니다.",
  "JavaScript 상태 변경을 DOM 업데이트로 연결합니다.",
];

let typingMessageIndex = 0;
let typingLetterIndex = 0;

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const renderTheme = () => {
  document.documentElement.dataset.theme = appState.theme;
  elements.themeToggleText.textContent = appState.theme === "dark" ? "Light" : "Dark";
  elements.themeToggleIcon.textContent = appState.theme === "dark" ? "L" : "D";
};

const setTheme = (theme) => {
  appState.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  renderTheme();
};

const toggleTheme = () => {
  const nextTheme = appState.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
};

const closeMobileMenu = () => {
  elements.navMenu.classList.remove("active");
  elements.navToggle.classList.remove("active");
  elements.body.classList.remove("menu-open");
  elements.navToggle.setAttribute("aria-expanded", "false");
  elements.navToggle.setAttribute("aria-label", "메뉴 열기");
};

const toggleMobileMenu = () => {
  const isOpen = elements.navMenu.classList.toggle("active");
  elements.navToggle.classList.toggle("active", isOpen);
  elements.body.classList.toggle("menu-open", isOpen);
  elements.navToggle.setAttribute("aria-expanded", String(isOpen));
  elements.navToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
};

const handleScroll = () => {
  const isPastNavPoint = window.scrollY > 60;
  const isPastTopPoint = window.scrollY > 300;

  elements.header.classList.toggle("scrolled", isPastNavPoint);
  elements.scrollTop.classList.toggle("visible", isPastTopPoint);
};

const moveToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const startTyping = () => {
  const message = typingMessages[typingMessageIndex];
  elements.typingText.textContent = message.slice(0, typingLetterIndex);
  typingLetterIndex += 1;

  if (typingLetterIndex > message.length + 8) {
    typingLetterIndex = 0;
    typingMessageIndex = (typingMessageIndex + 1) % typingMessages.length;
  }

  window.setTimeout(startTyping, typingLetterIndex === 0 ? 450 : 72);
};

const formatDate = (dateText) => {
  const date = new Date(dateText);

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const getProjectLanguages = () => {
  const languages = appState.repositories
    .map(({ language }) => language)
    .filter(Boolean);

  return ["all", ...new Set(languages)];
};

const getFilteredProjects = () => {
  if (appState.languageFilter === "all") {
    return appState.repositories;
  }

  return appState.repositories.filter(({ language }) => language === appState.languageFilter);
};

const renderProjectFilters = () => {
  const languages = getProjectLanguages();

  if (languages.length <= 1) {
    elements.projectFilters.innerHTML = "";
    return;
  }

  elements.projectFilters.innerHTML = languages
    .map((language) => {
      const isActive = appState.languageFilter === language;
      const label = language === "all" ? "전체" : language;

      return `
        <button class="filter-button${isActive ? " active" : ""}" type="button" data-language="${language}">
          ${label}
        </button>
      `;
    })
    .join("");

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      appState.languageFilter = button.dataset.language;
      renderProjects();
    });
  });
};

const createProjectCard = (repository) => {
  const {
    name,
    description,
    html_url: htmlUrl,
    language,
    stargazers_count: stars,
    forks_count: forks,
    updated_at: updatedAt,
  } = repository;

  return `
    <article class="project-card">
      <h3>${escapeHtml(name)}</h3>
      <p>${escapeHtml(description || "설명이 등록되지 않은 저장소입니다.")}</p>
      <a class="project-card__link" href="${escapeHtml(htmlUrl)}" target="_blank" rel="noreferrer">
        GitHub에서 보기
      </a>
      <div class="project-card__meta" aria-label="${escapeHtml(name)} 저장소 정보">
        <span>${escapeHtml(language || "기타")}</span>
        <span>Stars ${stars}</span>
        <span>Forks ${forks}</span>
        <span>${formatDate(updatedAt)}</span>
      </div>
    </article>
  `;
};

const renderProjects = () => {
  elements.projectRetry.hidden = appState.projectStatus !== "error";
  renderProjectFilters();

  if (appState.projectStatus === "loading") {
    elements.projectStatus.textContent = "프로젝트를 불러오는 중입니다...";
    elements.projectGrid.innerHTML = "";
    return;
  }

  if (appState.projectStatus === "error") {
    elements.projectStatus.textContent =
      appState.projectError || "프로젝트를 불러올 수 없습니다.";
    elements.projectGrid.innerHTML = "";
    return;
  }

  const filteredProjects = getFilteredProjects();

  if (filteredProjects.length === 0) {
    elements.projectStatus.textContent = "표시할 프로젝트가 없습니다.";
    elements.projectGrid.innerHTML = "";
    return;
  }

  elements.projectStatus.textContent =
    appState.languageFilter === "all"
      ? `${filteredProjects.length}개의 저장소를 표시합니다.`
      : `${appState.languageFilter} 저장소 ${filteredProjects.length}개를 표시합니다.`;
  elements.projectGrid.innerHTML = filteredProjects.map(createProjectCard).join("");
};

const fetchRepositories = async () => {
  appState.projectStatus = "loading";
  appState.projectError = "";
  renderProjects();

  try {
    const response = await fetch(GITHUB_API_URL);

    if (!response.ok) {
      throw new Error(response.status === 403 ? "GitHub API 요청 한도를 초과했습니다." : "GitHub API 응답이 올바르지 않습니다.");
    }

    const repositories = await response.json();
    appState.repositories = repositories.filter(({ fork, archived }) => !fork && !archived);
    appState.projectStatus = "success";
    appState.languageFilter = "all";
  } catch (error) {
    appState.projectStatus = "error";
    appState.projectError = `${error.message} 잠시 후 다시 시도해주세요.`;
  }

  renderProjects();
};

const validateField = (field) => {
  const value = field.value.trim();

  if (field.name === "name" && value.length === 0) {
    return "이름을 입력해주세요.";
  }

  if (field.name === "email") {
    if (value.length === 0) {
      return "이메일을 입력해주세요.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "이메일 형식이 올바르지 않습니다.";
    }
  }

  if (field.name === "message" && value.length < 10) {
    return "메시지를 10자 이상 입력해주세요.";
  }

  return "";
};

const renderFieldError = (field) => {
  const error = appState.formErrors[field.name];
  const formField = field.closest(".form-field");
  const errorElement = document.querySelector(`#${field.name}-error`);

  formField.classList.toggle("invalid", Boolean(error));
  errorElement.textContent = error;
};

const updateFieldState = (field) => {
  appState.formErrors[field.name] = validateField(field);
  renderFieldError(field);
};

const validateForm = () => {
  const fields = elements.contactForm.querySelectorAll("input, textarea");

  fields.forEach(updateFieldState);

  return Object.values(appState.formErrors).every((error) => error === "");
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  elements.formSuccess.textContent = "";

  if (!validateForm()) {
    elements.formSuccess.textContent = "입력값을 다시 확인해주세요.";
    return;
  }

  elements.contactForm.reset();
  Object.keys(appState.formErrors).forEach((key) => {
    appState.formErrors[key] = "";
  });
  elements.contactForm.querySelectorAll("input, textarea").forEach(renderFieldError);
  elements.formSuccess.textContent = "메시지가 확인되었습니다. 감사합니다.";
};

const observeSections = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.25 }
  );

  elements.revealItems.forEach((item) => observer.observe(item));
};

const bindEvents = () => {
  elements.navToggle.addEventListener("click", toggleMobileMenu);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.scrollTop.addEventListener("click", moveToTop);
  elements.projectRetry.addEventListener("click", fetchRepositories);
  elements.contactForm.addEventListener("submit", handleFormSubmit);

  elements.navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  elements.contactForm.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      updateFieldState(field);
      elements.formSuccess.textContent = "";
    });
  });

  window.addEventListener("scroll", handleScroll);
};

const init = () => {
  appState.theme = getPreferredTheme();
  renderTheme();
  bindEvents();
  handleScroll();
  observeSections();
  startTyping();
  fetchRepositories();
};

init();
