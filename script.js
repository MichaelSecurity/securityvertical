// =======================================================
// SecurityVertical – FINAL STABLE MULTI-LANGUAGE VERSION
// With ANON MODE message, fixed ISP detection & no false positives
// =======================================================

console.log("SecurityVertical – CLEAN STABLE version loaded");

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
            vpn: "VPN / Anonymita",
            risk: "Bezpečnostní riziko",
            risk_low: "NÍZKÉ – vše v pořádku 👍",
            risk_mid: "STŘEDNÍ – doporučujeme zkontrolovat nastavení ⚠️",
            risk_high: "VYSOKÉ – riziková IP / VPN / datacentrum 🚨",
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
            vpn: "VPN / Anonymity",
            risk: "Security Risk",
            risk_low: "LOW – everything looks good 👍",
            risk_mid: "MEDIUM – review recommended ⚠️",
            risk_high: "HIGH – risky IP / VPN / datacenter 🚨",
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

// DETECT ISP from any field API may send
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
// NEW – REALISTIC RISK ENGINE + ANON MODE
// =======================================================
function computeRisk(data, tx) {

    // 1) VPN / TOR / Proxy → anonymní režim
    if (data.tor || data.vpn || data.proxy) {
        return { label: tx.anon, level: "anon" };
    }

    // 2) Datacentrum / hosting = anonymní režim
    if (data.is_hosting) {
        return { label: tx.anon, level: "anon" };
    }

    // 3) Špatná reputace = vysoké riziko
    if (data.reputation === "bad") {
        return { label: tx.risk_high, level: "high" };
    }

    // 4) Normální domácí/mobilní IP = nízké riziko
    if (data.risk <= 4) {
        return { label: tx.risk_low, level: "low" };
    }

    // 5) Střední riziko 5–6
    if (data.risk <= 6) {
        return { label: tx.risk_mid, level: "mid" };
    }

    // 6) Jinak vysoké
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
    const detectedISP = detectISP(data);

    showModal(`
        <h2 style="margin-top:0; margin-bottom:18px; text-align:center;">
            ${tx.title}
        </h2>

        <b>${tx.ip}:</b> ${safe(data.ip)}<br>
        <b>${tx.country}:</b> ${safe(data.country)}<br>
        <b>${tx.city}:</b> ${safe(data.city)}<br>
        <b>${tx.isp}:</b> ${safe(detectedISP)}<br><br>

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
