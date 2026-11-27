// Clientes que autorizaram aparecer no site. Só adicione um cliente aqui com autorização dele.
export type Client = { name: string; logo: string; segment: string; href: string };

export const CLIENTS: Client[] = [
  { name: "Festou SLZ", logo: "/cases/festou/logo.webp", segment: "Atendimento com IA no WhatsApp", href: "/#cases" },
  { name: "Athena", logo: "/cases/athena/logo.png", segment: "Sistema sob medida para recrutamento", href: "/cases/athena" },
];

// Números oficiais do Manual de Marca EMC (cap. 01).
export const COMPANY_STATS = [
  { value: "14 anos", label: "de operação" },
  { value: "+120", label: "projetos entregues" },
  { value: "99,8%", label: "de SLA em nuvem" },
];
