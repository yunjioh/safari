import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 페이지 및 컴포넌트 임포트
import Hero from "./pages/HeroPage/Hero";
import About from "./pages/AboutPage/About";
import Keyword from "./pages/KeywordPage/Keyword";
import Hobby from "./pages/HobbyPage/Hobby";
import Skill from "./pages/SkillPage/Skill";
import Gallery from "./pages/GalleryPage/Gallery";
import Project from "./pages/ProjectPage/Project";
import Website from "./pages/WebsitePage/Website";
import Coding from "./pages/CodingPage/Coding";
import Think from "./pages/ThinkPage/Think";
import Together from "./pages/TogetherPage/Together";
import Contact from "./pages/ContactPage/Contact";
import WebsiteDetail from "./pages/WebsitePage/WebsiteDetail";
import useRevealOnScroll from "./hooks/useRevealOnScroll";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

// 1️⃣ 원페이지 포트폴리오 메인 본문 컴포넌트
function MainHome() {
  const location = useLocation();

  useRevealOnScroll({
    selector: ".js-reveal",
    y: 44,
    start: "top 80%",
    end: "bottom 20%",
  });

  // 상세페이지에서 복귀 시 특정 하위 섹션(website 등)으로 스크롤 복원
  useEffect(() => {
    if (location.state && location.state.fromSection) {
      const targetId = location.state.fromSection;
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="main-home-content">
      <Hero />
      <About />
      <Keyword />
      <Hobby />
      <Skill />
      <Gallery />
      <Project />
      <Website />
      <Coding />
      <Think />
      <Together />
      <Contact />
    </div>
  );
}

// 2️⃣ 공통 헤더 및 라우터를 제어하는 최상단 컴포넌트 내부 뼈대
function AppContent() {
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
  const ctx = gsap.context(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    // Hero 섹션
    const heroEl = document.getElementById("home");

    if (!heroEl) return;

    let isInHero = true;

    // Hero 영역 감지
    ScrollTrigger.create({
      trigger: heroEl,
      start: "top top",
      end: "bottom top",

      onEnter: () => {
        isInHero = true;

        // Hero에서는 항상 헤더 노출
        gsap.to(headerEl, {
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      },

      onLeave: () => {
        isInHero = false;
      },

      onEnterBack: () => {
        isInHero = true;

        // 다시 Hero로 올라오면 헤더 노출
        gsap.to(headerEl, {
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      },

      onLeaveBack: () => {
        isInHero = true;

        // Hero 위쪽에서는 항상 노출
        gsap.to(headerEl, {
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });

    // 전체 페이지 스크롤 방향 감지
    ScrollTrigger.create({
      start: "top top",

      onUpdate: (self) => {
        // Hero 안에서는 무조건 보이기
        if (isInHero) {
          gsap.to(headerEl, {
            yPercent: 0,
            duration: 0.2,
            overwrite: true,
          });
          return;
        }

        // Hero 밖에서 아래로 스크롤 → 숨김
        if (self.direction === 1) {
          gsap.to(headerEl, {
            yPercent: -100,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        }

        // Hero 밖에서 위로 스크롤 → 노출
        if (self.direction === -1) {
          gsap.to(headerEl, {
            yPercent: 0,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
        }
      },
    });

    // 기존 sectionMap
    const sectionMap = {
      home: "home",

      about: "about",
      keyword: "about",
      hobby: "about",

      skill: "skill",

      gallery: "project",
      project: "project",
      website: "project",
      coding: "project",

      think: "contact",
      together: "contact",
      contact: "contact",
    };

    if (location.pathname === "/") {
      const sections = Object.keys(sectionMap);

      sections.forEach((id) => {
        const el = document.getElementById(id);

        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",

          onEnter: () => {
            setActiveSection(sectionMap[id]);
          },

          onEnterBack: () => {
            setActiveSection(sectionMap[id]);
          },
        });
      });
    }
  });

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, [location.pathname]);

  // 네비게이션 메뉴 클릭 핸들러
  const handleNavClick = (e, id) => {
    setIsMenuOpen(false);

    // 💡 만약 상세페이지에 있다가 헤더 메뉴를 누르면 메인 홈으로 먼저 보낸 뒤 이동시킵니다.
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/", { state: { fromSection: id } });
    } else {
      setActiveSection(id);
    }
  };

  return (
    <div className="App">
      {/* 💡 헤더를 Routes 바깥으로 추출하여 모든 페이지에서 항상 상단 고정 노출 */}
      <div className="header" ref={headerRef}>
        {/* 네임을 클릭하면 언제든 메인 첫 화면으로 리셋 */}
        <div className="hero-name" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          YUNJI'S PORTFOLIO
        </div>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`hero-nav ${isMenuOpen ? "active" : ""}`}>
          <a href="#home" className={activeSection === "home" ? "active" : ""} onClick={(e) => handleNavClick(e, "home")}>Home</a>
          <a href="#about" className={activeSection === "about" ? "active" : ""} onClick={(e) => handleNavClick(e, "about")}>About</a>
          <a href="#process" className={activeSection === "process" ? "active" : ""} onClick={(e) => handleNavClick(e, "process")}>Process</a>
          <a href="#skill" className={activeSection === "skill" ? "active" : ""} onClick={(e) => handleNavClick(e, "skill")}>Skill</a>
          <a href="#project" className={activeSection === "project" ? "active" : ""} onClick={(e) => handleNavClick(e, "project")}>Project</a>
          <a href="#contact" className={activeSection === "contact" ? "active" : ""} onClick={(e) => handleNavClick(e, "contact")}>Contact</a>
        </nav>
      </div>

      {/* 라우팅 컨테이너 스위치 */}
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/website/:id" element={<WebsiteDetail />} />
      </Routes>
    </div>
  );
}

// 3️⃣ 최종 최상단 App 컴포넌트 (Router로 감싸기)
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
