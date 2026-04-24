import { motion } from "framer-motion";
import { colors, WA_URL, IconWhatsApp } from "./constants";

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-bg"
      style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Dark overlay gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,30,25,0.65) 0%, rgba(20,30,25,0.4) 40%, rgba(20,30,25,0.85) 100%)" }} />

      {/* Grain texture overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>
        
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 24, textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        >
          <span className="section-eyebrow" style={{ color: colors.accent, fontWeight: 600 }}>Pirenópolis · Goiás · Brasil</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display" 
          style={{ fontSize: "clamp(28px, 7vw, 88px)", fontWeight: 500, color: colors.cream, lineHeight: 1.08, letterSpacing: "-0.5px", marginBottom: 28, textShadow: "0 4px 12px rgba(0,0,0,0.6)" }}
        >
          Onde a História Centenária<br />
          <em style={{ fontStyle: "italic", color: colors.goldLight }}>encontra o Refúgio Particular.</em>
        </motion.h1>

        {/* Gold divider */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 60, height: 1, background: colors.accent, margin: "0 auto 28px" }} 
        />

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(16px, 4vw, 20px)", color: colors.cream, lineHeight: 1.8, fontWeight: 500, maxWidth: 640, margin: "0 auto 48px", fontFamily: "Montserrat, sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
        >
          Descubra a autenticidade de uma fazenda histórica em Pirenópolis. Espaço exclusivo para famílias e grupos que não abrem mão de conforto, privacidade e uma conexão real com a natureza.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mobile-flex-col" 
          style={{ display: "flex", gap: 16, justifyContent: "center" }}
        >
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            id="hero-cta-whatsapp"
            data-gtm-event="cta_click"
            data-gtm-label="hero_whatsapp"
            data-fbq-event="Lead"
          >
            <IconWhatsApp size={18} /> Consultar Disponibilidade
          </a>
          <a
            href="#acomodacoes"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "16px 36px",
              border: `1px solid ${colors.cream}`,
              color: colors.cream,
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontFamily: "Montserrat, sans-serif"
            }}
            id="hero-cta-explore"
            data-gtm-event="cta_click"
            data-gtm-label="hero_explore"
          >
            Explorar a Fazenda
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 4, color: "rgba(247,242,232,0.8)", textTransform: "uppercase", fontFamily: "Montserrat, sans-serif", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>Descubra</span>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${colors.accent}, transparent)`, animation: "scrollPulse 2s ease-in-out infinite" }} />
        </motion.div>
      </div>

      <style>{`
        .hero-bg {
          background-image: url('assets/pavao_fachada.webp');
          background-size: cover;
          background-position: center 30%;
          background-attachment: fixed;
        }
        @media (max-width: 768px) {
          .hero-bg { background-attachment: scroll; background-position: center center; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
      `}</style>
    </section>
  );
}
