import Hero from "@/components/hero";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Certifications from "@/components/certifications";
import LatencyDash from "@/components/minigames/LatencyDash";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <section id="experience" className="section-border">
        <Experience />
      </section>
      <section id="projects" className="section-border">
        <Projects />
      </section>
      <section id="skills" className="section-border">
        <Skills />
      </section>
      <section id="certifications" className="section-border">
        <Certifications />
      </section>
      <section id="dashboard" className="section-border">
        <LatencyDash />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
