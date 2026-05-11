import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies · Modu",
  description: "Información sobre el uso de cookies en el sitio web de Modu Living, S.L.",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="modu-container max-w-3xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] mb-4">
          Política de Cookies
        </h1>
        <p className="text-sm text-[#9B9B90] mb-12">
          Última actualización: mayo de 2026
        </p>

        <div className="prose-modu">
          <p>
            En cumplimiento con lo establecido con la Ley de Servicios de la Información y del Comercio
            Electrónico, y en adecuación con la Directiva Europea 2009/136/CE, y las revisiones del
            Comité Europeo en las Directrices 05/2020 sobre consentimiento, el sitio web procede a
            informarle del uso de cookies, así como de que usted presta el consentimiento a la
            continuación de ese uso por el mero hecho de seguir navegando en este portal web.
          </p>
          <p>
            Las cookies son pequeños ficheros que se descargan y almacenan en el equipo de un usuario al
            acceder a determinadas webs, con el fin de almacenar la información de la navegación para
            facilitarla, reconociendo el equipo, el navegador, o recopilando datos con fines
            estadísticos. En ningún caso se trata de virus o sistemas perjudiciales para el usuario.
          </p>
          <p>
            Mediante la aceptación del anuncio de cookies que aparece al comienzo de la navegación en el
            sitio web o mediante la configuración de las cookies de este sitio, aceptas de manera expresa
            la utilización de dichas cookies en tus dispositivos. Si desactivas las cookies, puede que su
            navegación por el Sitio Web no sea óptima y algunas de las utilidades de que dispone el Sitio
            Web no funcionen correctamente.
          </p>

          <h2>Tipos de cookies (fuente: AEPD)</h2>

          <h3>1. Según la entidad que las gestione</h3>
          <p>
            <strong>Cookies propias:</strong> Son aquéllas que se envían al equipo terminal del usuario
            desde un equipo o dominio gestionado por el propio editor y desde el que se presta el
            servicio solicitado por el usuario.
          </p>
          <p>
            <strong>Cookies de tercero:</strong> Son aquéllas que se envían al equipo terminal del
            usuario desde un equipo o dominio que no es gestionado por el editor, sino por otra entidad
            que trata los datos obtenidos a través de las cookies.
          </p>

          <h3>2. Según el plazo de tiempo que permanecen activadas</h3>
          <p>
            <strong>Cookies de sesión:</strong> Son un tipo de cookies diseñadas para recabar y
            almacenar datos mientras el usuario accede a una página web. Se suelen emplear para
            almacenar información que solo interesa conservar para la prestación del servicio solicitado
            por el usuario en una sola ocasión.
          </p>
          <p>
            <strong>Cookies persistentes:</strong> Son un tipo de cookies en el que los datos siguen
            almacenados en el terminal y pueden ser accedidos y tratados durante un periodo definido por
            el responsable de la cookie, y que puede ir de unos minutos a varios años.
          </p>

          <h3>3. Según su finalidad</h3>
          <p>
            <strong>Cookies técnicas:</strong> Son aquéllas que permiten al usuario la navegación a
            través de una página web, plataforma o aplicación y la utilización de las diferentes opciones
            o servicios que en ella existan, como controlar el tráfico y la comunicación de datos,
            identificar la sesión, acceder a partes de acceso restringido, recordar los elementos que
            integran un pedido, realizar el proceso de compra, utilizar elementos de seguridad durante la
            navegación o compartir contenidos a través de redes sociales.
          </p>
          <p>
            <strong>Cookies de personalización:</strong> Son aquéllas que permiten al usuario acceder al
            servicio con algunas características de carácter general predefinidas en función de una serie
            de criterios en el terminal del usuario, como el idioma, el tipo de navegador o la
            configuración regional.
          </p>
          <p>
            <strong>Cookies de análisis:</strong> Son aquéllas que permiten al responsable de las mismas,
            el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que
            están vinculadas. La información recogida mediante este tipo de cookies se utiliza en la
            medición de la actividad de los sitios web y para la elaboración de perfiles de navegación de
            los usuarios.
          </p>

          <h2>4. Cookies técnicas</h2>
          <p>
            Las cookies técnicas son esenciales para que te puedas mover por una página web y usar sus
            funciones. Al ser necesarias para el funcionamiento del sitio, estas cookies por defecto
            estarán activadas y no podrán denegarse.
          </p>
          <p>Este sitio utiliza cookies técnicas necesarias para:</p>
          <ul>
            <li>Garantizar una navegación segura y sin interrupciones por nuestro sitio web.</li>
            <li>
              Guardar las preferencias del usuario con respecto a la configuración, aceptación o rechazo
              de las cookies del sitio.
            </li>
            <li>Mantener el estado del carrito de la compra durante la sesión de navegación.</li>
          </ul>

          <h2>5. Cookies analíticas</h2>
          <p>
            Estas cookies permiten realizar un seguimiento y análisis del comportamiento de los usuarios
            que navegan en el sitio web. La información recogida se utiliza en la medición de la
            actividad con el fin de introducir mejoras.
          </p>

          {/* Cookies table */}
          <div className="not-prose overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#1E1E1C] text-[#F2F1EC]">
                  <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider">Cookie</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider">Finalidad</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold tracking-wider">Propietario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CEC8BA]">
                {[
                  {
                    cookie: "modu_cookie_consent",
                    purpose: "Almacena la preferencia de aceptación o rechazo de cookies del usuario. Duración: 1 año.",
                    owner: "Modu Living, S.L. (cookie propia)",
                  },
                  {
                    cookie: "NID",
                    purpose: "Recoger información para el buscador de Google incluido en la web. Incluido el uso de Google Maps. Cookies persistentes.",
                    owner: "Google",
                  },
                  {
                    cookie: "_ga, _gat, _gid",
                    purpose: "Cookies utilizadas por Google Analytics que contienen un identificador anónimo usado para distinguir usuarios. Son de carácter analítico y estadístico.",
                    owner: "Google Analytics",
                  },
                  {
                    cookie: "Gat_gtag_UA",
                    purpose: "Incluye información de la campaña relativa al usuario. Duración de 90 días.",
                    owner: "Google",
                  },
                  {
                    cookie: "Optanonalertboxclosed, optanonconsent",
                    purpose: "Cookies instaladas por el módulo de gestión de cookies, que se utilizan para almacenar y determinar las selecciones del usuario. Duración un año.",
                    owner: "OneTrust",
                  },
                ].map((row) => (
                  <tr key={row.cookie} className="hover:bg-[#F2F1EC]/50">
                    <td className="px-4 py-3 font-mono text-xs text-[#1E1E1C] align-top whitespace-nowrap">
                      {row.cookie}
                    </td>
                    <td className="px-4 py-3 text-[#9B9B90] leading-relaxed align-top">
                      {row.purpose}
                    </td>
                    <td className="px-4 py-3 text-[#1E1E1C] font-medium align-top whitespace-nowrap">
                      {row.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Control y eliminación de cookies</h2>
          <p>
            Con el módulo de configuración de cookies, tienes la posibilidad de rechazar o aceptar
            cookies que requieran de tu consentimiento. También puedes bloquear y eliminar cookies
            cambiando la configuración de tu navegador.
          </p>
          <p>
            De igual manera, puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo
            mediante la configuración de las opciones del navegador instalado en tu ordenador:
          </p>

          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              {
                browser: "Firefox",
                url: "https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web",
              },
              {
                browser: "Chrome",
                url: "https://support.google.com/accounts/answer/61416?hl=es",
              },
              {
                browser: "Internet Explorer",
                url: "https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies",
              },
              {
                browser: "Safari",
                url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
              },
              {
                browser: "Opera",
                url: "https://help.opera.com/Windows/11.50/es-ES/cookies.html",
              },
            ].map((b) => (
              <a
                key={b.browser}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 border border-[#CEC8BA] rounded-lg text-sm text-[#1E1E1C] hover:border-[#7DAF96] hover:text-[#7DAF96] transition-colors"
              >
                <span className="font-medium">{b.browser}</span>
                <span className="text-[#9B9B90] text-xs ml-auto">Ver instrucciones →</span>
              </a>
            ))}
          </div>

          <p>
            Si deseas limitar el uso de cookies, puede que no puedas utilizar todas las funciones
            interactivas de nuestro sitio web.
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
            href="/aviso-legal"
            className="inline-flex items-center text-sm font-medium text-[#1E1E1C] hover:text-[#7DAF96] transition-colors"
          >
            Aviso Legal →
          </Link>
        </div>
      </div>
    </div>
  );
}
