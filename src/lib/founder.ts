// Dados do fundador, usados na seção da home e na página /sobre.
// Fonte: perfil público do LinkedIn. Atualize aqui quando o perfil mudar.

export const FOUNDER = {
  name: "Edilson Oliveira",
  initials: "EO",
  role: "Fundador da EMC Soluções",
  headline: "Arquiteto de nuvem e engenheiro DevSecOps",
  location: "São Luís, Maranhão",
  linkedin: "https://www.linkedin.com/in/edilsonoliveirama",
  careerStartYear: 2015,
  bio: [
    "Antes de fundar a EMC, Edilson passou mais de uma década cuidando de infraestrutura que não pode parar: ambientes de nuvem de grandes empresas, órgãos públicos e operações com milhares de usuários.",
    "Essa experiência é o que chega ao seu negócio. A mesma disciplina de segurança, automação e controle de custos usada em projetos de grande porte, aplicada na medida de uma pequena ou média empresa.",
  ],
};

export const FOUNDER_STATS = [
  { value: new Date().getFullYear() - FOUNDER.careerStartYear, suffix: "+", label: "anos em infraestrutura, nuvem e DevOps" },
  { value: 4, suffix: "", label: "certificações Microsoft, incluindo Azure Solutions Architect Expert" },
  { value: 4, suffix: "", label: "nuvens no currículo: Azure, AWS, Oracle e Google" },
];

// Experiência consolidada por frente de atuação, sem cronologia nem nomes de empresas.
export const EXPERIENCE_INTRO = [
  "Mais de uma década mantendo no ar a tecnologia de operações que não podem parar, em telecom, óleo e gás, setor público e saúde. É esse padrão de exigência que a EMC leva para o seu negócio.",
];

export const SECTORS = ["Telecom", "Óleo e gás", "Setor público", "Saúde", "Software"];

export type ExperienceArea = {
  icon: "cloud" | "automation" | "security" | "monitoring" | "costs" | "infra";
  title: string;
  summary: string;
  highlights: string[];
  tools: string[];
};

export const EXPERIENCE_AREAS: ExperienceArea[] = [
  {
    icon: "cloud",
    title: "Nuvem que não para",
    summary: "Arquiteturas com redundância entre provedores, prontas para crescer junto com o negócio.",
    highlights: [
      "25% a mais de escalabilidade e disponibilidade em projetos entregues",
      "Mais de 500 usuários migrados para a nuvem sem perda de dados",
    ],
    tools: ["Azure", "AWS", "Oracle Cloud", "Google Cloud"],
  },
  {
    icon: "automation",
    title: "Entregas rápidas e seguras",
    summary: "Automação que tira o trabalho manual do caminho e coloca novas versões no ar sem susto.",
    highlights: [
      "Cada versão testada e auditada antes de ir ao ar",
      "Infraestrutura criada por código, fácil de repetir e ampliar",
    ],
    tools: ["Terraform", "GitLab CI", "Kubernetes", "Docker"],
  },
  {
    icon: "security",
    title: "Segurança desde o início",
    summary: "Dados protegidos e cada pessoa com acesso apenas ao que precisa.",
    highlights: [
      "Mais de 1.000 usuários protegidos em ambientes Microsoft 365",
      "Login único (SSO) e correção contínua de vulnerabilidades",
    ],
    tools: ["Microsoft 365", "Gestão de identidades"],
  },
  {
    icon: "monitoring",
    title: "Problemas vistos antes do cliente",
    summary: "Monitoramento em tempo real, com alerta e resposta antes da parada.",
    highlights: [
      "Sustentação de ambientes de missão crítica",
      "Painéis e alertas para redes, servidores e sistemas",
    ],
    tools: ["Prometheus", "Grafana", "Zabbix"],
  },
  {
    icon: "costs",
    title: "Custo sob controle",
    summary: "Nuvem dimensionada pelo uso real, sem pagar pelo que sobra.",
    highlights: [
      "Redução da fatura de nuvem com práticas de FinOps",
      "Gastos planejados desde o desenho da infraestrutura",
    ],
    tools: ["FinOps"],
  },
  {
    icon: "infra",
    title: "Base sólida",
    summary: "Do data center ao backup, a estrutura que mantém a operação de pé.",
    highlights: [
      "Montagem de data centers e virtualização de servidores",
      "Backup, recuperação e migração de dados",
    ],
    tools: ["VMware", "PostgreSQL"],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  featured?: boolean;
};

export const CERTIFICATIONS: Certification[] = [
  { name: "Azure Solutions Architect Expert", issuer: "Microsoft", featured: true },
  { name: "Microsoft Certified Trainer", issuer: "Microsoft", featured: true },
  { name: "Security, Compliance, and Identity Fundamentals", issuer: "Microsoft", featured: true },
  { name: "Azure Fundamentals (AZ-900)", issuer: "Microsoft", featured: true },
  { name: "Oracle Cloud Infrastructure Foundations Associate", issuer: "Oracle" },
];
