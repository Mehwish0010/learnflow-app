/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "intro",
    {
      type: "category",
      label: "Getting Started",
      items: ["getting-started/prerequisites", "getting-started/setup", "getting-started/quick-start"],
    },
    {
      type: "category",
      label: "Architecture",
      items: ["architecture/overview", "architecture/microservices", "architecture/event-driven"],
    },
    {
      type: "category",
      label: "Skills Reference",
      items: [
        "skills/overview",
        "skills/kafka-k8s-setup",
        "skills/postgres-k8s-setup",
        "skills/fastapi-dapr-agent",
        "skills/nextjs-k8s-deploy",
        "skills/mcp-code-execution",
        "skills/docusaurus-deploy",
      ],
    },
    {
      type: "category",
      label: "API Reference",
      items: ["api/triage", "api/agents", "api/events"],
    },
  ],
};

module.exports = sidebars;
