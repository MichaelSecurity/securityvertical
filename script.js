// =======================================================
// SecurityVertical – FINAL MULTI-LANGUAGE SAFE VERSION
// Trusted ISP → LOW, hosting → ANON, VPN/TOR → ANON
// =======================================================

console.log("SecurityVertical – FINAL MULTI VERSION loaded");

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
            close: "Zavřít",

            more: "Chcete vědět víc?",
            audit_title: "Pokročilý bezpečnostní audit",
            audit_desc: "Tento audit zkontroluje:",
            audit_items: [
                "Blacklisty / incidentní databáze",
                "Zranitelné porty",
                "Historické útoky",
                "Reputace poskytovatele",
                "Úniky DNS / WebRTC / IPv6"
            ],
            audit_price: "Cena: 49 Kč",
            audit_btn: "Začít pokročilý audit",
            audit_wait: "Audituje… čekejte prosím…",
            audit_prep: "Probíhá analýza a vyhodnocení bezpečnostních parametrů."
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
            close: "Close",

            more: "Learn more?",
            audit_title: "Advanced Security Audit",
            audit_desc: "This audit checks:",
            audit_items: [
                "Blacklists / incident databases",
                "Vulnerable ports",
                "Historical attacks",
                "Provider reputation",
                "DNS / WebRTC / IPv6 leaks"
            ],
            audit_price: "Price: €2",
            audit_btn: "Start advanced audit",
            audit_wait: "Running audit… please wait…",
            audit_prep: "Analyzing network and security parameters."
        },

        de: {
            loading: "Sicherheitsprüfung läuft…",
            title: "🔍 Ergebnis der Sicherheitsprüfung",
            ip: "IP-Adresse",
            country: "Land",
            city: "Stadt",
            isp: "Anbieter",
            risk: "Sicherheitsrisiko",

            risk_low: "NIEDRIG – alles in Ordnung 👍",
            risk_mid: "MITTEL – Überprüfung empfohlen ⚠️",
            risk_high: "HOCH – riskante IP / schlechte Reputation 🚨",

            anon: "Anonymmodus – Ihre Identität ist verborgen.",
            device: "Gerät",
            browser: "Browser",
            close: "Schließen",

            more: "Mehr erfahren?",
            audit_title: "Erweiterter Sicherheitsaudit",
            audit_desc: "Dieser Audit prüft:",
            audit_items: [
                "Blacklists / Incident-Datenbanken",
                "Verwundbare Ports",
                "Historische Angriffe",
                "Provider-Reputation",
                "DNS / WebRTC / IPv6 Leaks"
            ],
            audit_price: "Preis: 2 €",
            audit_btn: "Erweiterten Audit starten",
            audit_wait: "Audit läuft… bitte warten…",
            audit_prep: "Analyse der Sicherheitsparameter wird durchgeführt."
        },

        pl: {
            loading: "Trwa kontrola bezpieczeństwa…",
            title: "🔍 Wynik kontroli bezpieczeństwa",
            ip: "Adres IP",
            country: "Kraj",
            city: "Miasto",
            isp: "Dostawca",
            risk: "Ryzyko bezpieczeństwa",

            risk_low: "NISKIE – wszystko w porządku 👍",
            risk_mid: "ŚREDNIE – zalecana weryfikacja ⚠️",
            risk_high: "WYSOKIE – ryzykowne IP / zła reputacja 🚨",

            anon: "Tryb anonimowy – prawdziwa tożsamość ukryta.",
            device: "Urządzenie",
            browser: "Przeglądarka",
            close: "Zamknij",

            more: "Dowiedz się więcej",
            audit_title: "Zaawansowany audyt bezpieczeństwa",
            audit_desc: "Ten audyt sprawdzi:",
            audit_items: [
                "Blacklisty / bazy incydentów",
                "Wrażliwe porty",
                "Historyczne ataki",
                "Reputacja dostawcy",
                "Wycieki DNS / WebRTC / IPv6"
            ],
            audit_price: "Cena: 10 PLN",
            audit_btn: "Rozpocznij zaawansowany audyt",
            audit_wait: "Trwa audyt… proszę czekać…",
            audit_prep: "Trwa analiza parametrów bezpieczeństwa."
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
            width:100%; max-width:460px;
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
// Risk engine
// =======================================================
function computeRisk(data, tx) {

    const isp = (detectISP(data) || "").toLowerCase();

    const trustedProviders = [
        "poda", "o2", "t-mobile", "vodafone",
        "upc", "nejtv", "century", "radiolan",
        "seznam", "cra", "dragon", "uvalnet"
    ];

    const isTrusted = trustedProviders.some(p => isp.includes(p));

    if (data.tor || data.vpn || data.proxy)
        return { label: tx.anon, level: "anon" };

    if (data.is_hosting && isTrusted)
        return { label: tx.anon, level: "anon" };

    if (data.is_hosting)
        return { label: tx.risk_mid, level: "mid" };

    if (isTrusted)
        return { label: tx.risk_low, level: "low" };

    if (data.risk <= 4) return { label: tx.risk_low, level: "low" };
    if (data.risk <= 6) return { label: tx.risk_mid, level: "mid" };

    if (data.reputation === "bad")
        return { label: tx.risk_high, level: "high" };

    return { label: tx.risk_high, level: "high" };
}

// =======================================================
// MAIN TEST
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
        <h2 style="margin-top:0; text-align:center;">${tx.title}</h2>

        <b>${tx.ip}:</b> ${safe(data.ip)}<br>
        <b>${tx.country}:</b> ${safe(data.country)}<br>
        <b>${tx.city}:</b> ${safe(data.city)}<br>
        <b>${tx.isp}:</b> ${safe(isp)}<br><br>

        <b>${tx.risk}:</b> ${risk.label}<br><br>

        <b>${tx.device}:</b> ${safe(data.platform)}<br>
        <b>${tx.browser}:</b> ${browserPretty}<br><br>

        <div style="text-align:center; margin-bottom:15px;">
            <button id="deep-btn" style="
                background:#ffd600;
                color:#000;
                padding:12px 24px;
                border-radius:10px;
                border:none;
                font-weight:bold;
                cursor:pointer;
                margin-bottom:10px;
            ">${tx.more}</button>
        </div>

        <div style="text-align:center;">
            <button onclick="document.getElementById('sv-modal').remove()"
                style="
                    background:#d8d8d8; color:#000;
                    padding:12px 26px; border-radius:10px;
                    border:none; font-weight:bold;
                    cursor:pointer;
                ">
                ${tx.close}
            </button>
        </div>
    `);
}

// =======================================================
// PAID AUDIT MODAL
// =======================================================
document.addEventListener("click", (e) => {
    if (e.target.id === "deep-btn") {

        const tx = getTexts();

        showModal(`
            <h2 style="text-align:center;">${tx.audit_title}</h2>

            <p>${tx.audit_desc}</p>

            <ul>
                <li>${tx.audit_items[0]}</li>
                <li>${tx.audit_items[1]}</li>
                <li>${tx.audit_items[2]}</li>
                <li>${tx.audit_items[3]}</li>
                <li>${tx.audit_items[4]}</li>
            </ul>

            <p><b>${tx.audit_price}</b></p>

            <div style="text-align:center;margin-top:20px;">
                <button onclick="startDeepScan()" style="
                    padding:12px 26px;
                    background:#ffd600;
                    border:none;
                    border-radius:10px;
                    font-weight:bold;
                    cursor:pointer;
                ">${tx.audit_btn}</button>
            </div>
        `);
    }
});

// =======================================================
// REAL DEEP SCAN IMPLEMENTACE
// =======================================================
async function startDeepScan() {
    const tx = getTexts();

    // Loader
    showLoader(tx.audit_wait);

    let result;
    try {
        const res = await fetch(
            "https://function-bun-production-6014.up.railway.app/api/deep-scan",
            { cache: "no-store" }
        );
        result = await res.json();
    } catch (err) {
        hideLoader();
        alert("Server momentálně neodpovídá.");
        return;
    }

    hideLoader();

    if (!result || !result.success) {
        showModal(`
            <h2 style="text-align:center;">${tx.audit_title}</h2>
            <p>❌ Chyba – audit se nepodařilo dokončit.</p>
            <div style="text-align:center;margin-top:20px;">
                <button onclick="document.getElementById('sv-modal').remove()" style="
                    padding:12px 26px;
                    background:#ccc;
                    border:none;
                    border-radius:10px;
                    font-weight:bold;
                    cursor:pointer;
                ">${tx.close}</button>
            </div>
        `);
        return;
    }

    const leakDNS = result.leaks.dns ? "⚠️ ANO" : "✔️ NE";
    const leakWebRTC = result.leaks.webrtc ? "⚠️ ANO" : "✔️ NE";
    const leakIPv6 = result.leaks.ipv6 ? "⚠️ ANO" : "✔️ NE";

    const incident =
        result.incident_history?.length
            ? `${result.incident_history[0].year} – ${result.incident_history[0].type}`
            : "Žádné incidenty";

    showModal(`
        <h2 style="text-align:center;">${tx.audit_title}</h2>

        <p><b>IP:</b> ${result.ip}</p>
        <p><b>Skóre:</b> ${result.score}/100</p>
        <br>

        <p><b>Úniky:</b></p>
        <ul>
            <li>DNS: ${leakDNS}</li>
            <li>WebRTC: ${leakWebRTC}</li>
            <li>IPv6: ${leakIPv6}</li>
        </ul>

        <p><b>Reputace poskytovatele:</b> ${result.provider_risk}</p>
        <p><b>Incidenty:</b> ${incident}</p>
        <p><b>Blacklisty:</b> ${result.blacklists_hit} / 32</p>

        <div style="text-align:center;margin-top:20px;">
            <button onclick="document.getElementById('sv-modal').remove()" style="
                padding:12px 26px;
                background:#ccc;
                border:none;
                border-radius:10px;
                font-weight:bold;
                cursor:pointer;
            ">${tx.close}</button>
        </div>
    `);
}
