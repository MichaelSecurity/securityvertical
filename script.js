console.log("SecurityVertical frontend loaded");

// ======== Vytvoření modálního okna ========
function showModal(html) {
    let modal = document.createElement("div");
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.75);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        ">
            <div style="
                background: #111;
                padding: 30px;
                border-radius: 12px;
                max-width: 450px;
                width: 90%;
                color: #eee;
                font-family: Arial, sans-serif;
                text-align: left;
                box-shadow: 0 0 20px #000;
            ">
                <h2 style="text-align:center; margin-top:0; margin-bottom:15px;">
                    Výsledek kontroly
                </h2>

                ${html}

                <div style="text-align:center; margin-top:25px;">
                    <button onclick="this.closest('.modalOuter').remove()" style="
                        padding: 12px 25px;
                        background: #d8d8d8;
                        border: none;
                        font-weight: bold;
                        color: #000;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 16px;
                    ">Zavřít</button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add("modalOuter");
    document.body.appendChild(modal);
}

// ========= Spuštění testu =========
async function runSecurityTest() {
    try {
        const res = await fetch("https://function-bun-production-6014.up.railway.app/api/security-check");
        const data = await res.json();

        if (!data.success) {
            alert("Chyba serveru.");
            return;
        }

        showModal(`
            <p><strong>IP:</strong> ${data.ip}</p>
            <p><strong>Stát:</strong> ${data.country}</p>
            <p><strong>Město:</strong> ${data.city}</p>
            <p><strong>ISP:</strong> ${data.isp}</p>
            <p><strong>VPN:</strong> ${data.vpn ? "ANO" : "NE"}</p>
            <p><strong>Riziko:</strong> ${data.risk}</p>
            <p><strong>Zařízení:</strong> ${data.platform}</p>
            <p><strong>Prohlížeč:</strong> ${data.browser}</p>
        `);

    } catch (e) {
        alert("Server momentálně neodpovídá.");
        console.error(e);
    }
}
