// SecurityVertical – frontend kontrola připojení
console.log("SecurityVertical frontend loaded");

// URL na backend (Bun / Railway)
const API_URL = "https://function-bun-production-6014.up.railway.app/api/security-check";

// Pomocná funkce: zjednodušený název prohlížeče + OS
function detectBrowserSummary(uaString) {
  const ua = uaString || navigator.userAgent || "";
  let browser = "Neznámý prohlížeč";
  let os = "Neznámý systém";

  // OS
  if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  // Browser
  if (/Edg\//i.test(ua)) browser = "Microsoft Edge";
  else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) browser = "Opera";
  else if (/Firefox\//i.test(ua)) browser = "Mozilla Firefox";
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua) && !/OPR\//i.test(ua)) browser = "Google Chrome";
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua) && !/Chromium\//i.test(ua)) browser = "Safari";

  return `${browser} (${os})`;
}

// Pomocná funkce: lokalizovaný text rizika
function getRiskText(lang, risk) {
  const level = (risk || "unknown").toLowerCase();
  let l = lang.toLowerCase();
  if (l.startsWith("pt")) l = "pt";
  if (l.startsWith("en")) l = "en";
  if (l.startsWith("de")) l = "de";
  if (l.startsWith("es")) l = "es";
  if (l.startsWith("fr")) l = "fr";
  if (l.startsWith("pl")) l = "pl";
  if (l.startsWith("cs")) l = "cs";

  const texts = {
    cs: {
      low: "Bezpečné připojení – nic zásadního nevypadá rizikově.",
      medium: "Zvýšené riziko – buď opatrný, zvaž lepší zabezpečení.",
      high: "Vysoké riziko – doporučujeme co nejdříve řešit zabezpečení.",
      unknown: "Nelze přesně vyhodnotit riziko."
    },
    en: {
      low: "Connection looks safe – nothing critical detected.",
      medium: "Elevated risk – consider improving your security.",
      high: "High risk – we recommend securing your connection as soon as possible.",
      unknown: "Risk could not be evaluated precisely."
    },
    de: {
      low: "Verbindung wirkt sicher – keine kritischen Probleme erkannt.",
      medium: "Erhöhtes Risiko – überlegen Sie, die Sicherheit zu verbessern.",
      high: "Hohes Risiko – wir empfehlen, die Sicherheit schnell zu erhöhen.",
      unknown: "Risiko konnte nicht genau bewertet werden."
    },
    es: {
      low: "La conexión parece segura, no se detectan riesgos críticos.",
      medium: "Riesgo elevado – se recomienda mejorar la seguridad.",
      high: "Riesgo alto – es recomendable reforzar la seguridad cuanto antes.",
      unknown: "No se pudo evaluar el riesgo con precisión."
    },
    fr: {
      low: "La connexion semble sûre – aucun risque critique détecté.",
      medium: "Risque élevé – pensez à renforcer votre sécurité.",
      high: "Risque important – il est conseillé d’améliorer la sécurité au plus vite.",
      unknown: "Impossible d’évaluer précisément le risque."
    },
    pl: {
      low: "Połączenie wydaje się bezpieczne – brak krytycznych zagrożeń.",
      medium: "Podwyższone ryzyko – warto poprawić zabezpieczenia.",
      high: "Wysokie ryzyko – zalecamy jak najszybsze zwiększenie ochrony.",
      unknown: "Nie udało się dokładnie ocenić ryzyka."
    },
    pt: {
      low: "A conexão parece segura – nenhum risco crítico detectado.",
      medium: "Risco elevado – considere melhorar sua segurança.",
      high: "Risco alto – recomendamos reforçar a segurança o quanto antes.",
      unknown: "Não foi possível avaliar o risco com precisão."
    }
  };

  const dict = texts[l] || texts.en;
  return dict[level] || dict.unknown;
}

// Vytvoření modálního okna s výsledky
function createResultModal(data) {
  const lang = document.documentElement.lang || "cs";
  const browserSummary = detectBrowserSummary(data.userAgent || "");
  const riskText = getRiskText(lang, data.risk);

  // Překlad ANO/NE/Neznámé pro VPN
  let vpnLabel = "Neznámé";
  if (data.vpn === true) vpnLabel = "ANO";
  else if (data.vpn === false) vpnLabel = "NE";

  // Překlad labelů IP, stát… necháme v češtině (primární jazyk projektu)
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0, 0, 0, 0.75)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";

  const card = document.createElement("div");
  card.style.background = "#101010";
  card.style.color = "#ffffff";
  card.style.padding = "26px 22px 30px";
  card.style.borderRadius = "18px";
  card.style.maxWidth = "420px";
  card.style.width = "90%";
  card.style.boxShadow = "0 18px 45px rgba(0,0,0,0.65)";
  card.style.fontFamily = "Arial, sans-serif";

  const title = document.createElement("h2");
  title.innerText = "Výsledek kontroly";
  title.style.marginTop = "0";
  title.style.marginBottom = "18px";
  title.style.textAlign = "center";
  title.style.fontSize = "26px";

  const list = document.createElement("div");
  list.style.fontSize = "16px";
  list.style.lineHeight = "1.6";

  function addRow(label, value) {
    const row = document.createElement("p");
    row.style.margin = "4px 0";
    row.innerHTML = `<strong>${label}</strong> ${value}`;
    list.appendChild(row);
  }

  addRow("IP:", data.ip || "Neznámé");
  addRow("Stát:", data.country || "Neznámé");
  addRow("Město:", data.city || "Neznámé");
  addRow("ISP:", data.isp || "Neznámé");
  addRow("VPN:", vpnLabel);
  addRow("Riziko:", (data.risk || "unknown") + " – " + riskText);
  addRow("Zařízení:", data.platform || "Neznámé");
  addRow("Prohlížeč:", browserSummary);

  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Zavřít";
  closeBtn.style.marginTop = "22px";
  closeBtn.style.display = "block";
  closeBtn.style.marginLeft = "auto";
  closeBtn.style.marginRight = "auto";
  closeBtn.style.padding = "10px 30px";
  closeBtn.style.borderRadius = "10px";
  closeBtn.style.border = "none";
  closeBtn.style.background = "#e5e5e5";
  closeBtn.style.color = "#000";
  closeBtn.style.fontWeight = "bold";
  closeBtn.style.cursor = "pointer";
  closeBtn.onclick = () => document.body.removeChild(overlay);

  card.appendChild(title);
  card.appendChild(list);
  card.appendChild(closeBtn);
  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

// Hlavní funkce – volaná po kliknutí na „TESTOVAT“
async function runSecurityTest() {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) {
      alert("Server momentálně neodpovídá.");
      return;
    }
    const data = await resp.json();

    if (!data || data.success === false) {
      alert("Chyba při zpracování odpovědi serveru.");
      return;
    }

    createResultModal(data);
  } catch (err) {
    console.error(err);
    alert("Něco se pokazilo při komunikaci se serverem.");
  }
}
