export interface EndpointConfig {
  id: string;
  label: string;
  baseLatency: number;
  errorRate: number;
}

export const dashboardMeta = {
  title: "\u2593 API_HEALTH_DASHBOARD",
  cta: "RUN_HEALTH_CHECK",
  uptime: "99.94",
  recoveryMsg: "SERVICE_RECOVERED",
};

export const endpoints: EndpointConfig[] = [
  { id: "users", label: "GET /users", baseLatency: 120, errorRate: 0.05 },
  { id: "orders", label: "POST /orders", baseLatency: 200, errorRate: 0.10 },
  { id: "inventory", label: "PUT /inventory", baseLatency: 150, errorRate: 0.08 },
  { id: "health", label: "GET /health", baseLatency: 45, errorRate: 0.02 },
];
