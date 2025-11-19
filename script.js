// SecurityVertical – Multi-language + correct browser detection + clean popup
console.log("SecurityVertical script loaded");


// ===========================================
// 🌍 Texty podle jazyka
// ===========================================
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
            vpn: "VPN",
            risk: "Bezpečnostní riziko",
            device: "Zařízení",
            browser: "Prohlížeč",
            vpn_yes: "ANO",
            vpn_no: "NE",
            risk_low: "NÍZKÉ – vše v pořádku 👍",
            risk_mid: "STŘEDNÍ – doporučujeme zkontrolovat nastavení ⚠️",
            risk_high: "VYSOKÉ – riziko ohrožení soukromí 🚨",
            close: "Zavřít"
        },

        en: {
            loading: "Running security check…",
            title: "🔍 Security Check Result",
            ip: "IP Address",
            country: "Country",
            city: "City",
            isp: "Provider",
            vpn: "VPN",
            risk: "Security Risk",
            device: "Device",
            browser: "Browser",
            vpn_yes: "YES",
            vpn_no: "NO",
            risk_low: "LOW – everything looks good 👍",
            risk_mid: "MEDIUM – consider reviewing settings ⚠️",
            risk_high: "HIGH – privacy at risk 🚨",
            close: "Close"
        }
    };

    return t[lang] || t.en;
}


// ===========================================
// 🧠 Helper
// ===========================================
const safe = v => v ? v : "—";


// ===========================================
// 🔍 Korektní detekce prohlížeče včetně iOS Chrome
// ===========================================
function detectBrowser() {
    const ua = navigator.userAgent;

    if (ua.includes("CriOS")) return "Chrome (iOS)";
    if (ua.includes("FxiOS")) return "Firefox (iOS)";
    if (ua.includes("EdgiOS")) return "Edge (iOS)";
    if (ua.includes("OPiOS")) return "Opera (iOS)";

    if (ua.includes("Chrome") && ua.includes("Android")) return "Chrome";
    if (ua.includes("Chrome") && !ua.includes("Safari")) return "Chrome";

    if (ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("CriOS")) return "Safari";

    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Edg")) return "Edge";
    if (ua.includes("OPR")) return "Opera";

    return "Unknown";
}


// ===========================================
// 🟦 Loader místo otravného alert()
// ===========================================
function showLoader(text) {
    let old = document.getElementById("sv-loader");
    if (old) old.remove();

    const div = document.createElement("div");
    div.id = "sv-loader";
    div.style = `
        position: fixed;
        top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.5);
        z-index: 999998;
        display:flex; align-items:center; justify-content:center;
        color:#fff; font-size:22px; font-family:Arial;
    `;
    div.innerHTML = `<div>${text}</div>`;
    document.body.appendChild(div);
}

function hideLoader() {
    let el = document.getElementById("sv-loader");
    if (el) el.remove();
}


// ===========================================
// 🟥 MODAL – hlavní popup
// ===========================================
function showModal(html) {
    let old = document.getElementById("sv-modal");
    if (old) old.remove();

    const modal = document.createElement("div");
    modal.id = "sv-modal";
    modal.style = `
        position: fixed;
        top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.65);
        display:flex; align-items:center; justify-content:center;
        z-index: 999999;
        padding:20px;
    `;

    modal.innerHTML = `
        <div style="
            background:#111; padding:28px;
            border-radius:14px; width:100%; max-width:420px;
            color:#eee; font-family:Arial; line-height:1.55;
            text-align:left; box-shadow:0 0 25px rgba(0,0,0,0.45);
        ">
            ${html}
        </div>
    `;

    document.body.appendChild(modal);
}


// ===========================================
// 🚀 HLAVNÍ FUNKCE – spuštění testu
// ===========================================
async function runSecurityTest() {

    const tx = getTexts();

    // ❌ už žádný alert — dáme loader
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

    let riskLabel =
        data.risk <= 2 ? tx.risk_low :
        data.risk == 3 ? tx.risk_mid :
        tx.risk_high;

    const browserPretty = detectBrowser();

    showModal(`
        <h2 style="margin-top:0; margin-bottom:18px; text-align:center;">
            ${tx.title}
        </h2>

        <b>${tx.ip}:</b> ${safe(data.ip)}<br>
        <b>${tx.country}:</b> ${safe(data.country)}<br>
        <b>${tx.city}:</b> ${safe(data.city)}<br>
        <b>${tx.isp}:</b> ${safe(data.isp)}<br><br>

        <b>${tx.vpn}:</b> ${data.vpn ? tx.vpn_yes : tx.vpn_no}<br>
        <b>${tx.risk}:</b> ${riskLabel}<br><br>

        <b>${tx.device}:</b> ${safe(data.platform)}<br>
        <b>${tx.browser}:</b> ${browserPretty}<br><br>

        <div style="text-align:center;">
            <button onclick="document.getElementById('sv-modal').remove()" 
                style="
                    background:#d8d8d8; color:#000; font-weight:bold;
                    border:none; padding:12px 26px; border-radius:10px;
                    cursor:pointer; font-size:18px;
                ">
                ${tx.close}
            </button>
        </div>
    `);
}
