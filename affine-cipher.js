document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("affine-input");
    const keyAInput = document.getElementById("affine-key-a");
    const keyBInput = document.getElementById("affine-key-b");
    const result = document.getElementById("affine-result");

    const encryptBtn = document.getElementById("affine-encrypt-btn");
    const decryptBtn = document.getElementById("affine-decrypt-btn");
    const bruteBtn = document.getElementById("affine-brute-force-btn");

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const mod = 26;

    // ===============================
    // GCD
    // ===============================
    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // ===============================
    // Modular Inverse
    // ===============================
    function modInverse(a, m) {
        a = ((a % m) + m) % m;
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return null;
    }

    // ===============================
    // ENCRYPT
    // ===============================
    function affineCipherEncrypt(text, a, b) {

        let ciphertext = "";

        for (let char of text.toUpperCase()) {

            if (alphabet.includes(char)) {
                const x = alphabet.indexOf(char);
                const y = (a * x + b) % mod;
                ciphertext += alphabet[y];
            } else {
                ciphertext += char;
            }
        }

        return ciphertext;
    }

    // ===============================
    // DECRYPT
    // ===============================
    function affineCipherDecrypt(text, a, b) {

        const aInverse = modInverse(a, mod);

        if (aInverse === null) {
            return '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Key "a" has no modular inverse!';
        }

        let plaintext = "";

        for (let char of text.toUpperCase()) {

            if (alphabet.includes(char)) {
                const y = alphabet.indexOf(char);
                const x = (aInverse * (y - b + mod)) % mod;
                plaintext += alphabet[x];
            } else {
                plaintext += char;
            }
        }

        return plaintext;
    }

    // ===============================
    // ENCRYPT BUTTON
    // ===============================
    encryptBtn.addEventListener("click", function () {

        let a = Number(keyAInput.value);
        let b = Number(keyBInput.value);

        if (!keyAInput.value || !keyBInput.value) {
            result.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Please Enter The Both Key';
            return;
        }

        // Reduce to mod 26
        a = ((a % mod) + mod) % mod;
        b = ((b % mod) + mod) % mod;

        if (gcd(a, mod) !== 1) {
            result.innerHTML = "❌ Key 'a' must be coprime with 26!";
            return;
        }

        result.innerHTML =
            "<b>🔐 Encrypted:</b><br>" +
            affineCipherEncrypt(input.value, a, b);
    });

    // ===============================
    // DECRYPT BUTTON
    // ===============================
    decryptBtn.addEventListener("click", function () {

        let a = Number(keyAInput.value);
        let b = Number(keyBInput.value);

        if (!keyAInput.value || !keyBInput.value) {
            result.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-yellow-500"></i> Please Enter The Both Key';
            return;
        }

        a = ((a % mod) + mod) % mod;
        b = ((b % mod) + mod) % mod;

        if (gcd(a, mod) !== 1) {
            result.innerHTML = "❌ Key 'a' must be coprime with 26!";
            return;
        }

        result.innerHTML =
            "<b>🔓 Decrypted:</b><br>" +
            affineCipherDecrypt(input.value, a, b);
    });

    // ===============================
    // BRUTE FORCE
    // ===============================
    bruteBtn.addEventListener("click", function () {

        let output = "<b>🔥 Brute Force Results:</b><br>";

        for (let a = 1; a < mod; a++) {

            if (gcd(a, mod) === 1) {

                for (let b = 0; b < mod; b++) {

                    const text = affineCipherDecrypt(input.value, a, b);

                    output += `<br>🔑 a=${a}, b=${b}<br>${text}<br>`;
                }
            }
        }

        result.innerHTML = output;
    });

});