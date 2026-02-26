document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("shift-input");
    const keyInput = document.getElementById("shift-key");
    const result = document.getElementById("shift-result");

    const encryptBtn = document.getElementById("shift-encrypt-btn");
    const decryptBtn = document.getElementById("shift-decrypt-btn");
    const bruteBtn = document.getElementById("shift-brute-force-btn");

    function shiftCipher(text, key) {
        let output = "";

        for (let i = 0; i < text.length; i++) {
            let char = text[i];

            if (char >= "A" && char <= "Z") {
                let code = char.charCodeAt(0);
                output += String.fromCharCode(((code - 65 + key) % 26 + 26) % 26 + 65);
            }
            else if (char >= "a" && char <= "z") {
                let code = char.charCodeAt(0);
                output += String.fromCharCode(((code - 97 + key) % 26 + 26) % 26 + 97);
            }
            else {
                output += char;
            }
        }

        return output;
    }

    // Encrypt
    encryptBtn?.addEventListener("click", function () {

        if (!keyInput.value) {
            result.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Enter Key First';
            return;
        }

        result.innerHTML =
            shiftCipher(input.value, Number(keyInput.value));
    });

    // Decrypt
    decryptBtn?.addEventListener("click", function () {

        if (!keyInput.value) {
            result.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Enter Key First';
            return;
        }

        result.innerHTML = 
            shiftCipher(input.value, -Number(keyInput.value));
    });

    // Brute Force
    bruteBtn?.addEventListener("click", function () {

        let output = '<b><i class="fa-solid fa-burst text-"></i> Brute Force Results:</b><br>';

        for (let key = 1; key <= 25; key++) {
            output += '<br><i class="fa-solid fa-key text-yellow-400"></i> Key ' + key + ":<br>";
            output += shiftCipher(input.value, -key) + "<br>";
        }

        result.innerHTML = output;
    });

});