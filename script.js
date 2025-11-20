// =======================================================
// SecurityVertical – FINAL SAFE VERSION
// Trusted ISP → LOW, hosting → ANON, VPN/TOR → ANON
// No bullshit false positives
// =======================================================

console.log("SecurityVertical – FINAL SAFE VERSION loaded");

// =======================================================
// 🌍 Language dictionary
// =======================================================
function getTexts() {

    let rawLang = (document.documentElement.lang || "en").toLowerCase();
    let lang = rawLang.split("-")[0];

    const t = {
        cs: {
            loading: "Probíhá bezpečnostní kontrola…",
            title: "🔍 Výsledek bezpečnostní kontroly",
            ip: "IP adresa",
            country: "Stát",
            city: "Město",
            isp: "Poskytovatel",
            risk: "Bezpečnostní riziko",

            risk_low: "NÍZKÉ – vše v pořádku 👍",
            risk_mid: "STŘEDNÍ – doporučujeme zkontrolovat nastavení ⚠️",
            risk_high: "VYSOKÉ – riziková IP / útok / špatná reputace 🚨",

            anon: "Anonymní režim – Vaše skutečná identita je skrytá.",

            device: "Zařízení",
            browser: "Prohlížeč",
            close: "Zavřít"
        },

        en: {
            loading: "Running security check…",
            title: "🔍 Security Check Result",
            ip: "IP Address",
            country: "Country",
            city: "City",
            isp: "Provider",
            risk: "Security Risk",

            risk_low: "LOW – everything looks good 👍",
            risk_mid: "MEDIUM – review recommended ⚠️",
            risk_high: "HIGH – risky IP / bad reputation 🚨",

            anon: "Anonymous mode – Your real identity is hidden.",

            device: "Device",
            browser: "Browser",
            close: "Close"
        }
    };

    return t[lang] || t.en;
}

// =======================================================
// Helpers
// =======================================================
const safe = v => v ? v : "—";

function detectBrowser() {
    const ua = navigator.userAgent;

    if (ua.includes("CriOS")) return "Chrome (iOS)";
    if (ua.includes("FxiOS")) return "Firefox (iOS)";
    if (ua.includes("EdgiOS")) return "Edge (iOS)";
    if (ua.includes("OPiOS")) return "Opera (iOS)";

    if (ua.includes("Chrome") && !ua.includes("Safari")) return "Chrome";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("OPR")) return "Opera";

    return "Unknown";
}

// ISP autodetect (API sometimes sends different fields)
function detectISP(data) {
    return (
        data.isp ||
        data.org ||
        data.organization ||
        data.company ||
        data.asname ||
        data.network ||
        data.as ||
        "—"
    );
}

// =======================================================
// Loader
// =======================================================
function showLoader(text) {
    const old = document.getElementById("sv-loader");
    if (old) old.remove();

    const div = document.createElement("div");
    div.id = "sv-loader";
    div.style = `
        position: fixed; top:0; left:0;
        width:100vw; height:100vh;
        background: rgba(0,0,0,0.6);
        z-index:999998;
        display:flex; align-items:center; justify-content:center;
        font-size:22px; color:white; font-family:Arial;
    `;
    div.innerHTML = text;
    document.body.appendChild(div);
}

function hideLoader() {
    const el = document.getElementById("sv-loader");
    if (el) el.remove();
}

// =======================================================
// Modal
// =======================================================
function showModal(html) {
    const old = document.getElementById("sv-modal");
    if (old) old.remove();

    const wrap = document.createElement("div");
    wrap.id = "sv-modal";
    wrap.style = `
        position: fixed; top:0; left:0;
        width:100vw; height:100vh;
        background: rgba(0,0,0,0.65);
        z-index:999999;
        display:flex; align-items:center; justify-content:center;
        padding:20px;
    `;

    wrap.innerHTML = `
        <div style="
            width:100%; max-width:450px;
            background:#111; color:#eee;
            padding:28px; border-radius:14px;
            font-family:Arial; line-height:1.55;
            box-shadow:0 0 25px rgba(0,0,0,0.45);
        ">
            ${html}
        </div>
    `;

    document.body.appendChild(wrap);
}

// =======================================================
// NEW – REALISTIC RISK ENGINE (trusted ISP safe)
// =======================================================
function computeRisk(data, tx) {

    const isp = (detectISP(data) || "").toLowerCase();

    // Trusted Czech ISPs – never high risk
    const trustedProviders = [
        "poda", "o2", "t-mobile", "vodafone",
        "upc", "nejtv", "century", "radiolan",
        "seznam", "cra", "dragon", "uvalnet"
    ];

    const isTrustedISP = trustedProviders.some(p => isp.includes(p));

    // TOR / VPN / PROXY → anonymní režim
    if (data.tor || data.vpn || data.proxy) {
        return { label: tx.anon, level: "anon" };
    }

    // Hosting/datacentrum → ANON pokud ISP je reálný provider
    if (data.is_hosting && isTrustedISP) {
        return { label: tx.anon, level: "anon" };
    }

    // Hosting neznámého typu → střední riziko
    if (data.is_hosting && !isTrustedISP) {
        return { label: tx.risk_mid, level: "mid" };
    }

    // Trusted ISP = LOW
    if (isTrustedISP) {
        return { label: tx.risk_low, level: "low" };
    }

    // Standardní risk metrika
    if (data.risk <= 4) return { label: tx.risk_low, level: "low" };
    if (data.risk <= 6) return { label: tx.risk_mid, level: "mid" };

    // Špatná reputace IP
    if (data.reputation === "bad") {
        return { label: tx.risk_high, level: "high" };
    }

    return { label: tx.risk_high, level: "high" };
}

// =======================================================
// MAIN
// =======================================================
async function runSecurityTest() {

    const tx = getTexts();
    showLoader(tx.loading);

    let data;
    try {
        const res = await fetch(
            "https://function-bun-production-6014.up.railway.app/api/security-check",
            { cache: "no-store" }
        );
        data = await res.json();
    } catch {
        hideLoader();
        alert("Server momentálně neodpovídá.");
        return;
    }

    hideLoader();

    if (!data || !data.success) {
        alert("Chybná odpověď serveru.");
        return;
    }

    const risk = computeRisk(data, tx);
    const browserPretty = detectBrowser();
    const isp = detectISP(data);

    showModal(`
        <h2 style="margin-top:0; margin-bottom:18px; text-align:center;">
            ${tx.title}
        </h2>

        <b>${tx.ip}:</b> ${safe(data.ip)}<br>
        <b>${tx.country}:</b> ${safe(data.country)}<br>
        <b>${tx.city}:</b> ${safe(data.city)}<br>
        <b>${tx.isp}:</b> ${safe(isp)}<br><br>

        <b>${tx.risk}:</b> ${risk.label}<br><br>

        <b>${tx.device}:</b> ${safe(data.platform)}<br>
        <b>${tx.browser}:</b> ${browserPretty}<br><br>

        <div style="text-align:center;">
            <button onclick="document.getElementById('sv-modal').remove()"
                style="
                    background:#d8d8d8; color:#000;
                    padding:12px 26px; border-radius:10px;
                    border:none; font-weight:bold; cursor:pointer;
                ">
                ${tx.close}
            </button>
        </div>
    `);
}



// =======================================================
// AUTO-PŘIDÁNÍ TLAČÍTKA „Chcete vědět víc?“
// =======================================================
window.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.querySelector(".hero");
    if (!heroSection) return;

    const btn = document.createElement("button");
    btn.id = "deep-btn";
    btn.textContent = "Chcete vědět víc?";
    btn.style.cssText = `
      margin-top: 15px;
      padding: 12px 20px;
      background: #ffd600;
      border-radius: 10px;
      border: none;
      font-weight: bold;
      cursor: pointer;
      font-size: 16px;
    `;

    heroSection.appendChild(btn);
});


// =======================================================
// MODAL PLACENÉ VERZE
// =======================================================
document.addEventListener("click", (e) => {
    if (e.target.id === "deep-btn") {
      showModal(`
        <h2 style="text-align:center;">Pokročilý bezpečnostní audit</h2>
        <p>Tento audit zkontroluje:</p>
        <ul>
          <li>Blacklisty (30+ bezpečnostních databází)</li>
          <li>Zranitelné porty</li>
          <li>Historické incidenty IP</li>
          <li>Rizikovost poskytovatele</li>
          <li>Úniky dat (DNS/WebRTC/IPv6)</li>
        </ul>

        <p><b>Cena: 49 Kč</b></p>

        <div style="text-align:center;margin-top:20px;">
          <button onclick="startDeepScan()" style="
              padding:12px 26px;
              background:#ffd600;
              border:none;
              border-radius:10px;
              font-weight:bold;
              cursor:pointer;
          ">Začít pokročilý audit</button>
        </div>
      `);
    }
});


// =======================================================
// PLACEHOLDER PRO BUDOUCÍ PLACENOU FUNKCI
// =======================================================
function startDeepScan() {
    showModal(`
      <h2 style="text-align:center;">Pokročilý audit</h2>
      <p>🔧 Tato funkce bude aktivní v další verzi.</p>
      <p>Právě připravujeme napojení na bezpečnostní databáze.</p>

      <div style="text-align:center;margin-top:20px;">
        <button onclick="document.getElementById('sv-modal').remove()" style="
              padding:12px 26px;
              background:#ccc;
              border:none;
              border-radius:10px;
              font-weight:bold;
              cursor:pointer;
        ">Zavřít</button>
      </div>
    `);
}
