import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQs — Preguntas frecuentes",
};

export default function FAQsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="modu-container max-w-3xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#9B9B90] mb-2">
          Ayuda
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1E1E1C] mb-4">
          Preguntas frecuentes
        </h1>
        <p className="text-[#9B9B90] text-sm leading-relaxed mb-14">
          Si no encuentras lo que buscas,{" "}
          <Link href="/contacto" className="underline text-[#1E1E1C] hover:opacity-60">
            escríbenos
          </Link>
          .
        </p>

        <div className="space-y-10">
          {faqs.map((category) => (
            <div key={category.title}>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-[#7DAF96] mb-4">
                {category.title}
              </h2>
              <Accordion className="border-t border-[#CEC8BA]">
                {category.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${category.title}-${i}`}
                    className="border-[#CEC8BA]"
                  >
                    <AccordionTrigger className="text-sm font-medium text-[#1E1E1C] py-4 text-left hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[#9B9B90] leading-relaxed pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
