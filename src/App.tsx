import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { SkipLink } from "./components/SkipLink";
import { ThemeProvider } from "./hooks/useTheme";
import { About } from "./sections/About";
import { Achievements } from "./sections/Achievements";
import { Architecture } from "./sections/Architecture";
import { Contact } from "./sections/Contact";
import { Education } from "./sections/Education";
import { Experience } from "./sections/Experience";
import { Hero } from "./sections/Hero";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";

function App() {
  return (
    <ThemeProvider>
      <SkipLink />
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Architecture />
        <Achievements />
        <Education />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
