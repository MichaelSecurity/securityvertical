// SecurityVertical – frontend test připojení
console.log("SecurityVertical frontend loaded");

// ===============================
// Spuštění testu po kliknutí
// ===============================
async function runSecurityTest() {

    const resultBox = document.getElementById("resultBox");
    resultBox.innerHTML = `<p class="loading">Probíhá bezpečnostní kontrola…</p>`;
    resultBox.style.display = "block";

    try {
        const response = await fetch(
            "https://function-bun-production-6014.up.railway.app/api/security-check"
        );

        const data = await response.json();

        if (!data.success) {
            resultBox.innerHTML = `<p style="color:#ff6b6b;">Chyba komunikace se serverem.</p>`;
            return;
        }

        // VÝSTUP DO RESULT BOXU
        resultBox.innerHTML = `
            <h3 class="result-title">Výsledek bezpečnostní kontroly</h3>

            <p><strong>IP adresa:</strong> ${data.ip}</p>
            <p><strong>Stát:</strong> ${data.country}</p>
            <p><strong>Město:</strong> ${data.city}</p>
            <p><strong>ISP:</strong> ${data.isp}</p>

            <p><strong>VPN:</strong> ${data.vpn ? "ANO" : "NE"}</p>
            <p><strong>Riziko:</strong> ${data.risk}</p>

            <p><strong>Zařízení:</strong> ${data.platform}</p>
            <p><strong>Prohlížeč:</strong> ${data.browser}</p>
        `;
    }

    catch (err) {
        resultBox.innerHTML = `<p style="color:#ff6b6b;">Server momentálně neodpovídá.</p>`;
        console.error(err);
    }
}
