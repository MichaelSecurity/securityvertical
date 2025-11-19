// Budoucí funkce kontroly účtů / Stripe / API
console.log("SecurityVertical loaded");


// ====== TEST TELEFONNÍHO ČÍSLA – API SECURITYVERTICAL ======

async function testNumber() {
    const phone = document.getElementById("phoneInput").value.trim();

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
