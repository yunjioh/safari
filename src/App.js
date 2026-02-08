import Hero from "./pages/HeroPage/Hero";
import "./App.css";
import About from "./pages/AboutPage/About";
import Keyword from "./pages/KeywordPage/Keyword";
import Hobby from "./pages/HobbyPage/Hobby";
import Skill from "./pages/SkillPage/Skill";
import Gallery from "./pages/GalleryPage/Gallery";
import Project from "./pages/ProjectPage/Project";
import Coding from "./pages/CodingPage/Coding";
import Think from "./pages/ThinkPage/Think";
import Together from "./pages/TogetherPage/Together";
import Contact from "./pages/ContactPage/Contact";
import useRevealOnScroll from "./hooks/useRevealOnScroll";
import Preview from "./pages/PreviewPage/Preview";

function App() {
  useRevealOnScroll({
    selector: ".js-reveal",
    y: 44, // 티 나게
    start: "top 80%",
    end: "bottom 20%",
  });
  return (
    <div className="App">
      <Hero />
      <About />
      <Keyword />
      <Hobby />
      <Skill />
      <Gallery />
      <Project />
      <Coding />
      <Think />
      <Together />
      <Contact />
    </div>
  );
}

export default App;
