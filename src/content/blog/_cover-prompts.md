# Prompts de imagem de capa — posts do blog

Estilo base (repetir em todos, mudando só o conceito central):

> Dark, minimal tech illustration, deep navy-black background (#06080f),
> abstract geometric shapes in electric blue (#5b8cff) and violet (#7c5cff)
> gradients, thin glowing grid lines, soft ambient glow, no text, no logos,
> no people's faces, high contrast, subtle noise texture, wide 1200x630
> aspect ratio, clean corporate tech aesthetic similar to modern SaaS landing
> pages.

Prompt completo por post (concatenar com o estilo base acima):

## api-gateway-llm-para-pmes
"A single glowing hub node in the center connecting to multiple smaller
nodes around it via thin light-blue lines, representing one gateway
distributing to many systems, abstract network diagram style."

## integrar-erp-crm-sem-retrabalho
"Two abstract geometric shapes (representing two separate systems) connected
by a flowing glowing line/bridge between them, data particles moving along
the connection, symbolizing systems syncing."

## chatbot-vs-agente-de-ia
"Split composition: left half shows a rigid geometric flowchart/tree
structure in blue, right half shows an organic branching neural-network-like
pattern in violet, divided by a soft glowing vertical line down the middle."

## ia-nao-substitui-processo-ruim
"A tangled, chaotic knot of thin glowing lines on one side gradually
resolving into clean parallel organized lines on the other side, symbolizing
disorder becoming structure, gradient from violet to blue."

## planilha-excel-virou-gargalo
"An abstract grid of small glowing cells/squares (like a spreadsheet)
overflowing and breaking apart at the edges into scattered fragments,
tension between order and overflow, blue grid dissolving into violet
particles."

## nota-fiscal-automatica-erp-ecommerce
"An abstract geometric document/paper shape with a glowing checkmark or
seal, connected by a flowing line to a small cart/package shape, symbolizing
automatic document generation from a transaction, clean iconographic style,
no readable text on the document."

## mvp-em-semanas-nao-meses
"A small, minimal glowing geometric seedling or arrow shape rapidly
ascending/growing through a few clean stepped platforms, symbolizing fast
iterative progress, motion blur trail in blue-violet gradient."

---

Uso: gerar em 1200x630 (OG image), salvar como
`public/blog/<slug>.png`, referenciar no frontmatter do post via
`coverImage: "/blog/<slug>.png"`.
