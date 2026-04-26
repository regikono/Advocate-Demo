import { useEffect, useRef, useState } from "react";

const BRAND = {
  primary: "#4F46E5",
  primaryLight: "#818CF8",
  accent: "#10B981",
  danger: "#EF4444",
  bg: "#0F172A",
  surface: "#1E293B",
  surfaceHover: "#273548",
  border: "#334155",
  text: "#F1F5F9",
  muted: "#94A3B8",
  card: "#1E293B",
};

type Step = {
  id: string;
  label: string;
  screen: string;
  cursorTarget: { x: number; y: number };
  action?: string;
  duration: number;
};

const STEPS: Step[] = [
  { id: "login", label: "Opening Project Advocates", screen: "login", cursorTarget: { x: 50, y: 50 }, duration: 1800 },
  { id: "login-click", label: "Signing in", screen: "login", cursorTarget: { x: 50, y: 62 }, action: "click", duration: 1200 },
  { id: "dashboard", label: "Viewing the Dashboard", screen: "dashboard", cursorTarget: { x: 50, y: 30 }, duration: 2200 },
  { id: "nav-advocates", label: "Navigating to Advocates", screen: "dashboard", cursorTarget: { x: 14, y: 46 }, action: "click", duration: 1000 },
  { id: "advocates", label: "Browsing Advocates", screen: "advocates", cursorTarget: { x: 50, y: 45 }, duration: 2000 },
  { id: "advocate-card", label: "Selecting an Advocate", screen: "advocates", cursorTarget: { x: 32, y: 52 }, action: "click", duration: 900 },
  { id: "profile", label: "Viewing Advocate Profile", screen: "profile", cursorTarget: { x: 50, y: 35 }, duration: 2200 },
  { id: "add-btn", label: "Adding to Campaign", screen: "profile", cursorTarget: { x: 73, y: 22 }, action: "click", duration: 900 },
  { id: "campaigns", label: "Managing Campaigns", screen: "campaigns", cursorTarget: { x: 50, y: 50 }, duration: 2200 },
  { id: "new-campaign", label: "Creating New Campaign", screen: "campaigns", cursorTarget: { x: 82, y: 15 }, action: "click", duration: 900 },
  { id: "campaign-form", label: "Filling Campaign Details", screen: "campaign-form", cursorTarget: { x: 50, y: 42 }, duration: 2400 },
  { id: "submit", label: "Launching the Campaign", screen: "campaign-form", cursorTarget: { x: 50, y: 74 }, action: "click", duration: 900 },
  { id: "success", label: "Campaign Launched!", screen: "success", cursorTarget: { x: 50, y: 50 }, duration: 2800 },
];

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function LoginScreen({ clicking }: { clicking: boolean }) {
  return (
    <div style={{ width: "100%", height: "100%", background: BRAND.bg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 0 }}>
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryLight})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <span style={{ color: BRAND.text, fontWeight: 700, fontSize: 22, fontFamily: "'Inter', sans-serif", letterSpacing: "-0.5px" }}>Project Advocates</span>
        </div>
        <p style={{ color: BRAND.muted, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>Connect with your most passionate supporters</p>
      </div>
      <div style={{ background: BRAND.surface, border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: "32px 36px", width: 360, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}>
        <h2 style={{ color: BRAND.text, fontWeight: 600, fontSize: 20, margin: "0 0 24px", fontFamily: "'Inter', sans-serif" }}>Welcome back</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: BRAND.muted, fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</label>
          <div style={{ background: BRAND.bg, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "10px 14px", color: BRAND.text, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>sarah@advocates.io</div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ color: BRAND.muted, fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Password</label>
          <div style={{ background: BRAND.bg, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "10px 14px", color: BRAND.muted, fontSize: 14, fontFamily: "'Inter', sans-serif" }}>••••••••••</div>
        </div>
        <div style={{ background: clicking ? BRAND.primaryLight : BRAND.primary, borderRadius: 8, padding: "12px", textAlign: "center", color: "white", fontWeight: 600, fontSize: 14, fontFamily: "'Inter', sans-serif", transition: "background 0.15s", cursor: "pointer", transform: clicking ? "scale(0.98)" : "scale(1)" }}>
          Sign in to your account
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active }: { active: string }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/></svg> },
    { id: "advocates", label: "Advocates", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
    { id: "campaigns", label: "Campaigns", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id: "analytics", label: "Analytics", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id: "settings", label: "Settings", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/></svg> },
  ];
  return (
    <div style={{ width: 200, minWidth: 200, background: BRAND.surface, borderRight: `1px solid ${BRAND.border}`, height: "100%", display: "flex", flexDirection: "column", padding: "20px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px 24px", borderBottom: `1px solid ${BRAND.border}` }}>
        <div style={{ width: 28, height: 28, background: `linear-gradient(135deg, ${BRAND.primary}, ${BRAND.primaryLight})`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/></svg>
        </div>
        <span style={{ color: BRAND.text, fontWeight: 700, fontSize: 14, fontFamily: "'Inter', sans-serif", letterSpacing: "-0.3px" }}>Advocates</span>
      </div>
      <div style={{ padding: "16px 8px", flex: 1 }}>
        {items.map(item => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, marginBottom: 2, background: active === item.id ? `${BRAND.primary}22` : "transparent", color: active === item.id ? BRAND.primaryLight : BRAND.muted, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: active === item.id ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 8px", borderTop: `1px solid ${BRAND.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${BRAND.accent}, #059669)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 11, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>SJ</div>
          <div>
            <div style={{ color: BRAND.text, fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Sarah J.</div>
            <div style={{ color: BRAND.muted, fontSize: 10, fontFamily: "'Inter', sans-serif" }}>Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Topbar({ title, action, onAction, actionHighlight }: { title: string; action?: string; onAction?: () => void; actionHighlight?: boolean }) {
  return (
    <div style={{ height: 56, background: BRAND.surface, borderBottom: `1px solid ${BRAND.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
      <span style={{ color: BRAND.text, fontWeight: 600, fontSize: 16, fontFamily: "'Inter', sans-serif" }}>{title}</span>
      <div style={{ display: "flex", gap: 8 }}>
        {action && (
          <div style={{ background: actionHighlight ? BRAND.primaryLight : BRAND.primary, color: "white", padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", transform: actionHighlight ? "scale(0.97)" : "scale(1)", transition: "all 0.15s" }}>
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, color }: { label: string; value: string; delta: string; color: string }) {
  return (
    <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: "18px 20px", flex: 1 }}>
      <div style={{ color: BRAND.muted, fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 500, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
      <div style={{ color: BRAND.text, fontSize: 28, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>{value}</div>
      <div style={{ color: color, fontSize: 12, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{delta}</div>
    </div>
  );
}

function DashboardScreen() {
  const barData = [42, 58, 45, 70, 55, 80, 65, 90, 72, 88, 76, 95];
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <Topbar title="Dashboard" />
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <StatCard label="Total Advocates" value="1,284" delta="↑ 12% this month" color={BRAND.accent} />
          <StatCard label="Active Campaigns" value="23" delta="↑ 4 new this week" color={BRAND.primaryLight} />
          <StatCard label="Referrals Generated" value="8,410" delta="↑ 28% vs last month" color={BRAND.accent} />
          <StatCard label="Revenue Attributed" value="$142k" delta="↑ 19% this quarter" color="#F59E0B" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ color: BRAND.text, fontWeight: 600, fontSize: 14, fontFamily: "'Inter', sans-serif", marginBottom: 16 }}>Advocate Growth</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120 }}>
              {barData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", height: `${val}%`, background: `linear-gradient(180deg, ${BRAND.primaryLight}, ${BRAND.primary})`, borderRadius: "3px 3px 0 0", opacity: 0.85 }} />
                  <span style={{ color: BRAND.muted, fontSize: 9, fontFamily: "'Inter', sans-serif" }}>{labels[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ color: BRAND.text, fontWeight: 600, fontSize: 14, fontFamily: "'Inter', sans-serif", marginBottom: 16 }}>Top Advocates</div>
            {[
              { name: "Alex Rivera", score: 98, refs: 142 },
              { name: "Maria Chen", score: 94, refs: 128 },
              { name: "Jordan Kim", score: 91, refs: 115 },
              { name: "Sam Torres", score: 87, refs: 98 },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: `hsl(${i * 60 + 200}, 70%, 55%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 11, fontWeight: 700, fontFamily: "'Inter', sans-serif", flexShrink: 0 }}>{a.name[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: BRAND.text, fontSize: 12, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>{a.name}</div>
                  <div style={{ color: BRAND.muted, fontSize: 10, fontFamily: "'Inter', sans-serif" }}>{a.refs} referrals</div>
                </div>
                <div style={{ background: `${BRAND.accent}22`, color: BRAND.accent, fontSize: 11, fontWeight: 700, fontFamily: "'Inter', sans-serif", padding: "3px 8px", borderRadius: 6 }}>{a.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvocatesScreen({ clickedCard }: { clickedCard: boolean }) {
  const advocates = [
    { name: "Alex Rivera", role: "Brand Ambassador", score: 98, refs: 142, tag: "Top Performer" },
    { name: "Maria Chen", role: "Community Leader", score: 94, refs: 128, tag: "Rising Star" },
    { name: "Jordan Kim", role: "Influencer", score: 91, refs: 115, tag: "Consistent" },
    { name: "Sam Torres", role: "Product Evangelist", score: 87, refs: 98, tag: "Active" },
    { name: "Casey Wu", role: "Brand Ambassador", score: 83, refs: 87, tag: "Active" },
    { name: "Riley Park", role: "Community Leader", score: 79, refs: 74, tag: "Growing" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <Topbar title="Advocates" action="+ Add Advocate" />
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "9px 14px", color: BRAND.muted, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>🔍  Search advocates...</div>
          <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "9px 14px", color: BRAND.muted, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Filter ▾</div>
          <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: "9px 14px", color: BRAND.muted, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Sort ▾</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {advocates.map((a, i) => (
            <div key={i} style={{ background: i === 0 && clickedCard ? BRAND.surfaceHover : BRAND.card, border: `1px solid ${i === 0 && clickedCard ? BRAND.primary : BRAND.border}`, borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all 0.15s", transform: i === 0 && clickedCard ? "scale(0.98)" : "scale(1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `hsl(${i * 55 + 200}, 65%, 55%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 16, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{a.name[0]}</div>
                <div>
                  <div style={{ color: BRAND.text, fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>{a.name}</div>
                  <div style={{ color: BRAND.muted, fontSize: 12, fontFamily: "'Inter', sans-serif" }}>{a.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ color: BRAND.muted, fontSize: 12, fontFamily: "'Inter', sans-serif" }}>{a.refs} referrals</div>
                <div style={{ background: i === 0 ? `${BRAND.accent}22` : `${BRAND.primaryLight}18`, color: i === 0 ? BRAND.accent : BRAND.primaryLight, fontSize: 11, fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "3px 9px", borderRadius: 20 }}>{a.tag}</div>
              </div>
              <div style={{ marginTop: 12, background: BRAND.bg, borderRadius: 4, height: 4 }}>
                <div style={{ width: `${a.score}%`, height: "100%", background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.primaryLight})`, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ addHighlight }: { addHighlight: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <Topbar title="Advocate Profile" action="+ Add to Campaign" actionHighlight={addHighlight} />
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
          <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 24, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "hsl(200, 65%, 55%)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 28, fontWeight: 700, fontFamily: "'Inter', sans-serif", margin: "0 auto 16px" }}>A</div>
            <div style={{ color: BRAND.text, fontSize: 20, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>Alex Rivera</div>
            <div style={{ color: BRAND.muted, fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 16 }}>Brand Ambassador · San Francisco</div>
            <div style={{ background: `${BRAND.accent}22`, color: BRAND.accent, fontSize: 12, fontWeight: 700, fontFamily: "'Inter', sans-serif", padding: "5px 14px", borderRadius: 20, display: "inline-block", marginBottom: 20 }}>Top Performer</div>
            <div style={{ display: "flex", justifyContent: "space-around", borderTop: `1px solid ${BRAND.border}`, paddingTop: 20 }}>
              {[["Score", "98"], ["Refs", "142"], ["Active", "3"]].map(([label, val]) => (
                <div key={label}>
                  <div style={{ color: BRAND.text, fontSize: 18, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{val}</div>
                  <div style={{ color: BRAND.muted, fontSize: 11, fontFamily: "'Inter', sans-serif" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 20 }}>
              <div style={{ color: BRAND.text, fontWeight: 600, fontSize: 14, fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>Performance Overview</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[["Conversions", "89", BRAND.accent], ["Reach", "12.4k", BRAND.primaryLight], ["Engagement", "8.2%", "#F59E0B"]].map(([label, val, color]) => (
                  <div key={label as string} style={{ flex: 1, background: BRAND.bg, borderRadius: 10, padding: 14 }}>
                    <div style={{ color: color as string, fontSize: 20, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{val}</div>
                    <div style={{ color: BRAND.muted, fontSize: 11, fontFamily: "'Inter', sans-serif", marginTop: 2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: 20 }}>
              <div style={{ color: BRAND.text, fontWeight: 600, fontSize: 14, fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>Recent Activity</div>
              {[
                { action: "Shared product launch post", time: "2h ago", type: "share" },
                { action: "Referred 3 new customers", time: "1d ago", type: "referral" },
                { action: "Completed Q4 campaign", time: "3d ago", type: "campaign" },
                { action: "Posted testimonial video", time: "5d ago", type: "content" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: BRAND.primaryLight, flexShrink: 0 }} />
                  <div style={{ flex: 1, color: BRAND.text, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{item.action}</div>
                  <div style={{ color: BRAND.muted, fontSize: 11, fontFamily: "'Inter', sans-serif" }}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignsScreen({ newBtnHighlight }: { newBtnHighlight: boolean }) {
  const campaigns = [
    { name: "Q4 Brand Boost", status: "Active", advocates: 45, referrals: 312, progress: 78 },
    { name: "Product Launch Alpha", status: "Active", advocates: 28, referrals: 189, progress: 55 },
    { name: "Holiday Referral Drive", status: "Draft", advocates: 0, referrals: 0, progress: 0 },
    { name: "Summer Awareness", status: "Completed", advocates: 67, referrals: 534, progress: 100 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <Topbar title="Campaigns" action="+ New Campaign" actionHighlight={newBtnHighlight} />
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {["All", "Active", "Draft", "Completed"].map((f, i) => (
            <div key={f} style={{ padding: "7px 16px", borderRadius: 8, background: i === 0 ? BRAND.primary : BRAND.card, border: `1px solid ${i === 0 ? BRAND.primary : BRAND.border}`, color: i === 0 ? "white" : BRAND.muted, fontSize: 13, fontWeight: i === 0 ? 600 : 400, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}>{f}</div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {campaigns.map((c, i) => (
            <div key={i} style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <div style={{ color: BRAND.text, fontSize: 15, fontWeight: 600, fontFamily: "'Inter', sans-serif", marginBottom: 2 }}>{c.name}</div>
                  <div style={{ color: BRAND.muted, fontSize: 12, fontFamily: "'Inter', sans-serif" }}>{c.advocates} advocates enrolled</div>
                </div>
                <div style={{ background: c.status === "Active" ? `${BRAND.accent}22` : c.status === "Draft" ? `${BRAND.primaryLight}18` : `${BRAND.muted}22`, color: c.status === "Active" ? BRAND.accent : c.status === "Draft" ? BRAND.primaryLight : BRAND.muted, fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "4px 12px", borderRadius: 20 }}>{c.status}</div>
              </div>
              <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
                <div style={{ color: BRAND.muted, fontSize: 12, fontFamily: "'Inter', sans-serif" }}><span style={{ color: BRAND.text, fontWeight: 600 }}>{c.referrals}</span> referrals</div>
                <div style={{ color: BRAND.muted, fontSize: 12, fontFamily: "'Inter', sans-serif" }}><span style={{ color: BRAND.text, fontWeight: 600 }}>{c.progress}%</span> complete</div>
              </div>
              <div style={{ background: BRAND.bg, borderRadius: 4, height: 4 }}>
                <div style={{ width: `${c.progress}%`, height: "100%", background: c.status === "Completed" ? BRAND.accent : `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.primaryLight})`, borderRadius: 4, transition: "width 0.4s" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CampaignFormScreen({ submitHighlight }: { submitHighlight: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      <Topbar title="New Campaign" />
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 28 }}>
            <h3 style={{ color: BRAND.text, fontWeight: 700, fontSize: 18, fontFamily: "'Inter', sans-serif", margin: "0 0 24px" }}>Campaign Details</h3>
            {[
              { label: "Campaign Name", value: "Winter Product Showcase 2025", type: "text" },
              { label: "Description", value: "Engage top advocates for Q1 product launch...", type: "textarea" },
              { label: "Start Date", value: "2025-01-15", type: "text" },
              { label: "End Date", value: "2025-03-31", type: "text" },
            ].map(field => (
              <div key={field.label} style={{ marginBottom: 18 }}>
                <label style={{ color: BRAND.muted, fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>{field.label}</label>
                <div style={{ background: BRAND.bg, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: field.type === "textarea" ? "10px 14px" : "10px 14px", color: field.value ? BRAND.text : BRAND.muted, fontSize: 13, fontFamily: "'Inter', sans-serif", minHeight: field.type === "textarea" ? 72 : "auto" }}>{field.value}</div>
              </div>
            ))}
            <div style={{ marginBottom: 24 }}>
              <label style={{ color: BRAND.muted, fontSize: 12, fontWeight: 500, display: "block", marginBottom: 6, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" }}>Target Advocates</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Top Performers", "Rising Stars", "Brand Ambassadors"].map(tag => (
                  <div key={tag} style={{ background: `${BRAND.primary}22`, border: `1px solid ${BRAND.primary}`, color: BRAND.primaryLight, fontSize: 12, fontWeight: 500, padding: "5px 12px", borderRadius: 20, fontFamily: "'Inter', sans-serif" }}>{tag} ✓</div>
                ))}
                <div style={{ background: BRAND.bg, border: `1px solid ${BRAND.border}`, color: BRAND.muted, fontSize: 12, padding: "5px 12px", borderRadius: 20, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}>+ Add Group</div>
              </div>
            </div>
            <div style={{ background: submitHighlight ? BRAND.primaryLight : BRAND.primary, borderRadius: 10, padding: "14px", textAlign: "center", color: "white", fontWeight: 700, fontSize: 15, fontFamily: "'Inter', sans-serif", transition: "all 0.15s", cursor: "pointer", transform: submitHighlight ? "scale(0.98)" : "scale(1)", boxShadow: submitHighlight ? `0 0 20px ${BRAND.primary}88` : "none" }}>
              🚀 Launch Campaign
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessScreen() {
  return (
    <div style={{ width: "100%", height: "100%", background: BRAND.bg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${BRAND.accent}, #059669)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: `0 0 40px ${BRAND.accent}44` }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{ color: BRAND.text, fontWeight: 700, fontSize: 28, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>Campaign Launched!</h2>
        <p style={{ color: BRAND.muted, fontSize: 16, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, marginBottom: 32 }}>
          <strong style={{ color: BRAND.text }}>Winter Product Showcase 2025</strong> is now live. Your advocates will be notified and the campaign will begin on January 15th.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <div style={{ background: BRAND.primary, color: "white", padding: "10px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}>View Campaign</div>
          <div style={{ background: BRAND.card, border: `1px solid ${BRAND.border}`, color: BRAND.text, padding: "10px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}>Go to Dashboard</div>
        </div>
      </div>
    </div>
  );
}

type ScreenName = "login" | "dashboard" | "advocates" | "profile" | "campaigns" | "campaign-form" | "success";

function AppShell({ screen, addHighlight, newBtnHighlight, submitHighlight, clickedCard }: {
  screen: ScreenName;
  addHighlight: boolean;
  newBtnHighlight: boolean;
  submitHighlight: boolean;
  clickedCard: boolean;
}) {
  const noSidebar = screen === "login" || screen === "success";
  const sidebarActive: Record<ScreenName, string> = {
    login: "",
    dashboard: "dashboard",
    advocates: "advocates",
    profile: "advocates",
    campaigns: "campaigns",
    "campaign-form": "campaigns",
    success: "campaigns",
  };
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", overflow: "hidden" }}>
      {!noSidebar && <Sidebar active={sidebarActive[screen]} />}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {screen === "login" && <LoginScreen clicking={clickedCard} />}
        {screen === "dashboard" && <DashboardScreen />}
        {screen === "advocates" && <AdvocatesScreen clickedCard={clickedCard} />}
        {screen === "profile" && <ProfileScreen addHighlight={addHighlight} />}
        {screen === "campaigns" && <CampaignsScreen newBtnHighlight={newBtnHighlight} />}
        {screen === "campaign-form" && <CampaignFormScreen submitHighlight={submitHighlight} />}
        {screen === "success" && <SuccessScreen />}
      </div>
    </div>
  );
}

function Cursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <div style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-4px, -4px)", pointerEvents: "none", zIndex: 9999, transition: "none" }}>
      <svg width={clicking ? 18 : 22} height={clicking ? 18 : 22} viewBox="0 0 24 24" fill="white" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))", transition: "all 0.1s" }}>
        <path d="M4 4l7 19 3-7 7-3L4 4z" fill="white" stroke="#222" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
      {clicking && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 32, height: 32, borderRadius: "50%", background: `${BRAND.primary}44`, animation: "ripple 0.4s ease-out" }} />
      )}
    </div>
  );
}

export function AdvocatesDemo() {
  const [stepIdx, setStepIdx] = useState(0);
  const [cursorX, setCursorX] = useState(50);
  const [cursorY, setCursorY] = useState(50);
  const [clicking, setClicking] = useState(false);
  const [screen, setScreen] = useState<ScreenName>("login");
  const [addHighlight, setAddHighlight] = useState(false);
  const [newBtnHighlight, setNewBtnHighlight] = useState(false);
  const [submitHighlight, setSubmitHighlight] = useState(false);
  const [clickedCard, setClickedCard] = useState(false);
  const [stepLabel, setStepLabel] = useState(STEPS[0].label);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runStep = (idx: number) => {
    if (idx >= STEPS.length) {
      setTimeout(() => {
        setStepIdx(0);
        setCursorX(50);
        setCursorY(50);
        setScreen("login");
        setClicking(false);
        setAddHighlight(false);
        setNewBtnHighlight(false);
        setSubmitHighlight(false);
        setClickedCard(false);
        setStepLabel(STEPS[0].label);
        setProgress(0);
        setTimeout(() => runStep(0), 1200);
      }, 1000);
      return;
    }

    const step = STEPS[idx];
    setStepLabel(step.label);
    setProgress(idx / (STEPS.length - 1));

    const fromX = cursorX;
    const fromY = cursorY;
    const toX = step.cursorTarget.x;
    const toY = step.cursorTarget.y;

    const moveDuration = Math.min(step.duration * 0.5, 800);
    const startTime = performance.now();

    const animateCursor = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / moveDuration, 1);
      const eased = easeInOutCubic(t);
      setCursorX(lerp(fromX, toX, eased));
      setCursorY(lerp(fromY, toY, eased));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animateCursor);
      } else {
        if (step.action === "click") {
          setClicking(true);
          if (idx === 1) setClickedCard(true);
          if (step.id === "add-btn") setAddHighlight(true);
          if (step.id === "new-campaign") setNewBtnHighlight(true);
          if (step.id === "submit") setSubmitHighlight(true);
          timeoutRef.current = setTimeout(() => {
            setClicking(false);
            setAddHighlight(false);
            setNewBtnHighlight(false);
            setSubmitHighlight(false);
            setClickedCard(false);
            const nextStep = STEPS[idx + 1];
            if (nextStep) {
              setScreen(nextStep.screen as ScreenName);
            }
            timeoutRef.current = setTimeout(() => runStep(idx + 1), 300);
          }, 350);
        } else {
          setScreen(step.screen as ScreenName);
          timeoutRef.current = setTimeout(() => runStep(idx + 1), step.duration - moveDuration);
        }
      }
    };
    rafRef.current = requestAnimationFrame(animateCursor);
  };

  useEffect(() => {
    const t = setTimeout(() => runStep(0), 600);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: BRAND.bg, display: "flex", flexDirection: "column", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes ripple { from { opacity: 0.7; transform: translate(-50%, -50%) scale(0); } to { opacity: 0; transform: translate(-50%, -50%) scale(2); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={{ height: 48, background: "#0A1120", borderBottom: `1px solid ${BRAND.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28CA41" }} />
          </div>
          <div style={{ background: BRAND.surface, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: "4px 16px", color: BRAND.muted, fontSize: 12 }}>
            app.projectadvocates.io
          </div>
        </div>
        <div style={{ color: BRAND.muted, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.accent }} />
          Live Demo
        </div>
      </div>

      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <AppShell
          screen={screen}
          addHighlight={addHighlight}
          newBtnHighlight={newBtnHighlight}
          submitHighlight={submitHighlight}
          clickedCard={clickedCard}
        />
        <Cursor x={cursorX} y={cursorY} clicking={clicking} />
      </div>

      <div style={{ height: 56, background: "#0A1120", borderTop: `1px solid ${BRAND.border}`, display: "flex", alignItems: "center", padding: "0 24px", gap: 20, flexShrink: 0 }}>
        <div style={{ color: BRAND.text, fontSize: 13, fontWeight: 600, minWidth: 220, animation: "fadeIn 0.3s ease" }} key={stepLabel}>{stepLabel}</div>
        <div style={{ flex: 1, background: BRAND.surface, borderRadius: 4, height: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress * 100}%`, background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.primaryLight})`, borderRadius: 4, transition: "width 0.5s ease" }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {STEPS.filter((_, i) => i % 2 === 0).map((s, i) => (
            <div key={s.id} style={{ width: 6, height: 6, borderRadius: "50%", background: progress >= (i * 2) / (STEPS.length - 1) ? BRAND.primaryLight : BRAND.border, transition: "background 0.3s" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
