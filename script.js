// SecurityVertical – frontend test připojení
console.log("SecurityVertical frontend loaded");

// ===============================
// Spuštění testu po kliknutí
// ===============================
async function runSecurityTest() {

    // Loader (volitelně možná přidáme animaci)
    alert("Probíhá bezpečnostní kontrola…");

    try {
        const response = await fetch(
            "https://function-bun-production-6014.up.railway.app/api/security-check"
        );

        const data = await response.json();

        if (!data.success) {
            alert("Chyba komunikace se serverem.");
            return;
        }

        // Výsledek testu – zatím alert, později uděláme pěknou stránku
        alert(
            "Výsledek kontroly:\n\n" +
            "IP adresa: " + data.ip + "\n" +
            "Stát: " + data.country + "\n" +
            "Město: " + data.city + "\n" +
            "ISP: " + data.isp + "\n\n" +
            "VPN: " + (data.vpn ? "ANO" : "NE") + "\n" +
            "Riziko: " + data.risk + "\n\n" +
            "Zařízení: " + data.platform + "\n" +
            "Prohlížeč: " + data.browser
        );

    } catch (err) {
        alert("Server momentálně neodpovídá.");
        console.error(err);
    }
}
