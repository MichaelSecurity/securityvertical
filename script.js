// SecurityVertical – multi-language version
console.log("SecurityVertical loaded");


// ======================================================
// 🌍 TEXTY PODLE JAZYKA
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
// 🔍 Helper pro bezpečné hodnoty
// ======================================================
const safe = v => v ? v : "—";


// ======================================================
// 🔍 Detekce prohlížeče
// ======================================================
function detectBrowser() {
    const ua = navigator.userAgent;

    if (ua.includes("Edg")) return "Microsoft Edge";
    if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
    if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
    if (ua.includes("Firefox")) return "Firefox";
    if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";

    return "Unknown";
}


// ======================================================
// 🟥 MODAL – středově vycentrované okno
// ======================================================
function showModal(html) {
    let old = document.getElementById("sv-modal");
    if (old) old.remove();

    const modal = document.createElement("div");
    modal.id = "sv-modal";

    modal.style = `
        position: fixed;
        top:0; left:0; width:100%; height:100%;
        display:flex; align-items:center; justify-content:center;
        background: rgba(0,0,0,0.65);
        z-index: 999999;
        padding: 20px;
        box-sizing: border-box;
    `;

    modal.innerHTML = `
        <div style="
            background:#111;
            padding:25px 30px;
            border-radius:14px;
            max-width:420px;
            width:100%;
            color:#eee;
            font-family:Arial;
            line-height:1.55;
            box-shadow:0 0 25px rgba(0,0,0,0.45);
            text-align:left;
        ">
            ${html}
        </div>
    `;

    document.body.appendChild(modal);
}


// ======================================================
// 🚀 HLAVNÍ FUNKCE – spustí test (jen 1 popup)
// ======================================================
async function runSecurityTest() {

    const tx = getTexts();

    // Loader – hned zobrazíme modální okno, žádný alert
    showModal(`
        <h2 style="margin-top:0; margin-bottom:15px;">${tx.title}</h2>
        <p>${tx.loading}</p>
    `);

    let data;

    try {
        const res = await fetch(
            "https://function-bun-production-6014.up.railway.app/api/security-check",
            { cache: "no-store" }
        );

        try {
            data = await res.json();
        } catch (e) {
            showModal("<h3>Server error – invalid response.</h3>");
            return;
        }

    } catch (e) {
        showModal("<h3>Server momentálně neodpovídá.</h3>");
        return;
    }

    if (!data || !data.success) {
        showModal("<h3>Chybná odpověď serveru.</h3>");
        return;
    }

    const browserPretty = detectBrowser();

    let riskLabel =
        data.risk <= 2 ? tx.risk_low :
        data.risk == 3 ? tx.risk_mid :
        tx.risk_high;

    // Přepsání loaderu výsledkem
    showModal(`
        <h2 style="margin-top:0; margin-bottom:15px;">${tx.title}</h2>

        <b>${tx.ip}:</b> ${safe(data.ip)}<br>
        <b>${tx.country}:</b> ${safe(data.country)}<br>
        <b>${tx.city}:</b> ${safe(data.city)}<br>
        <b>${tx.isp}:</b> ${safe(data.isp)}<br><br>

        <b>${tx.vpn}:</b> ${data.vpn ? tx.vpn_yes : tx.vpn_no}<br>
        <b>${tx.risk}:</b> ${riskLabel}<br><br>

        <b>${tx.device}:</b> ${safe(data.platform)}<br>
        <b>${tx.browser}:</b> ${browserPretty}<br><br>

        <button onclick="document.getElementById('sv-modal').remove();" 
          style="
            background:#d8d8d8; color:#000; font-weight:bold;
            border:none; padding:12px 22px; border-radius:10px;
            cursor:pointer; width:100%; margin-top:10px; text-align:center;
        ">
          ${tx.close}
        </button>
    `);
}
