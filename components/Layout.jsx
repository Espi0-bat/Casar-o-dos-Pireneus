import { useState, useEffect } from "react";
import { colors, WA_URL, IconWhatsApp } from "./constants";

export const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&family=Cormorant:ital,wght@1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { 
      background: ${colors.cream}; 
      color: ${colors.ink};
      font-family: 'Montserrat', sans-serif;
      font-weight: 300;
      -webkit-font-smoothing: antialiased;
    }

    .font-display { font-family: 'Cormorant Garamond', serif; }
    .font-italic { font-family: 'Cormorant', serif; font-style: italic; }

    /* Nav */
    .nav-glass {
      background: transparent;
      transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;
    }
    .nav-glass.scrolled {
      background: rgba(30, 45, 40, 0.95);
      backdrop-filter: blur(12px);
      box-shadow: 0 1px 0 rgba(74,98,103,0.25);
    }

    /* Gold divider */
    .gold-line { background: linear-gradient(90deg, transparent, ${colors.accent}, transparent); height: 1px; }

    /* Hover lift */
    .lift { transition: transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease; }
    .lift:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.18); }

    /* CTA buttons */
    .btn-gold {
      display: inline-flex; align-items: center; gap: 10px;
      background: ${colors.gold};
      color: ${colors.white};
      padding: 16px 36px;
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-decoration: none;
      border: none; cursor: pointer;
      transition: background 0.3s ease, transform 0.2s ease;
      position: relative; overflow: hidden;
      border-radius: 30px;
    }
    .btn-gold::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .btn-gold:hover { background: ${colors.goldLight}; transform: translateY(-2px); }
    .btn-gold:hover::before { opacity: 1; }

    /* WhatsApp float */
    .wa-float {
      position: fixed; bottom: 28px; right: 28px; z-index: 999;
      width: 60px; height: 60px; border-radius: 50%;
      background: #25D366;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(37,211,102,0.45), 0 0 0 4px rgba(37,211,102,0.15);
      cursor: pointer; text-decoration: none;
      transition: transform 0.3s cubic-bezier(.16,1,.3,1), box-shadow 0.3s ease;
      animation: wa-pulse 3s ease-in-out infinite;
    }
    .wa-float:hover { transform: scale(1.15); box-shadow: 0 12px 48px rgba(37,211,102,0.6), 0 0 0 6px rgba(37,211,102,0.2); }
    @keyframes wa-pulse {
      0%, 100% { box-shadow: 0 8px 32px rgba(37,211,102,0.45), 0 0 0 4px rgba(37,211,102,0.15); }
      50% { box-shadow: 0 8px 56px rgba(37,211,102,0.7), 0 0 0 8px rgba(37,211,102,0.2); }
    }

    /* Section label */
    .section-eyebrow {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: ${colors.accent};
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${colors.cream}; }
    ::-webkit-scrollbar-thumb { background: ${colors.accent}; border-radius: 3px; }

    /* Responsive Utilities */
    .section-spacing { padding: 100px 24px; }
    .content-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 80px; align-items: center; }
    
    @media (max-width: 768px) {
      .section-spacing { padding: 60px 16px; }
      .content-grid { gap: 40px; grid-template-columns: 1fr; }
      .hide-mobile { display: none; }
      .show-mobile { display: block; }
    }

    @media (max-width: 640px) {
      .mobile-text-center { text-align: center; }
      .mobile-flex-col { flex-direction: column !important; }
    }
  `}</style>
);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`nav-glass fixed top-0 left-0 right-0 z-50 ${scrolled ? "scrolled" : ""}`}
      style={{ padding: "0 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img 
            src="assets/logo_principal.png" 
            alt="Logo Fazenda Casarão dos Pireneus" 
            style={{ 
              height: "clamp(40px, 6vw, 48px)", 
              width: "clamp(40px, 6vw, 48px)", 
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
            }}
            fetchpriority="high"
          />
        </div>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Acomodações","Experiências","Localização"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace("ê","e").replace("ã","a").replace("ç","c")}`}
              style={{ color: colors.cream, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", opacity: 0.8, fontFamily: "Montserrat, sans-serif", fontWeight: 400, transition: "opacity 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.target.style.opacity=1; e.target.style.color=colors.goldLight; }}
              onMouseLeave={e => { e.target.style.opacity=0.8; e.target.style.color=colors.cream; }}
            >{l}</a>
          ))}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            id="cta-nav-whatsapp"
            data-gtm-event="cta_click"
            data-gtm-label="nav_whatsapp"
            style={{ padding: "11px 24px", fontSize: 11 }}
          >
            <IconWhatsApp size={14} /> Reservar
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}
          className="mobile-menu-btn"
          aria-label="Menu"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: 24, height: 1.5, background: colors.cream, transition: "all 0.3s" }} />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: colors.ink, zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 28, right: 28, background: "none", border: "none", cursor: "pointer", color: colors.cream, fontSize: 28 }}>✕</button>
          {["Acomodações","Experiências","Localização"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace("ê","e").replace("ã","a").replace("ç","c")}`} onClick={() => setMenuOpen(false)}
              className="font-display"
              style={{ color: colors.cream, fontSize: 32, fontWeight: 500, textDecoration: "none", letterSpacing: 3 }}>
              {l}
            </a>
          ))}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" id="cta-mobile-menu" data-gtm-event="cta_click" data-gtm-label="mobile_menu_whatsapp">
            <IconWhatsApp size={18} /> Reservar Agora
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

export function Footer() {
  return (
    <footer style={{ background: colors.ink, padding: "60px 24px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* CTA Banner */}
        <div style={{ textAlign: "center", borderTop: `1px solid rgba(74,98,103,0.25)`, borderBottom: `1px solid rgba(74,98,103,0.25)`, padding: "60px 24px", marginBottom: 64 }}>
          <p className="section-eyebrow" style={{ color: colors.accent, marginBottom: 24 }}>Última Chamada</p>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 6vw, 72px)", fontWeight: 500, color: colors.cream, lineHeight: 1.1, marginBottom: 48 }}>
            Sua próxima memória<br />
            <em style={{ color: colors.gold }}>inesquecível começa aqui.</em>
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              id="cta-footer-primary"
              data-gtm-event="cta_click"
              data-gtm-label="footer_primary_whatsapp"
              data-fbq-event="Contact"
            >
              <IconWhatsApp size={20} /> Falar com Consultor de Reservas
            </a>
          </div>
        </div>

        {/* Footer bottom */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 32 }} className="mobile-text-center mobile-flex-col">
          <div>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 500, color: colors.cream, letterSpacing: 2, marginBottom: 4 }}>
              Casarão dos Pireneus
            </div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: colors.stone, fontFamily: "Montserrat, sans-serif", textTransform: "uppercase" }}>
              Fazenda · Pirenópolis · Goiás
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: "rgba(138,125,106,0.5)", fontFamily: "Montserrat, sans-serif", textTransform: "uppercase", marginBottom: 4 }}>
              Engenharia Digital por
            </div>
            <div style={{ fontSize: 14, letterSpacing: 6, color: colors.accent, fontFamily: "Montserrat, sans-serif", fontWeight: 600, textTransform: "uppercase" }}>
              PIXELRY
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: colors.stone, fontFamily: "Montserrat, sans-serif", marginBottom: 4 }}>
              © {new Date().getFullYear()} Fazenda Casarão dos Pireneus
            </div>
            <div style={{ fontSize: 12, color: "rgba(138,125,106,0.5)", fontFamily: "Montserrat, sans-serif" }}>
              Todos os direitos reservados
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      id="cta-floating-whatsapp"
      data-gtm-event="cta_click"
      data-gtm-label="floating_whatsapp"
      data-fbq-event="Lead"
      aria-label="Abrir WhatsApp"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.6)", transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(.16,1,.3,1)" }}
    >
      <IconWhatsApp size={28} color="#fff" />
      <span style={{ position: "absolute", right: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)", background: colors.forest, color: colors.cream, fontSize: 14, fontWeight: 500, fontFamily: "Montserrat, sans-serif", whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 2, opacity: 0, pointerEvents: "none", transition: "opacity 0.2s", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
        className="wa-tooltip">
        Reservar via WhatsApp
      </span>
      <style>{`
        .wa-float:hover .wa-tooltip { opacity: 1 !important; }
        @media (max-width: 640px) { .wa-tooltip { display: none; } }
      `}</style>
    </a>
  );
}
