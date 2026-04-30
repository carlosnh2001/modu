export type FAQ = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  title: string;
  items: FAQ[];
};

export const faqs: FAQCategory[] = [
  {
    title: "Envío y entrega",
    items: [
      {
        question: "¿Cuánto tarda en llegar el sofá?",
        answer:
          "Entre 25 y 30 días desde que confirmas el pedido. Cada sofá Modu se fabrica bajo pedido en España, lo que garantiza la calidad de cada unidad.",
      },
      {
        question: "¿El envío tiene algún coste?",
        answer: "El envío es completamente gratuito a toda la Península.",
      },
      {
        question: "¿Cómo llega el sofá a casa?",
        answer:
          "Cada módulo llega en su propia caja de 1,10 × 1,10 m con el logo Modu. Las cajas están diseñadas para caber en ascensores y escaleras estándar. La entrega se realiza directamente en tu domicilio, no en la puerta del edificio.",
      },
      {
        question: "¿Enviáis a Baleares, Canarias, Ceuta o Melilla?",
        answer:
          "De momento solo realizamos envíos a la Península. Próximamente ampliaremos cobertura.",
      },
    ],
  },
  {
    title: "Montaje",
    items: [
      {
        question: "¿Necesito herramientas para montarlo?",
        answer:
          "No. El sistema de unión de Modu está diseñado para montarse sin ninguna herramienta.",
      },
      {
        question: "¿Cuánto tarda el montaje?",
        answer:
          "Menos de 15 minutos. Cada caja incluye instrucciones ilustradas.",
      },
      {
        question: "¿Y si necesito ayuda?",
        answer:
          "Puedes contactarnos por email o teléfono y te guiamos paso a paso.",
      },
    ],
  },
  {
    title: "Garantía y devoluciones",
    items: [
      {
        question: "¿Qué garantía tiene?",
        answer: "Todos los sofás Modu tienen 3 años de garantía legal.",
      },
      {
        question: "¿Puedo probarlo antes de comprarlo definitivamente?",
        answer:
          "Sí. Tienes 15 días desde la entrega para probarlo en casa. Si no estás satisfecho, lo recogemos sin coste adicional.",
      },
      {
        question: "¿Puedo devolver solo un módulo?",
        answer: "Contáctanos y buscamos la mejor solución para tu caso.",
      },
    ],
  },
  {
    title: "Módulos y configuración",
    items: [
      {
        question: "¿Puedo ampliar mi sofá después de comprarlo?",
        answer:
          "Sí. Puedes añadir módulos sueltos o el módulo chaise longue/esquina en cualquier momento. Son 100% compatibles entre sí.",
      },
      {
        question: "¿Puedo cambiar el tejido o el color más adelante?",
        answer:
          "Sí, vendemos fundas de repuesto por separado para respaldo y asiento.",
      },
      {
        question: "¿Son compatibles todos los módulos entre sí?",
        answer:
          "Sí, todos los módulos Modu usan el mismo sistema de unión y son compatibles entre ellos independientemente de cuándo los hayas comprado.",
      },
    ],
  },
  {
    title: "Tejidos y colores",
    items: [
      {
        question: "¿Qué tejidos están disponibles?",
        answer:
          "Trabajamos con tres familias de tejido: Bouclé, Lino y Algodón. Cada familia tiene diferentes opciones de color.",
      },
      {
        question: "¿Puedo pedir muestras antes de comprar?",
        answer:
          "Sí, totalmente gratis. Ve a la sección de muestras y te las enviamos en 2-3 días.",
      },
    ],
  },
  {
    title: "Showrooms",
    items: [
      {
        question: "¿Puedo ver el sofá en persona antes de comprarlo?",
        answer:
          "Sí. Tenemos showrooms en Madrid, Barcelona, Sevilla y Valencia. Escríbenos para concertar una visita.",
      },
      {
        question: "¿Puedo comprar en el showroom?",
        answer:
          "No. Los showrooms son espacios de exposición experiencial. La compra se realiza siempre a través de la web.",
      },
    ],
  },
  {
    title: "Pago",
    items: [
      {
        question: "¿Qué métodos de pago aceptáis?",
        answer:
          "Aceptamos Visa, Mastercard, Bizum y transferencia bancaria.",
      },
    ],
  },
];
