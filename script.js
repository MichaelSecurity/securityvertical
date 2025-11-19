// SecurityVertical – frontend test připojení
console.log("SecurityVertical frontend loaded");

// ========================================
// Hezký výstup do stránky (žádné alerty)
// ========================================

async function runSecurityTest() {

    // najdeme box nebo vytvoříme, pokud neexistuje
    let box = document.getElementById("resultBox");
    if (!box) {
        box = document.createElement("div");
        box.id = "resultBox";
        box.style.margin = "30px auto";
        box.style.padding = "20px";
        box.style.maxWidth = "600px";
        box.style.borderRadius = "10px";
        box.style.border = "1px solid #2b5cff";
        box.style.background = "#0a0d12";
        box.style.color = "#fff";
        box.style.lineHeight = "1.5";
        box.style.fontSize = "16px";
        document.body.appendChild(box);
    }

    box.innerHTML = "Probíhá bezpečnostní kontrola…";

    try {
        const response = await fetch(
            "https://function-bun-production-6014.up.railway.app/api/security-check"
        );
        const data = await response.json();

        if (!data.success) {
            box.innerHTML = "<strong>Chyba:</strong> Server neodpovídá.";
            return;
        }

        // Výpis výsledků do hezkého boxu
        box.innerHTML = `
            <h3 style="margin-top:0;color:#4c7dff;">Výsledek kontroly:</h3>

            <p><strong>IP adresa:</strong> ${data.ip}</p>
            <p><strong>Stát:</strong> ${data.country}</p>
            <p><strong>Město:</strong> ${data.city}</p>
            <p><strong>ISP:</strong> ${data.isp}</p>

            <p><strong>VPN:</strong> ${data.vpn ? "ANO" : "NE"}</p>
            <p><strong>Riziko:</strong> ${data.risk}</p>

            <p><strong>Zařízení:</strong> ${data.platform}</p>
            <p><strong>Prohlížeč:</strong> ${data.browser}</p>
        `;
    } catch (err) {
        box.innerHTML = "<strong>Chyba:</strong> Dočasná chyba spojení.";
        console.error(err);
    }
}
