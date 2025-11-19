// =======================================================
// SecurityVertical – MULTI-LANGUAGE + REAL RISK ENGINE
// TOR/VPN/PROXY handled correctly + proper browser detection
// Single modal + centered + loader overlay
// =======================================================

console.log("SecurityVertical – FINAL version loaded");


// =======================================================
// 🌍 Language dictionary
// =======================================================
function getTexts() {
    const lang = document.documentElement.lang || "en";

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
            anon: "Anonymní režim – skutečnou úroveň zabezpečení nelze určit 🟪",
            risk_low: "NÍZKÉ – vše v pořádku 👍",
            risk_mid: "STŘEDNÍ – doporučujeme zkontrolovat nastavení ⚠️",
            risk_high: "VYSOKÉ – riziková IP / datacentrum / reputace 🚨",
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
            anon: "Anonymous mode – real security level cannot be determined 🟪",
            risk_low: "LOW – everything looks good 👍",
            risk_mid: "MEDIUM – review recommended ⚠️",
            risk_high: "HIGH – risky IP / datacenter / reputation 🚨",
            device: "Device",
            browser: "Browser",
            close: "Close"
        }
    };

    return t[lang] || t.en;
}


// =======================================================
// 🔒 Safe helper
// =======================================================
const safe = v => v ? v : "—";


// =======================================================
// 🧠 Browser detection – FIXED for iOS Chrome/Safari
// =======================================================
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


// =======================================================
// 🟦 Loader overlay
// =======================================================
function showLoader(text) {
    const old = document.getElementById("sv-loader");
    if (old) old.remove();

    const div = document.createElement("div");
    div.id = "sv-loader";
    div.style = `
        position: fixed;
        top:0; left:0; width:100vw; height:100vh;
        background: rgba(0,0,0,0.6);
        z-index: 999998;
        display:flex; align-items:center; justify-content:center;
        font-size: 22px; color:white; font-family:Arial;
    `;
    div.innerHTML = `<div>${text}</div>`;
    document.body.appendChild(div);
}

function hideLoader() {
    const el = document.getElementById("sv-loader");
    if (el) el.remove();
}


// =======================================================
// 🟥 Modal – always centered, perfect on iPhone
// =======================================================
function showModal(html) {
    const old = document.getElementById("sv-modal");
    if (old) old.remove();

    const wrap = document.createElement("div");
    wrap.id = "sv-modal";
    wrap.style = `
        position: fixed;
        top:0; left:0;
        width:100vw; height:100vh;
        background: rgba(0,0,0,0.65);
        z-index: 999999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 20px;
        box-sizing: border-box;
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
// 🧩 Risk engine (REALISTIC)
// =======================================================
function computeRisk(data, tx) {

    // TOR / VPN / PROXY = anonymous, not danger
    if (data.vpn || data.tor || data.proxy) {
        return {
            label: tx.anon,
            level: "anon"
        };
    }

    // Data center = medium risk
    if (data.is_hosting) {
        return {
            label: tx.risk_mid,
            level: "mid"
        };
    }

    // Bad reputation IP
    if (data.reputation && data.reputation === "bad") {
        return {
            label: tx.risk_high,
            level: "high"
        };
    }

    // Normal:
    if (data.risk <= 2) return { label: tx.risk_low, level: "low" };
    if (data.risk === 3) return { label: tx.risk_mid, level: "mid" };
    return { label: tx.risk_high, level: "high" };
}


// =======================================================
// 🚀 MAIN TEST FUNCTION
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
    } catch (e) {
        hideLoader();
        alert("Server momentálně neodpovídá.");
        return;
    }

    hideLoader();

    if (!data || !data.success) {
        alert("Chybná odpověď serveru.");
        return;
    }

    const browserPretty = detectBrowser();
    const risk = computeRisk(data, tx);

    showModal(`
        <h2 style="margin-top:0; margin-bottom:18px; text-align:center;">
            ${tx.title}
        </h2>

        <b>${tx.ip}:</b> ${safe(data.ip)}<br>
        <b>${tx.country}:</b> ${safe(data.country)}<br>
        <b>${tx.city}:</b> ${safe(data.city)}<br>
        <b>${tx.isp}:</b> ${safe(data.isp)}<br><br>

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
