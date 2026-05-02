// ─── Fabric types ────────────────────────────────────────────────────────────

export type Fabric = {
  id: string;
  name: string;
  family: "Bouclé" | "Lino" | "Algodón";
  color: string;
  image: string;
  hex: string;
};

export const fabricFamilies = {
  bouce: {
    name: "Bouclé",
    description: "Textura rizada, cálida y resistente. Perfecta para el uso diario.",
    colors: [
      { id: "bora-02", color: "Arena",     hex: "#D4C9B0", image: "/images/fabrics/bora/malibu-02.webp" },
      { id: "bora-04", color: "Tiza",      hex: "#E8E2D8", image: "/images/fabrics/bora/malibu-04.webp" },
      { id: "bora-06", color: "Grafito",   hex: "#5A5A55", image: "/images/fabrics/bora/malibu-06.webp" },
      { id: "bora-07", color: "Sahara",    hex: "#C4A882", image: "/images/fabrics/bora/malibu-07.webp" },
      { id: "bora-08", color: "Pizarra",   hex: "#7A8080", image: "/images/fabrics/bora/malibu-08.webp" },
      { id: "bora-09", color: "Almendra",  hex: "#B89878", image: "/images/fabrics/bora/malibu-09.webp" },
      { id: "bora-10", color: "Niebla",    hex: "#9DA0A0", image: "/images/fabrics/bora/malibu-10.webp" },
      { id: "bora-16", color: "Ébano",     hex: "#3A3A38", image: "/images/fabrics/bora/malibu-16.webp" },
    ],
  },
  lino: {
    name: "Lino",
    description: "Natural, transpirable y con carácter. Mejora con el tiempo.",
    colors: [
      { id: "cora-04", color: "Natural",    hex: "#D8CDB8", image: "/images/fabrics/cora/aruba-04.jpeg" },
      { id: "cora-07", color: "Avena",      hex: "#C8BC9E", image: "/images/fabrics/cora/aruba-07.jpeg" },
      { id: "cora-09", color: "Camel",      hex: "#B89070", image: "/images/fabrics/cora/aruba-09.jpeg" },
      { id: "cora-10", color: "Tostado",    hex: "#A07850", image: "/images/fabrics/cora/aruba-10.jpeg" },
      { id: "cora-16", color: "Piel",       hex: "#C0A080", image: "/images/fabrics/cora/aruba-16.jpeg" },
      { id: "cora-19", color: "Terracota",  hex: "#B06848", image: "/images/fabrics/cora/aruba-19.jpeg" },
      { id: "cora-37", color: "Ceniza",     hex: "#909090", image: "/images/fabrics/cora/aruba-37.jpeg" },
      { id: "cora-50", color: "Medianoche", hex: "#2A2A28", image: "/images/fabrics/cora/aruba-50.jpeg" },
    ],
  },
  algodon: {
    name: "Algodón",
    description: "Suave, fresco y fácil de cuidar. Ideal para familias y climas cálidos.",
    colors: [
      { id: "lena-01", color: "Blanco Roto", hex: "#F0EDE5", image: "/images/fabrics/lena/monterrey-01.webp" },
      { id: "lena-03", color: "Marfil",      hex: "#E8E0D0", image: "/images/fabrics/lena/monterrey-03.webp" },
      { id: "lena-05", color: "Salvia",      hex: "#90A890", image: "/images/fabrics/lena/monterrey-05.webp" },
      { id: "lena-06", color: "Agua",        hex: "#A0B8B8", image: "/images/fabrics/lena/monterrey-06.webp" },
      { id: "lena-08", color: "Slate",       hex: "#788898", image: "/images/fabrics/lena/monterrey-08.webp" },
      { id: "lena-09", color: "Noche",       hex: "#383838", image: "/images/fabrics/lena/monterrey-09.webp" },
      { id: "lena-11", color: "Rosa Polvo",  hex: "#D8B8B0", image: "/images/fabrics/lena/monterrey-11.webp" },
      { id: "lena-13", color: "Mostaza",     hex: "#C8A848", image: "/images/fabrics/lena/monterrey-13.webp" },
    ],
  },
};

export const allFabrics: Fabric[] = [
  ...fabricFamilies.bouce.colors.map((c) => ({ ...c, family: "Bouclé" as const, name: c.color })),
  ...fabricFamilies.lino.colors.map((c) => ({  ...c, family: "Lino" as const,   name: c.color })),
  ...fabricFamilies.algodon.colors.map((c) => ({ ...c, family: "Algodón" as const, name: c.color })),
];

// ─── Configuration (format / size) ───────────────────────────────────────────

export type ConfigKey = "compact" | "urban" | "family";

export type Configuration = {
  id: ConfigKey;
  name: string;
  tagline: string;
  price: number;
  composition: string;
  modules: number;
  assembly: string;
  dimensions: {
    width: string;
    depth: string;
    height: string;
    seatHeight: string;
    note?: string;
  };
  image: string;
  badge?: string;
  covers: string;
};

export const CONFIGURATIONS: Configuration[] = [
  {
    id: "compact",
    name: "Compact",
    tagline: "Para espacios donde cada centímetro importa",
    price: 725,
    composition: "2 asientos + 2 brazos",
    modules: 4,
    assembly: "Sin herramientas. Máximo 15 minutos.",
    dimensions: { width: "220 cm", depth: "105 cm", height: "90 cm", seatHeight: "42 cm" },
    image: "/images/formatos/compact.png",
    covers: "Funda de asiento y respaldo desenfundable y reversible. Dale la vuelta al cojín para aprovechar ambas caras y doblar la vida útil del tapizado.",
  },
  {
    id: "urban",
    name: "Urban",
    tagline: "El equilibrio perfecto para el piso de hoy",
    price: 1150,
    composition: "3 asientos + 2 brazos",
    modules: 5,
    assembly: "Sin herramientas. Máximo 15 minutos.",
    dimensions: { width: "310 cm", depth: "105 cm", height: "90 cm", seatHeight: "42 cm" },
    image: "/images/formatos/urban.png",
    badge: "Más vendido",
    covers: "Funda de asiento y respaldo desenfundable y reversible. Dale la vuelta al cojín para aprovechar ambas caras y doblar la vida útil del tapizado.",
  },
  {
    id: "family",
    name: "Family",
    tagline: "Para cuando no quieres elegir",
    price: 1600,
    composition: "3 asientos + chaise longue o esquina + 2 brazos",
    modules: 6,
    assembly: "Sin herramientas. Máximo 15 minutos.",
    dimensions: {
      width: "310 cm",
      depth: "Variable según configuración",
      height: "90 cm",
      seatHeight: "42 cm",
      note: "El largo es 310 cm. El fondo varía según si se elige chaise longue o esquina.",
    },
    image: "/images/formatos/family.png",
    covers: "Funda de asiento y respaldo desenfundable y reversible. Dale la vuelta al cojín para aprovechar ambas caras y doblar la vida útil del tapizado.",
  },
];

// ─── Models (5 sofá lines) ────────────────────────────────────────────────────

export type SofaModel = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  scenario: string;
  priceFrom: number;           // always 725 (Compact)
  images: { principal: string; secondary: string };
  configurations: Configuration[];
  fabrics: Fabric[];
};

export const sofaModels: SofaModel[] = [
  {
    id: "eira",
    slug: "eira",
    name: "Eira",
    tagline: "Líneas limpias, confort sin concesiones",
    description: "El Eira combina una silueta contemporánea con la flexibilidad del sistema Modu. Brazos bajos, asiento generoso y perfil recto que encaja en cualquier espacio.",
    scenario: "Salones modernos y espacios con vocación minimalista",
    priceFrom: 725,
    images: { principal: "/images/products/eira-principal.png", secondary: "/images/products/eira-secundaria.png" },
    configurations: CONFIGURATIONS,
    fabrics: allFabrics,
  },
  {
    id: "faro",
    slug: "faro",
    name: "Faro",
    tagline: "Carácter propio para el salón que te define",
    description: "El Faro tiene personalidad desde el primer vistazo. Brazos robustos, tapizado con volumen y una presencia que da carácter a cualquier estancia.",
    scenario: "Salones con carácter, amantes del diseño con fondo",
    priceFrom: 725,
    images: { principal: "/images/products/faro-principal.png", secondary: "/images/products/faro-secundaria.png" },
    configurations: CONFIGURATIONS,
    fabrics: allFabrics,
  },
  {
    id: "kano",
    slug: "kano",
    name: "Kano",
    tagline: "Amplitud y comodidad en cada centímetro",
    description: "El Kano es el modelo con mayor profundidad de asiento de la familia Modu. Pensado para quien busca hundirse en el sofá después de un largo día.",
    scenario: "Familias, amantes del confort y salones amplios",
    priceFrom: 725,
    images: { principal: "/images/products/kano-principal.png", secondary: "/images/products/kano-secundaria.png" },
    configurations: CONFIGURATIONS,
    fabrics: allFabrics,
  },
  {
    id: "luma",
    slug: "luma",
    name: "Luma",
    tagline: "Ligero, versátil, siempre en su sitio",
    description: "El Luma tiene un perfil esbelto que no ocupa visualmente el espacio. Brazos delgados, patas altas y una presencia que hace las habitaciones más grandes.",
    scenario: "Pisos pequeños, espacios con poca luz y salones abiertos",
    priceFrom: 725,
    images: { principal: "/images/products/luma-principal.png", secondary: "/images/products/luma-secundaria.png" },
    configurations: CONFIGURATIONS,
    fabrics: allFabrics,
  },
  {
    id: "milo",
    slug: "milo",
    name: "Milo",
    tagline: "El sofá que invita a quedarse",
    description: "El Milo tiene el asiento más bajo de la familia, con una postura más reclinada y acolchado extra en respaldo y asiento. El más achuchable de los cinco.",
    scenario: "Para quien pone el confort por encima de todo",
    priceFrom: 725,
    images: { principal: "/images/products/milo-principal.png", secondary: "/images/products/milo-secundaria.png" },
    configurations: CONFIGURATIONS,
    fabrics: allFabrics,
  },
];

// ─── Complementos ─────────────────────────────────────────────────────────────

export type CojinSize = {
  id: string;
  label: string;
  price: number;
  image: string;
  dimensions: string;
};

export const COJIN_SIZES: CojinSize[] = [
  { id: "45x45", label: "45 × 45 cm", price: 49, image: "/images/complementos/cojin-45x45.png", dimensions: "45 × 45 cm" },
  { id: "50x50", label: "50 × 50 cm", price: 54, image: "/images/complementos/cojin-50x50.png", dimensions: "50 × 50 cm" },
  { id: "55x55", label: "55 × 55 cm", price: 59, image: "/images/complementos/cojin-55x55.png", dimensions: "55 × 55 cm" },
];

export type Complemento = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  secondaryImage?: string;
  fabrics: Fabric[];
  isCojin?: boolean;
};

export const complementos: Complemento[] = [
  {
    id: "modulo-suelto",
    slug: "modulo-suelto",
    name: "Módulo recto",
    tagline: "Amplía cuando tú decidas",
    description: "Un módulo de asiento adicional compatible con cualquier configuración Modu. Añádelo cuando cambies de piso o necesites más espacio.",
    price: 380,
    image: "/images/complementos/modulo-suelto.png",
    fabrics: allFabrics,
  },
  {
    id: "chaise-longue",
    slug: "chaise-longue",
    name: "Chaise Longue",
    tagline: "El complemento definitivo para el descanso",
    description: "Transforma tu Modu en un sofá con chaise longue. Encaja a la perfección con todos los modelos y se monta sin herramientas en minutos.",
    price: 480,
    image: "/images/complementos/chaise-longue.png",
    fabrics: allFabrics,
  },
  {
    id: "rincon",
    slug: "rincon",
    name: "Módulo rincón",
    tagline: "Configura tu sofá en L",
    description: "El módulo rincón te permite crear una configuración en L con cualquier modelo Modu. Compatible con todos los modelos y configuraciones.",
    price: 480,
    image: "/images/complementos/rincon.png",
    fabrics: allFabrics,
  },
  {
    id: "cojin-decorativo",
    slug: "cojin-decorativo",
    name: "Cojín decorativo",
    tagline: "El detalle que completa tu Modu",
    description: "Cojín decorativo con funda desenfundable en los mismos tejidos que tu sofá. Relleno de fibra siliconada virgen para un tacto suave y duradero. Disponible en tres medidas.",
    price: 49,
    image: "/images/complementos/cojin-principal.png",
    secondaryImage: "/images/complementos/cojin-50x50.png",
    fabrics: allFabrics,
    isCojin: true,
  },
];

// ─── Spare parts ──────────────────────────────────────────────────────────────

export const spareparts = [
  { name: "Funda de respaldo",     price: 41 },
  { name: "Funda de asiento",      price: 44 },
  { name: "Relleno de respaldo",   price: 53 },
  { name: "Espuma de asiento",     price: 65 },
  { name: "Sustitución de brazo",  price: 75 },
  { name: "Retapizado completo",   price: null, label: "Bajo presupuesto" },
  { name: "Retapizado estructura", price: null, label: "Bajo presupuesto" },
];

// ─── Legacy compat (used by home sections) ────────────────────────────────────
// Maps to the old Product shape so Hero / ProductsGrid keep working

export type Product = {
  id: string; slug: string; name: string; tagline: string;
  composition: string; price: number; badge: string | null;
  scenario: string; description: string;
  dimensions: { width: string; depth: string; height: string; seatHeight: string; note?: string };
  modules: number; assembly: string; inStock: boolean;
  images: { principal: string; secondary: string };
  fabrics: Fabric[];
};

export const products: Product[] = sofaModels.map((m) => ({
  id: m.id, slug: m.slug, name: m.name, tagline: m.tagline,
  composition: CONFIGURATIONS[0].composition,
  price: m.priceFrom, badge: null,
  scenario: m.scenario, description: m.description,
  dimensions: CONFIGURATIONS[0].dimensions,
  modules: CONFIGURATIONS[0].modules, assembly: CONFIGURATIONS[0].assembly,
  inStock: true,
  images: m.images, fabrics: m.fabrics,
}));
