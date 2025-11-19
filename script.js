// SecurityVertical – multi-language frontend
console.log("SecurityVertical – multi language version loaded");


// ======================================================
// 🌍 Texty podle jazyka
// ======================================================
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
            risk_low: "NÍZKÉ – připojení je v pořádku 👍",
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
        },

        de: {
            loading: "Sicherheitsprüfung läuft…",
            title: "🔍 Ergebnis der Sicherheitsprüfung",
            ip: "IP Adresse",
            country: "Land",
            city: "Stadt",
            isp: "Anbieter",
            vpn: "VPN",
            risk: "Sicherheitsrisiko",
            device: "Gerät",
            browser: "Browser",
            vpn_yes: "JA",
            vpn_no: "NEIN",
            risk_low: "NIEDRIG – alles in Ordnung 👍",
            risk_mid: "MITTEL – Einstellungen prüfen ⚠️",
            risk_high: "HOCH – Datenschutz gefährdet 🚨",
            close: "Schließen"
        },

        es: {
            loading: "Realizando verificación de seguridad…",
            title: "🔍 Resultado de la verificación",
            ip: "Dirección IP",
            country: "País",
            city: "Ciudad",
            isp: "Proveedor",
            vpn: "VPN",
            risk: "Riesgo de seguridad",
            device: "Dispositivo",
            browser: "Navegador",
            vpn_yes: "SÍ",
            vpn_no: "NO",
            risk_low: "BAJO – todo está en orden 👍",
            risk_mid: "MEDIO – revisa tu configuración ⚠️",
            risk_high: "ALTO – riesgo para tu privacidad 🚨",
            close: "Cerrar"
        },

        fr: {
            loading: "Analyse de sécurité en cours…",
            title: "🔍 Résultat de l'analyse",
            ip: "Adresse IP",
            country: "Pays",
            city: "Ville",
            isp: "Fournisseur",
            vpn: "VPN",
            risk: "Risque de sécurité",
            device: "Appareil",
            browser: "Navigateur",
            vpn_yes: "OUI",
            vpn_no: "NON",
            risk_low: "FAIBLE – tout est correct 👍",
            risk_mid: "MOYEN – vérifiez vos paramètres ⚠️",
            risk_high: "ÉLEVÉ – risque pour la vie privée 🚨",
            close: "Fermer"
        },

        pl: {
            loading: "Trwa kontrola bezpieczeństwa…",
            title: "🔍 Wynik kontroli",
            ip: "Adres IP",
            country: "Kraj",
            city: "Miasto",
            isp: "Dostawca",
            vpn: "VPN",
            risk: "Ryzyko bezpieczeństwa",
            device: "Urządzenie",
            browser: "Przeglądarka",
            vpn_yes: "TAK",
            vpn_no: "NIE",
            risk_low: "NISKIE – wszystko w porządku 👍",
            risk_mid: "ŚREDNIE – sprawdź ustawienia ⚠️",
            risk_high: "WYSOKIE – zagrożenie prywatności 🚨",
            close: "Zamknij"
        },

        "pt-BR": {
            loading: "Executando verificação de segurança…",
            title: "🔍 Resultado da verificação",
            ip: "Endereço IP",
            country: "País",
            city: "Cidade",
            isp: "Provedor",
            vpn: "VPN",
            risk: "Risco de segurança",
            device: "Dispositivo",
            browser: "Navegador",
            vpn_yes: "SIM",
            vpn_no: "NÃO",
            risk_low: "BAIXO – tudo certo 👍",
            risk_mid: "MÉDIO – revise suas configurações ⚠️",
            risk_high: "ALTO – risco para sua privacidade 🚨",
            close: "Fechar"
        }
    };

    return t[lang] || t.en;
}


// ======================================================
// 🧠 Helper
// ======================================================
const safe = v => v ? v : "—";


// ======================================================
// 🔍 Detekce prohlížeče
// ======================================================
function detectBrowser() {
    const ua = navigator.userAgent;

    if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return "Safari";
    if (/Chrome/i.test(ua)) return "Chrome";
    if (/Firefox/i.test(ua)) return "Firefox";
    if (/Edg/i.test(ua)) return "Microsoft Edge";
    if (/OPR/i.test(ua)) return "Opera";

    return "Unknown";
}


// ======================================================
// 🟥 MODAL – popup okno
// ======================================================
function showModal(html) {
    const old = document.getElementById("sv-modal");
    if (old) old.remove();

    const overlay = document.createElement("div");
    overlay.id = "sv-modal";
    overlay.style = `
        position:fixed; top:0; left:0; width:100%; height:100%;
        background:rgba(0,0,0,0.65); backdrop-filter:blur(3px);
        display:flex; align-items:center; justify-content:center;
        z-index:99999;
        padding:20px;
    `;

    overlay.innerHTML = `
        <div style="
            background:#111; color:#eee;
            padding:28px; border-radius:18px;
            width:95%; max-width:420px;
            line-height:1.6;
            font-family:Arial;
            box-shadow:0 0 25px rgba(0,0,0,0.45);
        ">
            ${html}

            <button onclick="document.getElementById('sv-modal').remove()"
                style="
                    margin-top:25px;
                    background:#d8d8d8;
                    color:#000;
                    padding:14px 20px;
                    border:none;
                    border-radius:12px;
                    width:70%;
                    display:block;
                    margin-left:auto; margin-right:auto;
                    font-size:18px;
                    font-weight:bold;
                    cursor:pointer;
                ">
                Zavřít
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
}


// ======================================================
// 🚀 HLAVNÍ FUNKCE TESTU
// ======================================================
async function runSecurityTest() {

    const tx = getTexts();

    // Loader popup (už žádný alert!)
    showModal(`<h2>${tx.loading}</h2>`);

    let data;
    try {
        const res = await fetch(
            "https://function-bun-production-6014.up.railway.app/api/security-check",
            { cache: "no-store" }
        );
        data = await res.json();
    } catch (e) {
        showModal("<h2>❌ Server neodpovídá.</h2>");
        return;
    }

    if (!data.success) {
        showModal("<h2>❌ Chybná odpověď serveru.</h2>");
        return;
    }

    // mapování rizik
    let riskLabel =
        data.risk <= 2 ? tx.risk_low :
        data.risk === 3 ? tx.risk_mid :
        tx.risk_high;

    const browserPretty = detectBrowser();

    // finální popup
    showModal(`
        <h2 style="margin-top:0; margin-bottom:15px;">${tx.title}</h2>

        <b>${tx.ip}:</b> ${safe(data.ip)}<br>
        <b>${tx.country}:</b> ${safe(data.country)}<br>
        <b>${tx.city}:</b> ${safe(data.city)}<br>
        <b>${tx.isp}:</b> ${safe(data.isp)}<br><br>

        <b>${tx.vpn}:</b> ${data.vpn ? tx.vpn_yes : tx.vpn_no}<br>
        <b>${tx.risk}:</b> ${riskLabel}<br><br>

        <b>${tx.device}:</b> ${safe(data.platform)}<br>
        <b>${tx.browser}:</b> ${browserPretty}<br>
    `);
}
