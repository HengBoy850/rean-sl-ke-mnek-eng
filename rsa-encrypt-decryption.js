// ---------- HELPER FUNCTIONS ----------

// Find gcd
function gcd(a, b) {
    while (b != 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Find modular inverse (for d)
function modInverse(e, phi) {
    for (let d = 1; d < phi; d++) {
        if ((d * e) % phi === 1) {
            return d;
        }
    }
    return null;
}

// Power with modulus
function modPow(base, exp, mod) {
    let result = 1;
    base = base % mod;

    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }

        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }

    return result;
}


// ---------- RSA KEY GENERATION ----------

document.getElementById("rsa-keygen-btn").addEventListener("click", function () {

    let p = parseInt(document.getElementById("rsa-keygen-p").value);
    let q = parseInt(document.getElementById("rsa-keygen-q").value);

    if (!p || !q) {
        document.getElementById("rsa-keygen-result").innerHTML =
        `<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Please enter p and q`;
        return;
    }

    let n = p * q;
    let phi = (p - 1) * (q - 1);

    let e = 2;
    while (e < phi) {
        if (gcd(e, phi) === 1) break;
        e++;
    }

    let d = modInverse(e, phi);

    document.getElementById("rsa-keygen-result").innerHTML =
    `
    <i class="fa-solid fa-shield-halved text-green-300"></i>
     e = ${e}, <i class="fa-solid fa-hashtag text-blue-300"></i> n = ${n},

     <i class="fa-solid fa-key text-yellow-300"></i>
    d = ${d}
    `;
});


// ---------- RSA ENCRYPT ----------

document.getElementById("rsa-encrypt-btn").addEventListener("click", function () {

    let text = document.getElementById("rsa-encrypt-input").value.toUpperCase();
    let e = parseInt(document.getElementById("rsa-encrypt-key-e").value);
    let n = parseInt(document.getElementById("rsa-encrypt-key-n").value);

    if (!text || !e || !n) {
        document.getElementById("rsa-encrypt-result").innerHTML =
        `<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Missing input!`;
        return;
    }

    let result = [];

    for (let i = 0; i < text.length; i++) {

    if (text[i] === " ") {
        result.push(" ");
        continue;
    }

    let m = text.charCodeAt(i);

    if (m >= n) {
        document.getElementById("rsa-encrypt-result").innerHTML =
        `<i class="fa-solid fa-triangle-exclamation text-red-500"></i> n must be larger than ASCII values!`;
        return;
    }

    let c = modPow(m, e, n);
    result.push(c);
}

    document.getElementById("rsa-encrypt-result").innerHTML =
    `<i class="fa-solid fa-lock text-blue-300"></i> Cipher: <br> ${result.join(" ")}`;
});


// ---------- RSA DECRYPT ----------

document.getElementById("rsa-decrypt-btn").addEventListener("click", function () {

    let cipher = document.getElementById("rsa-decrypt-input").value.split(" ");
    let d = parseInt(document.getElementById("rsa-decrypt-key-d").value);
    let n = parseInt(document.getElementById("rsa-decrypt-key-n").value);

    if (!cipher || !d || !n) {
        document.getElementById("rsa-decrypt-result").innerHTML =
        `<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Missing input!`;
        return;
    }

    let result = "";

    cipher.forEach(num => {

    if (num === "") {
        result += " ";
        return;
    }

    let m = modPow(parseInt(num), d, n);
    result += String.fromCharCode(m);
});

    document.getElementById("rsa-decrypt-result").innerHTML =
    `<i class="fa-solid fa-unlock text-green-300"></i> Plain Text: <br> ${result}`;
});