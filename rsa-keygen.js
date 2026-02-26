// Attach event listener to button
document.getElementById("rsa-keygen-btn").addEventListener("click", () => {
    const pInput = document.getElementById("rsa-keygen-p").value;
    const qInput = document.getElementById("rsa-keygen-q").value;
    const resultDiv = document.getElementById("rsa-keygen-result");

    // Validate input
    if (!pInput || !qInput) {
        resultDiv.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Please enter both p and q';
        return;
    }

    try {
        const p = BigInt(pInput);
        const q = BigInt(qInput);

        if (p <= 1n || q <= 1n) {
            resultDiv.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> p and q must be greater than 1';
            return;
        }

        const { n, e, d } = generateRSAKeys(p, q);

        resultDiv.innerHTML = `
            <div>
                🔐 n: ${n} <br>
                📢 e: ${e} <br>
                🔑 d: ${d}
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Invalid input';
    }
});


// ================= RSA FUNCTIONS =================

function generateRSAKeys(p, q) {
    const n = BigInt(p) * BigInt(q);

    const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);

    let e;
    do {
        e = BigInt(Math.floor(Math.random() * (Number(phi) - 2)) + 2);
    } while (gcd(e, phi) !== 1n);

    const d = modInverse(e, phi);

    return { n, e, d };
}

function gcd(a, b) {
    while (b !== 0n) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function modInverse(a, m) {
    let m0 = m, t, q;
    let x0 = 0n, x1 = 1n;

    if (m === 1n) return 0n;

    while (a > 1n) {
        q = a / m;
        t = m;

        m = a % m;
        a = t;

        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0n) x1 += m0;

    return x1;
}