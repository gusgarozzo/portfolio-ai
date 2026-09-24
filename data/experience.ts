import type { Experience } from "@/types/portfolio";

export const experience: Record<string, Experience[]> = {
  es: [
    {
      id: "aiotek",
      company: "Aiotek",
      role: "Desarrollador Node.js Semi-Senior",
      period: "Septiembre 2023 – Junio 2026",
      location: "Tandil, Argentina",
      highlights: [
        "Diseñé desde cero una arquitectura de integración con ERPs y Marketplaces, formalizando el patrón en documentación técnica con Swagger/OpenAPI; el equipo backend la adoptó como estándar oficial para cada nueva integración, eliminando la necesidad de rediseñar la arquitectura caso por caso.",
        "Implementé un pipeline de sincronización de facturas vía FTP con control de flujo y procesamiento por lotes (batch), resolviendo los cuellos de botella de concurrencia y saturación que el sistema anterior generaba bajo carga, garantizando integridad de datos sin pérdida de registros incluso durante períodos de pico de volumen.",
        "Optimicé consultas y transacciones críticas en PostgreSQL con Sequelize bajo escenarios de alta concurrencia, identificando y solucionando puntos de contención que afectaban operaciones sensibles a la latencia, eliminando cuellos de botella que causaban retrasos notorios durante períodos de alto tráfico.",
        "Centralicé la documentación técnica de los servicios utilizando Swagger, agilizando el ciclo de pruebas de QA y facilitando integraciones limpias con clientes externos.",
      ],
    },
    {
      id: "qwavee-node",
      company: "Qwavee IT",
      role: "Desarrollador Node.js | NestJS",
      period: "Noviembre 2022 – Septiembre 2023",
      location: "Tandil, Argentina",
      highlights: [
        "Diseñé una arquitectura Serverless en AWS (Lambda, API Gateway), desacoplando el procesamiento de tareas de la dependencia de servidores dedicados, permitiendo la escalabilidad del procesamiento bajo demanda sin aprovisionar infraestructura adicional.",
        "Lideré la migración de un sistema de cálculo crítico para el sector agropecuario a NestJS/TypeScript, reemplazando un código legacy difícil de mantener por una arquitectura tipada y modular, dejando una base técnica que el equipo pudo extender y mantener sin reescribir la lógica de negocio.",
        "Automaticé pipelines de cálculo de emisiones con salida JSON estructurada, reemplazando un proceso previamente manual, eliminando la intervención humana y los errores de transcripción asociados.",
      ],
    },
    {
      id: "qwavee-php",
      company: "Qwavee IT",
      role: "Desarrollador PHP",
      period: "Febrero 2022 – Noviembre 2022",
      location: "Tandil, Argentina",
      highlights: [
        "Ejecuté la migración de Drupal 7 a Drupal 9 sin interrupciones del servicio, preservando la integridad de los datos, permisos y estructura de contenido durante todo el proceso, completando la transición sin tiempo de inactividad percibido por los usuarios finales.",
        "Desarrollé scripts de automatización para el proceso de migración, reemplazando pasos manuales y reduciendo el tiempo de inactividad del sitio durante la transición.",
        "Resolví errores complejos posteriores a la migración, priorizando la funcionalidad crítica de cara al usuario, estabilizando el sistema hasta que operara sin incidentes reportados por el equipo.",
      ],
    },
  ],
  en: [
    {
      id: "aiotek",
      company: "Aiotek",
      role: "Node.js Developer (Mid-level)",
      period: "September 2023 – June 2026",
      location: "Tandil, Argentina",
      highlights: [
        "Designed from scratch an integration architecture with ERPs and Marketplaces, formalizing the pattern in technical documentation with Swagger/OpenAPI; the backend team adopted it as the official standard for every new integration, eliminating the need to redesign the architecture case by case.",
        "Implemented an invoice synchronization pipeline via FTP with flow control and batch processing, resolving the concurrency and saturation bottlenecks that the previous system generated under load, ensuring data integrity without record loss even during peak volume periods.",
        "Optimized critical PostgreSQL queries and transactions with Sequelize under high concurrency scenarios, identifying and fixing contention points that affected latency-sensitive operations, eliminating bottlenecks that caused noticeable delays during high traffic periods.",
        "Centralized technical documentation of services using Swagger, streamlining the QA testing cycle and enabling clean integrations with external clients.",
      ],
    },
    {
      id: "qwavee-node",
      company: "Qwavee IT",
      role: "Node.js | NestJS Developer",
      period: "November 2022 – September 2023",
      location: "Tandil, Argentina",
      highlights: [
        "Designed a Serverless architecture on AWS (Lambda, API Gateway), decoupling task processing from the dependency on dedicated servers, enabling on-demand processing scalability without provisioning additional infrastructure.",
        "Led the migration of a critical calculation system for the agricultural sector to NestJS/TypeScript, replacing hard-to-maintain legacy code with a typed, modular architecture, leaving a technical foundation that the team could extend and maintain without rewriting business logic.",
        "Automated emission calculation pipelines with structured JSON output, replacing a previously manual process, eliminating human intervention and associated transcription errors.",
      ],
    },
    {
      id: "qwavee-php",
      company: "Qwavee IT",
      role: "PHP Developer",
      period: "February 2022 – November 2022",
      location: "Tandil, Argentina",
      highlights: [
        "Executed the migration from Drupal 7 to Drupal 9 without service interruptions, preserving data integrity, permissions, and content structure throughout the process, completing the transition with zero downtime perceived by end users.",
        "Developed automation scripts for the migration process, replacing manual steps and reducing site downtime during the transition.",
        "Resolved complex post-migration errors, prioritizing critical user-facing functionality, stabilizing the system until it operated without incidents reported by the team.",
      ],
    },
  ],
};
