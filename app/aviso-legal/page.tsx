import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Aviso Legal · Modu",
  description: "Aviso legal e información corporativa de Modu Living, S.L.",
};

export default function AvisoLegalPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="modu-container max-w-3xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] mb-4">
          Aviso Legal
        </h1>
        <p className="text-sm text-[#9B9B90] mb-12">
          Última actualización: mayo de 2026
        </p>

        <div className="prose-modu">
          <p>
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
            Información y de Comercio Electrónico (LSSI-CE), Modu Living, S.L. informa a los usuarios
            del sitio web de los siguientes datos de información general:
          </p>

          <h2>1. Datos identificativos del titular</h2>
          <div className="bg-[#F2F1EC] border border-[#CEC8BA] rounded-xl p-6 not-prose mb-8">
            <dl className="space-y-2 text-sm">
              {[
                { label: "Denominación social", value: "Modu Living, S.L." },
                { label: "CIF", value: "Pendiente de registro" },
                { label: "Domicilio social", value: "España" },
                { label: "Teléfono", value: "681 367 902", href: "tel:+34681367902" },
                { label: "Email", value: "carlosnh2001@gmail.com", href: "mailto:carlosnh2001@gmail.com" },
                { label: "Sitio web", value: "modu-alpha.vercel.app" },
              ].map((item) => (
                <div key={item.label} className="flex gap-2">
                  <dt className="font-semibold text-[#1E1E1C] w-40 shrink-0">{item.label}</dt>
                  <dd className="text-[#9B9B90]">
                    {item.href ? (
                      <a href={item.href} className="hover:text-[#1E1E1C] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <h2>2. Objeto y ámbito de aplicación</h2>
          <p>
            El presente Aviso Legal regula el acceso y el uso del sitio web de Modu Living, S.L.,
            mediante el cual se ofrecen a los usuarios información sobre los productos y servicios de la
            empresa, así como la posibilidad de realizar solicitudes de contacto, muestras de tejido y
            configuración de productos.
          </p>
          <p>
            El acceso al sitio web y la utilización de los servicios ofrecidos a través del mismo
            implica la aceptación plena y sin reservas de todos los términos del presente Aviso Legal.
          </p>

          <h2>3. Propiedad intelectual e industrial</h2>
          <p>
            Todos los contenidos del sitio web de Modu Living, S.L., incluyendo, a título enunciativo
            pero no limitativo, textos, fotografías, gráficos, imágenes, iconos, tecnología, software,
            links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos
            fuente, son propiedad intelectual de Modu Living, S.L. o de terceros, sin que puedan
            entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la
            normativa vigente en materia de propiedad intelectual sobre los mismos.
          </p>
          <p>
            Queda expresamente prohibida la reproducción, distribución, comunicación pública,
            transformación o cualquier otro acto de explotación de los contenidos del sitio web, ya sea
            total o parcialmente, sin la autorización expresa y por escrito de Modu Living, S.L.
          </p>

          <h2>4. Responsabilidad</h2>
          <p>
            Modu Living, S.L. no se hace responsable del uso indebido del sitio web por parte de los
            usuarios, ni de los daños que pudieran derivarse del mismo. Asimismo, Modu Living, S.L. se
            reserva el derecho a interrumpir el acceso al sitio web en cualquier momento y sin previo
            aviso.
          </p>
          <p>
            Los contenidos del sitio web tienen carácter meramente informativo. Modu Living, S.L. no
            garantiza la exactitud, integridad o actualidad de la información contenida en el sitio web,
            y se reserva el derecho a modificarla en cualquier momento sin previo aviso.
          </p>

          <h2>5. Hipervínculos</h2>
          <p>
            El sitio web puede contener enlaces a sitios web de terceros. Modu Living, S.L. no asume
            ninguna responsabilidad por el contenido, la información o los servicios que puedan aparecer
            en dichos sitios, que tendrán exclusivamente carácter informativo y que en ningún caso
            implican relación alguna entre Modu Living, S.L. y las personas o entidades titulares de
            tales contenidos o titulares de los sitios donde se encuentren.
          </p>

          <h2>6. Legislación aplicable y jurisdicción</h2>
          <p>
            La relación entre Modu Living, S.L. y el usuario se regirá por la normativa española
            vigente. Para la resolución de cualquier controversia que pudiera derivarse del acceso o uso
            del sitio web, ambas partes se someten expresamente a la jurisdicción de los Juzgados y
            Tribunales españoles.
          </p>

          <h2>7. Modificaciones</h2>
          <p>
            Modu Living, S.L. se reserva el derecho de efectuar sin previo aviso las modificaciones que
            considere oportunas en el sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos
            y servicios que se presten a través de la misma como la forma en la que éstos aparezcan
            presentados o localizados en su sitio web.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-[#CEC8BA] flex flex-col sm:flex-row gap-4">
          <Link
            href="/politica-de-privacidad"
            className="inline-flex items-center text-sm font-medium text-[#1E1E1C] hover:text-[#7DAF96] transition-colors"
          >
            Política de Privacidad →
          </Link>
          <Link
            href="/politica-de-cookies"
            className="inline-flex items-center text-sm font-medium text-[#1E1E1C] hover:text-[#7DAF96] transition-colors"
          >
            Política de Cookies →
          </Link>
        </div>
      </div>
    </div>
  );
}
