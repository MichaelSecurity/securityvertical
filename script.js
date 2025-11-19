// ======================================
// SecurityVertical – hlavní JavaScript
// ======================================

// API endpoint backendu (Railway)
const API_URL = "https://function-bun-production-6014.up.railway.app/api/security-check";

// EVENT na tlačítko TESTOVAT
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".cta");

    if (btn) {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            await runSecurityTest(btn);
        });
    }
});

// ======================================
// HLAVNÍ FUNKCE – SECURITY TEST
// ======================================

async function runSecurityTest(btn) {
    btn.textContent = "Testuji…";
    btn.style.opacity = "0.6";

    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        showResultModal(result);

    } catch (err) {
        alert("❌ Chyba: server neodpovídá.");
        console.error(err);
    }

    btn.textContent = "TESTOVAT";
    btn.style.opacity = "1";
}

// ======================================
// MODAL – VÝSLEDEK TESTU
// ======================================

function showResultModal(data) {

    const modal = document.createElement("div");
    modal.className = "sv-modal";

    modal.innerHTML = `
        <div class="sv-modal-content">
            <h2>🔍 Výsledek bezpečnostní kontroly</h2>

            <p><strong>IP adresa:</strong> ${data.ip}</p>
            <p><strong>Stát:</strong> ${data.country}</p>
            <p><strong>Město:</strong> ${data.city}</p>
            <p><strong>ISP:</strong> ${data.isp}</p>

            <hr>

            <p><strong>VPN / Proxy:</strong> ${data.vpn ? "ANO ⚠️" : "Ne 👍"}</p>
            <p><strong>Riziko připojení:</strong> ${data.risk}</p>

            <hr>

            <p><strong>Prohlížeč:</strong> ${data.browser}</p>
            <p><strong>Platforma:</strong> ${data.platform}</p>

            <button class="sv-close">Zavřít</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector(".sv-close").addEventListener("click", () => {
        modal.remove();
    });
}

// ======================================
// STYL MODAL OKNA
// ======================================

const style = document.createElement("style");
style.textContent = `
    .sv-modal {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    .sv-modal-content {
        background: #0d0f15;
        color: #fff;
        padding: 30px;
        border-radius: 10px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 0 20px rgba(0,0,0,0.4);
        font-family: Arial, sans-serif;
    }

    .sv-modal-content h2 {
        margin-top: 0;
        margin-bottom: 20px;
        color: #4fc3f7;
    }

    .sv-modal-content button {
        margin-top: 20px;
        width: 100%;
        padding: 10px;
        background: #4fc3f7;
        border: none;
        color: #000;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
