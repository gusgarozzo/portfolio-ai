import type { Recommendation } from "@/types/portfolio";

const es: Recommendation[] = [
  {
    id: "yamila-perez",
    name: "Yamila Pérez",
    role: "Jefa de RRHH",
    company: "AIOTEK",
    text: `Gustavo es un gran profesional. 
Muy responsable, predispuesto siempre en aprender y mejorar. 
Siempre recibí muy buenos feedbacks de su Lider y compañeros del equipo.
Lo recomiendo sin dudas, se destaca y genera muy buenos aportes en la empresa. `,
  },
  {
    id: "adrian-quevedo",
    name: "Adrian Quevedo",
    role: "Jefe del área de Arquitectura e Infraestructura",
    company: "AIOTEK",
    text: `Trabajé con Gustavo en AIOTEK y puedo decir que es un excelente profesional.
Posee excelentes habilidades técnicas en tecnologías como JavaScript, Node.js, NestJS entre otras. 
Pero destaco por sobre todas sus habilidades técnicas, su capacidad de tener un enfoque proactivo y con gran predisposición a enfrentar nuevos retos.

Al cumplir las tareas que se le asignan no solo buscar completarlas sino que buscas diferentes formas de mejorar los procesos y optimizar el código.

Sin dudas lo recomiendo para cualquier equipo que este buscado un desarrollador comprometido, con habilidades técnicas solidas y con una gran actitud capaz de motivar y encajar en sus equipos.
Convencido de que será una gran incorporación.`,
  },
  {
    id: "matias-valenzisi",
    name: "Matias Valenzisi",
    role: "Compañero de equipo",
    company: "AIOTEK",
    text: `Tengo la oportunidad de trabajar con Gus en AIOTEK, una experiencia muy positiva. Durante nuestra colaboración, demuestra un gran compromiso, destacándose por su habilidad para resolver problemas y su notable capacidad de adaptación. Su paciencia y precisión en la integración de APIs y el manejo de microservicios son clave para el éxito de nuestro trabajo en conjunto.`,
  },
  {
    id: "marcelo-limideiro",
    name: "Marcelo Limideiro",
    role: "Compañero de equipo",
    company: "Qwavee IT · AIOTEK",
    text: `Me complace enormemente recomendar a Gustavo. Durante más de un año y medio, he tenido el privilegio de trabajar estrechamente con él y puedo dar fe de sus cualidades excepcionales tanto en el ámbito laboral como personal.

Gustavo demuestra un nivel de compromiso y responsabilidad inigualables hacia su trabajo y su propio crecimiento profesional. Su habilidad para cultivar relaciones sólidas con sus compañeros es admirable, siempre fomentando un ambiente de colaboración y trabajo en equipo.

Una de las cualidades más impresionantes de Gustavo es su habilidad para encontrar soluciones efectivas ante cualquier desafío que se presente. Siempre está dispuesto a escuchar y considerar diferentes perspectivas para llegar a la mejor solución posible. Cuando me incorporé a un proyecto en el que él ya estaba involucrado, su guía y apoyo me permitieron integrarme de manera fluida y lograr resultados más rápidos y seguros.

En el ámbito personal, Gustavo es un individuo respetuoso y considerado, siempre dispuesto a ofrecer una mano amiga y prestando atención a los detalles que marcan la diferencia. Su sentido del humor único es algo que aprecio especialmente, ya que compartimos similitudes en ese aspecto.

En resumen, Gustavo es una persona que reúne habilidades profesionales notables y una calidad humana admirable. Sin duda alguna, su contribución es invaluable para cualquier equipo y entorno de trabajo. Es un honor recomendar a Gustavo en todas las instancias.`,
  },
  {
    id: "julian-cano",
    name: "Julian Cano",
    role: "Team Leader",
    company: "Qwavee IT",
    text: `Es un placer recomendar a Gus por su excelencia en el trabajo y su profesionalismo. Durante nuestro tiempo juntos en Qwavee. Su capacidad para comunicarse de manera efectiva y trabajar en equipo fue una inspiración para todos los miembros del equipo. Espero poder trabajar con él de nuevo en cualquier proyecto en el futuro.`,
  },
  {
    id: "juan-sebastian-bedescaraburre",
    name: "Juan Sebastian Bedescaraburre",
    role: "Jefe del RRHH",
    company: "Qwavee IT",
    text: `Su valor agregado es el empeño diario que pone en lograr sus objetivos y progresos, muy focalizado en la capacitación continua y el progreso laboral, y horas y horas de codear. Uno de mis mejores compañeros de trabajo y una gran persona, muy recomendable!`,
  },
];

const en: Recommendation[] = [
  {
    id: "yamila-perez",
    name: "Yamila Pérez",
    role: "Head of HR",
    company: "AIOTEK",
    text: es[0].text,
  },
  {
    id: "adrian-quevedo",
    name: "Adrian Quevedo",
    role: "Head of Architecture and Infrastructure",
    company: "AIOTEK",
    text: es[1].text,
  },
  {
    id: "matias-valenzisi",
    name: "Matias Valenzisi",
    role: "Team colleague",
    company: "AIOTEK",
    text: es[2].text,
  },
  {
    id: "marcelo-limideiro",
    name: "Marcelo Limideiro",
    role: "Team colleague",
    company: "Qwavee IT · AIOTEK",
    text: es[3].text,
  },
  {
    id: "julian-cano",
    name: "Julian Cano",
    role: "Team Leader",
    company: "Qwavee IT",
    text: es[4].text,
  },
  {
    id: "juan-sebastian-bedescaraburre",
    name: "Juan Sebastian Bedescaraburre",
    role: "Head of HR",
    company: "Qwavee IT",
    text: es[5].text,
  },
];

export const recommendations: Record<"es" | "en", Recommendation[]> = { es, en };