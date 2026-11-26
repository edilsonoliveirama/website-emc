import Image from "next/image";

// Logotipo oficial (Manual de Marca EMC, cap. 02). Geometria fixa: não recolorir, distorcer nem aplicar sombra.
// Versão branca sobre fundo escuro (padrão do site); versão Ink sobre fundo claro.
// Tamanho mínimo digital: 32px de altura (ideal 56px).
const RATIO = 600 / 273;

export default function BrandLogo({
  height = 36,
  variant = "branco",
  priority = false,
  className = "",
}: {
  height?: number;
  variant?: "branco" | "ink";
  priority?: boolean;
  className?: string;
}) {
  const h = Math.max(32, height);
  return (
    <Image
      src={`/brand/emc-logo-${variant}.png`}
      alt="EMC Soluções"
      width={Math.round(h * RATIO)}
      height={h}
      priority={priority}
      className={className}
      style={{ height: h, width: "auto" }}
    />
  );
}
