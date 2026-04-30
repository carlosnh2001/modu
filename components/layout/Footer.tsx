import Link from "next/link";
import Image from "next/image";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.02a8.16 8.16 0 0 0 4.78 1.52V7.1a4.85 4.85 0 0 1-1.01-.41z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

const COLS = [
  {
    title: "Modelos",
    links: [
      { label: "Eira", href: "/tienda/eira" },
      { label: "Faro", href: "/tienda/faro" },
      { label: "Kano", href: "/tienda/kano" },
      { label: "Luma", href: "/tienda/luma" },
      { label: "Milo", href: "/tienda/milo" },
      { label: "Complementos", href: "/tienda#complementos" },
    ],
  },
  {
    title: "Información",
    links: [
      { label: "Por qué Modu", href: "/por-que-modu" },
      { label: "Showrooms", href: "/showrooms" },
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Muestras gratis", href: "/muestras" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "FAQs", href: "/faqs" },
      { label: "Contacto", href: "/contacto" },
      { label: "Envíos", href: "/faqs#envio" },
      { label: "Garantía", href: "/faqs#garantia" },
      { label: "Devoluciones", href: "/faqs#garantia" },
      { label: "Recogida sofá antiguo", href: "/contacto" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1C] text-[#F2F1EC] pt-16 pb-8">
      <div className="modu-container">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-[#F2F1EC]/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="relative h-8 w-28 mb-3">
              <Image src="/images/logo-modu.png" alt="MODU" fill className="object-contain object-left brightness-0 invert" />
            </div>
            <p className="text-sm text-[#9B9B90] leading-relaxed max-w-48">
              Sofás que se adaptan a tu vida.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              {[
                { icon: <InstagramIcon />, label: "Instagram" },
                { icon: <TikTokIcon />, label: "TikTok" },
                { icon: <PinterestIcon />, label: "Pinterest" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="text-[#9B9B90] hover:text-[#7DAF96] transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-4">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[#F2F1EC]/70 hover:text-[#7DAF96] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-[#9B9B90]">
          <p>© 2026 Modu · Fabricado en España</p>
          {/* Payment icons */}
          <div className="flex items-center gap-3">
            {["VISA", "MC", "Bizum"].map((p) => (
              <span
                key={p}
                className="border border-[#F2F1EC]/15 rounded px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#F2F1EC]/50"
              >
                {p}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#7DAF96] transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="hover:text-[#7DAF96] transition-colors">
              Cookies
            </a>
            <a href="#" className="hover:text-[#7DAF96] transition-colors">
              Términos y condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
