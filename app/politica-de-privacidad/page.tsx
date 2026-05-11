import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad · Modu",
  description: "Información sobre el tratamiento de datos personales por Modu Living, S.L.",
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="modu-container max-w-3xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] mb-4">
          Política de Privacidad
        </h1>
        <p className="text-sm text-[#9B9B90] mb-12">
          Última actualización: mayo de 2026
        </p>

        <div className="prose-modu">
          <p>
            Información sobre nuestra política de protección de datos y política de privacidad:
          </p>
          <p>
            Modu Living, S.L. cumple con las obligaciones impuestas en el Reglamento (UE) 2016/679 del
            Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las
            personas físicas y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
            Personales y garantía de los derechos digitales, en lo que respecta al tratamiento de datos
            personales y demás legislación que le sea aplicable, así como la normativa vigente en cada
            momento que resulte de aplicación, garantizando la observancia de todas las obligaciones y
            derechos de los afectados en cuanto al tratamiento de datos personales.
          </p>
          <p>
            Asimismo, dando cumplimiento a lo dispuesto en la Ley 34/2002, de 11 de julio, de Servicios
            de la Sociedad de la Información y de Comercio Electrónico, Modu Living, S.L. solicitará al
            usuario consentimiento previo para el envío de comunicaciones comerciales, en caso de que las
            mismas tuvieran lugar, observando igualmente todas las obligaciones y derechos de los usuarios.
          </p>
          <p>
            En virtud de lo anterior, se informará a los usuarios que deseen hacer uso de los distintos
            servicios ofrecidos por Modu Living, S.L. de la información correspondiente a la
            identificación del responsable del fichero, finalidades del tratamiento de sus datos, así como
            de la posibilidad de ejercer los derechos de acceso, rectificación, cancelación y oposición
            ante el responsable del fichero, todo ello mediante la lectura y previa aceptación de la
            política de privacidad de la entidad, quedando debidamente informados.
          </p>

          <h2>1. Responsable del tratamiento de datos</h2>
          <div className="bg-[#F2F1EC] border border-[#CEC8BA] rounded-xl p-6 not-prose mb-8">
            <dl className="space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="font-semibold text-[#1E1E1C] w-24 shrink-0">Empresa</dt>
                <dd className="text-[#9B9B90]">Modu Living, S.L.</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-[#1E1E1C] w-24 shrink-0">CIF</dt>
                <dd className="text-[#9B9B90]">Pendiente de registro</dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-[#1E1E1C] w-24 shrink-0">Teléfono</dt>
                <dd className="text-[#9B9B90]">
                  <a href="tel:+34681367902" className="hover:text-[#1E1E1C] transition-colors">
                    681 367 902
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="font-semibold text-[#1E1E1C] w-24 shrink-0">Email</dt>
                <dd className="text-[#9B9B90]">
                  <a href="mailto:carlosnh2001@gmail.com" className="hover:text-[#1E1E1C] transition-colors">
                    carlosnh2001@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <h2>2. Finalidad del tratamiento de datos</h2>
          <p>
            La finalidad principal del tratamiento de sus datos personales se corresponde la posibilidad
            de entablar comunicaciones con usted a fin de atender a su solicitud de contacto por el
            formulario habilitado a tal fin, o bien para atender la relación comercial que usted
            solicite. Sus datos personales serán conservados para su tratamiento en nuestros sistemas en
            tanto se mantenga la relación con nuestra entidad.
          </p>
          <p>
            Adicionalmente, en caso de haberlo autorizado expresamente, sus datos serán tratados con el
            fin de poder remitirle por cualquier medio, incluidos los electrónicos, comunicaciones
            comerciales informándole sobre los distintos productos y/o servicios ofrecidos por Modu
            Living, S.L.
          </p>
          <p>
            Podrá revocar los consentimientos otorgados a su simple solicitud dirigiéndose a Modu
            Living, S.L. a cualquiera de las direcciones referenciadas en el punto 1 de la presente
            cláusula, en el que se indican los datos de contacto de la entidad.
          </p>

          <h2>3. Legitimación para el tratamiento de sus datos</h2>
          <p>
            El tratamiento de sus datos para la finalidad principal se encuentra legitimado en base a la
            relación contractual establecida entre las partes, y para la finalidad adicional en el
            consentimiento por usted prestado utilizando los formularios de contacto destinados a tal fin
            por Modu Living, S.L., para lo cual deberá habernos proporcionado los datos requeridos en
            los campos obligatorios, esto es, sus datos identificativos y de contacto, sin los cuales no
            podremos gestionar su petición.
          </p>
          <p>
            Al facilitarnos sus datos, declara que usted es titular de los mismos, que son veraces y se
            encuentran totalmente actualizados. Los datos recabados en el formulario son adecuados,
            pertinentes y no excesivos en relación a las finalidades de su tratamiento, conforme a lo
            indicado en el punto 2 de la presente cláusula. Asimismo, Modu Living, S.L. cancelará o
            rectificará los datos cuando resulten inexactos, incompletos o hayan dejado de ser necesarios
            o pertinentes para su finalidad.
          </p>
          <p>
            En virtud de lo anterior, los datos serán conservados para su tratamiento en nuestros
            sistemas mientras se mantenga dicha relación con la finalidad indicada o bien por motivos
            legítimos imperiosos, o el ejercicio o la defensa de posibles reclamaciones. Una vez cesada
            la obligación de conservación, sus datos podrán ser eliminados de nuestra base de datos o,
            en su caso, anonimizados.
          </p>
          <p>
            El tratamiento de los datos con el fin de remitir boletines electrónicos sobre servicios,
            eventos y noticias relacionadas con nuestra actividad profesional, se basa en el interés
            legítimo de Modu Living, S.L. para llevar a cabo dichos tratamientos de acuerdo con la
            normativa vigente. Sus datos se mantendrán mientras exista la relación comercial, su interés
            y no exista revocación por su parte.
          </p>

          <h2>4. Destinatarios de sus datos</h2>
          <p>
            Puede haber cesiones entre las entidades de las que es titular Modu Living, S.L. en aras del
            interés legítimo corporativo, para poder prestar los servicios solicitados.
          </p>
          <p>
            No se cederán datos a otros terceros, salvo obligación legal. No tendrán lugar
            transferencias internacionales de datos, con la excepción de que Modu Living, S.L. pueda
            contratar los servicios de proveedores ubicados en terceros países, previo cumplimiento de
            todos los requisitos establecidos por la normativa de protección de datos y aplicando las
            garantías y salvaguardas necesarias para preservar la privacidad de los datos.
          </p>
          <p>
            Para más información sobre las garantías a la privacidad, podrá dirigirse a nuestra entidad,
            a las direcciones indicadas en el punto 1.
          </p>

          <h2>5. Derechos de los afectados</h2>
          <p>
            Tras facilitarnos sus datos personales, le informamos de los derechos que podrá ejercitar
            ante Modu Living, S.L. en las direcciones puestas a su disposición en el punto 1 de la
            presente cláusula, y que le asisten:
          </p>
          <ul>
            <li>
              Tiene derecho a acceder a todos los datos personales que esté en posesión de Modu Living,
              S.L., así como solicitar la modificación de los mismos o su supresión.
            </li>
            <li>
              Podrá solicitarnos que limitemos el tratamiento de sus datos, en cuyo caso sólo los
              conservaremos para el ejercicio o la defensa de reclamaciones.
            </li>
            <li>
              Podrá oponerse al tratamiento de sus datos personales, por lo que Modu Living, S.L. dejará
              de tratar sus datos salvo por motivos legítimos imperiosos, o el ejercicio o la defensa de
              posibles reclamaciones.
            </li>
            <li>
              Podrá solicitar la portabilidad de sus datos personales, en cuyo caso le enviaremos los
              datos personales que figuren en nuestras bases de datos por correo electrónico a la
              dirección que nos proporcione en su solicitud, en formato texto, legible y adaptable a las
              necesidades de cualquier otro responsable del tratamiento.
            </li>
            <li>
              Tiene derecho a no ser objeto de una decisión basada únicamente en el tratamiento de datos
              automatizados, incluida la elaboración de perfiles.
            </li>
            <li>
              También podrá retirar o revocar los consentimientos que hubiera prestado de manera expresa,
              indicándolo en su solicitud.
            </li>
          </ul>
          <p>
            Los derechos de los afectados podrán ejercerse directamente por el interesado, aportando
            fotocopia del DNI o documento equivalente, a fin de acreditar su identidad o bien mediante
            representación legal o voluntaria.
          </p>

          <h2>6. Reclamaciones</h2>
          <p>
            Si considera que el tratamiento de sus datos personales vulnera la normativa o lo dispuesto
            en la presente cláusula, puede presentar una reclamación ante la Agencia Española de
            Protección de Datos, que es la autoridad de control competente en la protección de sus datos
            personales, a través de su sede electrónica o de su dirección postal que podrá consultar
            en{" "}
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7DAF96] hover:underline"
            >
              www.aepd.es
            </a>
            .
          </p>

          <div className="bg-[#CEC8BA]/25 border border-[#CEC8BA] rounded-xl p-6 not-prose mb-8">
            <p className="text-sm text-[#9B9B90] leading-relaxed">
              Si las consideraciones detalladas en esta Política de Privacidad no son de su conformidad,
              rogamos no haga uso del Portal, ya que cualquier uso que haga del mismo o de los servicios
              y contenidos en él incluidos implicará la aceptación de los términos legales recogidos en
              este texto.
            </p>
            <p className="text-sm text-[#9B9B90] leading-relaxed mt-3">
              Las condiciones y términos que se recogen en la presente Política de Privacidad pueden
              variar, por lo que le invitamos a que revise estos términos cuando visite de nuevo el
              Portal.
            </p>
          </div>

          <p>
            Modu Living, S.L. puede utilizar cookies cuando un usuario navega por sus sitios y páginas
            web. Puede consultar nuestra{" "}
            <Link
              href="/politica-de-cookies"
              className="text-[#7DAF96] font-medium hover:underline"
            >
              Política de Cookies
            </Link>
            .
          </p>
        </div>

        {/* Navigation links */}
        <div className="mt-16 pt-8 border-t border-[#CEC8BA] flex flex-col sm:flex-row gap-4">
          <Link
            href="/politica-de-cookies"
            className="inline-flex items-center text-sm font-medium text-[#1E1E1C] hover:text-[#7DAF96] transition-colors"
          >
            Política de Cookies →
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
