import { motion } from "framer-motion";
import { colors, IconArrow } from "./constants";

export function MapUI() {
  return (
    <section id="localizacao" style={{ background: colors.cream, padding: "0 24px 100px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ 
            background: colors.forest, 
            padding: "clamp(32px, 5vw, 56px)", 
            position: "relative", 
            overflow: "hidden", 
            borderRadius: 16,
            boxShadow: "0 20px 40px rgba(42,59,53,0.15)"
          }}
        >
          {/* Decorative Elements */}
          <div className="hide-mobile" style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, border: `1px solid rgba(74,98,103,0.25)`, borderRadius: "50%", pointerEvents: "none" }} />
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 64px)", alignItems: "center" }} className="mobile-flex-col">
            
            {/* Left Column: Text & Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <div>
                <p className="section-eyebrow" style={{ marginBottom: 20, color: colors.accent }}>Localização Privilegiada</p>
                <h3 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 500, color: colors.cream, lineHeight: 1.2, marginBottom: 20 }}>
                  A 15 minutos do<br /><em style={{ color: colors.goldLight }}>Centro Histórico.</em>
                </h3>
                <div className="gold-line" style={{ width: 60, marginBottom: 24 }} />
                <p style={{ fontSize: 15, fontWeight: 500, color: "rgba(244,241,234,0.85)", lineHeight: 2, fontFamily: "Montserrat, sans-serif", marginBottom: 32 }}>
                  Acesso facilitado por estrada asfaltada, com segurança total e o silêncio que você procura.
                </p>
                
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://maps.google.com/?q=Fazenda+Casarão+dos+Pireneus+Pirenopolis" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  id="cta-location-maps" 
                  data-gtm-event="cta_click" 
                  data-gtm-label="location_google_maps" 
                  style={{ 
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: colors.gold,
                    color: colors.white,
                    padding: "14px 28px",
                    borderRadius: 30,
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "Montserrat, sans-serif",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    boxShadow: "0 8px 20px rgba(217,142,79,0.3)"
                  }}
                >
                  Abrir no App de GPS <IconArrow color={colors.white} />
                </motion.a>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
                {[{ n: "100+", l: "Anos de História" }, { n: "15min", l: "do Centro" }].map((s, i) => (
                  <motion.div 
                    key={s.n} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    style={{ borderLeft: `2px solid ${colors.accent}`, paddingLeft: 16 }}
                  >
                    <div className="font-display" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 500, color: colors.gold, lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(244,241,234,0.8)", fontFamily: "Montserrat, sans-serif", letterSpacing: 1.5, marginTop: 6, textTransform: "uppercase" }}>{s.l}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Embedded Map */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ width: "100%", height: "clamp(300px, 40vw, 450px)", borderRadius: 12, overflow: "hidden", position: "relative", border: `1px solid rgba(74,98,103,0.3)` }}
            >
              <iframe 
                src="https://www.google.com/maps?q=Fazenda+Casarão+dos+Pireneus+Pirenopolis&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa Fazenda Casarão dos Pireneus"
              ></iframe>
            </motion.div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
