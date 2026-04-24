import { motion } from "framer-motion";
import { colors, WA_URL, IconWhatsApp } from "./constants";

const experiences = [
  {
    id: "pool",
    title: "Piscina de Pedra",
    sub: "Relaxamento natural",
    img: "assets/piscina_panoramica_quiosque.webp",
    gridArea: "span 2 / span 2", // Destaque maior
    icon: "〰",
  },
  {
    id: "zoo",
    title: "MiniZoo",
    sub: "Interação autêntica",
    img: "assets/cabras_vestidas.jpg",
    gridArea: "span 1 / span 1",
    icon: "◎",
  },
  {
    id: "trails",
    title: "Trilhas & Cavalgadas",
    sub: "Explore o cerrado",
    img: "assets/cavalo_selado_curral.webp",
    gridArea: "span 1 / span 1",
    icon: "⟵",
  },
  {
    id: "fishing",
    title: "Pesca Esportiva",
    sub: "Açudes privativos",
    img: "assets/acude_flores_amarelas_reflexo.jpg",
    gridArea: "span 1 / span 2", // Retângulo largo
    icon: "◊",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

export function ExperiencesBento() {
  return (
    <section id="experiencias" className="section-spacing" style={{ background: colors.creamDark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-eyebrow"
          >
            Experiências Exclusivas
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display" 
            style={{ fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 500, color: colors.forest, lineHeight: 1.1, marginTop: 16, marginBottom: 16 }}
          >
            Onde o Tempo Ganha<br /><em style={{ color: colors.gold }}>Outro Ritmo.</em>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="gold-line" 
            style={{ width: 60, margin: "0 auto 24px", transformOrigin: "left" }} 
          />
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gridAutoRows: "280px", 
            gap: 16,
            gridAutoFlow: "dense"
          }}
          className="bento-grid-mobile"
        >
          {experiences.map((exp) => (
            <motion.div
              variants={itemVariants}
              key={exp.id}
              className="exp-item lift"
              id={`exp-${exp.id}`}
              style={{
                gridArea: exp.gridArea,
                borderRadius: 8,
                position: "relative",
                overflow: "hidden",
                background: colors.ink
              }}
            >
              <img 
                src={exp.img} 
                alt={exp.title} 
                loading="lazy" 
                decoding="async"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: "brightness(0.85) sepia(0.1) saturate(1.1)",
                  transition: "transform 0.8s ease, filter 0.5s ease"
                }}
                className="bento-img"
              />
              <div 
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "40px 24px 24px",
                  background: "linear-gradient(to top, rgba(30,45,40,0.95), transparent)"
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 4, color: colors.accent, fontFamily: "Montserrat, sans-serif", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  {exp.icon} &nbsp; Experiência
                </span>
                <h3 className="font-display" style={{ fontSize: 26, fontWeight: 500, color: colors.cream, marginBottom: 8, lineHeight: 1.2 }}>
                  {exp.title}
                </h3>
                <p style={{ fontSize: 14, fontWeight: 500, color: "rgba(247,242,232,0.9)", fontFamily: "Montserrat, sans-serif", lineHeight: 1.7 }}>
                  {exp.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mid-page CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: "center", marginTop: 72 }}
        >
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            id="cta-experiences-whatsapp"
            data-gtm-event="cta_click"
            data-gtm-label="experiences_section_whatsapp"
          >
            <IconWhatsApp size={18} /> Quero Viver Essas Experiências
          </a>
        </motion.div>
      </div>
      
      <style>{`
        .exp-item:hover .bento-img {
          transform: scale(1.06);
          filter: brightness(0.6) sepia(0.15) saturate(1.15) !important;
        }
        @media (max-width: 768px) {
          .bento-grid-mobile {
            display: flex !important;
            flex-direction: column;
          }
          .bento-grid-mobile > div {
            min-height: 280px;
          }
        }
      `}</style>
    </section>
  );
}
