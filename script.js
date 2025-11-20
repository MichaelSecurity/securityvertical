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

    // speciální mapování pro pt-BR → ptbr
    let lang;
    if (rawLang.startsWith("pt-br")) {
        lang = "ptbr";
    } else {
        lang = rawLang.split("-")[0];
    }

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
            audit_prep: "Probíhá analýza a vyhodnocení bezpečnostních parametrů.",

            // deep-scan labels
            score_label: "Skóre",
            leaks_label: "Úniky",
            provider_rep_label: "Reputace poskytovatele",
            incidents_label: "Incidenty",
            blacklists_label: "Blacklisty",
            no_incidents: "Žádné zaznamenané incidenty",
            yes: "ANO",
            no: "NE",
            error_generic: "Chyba – audit se nepodařilo dokončit."
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
            audit_prep: "Analyzing network and security parameters.",

            score_label: "Score",
            leaks_label: "Leaks",
            provider_rep_label: "Provider reputation",
            incidents_label: "Incidents",
            blacklists_label: "Blacklists",
            no_incidents: "No recorded incidents",
            yes: "YES",
            no: "NO",
            error_generic: "Error – audit could not be completed."
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
            audit_prep: "Analyse der Sicherheitsparameter wird durchgeführt.",

            score_label: "Punktzahl",
            leaks_label: "Leaks",
            provider_rep_label: "Provider-Reputation",
            incidents_label: "Vorfälle",
            blacklists_label: "Blacklists",
            no_incidents: "Keine verzeichneten Vorfälle",
            yes: "JA",
            no: "NEIN",
            error_generic: "Fehler – Audit konnte nicht abgeschlossen werden."
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
            audit_prep: "Trwa analiza parametrów bezpieczeństwa.",

            score_label: "Wynik",
            leaks_label: "Wycieki",
            provider_rep_label: "Reputacja dostawcy",
            incidents_label: "Incydenty",
            blacklists_label: "Blacklisty",
            no_incidents: "Brak zarejestrowanych incydentów",
            yes: "TAK",
            no: "NIE",
            error_generic: "Błąd – nie udało się zakończyć audytu."
        },

        es: {
            loading: "Ejecutando verificación de seguridad…",
            title: "🔍 Resultado del análisis de seguridad",
            ip: "Dirección IP",
            country: "País",
            city: "Ciudad",
            isp: "Proveedor",
            risk: "Riesgo de seguridad",

            risk_low: "BAJO – todo parece correcto 👍",
            risk_mid: "MEDIO – se recomienda revisar la configuración ⚠️",
            risk_high: "ALTO – IP de riesgo / mala reputación 🚨",

            anon: "Modo anónimo – tu identidad real está oculta.",
            device: "Dispositivo",
            browser: "Navegador",
            close: "Cerrar",

            more: "¿Quieres saber más?",
            audit_title: "Auditoría avanzada de seguridad",
            audit_desc: "Esta auditoría comprueba:",
            audit_items: [
                "Listas negras / bases de incidentes",
                "Puertos potencialmente vulnerables",
                "Historial de ataques asociados a la IP",
                "Reputación del proveedor",
                "Fugas de DNS / WebRTC / IPv6"
            ],
            audit_price: "Precio: 2 €",
            audit_btn: "Iniciar auditoría avanzada",
            audit_wait: "Ejecutando auditoría… espera, por favor…",
            audit_prep: "Analizando parámetros de red y seguridad.",

            score_label: "Puntuación",
            leaks_label: "Fugas",
            provider_rep_label: "Reputación del proveedor",
            incidents_label: "Incidentes",
            blacklists_label: "Listas negras",
            no_incidents: "No se han registrado incidentes",
            yes: "SÍ",
            no: "NO",
            error_generic: "Error – no se ha podido completar la auditoría."
        },

        fr: {
            loading: "Analyse de sécurité en cours…",
            title: "🔍 Résultat de l’analyse de sécurité",
            ip: "Adresse IP",
            country: "Pays",
            city: "Ville",
            isp: "Fournisseur",
            risk: "Risque de sécurité",

            risk_low: "FAIBLE – tout semble correct 👍",
            risk_mid: "MOYEN – vérification recommandée ⚠️",
            risk_high: "ÉLEVÉ – IP risquée / mauvaise réputation 🚨",

            anon: "Mode anonyme – votre identité réelle est masquée.",
            device: "Appareil",
            browser: "Navigateur",
            close: "Fermer",

            more: "En savoir plus ?",
            audit_title: "Audit de sécurité avancé",
            audit_desc: "Cet audit vérifie :",
            audit_items: [
                "Listes noires / bases d’incidents",
                "Ports potentiellement vulnérables",
                "Historique d’attaques liés à l’IP",
                "Réputation du fournisseur",
                "Fuites DNS / WebRTC / IPv6"
            ],
            audit_price: "Prix : 2 €",
            audit_btn: "Lancer l’audit avancé",
            audit_wait: "Audit en cours… veuillez patienter…",
            audit_prep: "Analyse des paramètres réseau et de sécurité.",

            score_label: "Score",
            leaks_label: "Fuites",
            provider_rep_label: "Réputation du fournisseur",
            incidents_label: "Incidents",
            blacklists_label: "Listes noires",
            no_incidents: "Aucun incident enregistré",
            yes: "OUI",
            no: "NON",
            error_generic: "Erreur – l’audit n’a pas pu être mené à bien."
        },

        ptbr: {
            loading: "Executando verificação de segurança…",
            title: "🔍 Resultado da verificação de segurança",
            ip: "Endereço IP",
            country: "País",
            city: "Cidade",
            isp: "Provedor",
            risk: "Risco de segurança",

            risk_low: "BAIXO – nenhum problema aparente 👍",
            risk_mid: "MÉDIO – recomendada revisão das configurações ⚠️",
            risk_high: "ALTO – IP arriscado / má reputação 🚨",

            anon: "Modo anônimo – sua identidade real está ocultada.",
            device: "Dispositivo",
            browser: "Navegador",
            close: "Fechar",

            more: "Quer saber mais?",
            audit_title: "Auditoria avançada de segurança",
            audit_desc: "Esta auditoria analisa:",
            audit_items: [
                "Listas de bloqueio / bases de incidentes",
                "Portas potencialmente vulneráveis",
                "Histórico de ataques associados ao IP",
                "Reputação do provedor de acesso",
                "Vazamentos de DNS / WebRTC / IPv6"
            ],
            audit_price: "Preço: R$ 9",
            audit_btn: "Iniciar auditoria avançada",
            audit_wait: "Executando auditoria… aguarde…",
            audit_prep: "Analisando parâmetros de rede e segurança.",

            score_label: "Pontuação",
            leaks_label: "Vazamentos",
            provider_rep_label: "Reputação do provedor",
            incidents_label: "Incidentes",
            blacklists_label: "Listas de bloqueio",
            no_incidents: "Nenhum incidente registrado",
            yes: "SIM",
            no: "NÃO",
            error_generic: "Erro – não foi possível concluir a auditoria."
        }
    };

    return t[lang] || t.en;
}

// =======================================================
// Helpers
// =======================================================
const safe = v => (v === null || v === undefined || v === "") ? "—" : v;

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
        text-align:center;
        padding:0 20px;
        box-sizing:border-box;
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
// PAID AUDIT MODAL (STEP 1)
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
// REAL DEEP SCAN IMPLEMENTACE (STEP 2)
// =======================================================
async function startDeepScan() {
    const tx = getTexts();

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
            <p>❌ ${tx.error_generic}</p>
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

    const leaks = result.leaks || {};
    const yes = tx.yes || "YES";
    const no = tx.no || "NO";

    const leakDNS = leaks.dns ? `⚠️ ${yes}` : `✔️ ${no}`;
    const leakWebRTC = leaks.webrtc ? `⚠️ ${yes}` : `✔️ ${no}`;
    const leakIPv6 = leaks.ipv6 ? `⚠️ ${yes}` : `✔️ ${no}`;

    let incident = tx.no_incidents;
    if (Array.isArray(result.incident_history) && result.incident_history.length > 0) {
        const first = result.incident_history[0];
        incident = `${safe(first.year)} – ${safe(first.type)}`;
    }

    showModal(`
        <h2 style="text-align:center;">${tx.audit_title}</h2>

        <p><b>${tx.ip}:</b> ${safe(result.ip)}</p>
        <p><b>${tx.score_label}:</b> ${safe(result.score)}/100</p>
        <br>

        <p><b>${tx.leaks_label}:</b></p>
        <ul>
            <li>DNS: ${leakDNS}</li>
            <li>WebRTC: ${leakWebRTC}</li>
            <li>IPv6: ${leakIPv6}</li>
        </ul>

        <p><b>${tx.provider_rep_label}:</b> ${safe(result.provider_risk)}</p>
        <p><b>${tx.incidents_label}:</b> ${incident}</p>
        <p><b>${tx.blacklists_label}:</b> ${safe(result.blacklists_hit)} / 32</p>

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
