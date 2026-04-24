import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors, WA_URL, IconWhatsApp } from "./constants";

const accommodations = [
  {
    id: "casarao",
    title: "O Casarão Centenário",
    headline: "A Nostalgia de uma Fazenda Viva.",
    description: "Mais que uma hospedagem, uma imersão na arquitetura original de 100 anos, totalmente revitalizada. O Casarão dos Pireneus oferece o equilíbrio perfeito entre o rústico autêntico e a conveniência moderna.",
    features: [
      "Privacidade absoluta para o seu grupo ou família",
      "Suítes climatizadas com enxoval premium",
      "Cozinha de fazenda e amplas áreas de convivência"
    ],
    image: "assets/quarto_beliche_familia.webp",
    ctaLabel: "casarao_whatsapp"
  },
  {
    id: "chale-1",
    title: "Chalé Premium 1",
    headline: "Refúgio Particular para Momentos a Dois.",
    description: "Para quem busca silêncio e conforto individual, nosso chalé oferece a experiência de acordar com o som da natureza, com varanda privativa e vista para o cerrado.",
    features: [
      "Cama Queen Size",
      "Vista Privilegiada para o Cerrado",
      "Ar-Condicionado e Frigobar"
    ],
    image: "assets/chale_fachada_colonial.jpg",
    ctaLabel: "chale1_whatsapp"
  },
  {
    id: "chale-2",
    title: "Chalé Suíte 2",
    headline: "O Charme das Janelas Azuis.",
    description: "Um espaço intimista e aconchegante, mantendo a autenticidade colonial da fazenda com todo o conforto moderno necessário para o seu descanso.",
    features: [
      "Cama Casal",
      "Arquitetura Colonial Autêntica",
      "Climatização Completa"
    ],
    image: "assets/suite_janelas_azuis_climatizada.jpg",
    ctaLabel: "chale2_whatsapp"
  }
];

export function AccommodationTabs() {
  const [activeTab, setActiveTab] = useState(accommodations[0].id);

  const activeData = accommodations.find(a => a.id === activeTab);

  return (
    <section id="acomodacoes" className="section-spacing" style={{ background: colors.cream, overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        
        {/* Header & Tabs */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="section-eyebrow" 
            style={{ marginBottom: 20, color: colors.accent }}
          >
            Acomodações
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 40 }}
          >
            {accommodations.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setActiveTab(acc.id)}
                style={{
                  padding: "12px 24px",
                  background: activeTab === acc.id ? colors.forest : "transparent",
                  color: activeTab === acc.id ? colors.cream : colors.forest,
                  border: `1px solid ${activeTab === acc.id ? colors.forest : "rgba(42,59,53,0.3)"}`,
                  borderRadius: 30,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "Montserrat, sans-serif",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
              >
                {acc.id === "casarao" ? "Casarão" : acc.id === "chale-1" ? "Chalé 1" : "Chalé 2"}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="content-grid"
          >
            
            {/* Text Column */}
            <div className="mobile-text-center">
              <h2 className="font-display" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 500, color: colors.forest, lineHeight: 1.1, marginBottom: 28 }}>
                {activeData.headline.split(' ').map((word, i, arr) => 
                  i >= arr.length - 2 ? <em key={i} style={{ color: colors.gold }}>{word} </em> : word + " "
                )}
              </h2>
              <div className="gold-line" style={{ width: 80, margin: "0 0 32px", display: "inline-block" }} />
              <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 2, color: colors.stone, marginBottom: 40, fontFamily: "Montserrat, sans-serif", maxWidth: 460 }}>
                {activeData.description}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48, textAlign: "left" }}>
                {activeData.features.map((feature, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{ color: colors.accent, fontSize: 14, marginTop: 4, flexShrink: 0 }}>✦</span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: colors.ink, lineHeight: 1.7, fontFamily: "Montserrat, sans-serif" }}>{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                id={`cta-${activeData.id}-whatsapp`}
                data-gtm-event="cta_click"
                data-gtm-label={activeData.ctaLabel}
              >
                <IconWhatsApp size={18} /> Verificar Disponibilidade
              </a>
            </div>

            {/* Image Column */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", borderRadius: 4, overflow: "hidden" }}>
              <img 
                src={activeData.image} 
                alt={activeData.title} 
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
              />
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
