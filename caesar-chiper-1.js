// Get elements by ID
const input = document.getElementById("caesar-input");
const encryptBtn = document.getElementById("caesar-encrypt-btn");
const decryptBtn = document.getElementById("caesar-decrypt-btn");
const result = document.getElementById("caesar-result");

// Caesar shift value
const shift = 3;

// Caesar function
function caesarCipher(text, shiftAmount) {
    let output = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);

            // Uppercase letters
            if (code >= 65 && code <= 90) {
                char = String.fromCharCode(
                    ((code - 65 + shiftAmount + 26) % 26) + 65
                );
            }

            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                char = String.fromCharCode(
                    ((code - 97 + shiftAmount + 26) % 26) + 97
                );
            }
        }

        output += char;
    }

    return output;
}

// Encrypt button
encryptBtn.addEventListener("click", function () {
    const text = input.value;

    if (text === "") {
        result.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Please enter text!`;
        return;
    }

    result.textContent = caesarCipher(text, shift);
});

// Decrypt button
decryptBtn.addEventListener("click", function () {
    const text = input.value;

    if (text === "") {
        result.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Please enter text!`;
        return;
    }

    result.textContent = caesarCipher(text, -shift);
});