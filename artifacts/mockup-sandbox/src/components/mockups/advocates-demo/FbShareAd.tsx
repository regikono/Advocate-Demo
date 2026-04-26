export function FbShareAd() {
  const BRAND = {
    primary: "#EC6049",
    secondary: "#0B2F4A",
    fbBlue: "#1877F2",
    fbBg: "#F0F2F5",
    fbSurface: "#FFFFFF",
    fbBorder: "#CED0D4",
    fbText: "#1C1E21",
    fbMuted: "#65676B",
    fbHover: "#E4E6EA",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BRAND.fbBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Open Sans', 'Helvetica Neue', Arial, sans-serif",
        padding: "32px 16px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');
        .fb-reaction:hover { transform: scale(1.3); }
        .fb-action:hover { background: #E4E6EA; }
      `}</style>

      <div style={{ width: 500, display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Topbar hint */}
        <div
          style={{
            background: BRAND.fbBlue,
            borderRadius: "10px 10px 0 0",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span style={{ color: "white", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>facebook</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["🔍", "💬", "🔔", "☰"].map((icon, i) => (
              <div
                key={i}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, cursor: "pointer",
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Post Card */}
        <div
          style={{
            background: BRAND.fbSurface,
            borderRadius: "0 0 8px 8px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          {/* Post Header */}
          <div style={{ padding: "12px 16px 0", display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #EC6049, #0B2F4A)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: 16, flexShrink: 0,
              }}
            >
              M
            </div>
            <div>
              <div style={{ color: BRAND.fbText, fontWeight: 600, fontSize: 14, lineHeight: 1.2 }}>
                Marcos Oliveira
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <span style={{ color: BRAND.fbMuted, fontSize: 12 }}>agora mesmo · </span>
                <svg width="12" height="12" viewBox="0 0 16 16" fill={BRAND.fbMuted}>
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.5 7.5a.5.5 0 0 1 0-1h5.793L8.146 4.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 7.5H4.5z"/>
                </svg>
                <svg width="12" height="12" viewBox="0 0 16 16" fill={BRAND.fbMuted}>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
                <span style={{ color: BRAND.fbMuted, fontSize: 12 }}>Público</span>
              </div>
            </div>
            <div style={{ marginLeft: "auto", color: BRAND.fbMuted, fontSize: 20, cursor: "pointer" }}>···</div>
          </div>

          {/* Post Text */}
          <div style={{ padding: "10px 16px 12px" }}>
            <p style={{ color: BRAND.fbText, fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              Meu escritório começou a usar o{" "}
              <span style={{ color: BRAND.fbBlue, cursor: "pointer" }}>@Advocates</span>{" "}
              e transformou completamente a gestão financeira e administrativa! 🚀
              <br /><br />
              Se você tem um escritório de advocacia e ainda usa planilhas,{" "}
              <strong>precisa conhecer isso.</strong> Controle de processos, honorários e fluxo de caixa — tudo num lugar só.
              <br /><br />
              Experimente <strong>gratuitamente</strong> em{" "}
              <span style={{ color: BRAND.fbBlue, cursor: "pointer" }}>advocates.com.br</span> 👇
            </p>
          </div>

          {/* Link Preview Card */}
          <div
            style={{
              borderTop: `1px solid ${BRAND.fbBorder}`,
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            {/* Hero Banner */}
            <div
              style={{
                background: `linear-gradient(135deg, ${BRAND.secondary} 0%, #0D3A5C 40%, #1a4f7a 100%)`,
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Abstract decoration */}
              <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: `${BRAND.primary}18` }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: `${BRAND.primary}12` }} />
              <div style={{ position: "absolute", top: 20, right: 60, width: 60, height: 60, borderRadius: "50%", background: `${BRAND.primary}20` }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Logo */}
                <div style={{ marginBottom: 20 }}>
                  <img
                    src="https://advocates.com.br/assets/logo_1772110857436-LcRtAvwi.png"
                    alt="Advocates"
                    style={{ height: 36, objectFit: "contain", filter: "brightness(0) invert(1)" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>

                <h2
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: 22,
                    margin: "0 0 10px",
                    lineHeight: 1.3,
                    letterSpacing: "-0.3px",
                  }}
                >
                  Gestão Financeira e Administrativa para Escritórios de Advocacia
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 14,
                    margin: "0 0 20px",
                    lineHeight: 1.5,
                  }}
                >
                  Controle honorários, processos, clientes e financeiro em uma plataforma completa. Mais eficiência, menos planilhas.
                </p>

                {/* Mini stats */}
                <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                  {[
                    { val: "+2.000", label: "escritórios" },
                    { val: "100%", label: "na nuvem" },
                    { val: "Grátis", label: "para começar" },
                  ].map(({ val, label }) => (
                    <div key={label}>
                      <div style={{ color: BRAND.primary, fontWeight: 700, fontSize: 18, lineHeight: 1 }}>{val}</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 2 }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div
                  style={{
                    display: "inline-block",
                    background: BRAND.primary,
                    color: "white",
                    padding: "11px 24px",
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(236,96,73,0.5)",
                  }}
                >
                  Comece Gratuitamente →
                </div>
              </div>
            </div>

            {/* Link metadata footer */}
            <div style={{ padding: "10px 16px 12px", background: BRAND.fbHover }}>
              <div style={{ color: BRAND.fbMuted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 2 }}>
                advocates.com.br
              </div>
              <div style={{ color: BRAND.fbText, fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>
                Advocates – Gestão Financeira para Escritórios de Advocacia
              </div>
            </div>
          </div>

          {/* Reactions Row */}
          <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ display: "flex" }}>
                {["👍", "❤️", "🤩"].map((emoji, i) => (
                  <div
                    key={i}
                    style={{
                      width: 20, height: 20, borderRadius: "50%",
                      border: "2px solid white",
                      marginLeft: i === 0 ? 0 : -6,
                      background: i === 0 ? "#1877F2" : i === 1 ? "#F33E58" : "#F7B125",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, zIndex: 3 - i,
                    }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <span style={{ color: BRAND.fbMuted, fontSize: 13 }}>Ricardo, Ana e outras 847 pessoas</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ color: BRAND.fbMuted, fontSize: 13 }}>312 comentários</span>
              <span style={{ color: BRAND.fbMuted, fontSize: 13 }}>·</span>
              <span style={{ color: BRAND.fbMuted, fontSize: 13 }}>1,2 mil compartilhamentos</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ margin: "8px 16px 0", borderTop: `1px solid ${BRAND.fbBorder}` }} />

          {/* Action Buttons */}
          <div style={{ display: "flex", padding: "2px 8px 8px" }}>
            {[
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRAND.fbMuted} strokeWidth="2" strokeLinecap="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>,
                label: "Curtir",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRAND.fbMuted} strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                label: "Comentar",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BRAND.fbMuted} strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
                label: "Compartilhar",
              },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="fb-action"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 6, padding: "8px", borderRadius: 6, cursor: "pointer",
                  transition: "background 0.15s",
                }}
              >
                {icon}
                <span style={{ color: BRAND.fbMuted, fontSize: 13, fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comment box hint */}
        <div
          style={{
            background: BRAND.fbSurface,
            borderRadius: 8,
            marginTop: 8,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #EC6049, #0B2F4A)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1, background: BRAND.fbBg, borderRadius: 20,
              padding: "8px 14px", color: BRAND.fbMuted, fontSize: 13,
            }}
          >
            Escreva um comentário...
          </div>
        </div>
      </div>
    </div>
  );
}
