// ===== Transposition Cipher Functions =====

function transpositionCipherEncrypt(plaintext, key) {
    const numCols = key.length;
    const numRows = Math.ceil(plaintext.length / numCols);
    const paddedPlaintext = plaintext.padEnd(numRows * numCols, ' ');
    const grid = [];

    // Fill grid row by row
    for (let i = 0; i < numRows; i++) {
        grid.push(paddedPlaintext.slice(i * numCols, (i + 1) * numCols));
    }

    // Sort key
    const sortedKey = Array.from(key)
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char));

    const ciphertext = sortedKey
        .map(({ index }) => grid.map(row => row[index]).join(''))
        .join('');

    return ciphertext.trim();
}

function transpositionCipherDecrypt(ciphertext, key) {
    const numCols = key.length;
    const numRows = Math.ceil(ciphertext.length / numCols);
    const paddedCiphertext = ciphertext.padEnd(numRows * numCols, ' ');
    const grid = Array.from({ length: numRows }, () => Array(numCols).fill(' '));

    const sortedKey = Array.from(key)
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char));

    const sortedIndices = sortedKey.map(({ index }) => index);

    let charIndex = 0;

    // Fill grid column by column
    for (let i = 0; i < numCols; i++) {
        const colIndex = sortedIndices[i];
        for (let j = 0; j < numRows; j++) {
            if (charIndex < paddedCiphertext.length) {
                grid[j][colIndex] = paddedCiphertext[charIndex++];
            }
        }
    }

    return grid.map(row => row.join('')).join('').trim();
}

// ===== Button Event Listeners =====

document.addEventListener("DOMContentLoaded", function () {

    const inputText = document.getElementById("transposition-input");
    const keyInput = document.getElementById("transposition-key");
    const resultDiv = document.getElementById("transposition-result");

    const encryptBtn = document.getElementById("transposition-encrypt-btn");
    const decryptBtn = document.getElementById("transposition-decrypt-btn");

    encryptBtn.addEventListener("click", function () {
        const text = inputText.value.trim();
        const key = keyInput.value.trim();

        if (!text || !key) {
            resultDiv.innerHTML = "<div class='m-auto text-red-200'>⚠ Please enter text and key</div>";
            return;
        }

        const encrypted = transpositionCipherEncrypt(text, key);
        resultDiv.innerHTML = `<div class="m-auto">${encrypted}</div>`;
    });

    decryptBtn.addEventListener("click", function () {
        const text = inputText.value.trim();
        const key = keyInput.value.trim();

        if (!text || !key) {
            resultDiv.innerHTML = "<div class='m-auto text-red-200'>⚠ Please enter text and key</div>";
            return;
        }

        const decrypted = transpositionCipherDecrypt(text, key);
        resultDiv.innerHTML = `<div class="m-auto">${decrypted}</div>`;
    });

});