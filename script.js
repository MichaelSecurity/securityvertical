// SecurityVertical – frontend test připojení
console.log("SecurityVertical frontend loaded");

// ========================================
// Hezký výstup do stránky – profesionální UI
// ========================================

async function runSecurityTest() {

    // najdeme box V RÁMCI HERO SEKCE (pod tlačítkem)
    let box = document.getElementById("resultBox");

    if (!box) {
        const hero = document.querySelector(".hero");

        box = document.createElement("div");
        box.id = "resultBox";
        box.className = "result-box";

        hero.appendChild(box);
    }

    // Zobrazíme "probíhá test"
    box.innerHTML = `
        <div class="loading">
            🔍 Probíhá bezpečnostní kontrola…
        </div>
    `;

    try {
        const response = await fetch(
            "https://function-bun-production-6014.up.railway.app/api/security-check"
        );
        const data = await response.json();

        if (!data.success) {
            box.innerHTML = "<strong>Chyba:</strong> Server neodpovídá.";
            return;
        }

        // === HEZKÉ VYKRESLENÍ ===
        box.innerHTML = `
            <h3 class="result-title">Výsledek kontroly:</h3>

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
    }
}
