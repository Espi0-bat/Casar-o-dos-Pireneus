import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "5562999999999"; // ← SUBSTITUA PELO NÚMERO REAL
const WHATSAPP_MSG = encodeURIComponent(
  "Olá! Vim pelo site e gostaria de saber mais sobre disponibilidade e reservas na Fazenda Casarão dos Pireneus."
);
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const colors = {
  ink: "#0e1a0e",
  forest: "#1a3020",
  forestMid: "#2d4a35",
  gold: "#b8913c",
  goldLight: "#d4a94e",
  cream: "#f7f2e8",
  creamDark: "#ede6d5",
  stone: "#8a7d6a",
  white: "#ffffff",
};

// ─── GLOBAL STYLES INJECTED ────────────────────────────────────────────────────
const GlobalStyles = () => (
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

    /* Scroll reveal */
    .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1), transform 0.9s cubic-bezier(.16,1,.3,1); }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left { opacity: 0; transform: translateX(-40px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1) 0.1s, transform 0.9s cubic-bezier(.16,1,.3,1) 0.1s; }
    .reveal-left.visible { opacity: 1; transform: translateX(0); }
    .reveal-right { opacity: 0; transform: translateX(40px); transition: opacity 0.9s cubic-bezier(.16,1,.3,1) 0.2s, transform 0.9s cubic-bezier(.16,1,.3,1) 0.2s; }
    .reveal-right.visible { opacity: 1; transform: translateX(0); }
    .reveal-delay-1 { transition-delay: 0.15s !important; }
    .reveal-delay-2 { transition-delay: 0.3s !important; }
    .reveal-delay-3 { transition-delay: 0.45s !important; }
    .reveal-delay-4 { transition-delay: 0.6s !important; }

    /* Nav */
    .nav-glass {
      background: transparent;
      transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease;
    }
    .nav-glass.scrolled {
      background: rgba(14, 26, 14, 0.92);
      backdrop-filter: blur(12px);
      box-shadow: 0 1px 0 rgba(184,145,60,0.2);
    }

    /* Hero parallax */
    .hero-bg {
      background-image: url('/assets/pavao_fachada.webp');
      background-size: cover;
      background-position: center 30%;
      background-attachment: fixed;
    }
    @media (max-width: 768px) {
      .hero-bg { background-attachment: scroll; background-position: center center; }
    }

    /* Gold divider */
    .gold-line { background: linear-gradient(90deg, transparent, ${colors.gold}, transparent); height: 1px; }

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
    }
    .btn-gold::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .btn-gold:hover { background: ${colors.goldLight}; transform: translateY(-2px); }
    .btn-gold:hover::before { opacity: 1; }

    .btn-outline {
      display: inline-flex; align-items: center; gap: 10px;
      border: 1px solid ${colors.gold};
      color: ${colors.gold};
      padding: 15px 36px;
      font-family: 'Montserrat', sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-decoration: none;
      cursor: pointer; background: transparent;
      transition: all 0.3s ease;
    }
    .btn-outline:hover { background: ${colors.gold}; color: ${colors.white}; }

    /* WhatsApp float */
    .wa-float {
      position: fixed; bottom: 28px; right: 28px; z-index: 999;
      width: 60px; height: 60px; border-radius: 50%;
      background: #25D366;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(37,211,102,0.4);
      cursor: pointer; text-decoration: none;
      transition: transform 0.3s cubic-bezier(.16,1,.3,1), box-shadow 0.3s ease;
      animation: wa-pulse 3s ease-in-out infinite;
    }
    .wa-float:hover { transform: scale(1.12); box-shadow: 0 12px 40px rgba(37,211,102,0.55); }
    @keyframes wa-pulse {
      0%, 100% { box-shadow: 0 8px 32px rgba(37,211,102,0.4); }
      50% { box-shadow: 0 8px 48px rgba(37,211,102,0.65); }
    }

    /* Testimonial cards */
    .testimonial-card {
      border-left: 2px solid ${colors.gold};
      padding: 24px 28px;
      background: rgba(255,255,255,0.5);
      backdrop-filter: blur(4px);
    }

    /* Experience item */
    .exp-item {
      position: relative; overflow: hidden;
      background: ${colors.ink};
      aspect-ratio: 4/5;
    }
    .exp-item img { 
      width: 100%; height: 100%; object-fit: cover; 
      filter: brightness(0.7);
      transition: transform 0.8s cubic-bezier(.16,1,.3,1), filter 0.5s;
    }
    .exp-item:hover img { transform: scale(1.06); filter: brightness(0.55); }
    .exp-item-label {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 40px 24px 24px;
      background: linear-gradient(to top, rgba(14,26,14,0.95), transparent);
    }

    /* Section label */
    .section-eyebrow {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: ${colors.gold};
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${colors.cream}; }
    ::-webkit-scrollbar-thumb { background: ${colors.gold}; border-radius: 3px; }

    /* Image overlay mosaic */
    .mosaic-img { 
      object-fit: cover; width: 100%; height: 100%;
      transition: transform 0.8s cubic-bezier(.16,1,.3,1);
    }
    .mosaic-wrap:hover .mosaic-img { transform: scale(1.04); }
    .mosaic-wrap { overflow: hidden; }

    /* Responsive Utilities */
    .section-spacing { padding: 100px 24px; }
    .content-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 80px; align-items: center; }
    
    @media (max-width: 768px) {
      .section-spacing { padding: 60px 20px; }
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

// ─── SCROLL REVEAL HOOK ────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── SVG ICONS ─────────────────────────────────────────────────────────────────
const IconWhatsApp = ({ size = 28, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const IconArrow = ({ color = "#fff" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── NAVIGATION ────────────────────────────────────────────────────────────────
function Nav() {
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
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px, 2vw, 15px)" }}>
          <img 
            src="/assets/logo_principal.png" 
            alt="Logo Fazenda Casarão dos Pireneus" 
            style={{ height: "clamp(32px, 5vw, 45px)", width: "auto", filter: "brightness(0) invert(1)" }}
            fetchpriority="high"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span className="font-display" style={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 300, letterSpacing: 2, color: colors.cream, lineHeight: 1 }}>
              Casarão dos Pireneus
            </span>
            <span style={{ fontSize: "clamp(7px, 1.5vw, 9px)", letterSpacing: 4, textTransform: "uppercase", color: colors.gold, fontFamily: "Montserrat, sans-serif" }}>
              Fazenda · Pirenópolis
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Casarão","Chalés","Experiências","Contato"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace("ê","e").replace("ã","a")}`}
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
          {["Casarão","Chalés","Experiências","Contato"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              className="font-display"
              style={{ color: colors.cream, fontSize: 32, fontWeight: 300, textDecoration: "none", letterSpacing: 3 }}>
              {l}
            </a>
          ))}
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-gold" id="cta-mobile-menu" data-gtm-event="cta_click" data-gtm-label="mobile_menu_whatsapp">
            <IconWhatsApp size={18} /> Reservar Agora
          </a>
        </div>
      )}

      {/* CSS for mobile */}
      <style>{`
        @media (max-width: 640px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      className="hero-bg"
      style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Dark overlay gradient */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(14,26,14,0.55) 0%, rgba(14,26,14,0.3) 40%, rgba(14,26,14,0.75) 100%)" }} />

      {/* Grain texture overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>
        {/* Eyebrow */}
        <div className="reveal" style={{ marginBottom: 24 }}>
          <span className="section-eyebrow" style={{ color: colors.goldLight }}>Pirenópolis · Goiás · Brasil</span>
        </div>

        {/* Headline */}
        <h1 className="font-display reveal reveal-delay-1" style={{ fontSize: "clamp(32px, 8vw, 88px)", fontWeight: 300, color: colors.cream, lineHeight: 1.08, letterSpacing: "-0.5px", marginBottom: 28 }}>
          Onde a História Centenária<br />
          <em style={{ fontStyle: "italic", color: colors.goldLight }}>encontra o Refúgio Particular.</em>
        </h1>

        {/* Gold divider */}
        <div className="reveal reveal-delay-2" style={{ width: 60, height: 1, background: colors.gold, margin: "0 auto 28px" }} />

        {/* Subheadline */}
        <p className="reveal reveal-delay-2" style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "rgba(247,242,232,0.85)", lineHeight: 1.8, fontWeight: 300, maxWidth: 640, margin: "0 auto 48px", fontFamily: "Montserrat, sans-serif" }}>
          Descubra a autenticidade de uma fazenda histórica em Pirenópolis. Espaço exclusivo para famílias e grupos que não abrem mão de conforto, privacidade e uma conexão real com a natureza.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            id="cta-hero-primary"
            data-gtm-event="cta_click"
            data-gtm-label="hero_primary_whatsapp"
            data-fbq-event="Lead"
          >
            <IconWhatsApp size={20} />
            Reservar Minha Experiência
          </a>
          <a
            href="#casarao"
            className="btn-outline"
            id="cta-hero-secondary"
            data-gtm-event="cta_click"
            data-gtm-label="hero_secondary_explore"
          >
            Conhecer a Fazenda <IconArrow color={colors.gold} />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="reveal reveal-delay-4" style={{ marginTop: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 10, letterSpacing: 4, color: "rgba(247,242,232,0.5)", textTransform: "uppercase", fontFamily: "Montserrat, sans-serif" }}>Descubra</span>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${colors.gold}, transparent)`, animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.3); }
        }
      `}</style>
    </section>
  );
}

// ─── CASARÃO SECTION ──────────────────────────────────────────────────────────
function CasaraoSection() {
  return (
    <section id="casarao" className="section-spacing" style={{ background: colors.cream }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="content-grid">
          
          {/* Text column */}
          <div className="mobile-text-center">
            <p className="section-eyebrow reveal" style={{ marginBottom: 20 }}>O Casarão Centenário</p>
            <h2 className="font-display reveal" style={{ fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 300, color: colors.forest, lineHeight: 1.1, marginBottom: 28 }}>
              A Nostalgia de uma<br /><em style={{ color: colors.gold }}>Fazenda Viva.</em>
            </h2>
            <div className="gold-line reveal" style={{ width: 80, margin: "0 0 32px", display: "inline-block" }} />
            <p className="reveal" style={{ fontSize: 15, lineHeight: 2, color: colors.stone, marginBottom: 40, fontFamily: "Montserrat, sans-serif", maxWidth: 460 }}>
              Mais que uma hospedagem, uma imersão na arquitetura original de 100 anos, totalmente revitalizada. O Casarão dos Pireneus oferece o equilíbrio perfeito entre o rústico autêntico e a conveniência moderna.
            </p>

            {/* Benefits */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48, textAlign: "left" }}>
              {[
                { icon: "✦", text: "Privacidade absoluta para o seu grupo ou família" },
                { icon: "✦", text: "Suítes climatizadas com enxoval de padrão premium" },
                { icon: "✦", text: "Cozinha de fazenda e áreas de convivência que convidam ao encontro" },
              ].map((b, i) => (
                <div key={i} className={`reveal reveal-delay-${i+1}`} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ color: colors.gold, fontSize: 12, marginTop: 4, flexShrink: 0 }}>{b.icon}</span>
                  <span style={{ fontSize: 14, color: colors.ink, lineHeight: 1.7, fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}>{b.text}</span>
                </div>
              ))}
            </div>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold reveal"
              id="cta-casarao-whatsapp"
              data-gtm-event="cta_click"
              data-gtm-label="casarao_section_whatsapp"
            >
              <IconWhatsApp size={18} /> Verificar Disponibilidade
            </a>
          </div>

          {/* Image mosaic */}
          <div className="reveal-right" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="mosaic-wrap lift" style={{ gridColumn: "1", gridRow: "1", borderRadius: 2, height: "clamp(180px, 30vw, 280px)" }}>
              <img 
                className="mosaic-img" 
                src="/assets/quarto_cama_casal_janela_azul.webp" 
                alt="Suíte histórica com janela azul e vista para o jardim" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="mosaic-wrap lift" style={{ gridColumn: "2", gridRow: "1 / 3", borderRadius: 2 }}>
              <img 
                className="mosaic-img" 
                src="/assets/aparador_rustico_ventilador.webp" 
                alt="Detalhes da decoração rústica e móveis centenários" 
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="mosaic-wrap lift" style={{ gridColumn: "1", gridRow: "2", borderRadius: 2, height: "clamp(120px, 20vw, 200px)" }}>
              <img 
                className="mosaic-img" 
                src="/assets/mesa_jantar_comunitaria.jpg" 
                alt="Mesa de jantar comunitária para refeições em família" 
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CHALES SECTION ────────────────────────────────────────────────────────────
function ChalesSection() {
  return (
    <section id="chales" className="section-spacing" style={{ background: colors.ink, position: "relative", overflow: "hidden" }}>
      {/* Background texture */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", opacity: 0.08 }}>
        <img src="/assets/exterior_chale_longo.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="content-grid">
          
          {/* Image */}
          <div className="reveal-left" style={{ position: "relative" }}>
            <div className="mosaic-wrap" style={{ aspectRatio: "4/5", borderRadius: 2, overflow: "hidden" }}>
              <img 
                className="mosaic-img" 
                src="/assets/quarto_cama_branca_pedra.jpg" 
                alt="Interior do Chalé Premium com cama queen e acabamento em pedra" 
                loading="lazy"
                decoding="async"
              />
            </div>
            {/* Gold accent card */}
            <div className="hide-mobile" style={{ position: "absolute", bottom: -24, right: -24, background: colors.gold, padding: "24px 28px", maxWidth: 200 }}>
              <p className="font-display" style={{ fontSize: 14, color: colors.white, lineHeight: 1.5 }}>
                "Acordei com o som da cachoeira e o aroma do café da fazenda."
              </p>
              <p style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.7)", marginTop: 8, fontFamily: "Montserrat, sans-serif" }}>— Hóspede, 2024</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-eyebrow reveal" style={{ marginBottom: 20, color: colors.gold }}>Chalés Premium</p>
            <h2 className="font-display reveal" style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: colors.cream, lineHeight: 1.1, marginBottom: 28 }}>
              Refúgio Particular<br /><em style={{ color: colors.gold }}>para Momentos a Dois.</em>
            </h2>
            <div className="gold-line reveal" style={{ width: 80, marginBottom: 32 }} />
            <p className="reveal" style={{ fontSize: 15, lineHeight: 2, color: "rgba(247,242,232,0.65)", marginBottom: 48, fontFamily: "Montserrat, sans-serif", maxWidth: 480 }}>
              Para quem busca silêncio e conforto individual, nossos chalés oferecem a experiência de acordar com o som da natureza, equipados com camas Queen Size e vista privilegiada para o cerrado.
            </p>

            {/* Features pills */}
            <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
              {["Cama Queen Size", "Vista para o Cerrado", "Varanda Privativa", "Café da Manhã Incluso", "Ar-Condicionado", "Wi-Fi"].map(f => (
                <span key={f} style={{ border: `1px solid rgba(184,145,60,0.4)`, padding: "8px 16px", fontSize: 11, letterSpacing: 1.5, color: colors.gold, fontFamily: "Montserrat, sans-serif", textTransform: "uppercase" }}>
                  {f}
                </span>
              ))}
            </div>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold reveal"
              id="cta-chales-whatsapp"
              data-gtm-event="cta_click"
              data-gtm-label="chales_section_whatsapp"
            >
              <IconWhatsApp size={18} /> Consultar Chalés
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCES SECTION ───────────────────────────────────────────────────────
const experiences = [
  {
    title: "Piscina de Pedra",
    sub: "Relaxamento com águas cristalinas e cascata natural",
    img: "/assets/piscina_cachoeira_ampla.webp",
    icon: "〰",
  },
  {
    title: "MiniZoo & Campo",
    sub: "Interação autêntica com os animais para adultos e crianças",
    img: "/assets/cabras_vestidas.jpg",
    icon: "◎",
  },
  {
    title: "Trilhas & Cavalgadas",
    sub: "Explore o cerrado dentro da nossa própria reserva",
    img: "/assets/cavalo_beira_lago.webp",
    icon: "⟵",
  },
  {
    title: "Pesca Esportiva",
    sub: "Momentos de lazer nos nossos açudes privativos",
    img: "/assets/lago_reflexo_arvores.jpg",
    icon: "◊",
  },
];

function ExperiencesSection() {
  return (
    <section id="experiencias" className="section-spacing" style={{ background: colors.creamDark }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p className="section-eyebrow reveal">Experiências Exclusivas</p>
          <h2 className="font-display reveal" style={{ fontSize: "clamp(32px, 6vw, 64px)", fontWeight: 300, color: colors.forest, lineHeight: 1.1, marginTop: 16, marginBottom: 16 }}>
            Onde o Tempo Ganha<br /><em style={{ color: colors.gold }}>Outro Ritmo.</em>
          </h2>
          <div className="gold-line reveal" style={{ width: 60, margin: "0 auto 24px" }} />
          <p className="reveal" style={{ fontSize: 14, color: colors.stone, maxWidth: 520, margin: "0 auto", lineHeight: 1.9, fontFamily: "Montserrat, sans-serif" }}>
            Cada detalhe foi pensado para desconectar do ordinário e reconectar com o essencial.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: 16 }}>
          {experiences.map((exp, i) => (
            <div
              key={exp.title}
              className={`exp-item reveal reveal-delay-${i + 1} lift`}
              id={`exp-${exp.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
            >
              <img src={exp.img} alt={exp.title} loading="lazy" decoding="async" />
              <div className="exp-item-label">
                <span style={{ fontSize: 10, letterSpacing: 4, color: colors.gold, fontFamily: "Montserrat, sans-serif", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  {exp.icon} &nbsp; Experiência
                </span>
                <h3 className="font-display" style={{ fontSize: 26, fontWeight: 300, color: colors.cream, marginBottom: 8, lineHeight: 1.2 }}>
                  {exp.title}
                </h3>
                <p style={{ fontSize: 12, color: "rgba(247,242,232,0.7)", fontFamily: "Montserrat, sans-serif", lineHeight: 1.7 }}>
                  {exp.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mid-page CTA */}
        <div className="reveal" style={{ textAlign: "center", marginTop: 72 }}>
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
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL PROOF ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "O atendimento foi impecável desde a reserva. Sentiram que cada detalhe foi pensado para nós. Voltaremos com certeza.",
    author: "Família Carvalho",
    origin: "Goiânia · GO",
    tag: "Atendimento",
  },
  {
    quote: "A limpeza e organização do casarão me surpreenderam. Tudo cheiroso, fresco, como se estivéssemos em casa — mas muito melhor.",
    author: "Mariana e Rafael",
    origin: "Brasília · DF",
    tag: "Conforto & Limpeza",
  },
  {
    quote: "Uma paz que eu não sentia há anos. As crianças adoraram os animais e eu finalmente descansei de verdade. Mágico.",
    author: "Família Sousa",
    origin: "Anápolis · GO",
    tag: "Tranquilidade",
  },
];

function SocialProofSection() {
  return (
    <section id="contato" className="section-spacing" style={{ background: colors.cream }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="content-grid" style={{ alignItems: "start" }}>
          
          {/* Left: testimonials */}
          <div className="mobile-text-center">
            <p className="section-eyebrow reveal" style={{ marginBottom: 20 }}>Prova Social</p>
            <h2 className="font-display reveal" style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 300, color: colors.forest, lineHeight: 1.15, marginBottom: 16 }}>
              O Destino Favorito<br /><em style={{ color: colors.gold }}>das Famílias.</em>
            </h2>
            <div className="gold-line reveal" style={{ width: 80, margin: "0 0 48px", display: "inline-block" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 24, textAlign: "left" }}>
              {testimonials.map((t, i) => (
                <div key={i} className={`testimonial-card reveal reveal-delay-${i + 1}`}>
                  <span style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, fontFamily: "Montserrat, sans-serif", display: "block", marginBottom: 12 }}>
                    ★★★★★ &nbsp; {t.tag}
                  </span>
                  <p className="font-display" style={{ fontSize: 17, fontStyle: "italic", color: colors.forest, lineHeight: 1.7, marginBottom: 16 }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ fontSize: 12, color: colors.ink, fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: 1 }}>{t.author}</strong>
                    <span style={{ fontSize: 10, color: colors.stone, fontFamily: "Montserrat, sans-serif", letterSpacing: 2 }}>{t.origin}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: location + map aesthetic */}
          <div>
            <div className="reveal-right" style={{ background: colors.forest, padding: "clamp(24px, 5vw, 48px)", position: "relative", overflow: "hidden" }}>
              {/* Decorative */}
              <div className="hide-mobile" style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, border: `1px solid rgba(184,145,60,0.2)`, borderRadius: "50%" }} />
              <div className="hide-mobile" style={{ position: "absolute", top: -10, right: -10, width: 100, height: 100, border: `1px solid rgba(184,145,60,0.15)`, borderRadius: "50%" }} />

              <p className="section-eyebrow" style={{ marginBottom: 24, color: colors.gold }}>Localização Privilegiada</p>
              <h3 className="font-display" style={{ fontSize: "clamp(26px, 4vw, 32px)", fontWeight: 300, color: colors.cream, lineHeight: 1.2, marginBottom: 24 }}>
                A 15 minutos do<br /><em style={{ color: colors.goldLight }}>Centro Histórico.</em>
              </h3>
              <div className="gold-line" style={{ width: 60, marginBottom: 32 }} />
              <p style={{ fontSize: 14, color: "rgba(247,242,232,0.7)", lineHeight: 2, fontFamily: "Montserrat, sans-serif", marginBottom: 40 }}>
                Acesso facilitado por estrada asfaltada, com segurança total e o silêncio que você procura. A combinação perfeita: natureza privativa e cidade histórica ao alcance.
              </p>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
                {[
                  { n: "100+", l: "Anos de História" },
                  { n: "15min", l: "do Centro" },
                  { n: "Priv.", l: "Piscina & Açudes" },
                  { n: "5★", l: "Avaliação Média" },
                ].map(s => (
                  <div key={s.n}>
                    <div className="font-display" style={{ fontSize: 32, fontWeight: 300, color: colors.gold, lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: 11, color: "rgba(247,242,232,0.6)", fontFamily: "Montserrat, sans-serif", letterSpacing: 1.5, marginTop: 4, textTransform: "uppercase" }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <a
                href={`https://maps.google.com/?q=Fazenda+Casarão+dos+Pireneus+Pirenopolis`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                id="cta-location-maps"
                data-gtm-event="cta_click"
                data-gtm-label="location_google_maps"
                style={{ borderColor: "rgba(184,145,60,0.5)", color: colors.gold }}
              >
                Ver no Maps <IconArrow color={colors.gold} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: colors.ink, padding: "60px 24px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* CTA Banner */}
        <div style={{ textAlign: "center", borderTop: `1px solid rgba(184,145,60,0.2)`, borderBottom: `1px solid rgba(184,145,60,0.2)`, padding: "60px 24px", marginBottom: 64 }}>
          <p className="section-eyebrow reveal" style={{ color: colors.gold, marginBottom: 24 }}>Última Chamada</p>
          <h2 className="font-display reveal" style={{ fontSize: "clamp(28px, 6vw, 72px)", fontWeight: 300, color: colors.cream, lineHeight: 1.1, marginBottom: 48 }}>
            Sua próxima memória<br />
            <em style={{ color: colors.gold }}>inesquecível começa aqui.</em>
          </h2>
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
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
            <div className="font-display" style={{ fontSize: 22, fontWeight: 300, color: colors.cream, letterSpacing: 2, marginBottom: 4 }}>
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
            <div style={{ fontSize: 14, letterSpacing: 6, color: colors.gold, fontFamily: "Montserrat, sans-serif", fontWeight: 600, textTransform: "uppercase" }}>
              PIXELRY
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: colors.stone, fontFamily: "Montserrat, sans-serif", marginBottom: 4 }}>
              © {new Date().getFullYear()} Fazenda Casarão dos Pireneus
            </div>
            <div style={{ fontSize: 10, color: "rgba(138,125,106,0.5)", fontFamily: "Montserrat, sans-serif" }}>
              Todos os direitos reservados
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── FLOATING WHATSAPP ─────────────────────────────────────────────────────────
function FloatingWhatsApp() {
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
      {/* Tooltip */}
      <span style={{ position: "absolute", right: "calc(100% + 12px)", top: "50%", transform: "translateY(-50%)", background: colors.forest, color: colors.cream, fontSize: 12, fontFamily: "Montserrat, sans-serif", whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 2, opacity: 0, pointerEvents: "none", transition: "opacity 0.2s", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
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

// ─── GTM DATALAY HELPER (pronto para uso) ─────────────────────────────────────
function useGTMTracking() {
  useEffect(() => {
    // GTM click tracking — ativa via delegação de eventos
    const handler = (e) => {
      const el = e.target.closest("[data-gtm-event]");
      if (!el) return;
      const event = el.getAttribute("data-gtm-event");
      const label = el.getAttribute("data-gtm-label");
      if (window.dataLayer) {
        window.dataLayer.push({ event, label, timestamp: Date.now() });
      }
      // Meta Pixel
      const fbqEvent = el.getAttribute("data-fbq-event");
      if (fbqEvent && window.fbq) {
        window.fbq("track", fbqEvent);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

// ─── ROOT APP ──────────────────────────────────────────────────────────────────
export default function CasaraoPireneus() {
  useReveal();
  useGTMTracking();

  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <CasaraoSection />
        <ChalesSection />
        <ExperiencesSection />
        <SocialProofSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
