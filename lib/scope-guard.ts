const OFF_TOPIC_PATTERNS = [
  /receta|recipe|cocina?r?|cook/i,
  /codigo|write.*(?:function|sort|array|program)|programa.*(?:me|para)|hazme.*(?:un|una|script)|implement.*(?:function|class)/i,
  /resolve?r|solve|calcular|calcula|resolv|equation|ecuacion|derivada|integral|integrate|^2x/i,
  /traduc|translate/i,
  /poema|poem|cuento|story.*(?:about|de)|escribe.*(?:un|una|historia)/i,
  /noticia|news.*(?:today|hoy|latest)/i,
  /opinion.*(?:de|sobre|about|on)\s+(?!gustavo)/i,
  /clima|weather|temperatura|temperature/i,
  /precio|price.*(?:de|of|del)|cuanto.*cuesta|how much/i,
  /dolar|dollar|euro|bolsa|stock.*market/i,
  /juego|game|recomienda.*(?:juego|pelicula|movie|serie|show)/i,
];

export function checkScope(message: string): { allowed: boolean; reply?: string } {
  const trimmed = message.trim();

  if (!trimmed) {
    return { allowed: false, reply: "[EMPTY_MESSAGE] Please write a question about Gustavo Garozzo." };
  }

  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { allowed: false, reply: "I can only answer questions about Gustavo Garozzo's professional profile." };
    }
  }

  return { allowed: true };
}
