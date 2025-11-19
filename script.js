// =======================================================
// SecurityVertical – MULTI-LANGUAGE + REAL RISK ENGINE
// TOR/VPN/PROXY handled correctly + proper browser detection
// Single modal + centered + loader overlay
// =======================================================

console.log("SecurityVertical – FINAL MULTI-LANGUAGE version loaded");

// =======================================================
// 🌍 Language dictionary
// =======================================================
function getTexts() {

    // normalizace jazyků (de-DE → de, pt-BR → pt)
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
        },

        de: {
            loading: "Sicherheitsprüfung läuft…",
            title: "🔍 Ergebnis der Sicherheitsprüfung",
            ip: "IP Adresse",
            country: "Land",
            city: "Stadt",
            isp: "Anbieter",
            vpn: "VPN / Anonymität",
            risk: "Sicherheitsrisiko",
            anon: "Anonymmodus – echtes Sicherheitsniveau kann nicht bestimmt werden 🟪",
            risk_low: "NIEDRIG – alles in Ordnung 👍",
            risk_mid: "MITTEL – Überprüfung empfohlen ⚠️",
            risk_high: "HOCH – riskante IP / Rechenzentrum / Ruf 🚨",
            device: "Gerät",
            browser: "Browser",
            close: "Schließen"
        },

        pl: {
            loading: "Trwa kontrola bezpieczeństwa…",
            title: "🔍 Wynik kontroli bezpieczeństwa",
            ip: "Adres IP",
            country: "Kraj",
            city: "Miasto",
            isp: "Dostawca",
            vpn: "VPN / Anonimowość",
            risk: "Ryzyko bezpieczeństwa",
            anon: "Tryb anonimowy – prawdziwego poziomu bezpieczeństwa nie można określić 🟪",
            risk_low: "NISKIE – wszystko w porządku 👍",
            risk_mid: "ŚREDNIE – zalecana weryfikacja ⚠️",
            risk_high: "WYSOKIE – ryzykowne IP / centrum danych / reputacja 🚨",
            device: "Urządzenie",
            browser: "Przeglądarka",
            close: "Zamknij"
        },

        es: {
            loading: "Ejecutando verificación de seguridad…",
            title: "🔍 Resultado de la verificación de seguridad",
            ip: "Dirección IP",
            country: "País",
            city: "Ciudad",
            isp: "Proveedor",
            vpn: "VPN / Anonimato",
            risk: "Riesgo de seguridad",
            anon: "Modo anónimo – no es posible determinar el nivel real de seguridad 🟪",
            risk_low: "BAJO – todo parece correcto 👍",
            risk_mid: "MEDIO – revisión recomendada ⚠️",
            risk_high: "ALTO – IP riesgosa / centro de datos / reputación 🚨",
            device: "Dispositivo",
            browser: "Navegador",
            close: "Cerrar"
        },

        fr: {
            loading: "Analyse de sécurité en cours…",
            title: "🔍 Résultat de l’analyse de sécurité",
            ip: "Adresse IP",
            country: "Pays",
            city: "Ville",
            isp: "Fournisseur",
            vpn: "VPN / Anonymat",
            risk: "Risque de sécurité",
            anon: "Mode anonyme – niveau de sécurité réel impossible à déterminer 🟪",
            risk_low: "FAIBLE – tout est correct 👍",
            risk_mid: "MOYEN – vérification recommandée ⚠️",
            risk_high: "ÉLEVÉ – IP risquée / datacenter / réputation 🚨",
            device: "Appareil",
            browser: "Navigateur",
            close: "Fermer"
        },

        pt: {
            loading: "Executando verificação de segurança…",
            title: "🔍 Resultado da verificação de segurança",
            ip: "Endereço IP",
            country: "País",
            city: "Cidade",
            isp: "Provedor",
            vpn: "VPN / Anonimato",
            risk: "Risco de segurança",
            anon: "Modo anônimo – nível real de segurança não pode ser determinado 🟪",
            risk_low: "BAIXO – tudo certo 👍",
            risk_mid: "MÉDIO – revisão recomendada ⚠️",
            risk_high: "ALTO – IP arriscado / datacenter / reputação 🚨",
            device: "Dispositivo",
            browser: "Navegador",
            close: "Fechar"
        }
    };

    return t[lang] || t.en;
}

// =======================================================
// Safe helper
// =======================================================
const safe = v => v ? v : "—";

// =======================================================
// Browser detection
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
        padding:20px; box-sizing:border-box;
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
// Risk engine
// =======================================================
function computeRisk(data, tx) {
    if (data.vpn || data.tor || data.proxy)
        return { label: tx.anon, level: "anon" };

    if (data.is_hosting)
        return { label: tx.risk_mid, level: "mid" };

    if (data.reputation === "bad")
        return { label: tx.risk_high, level: "high" };

    if (data.risk <= 2)
        return { label: tx.risk_low, level: "low" };

    if (data.risk === 3)
        return { label: tx.risk_mid, level: "mid" };

    return { label: tx.risk_high, level: "high" };
}

// =======================================================
// MAIN TEST FUNCTION
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
