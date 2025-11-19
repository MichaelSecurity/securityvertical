// ==========================================
// SecurityVertical – Script.js
// ==========================================

// Info při načtení stránky
console.log("SecurityVertical loaded");


// ==========================================
// 1) HLAVNÍ TESTOVACÍ FUNKCE – TLAČÍTKO TESTOVAT
// ==========================================

const API_TEST_URL = "https://function-bun-production-6014.up.railway.app/api/test";

// Po načtení stránky připojíme listener na tlačítko TESTOVAT
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".cta"); 

    if (btn) {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();

            btn.textContent = "Testuji…";
            btn.style.opacity = "0.6";

            try {
                const res = await fetch(API_TEST_URL);
                const data = await res.json();

                alert("Výsledek testu:\n\n" + (data.message || "Test dokončen."));
            } catch (err) {
                alert("Chyba: Backend neodpovídá.");
                console.error(err);
            }

            btn.textContent = "TESTOVAT";
            btn.style.opacity = "1";
        });
    }
});


// ==========================================
// 2) TEST TELEFONNÍHO ČÍSLA
// ==========================================

async function testNumber() {
    const phone = document.getElementById("phoneInput")?.value.trim();

    if (!phone) {
        alert("Zadej telefonní číslo.");
        return;
    }

    try {
        const response = await fetch("https://function-bun-production-6014.up.railway.app/api/test-number", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: phone })
        });

        const data = await response.json();

        if (data.success) {
            alert("Výsledek: Číslo je v pořádku 👍");
        } else {
            alert("Výsledek: Číslo je rizikové ⚠️");
        }

    } catch (err) {
        alert("Server momentálně neodpovídá.");
        console.error(err);
    }
}
