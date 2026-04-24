import { colors } from "./constants";

const testimonials = [
  { quote: "O atendimento foi impecável desde a reserva. Sentiram que cada detalhe foi pensado para nós. Voltaremos com certeza.", author: "Família Carvalho", origin: "Goiânia · GO", tag: "Atendimento" },
  { quote: "A limpeza e organização do casarão me surpreenderam. Tudo cheiroso, fresco, como se estivéssemos em casa — mas muito melhor.", author: "Mariana e Rafael", origin: "Brasília · DF", tag: "Conforto & Limpeza" },
  { quote: "Uma paz que eu não sentia há anos. As crianças adoraram os animais e eu finalmente descansei de verdade. Mágico.", author: "Família Sousa", origin: "Anápolis · GO", tag: "Tranquilidade" },
  { quote: "A piscina de pedra é um sonho! Passamos o dia inteiro ali sem querer sair. Estrutura impecável.", author: "Família Oliveira", origin: "Uberlândia · MG", tag: "Estrutura" },
  { quote: "Lugar perfeito para desconectar. Sem barulho, sem pressa, só natureza e aconchego. Nota 10!", author: "Casal Montenegro", origin: "São Paulo · SP", tag: "Experiência" },
];

function TestimonialCard({ t }) {
  return (
    <div className="marquee-card" style={{ flex: "0 0 auto", width: "clamp(300px, 38vw, 420px)", padding: "32px 28px", background: colors.white, border: `1px solid rgba(74,98,103,0.12)`, borderRadius: 8, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20, userSelect: "none" }}>
      <div>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: colors.gold, fontFamily: "Montserrat, sans-serif", display: "block", marginBottom: 16 }}>★★★★★ &nbsp; {t.tag}</span>
        <p className="font-display" style={{ fontSize: "clamp(16px, 2vw, 19px)", fontStyle: "italic", fontWeight: 500, color: colors.forest, lineHeight: 1.75 }}>"{t.quote}"</p>
      </div>
      <div style={{ borderTop: `1px solid rgba(74,98,103,0.1)`, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong style={{ fontSize: 14, color: colors.ink, fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: 1 }}>{t.author}</strong>
        <span style={{ fontSize: 12, fontWeight: 600, color: colors.stone, fontFamily: "Montserrat, sans-serif", letterSpacing: 2 }}>{t.origin}</span>
      </div>
    </div>
  );
}

export function SocialProof() {
  const marqueeItems = [...testimonials, ...testimonials];
  
  return (
    <section id="prova-social" style={{ background: colors.cream, overflow: "hidden", padding: "100px 0 48px" }}>
      <div style={{ padding: "0 24px", maxWidth: 1280, margin: "0 auto", textAlign: "center", marginBottom: 48 }}>
        <p className="section-eyebrow" style={{ marginBottom: 20 }}>Prova Social</p>
        <h2 className="font-display" style={{ fontSize: "clamp(30px, 6vw, 56px)", fontWeight: 500, color: colors.forest, lineHeight: 1.12, marginBottom: 16 }}>
          O Destino Favorito<br /><em style={{ color: colors.gold }}>das Famílias.</em>
        </h2>
        <div className="gold-line" style={{ width: 80, margin: "0 auto 16px" }} />
        <p style={{ fontSize: 16, fontWeight: 500, color: colors.stone, maxWidth: 480, margin: "0 auto", lineHeight: 1.9, fontFamily: "Montserrat, sans-serif" }}>
          Quem viveu, recomenda. Veja o que nossos hóspedes dizem sobre a experiência.
        </p>
      </div>

      {/* Infinite Marquee */}
      <div className="marquee-wrapper" style={{ position: "relative", padding: "16px 0 40px" }}>
        <div className="marquee-fade-left" />
        <div className="marquee-fade-right" />
        <div className="marquee-track" style={{ display: "flex", gap: 24, width: "max-content" }}>
          {marqueeItems.map((t, i) => <TestimonialCard key={`t-${i}`} t={t} />)}
        </div>
      </div>
      
      <style>{`
        .marquee-wrapper { overflow: hidden; }
        .marquee-track { animation: marqueeScroll 35s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-fade-left, .marquee-fade-right { position: absolute; top: 0; bottom: 0; width: clamp(40px, 8vw, 120px); z-index: 2; pointer-events: none; }
        .marquee-fade-left { left: 0; background: linear-gradient(to right, ${colors.cream}, transparent); }
        .marquee-fade-right { right: 0; background: linear-gradient(to left, ${colors.cream}, transparent); }
        .marquee-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .marquee-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
        @media (max-width: 768px) { .marquee-track { animation-duration: 25s; } }
      `}</style>
    </section>
  );
}
