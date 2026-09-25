import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Recommendations from "@/components/recomendaciones/Recomendaciones";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Formacion from "@/components/formacion";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Recommendations />
      <Projects />
      <Skills />
      <Formacion />
      <Contact />
    </>
  );
}