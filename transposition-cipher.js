/* ---------- COLUMN ORDER FUNCTION ---------- */
function getOrder(key) {
    return key
        .split('')
        .map((char, index) => ({ char, index }))
        .sort((a, b) => a.char.localeCompare(b.char))
        .map(obj => obj.index);
}

/* ---------- ENCRYPT ---------- */
document.getElementById("transposition-encrypt-btn").addEventListener("click", function() {
    let text = document.getElementById("transposition-input").value.replace(/\s/g, "").toUpperCase();
    let key = document.getElementById("transposition-key").value.toUpperCase();

    if (!text || !key) {
        document.getElementById("transposition-result").innerHTML = "Please enter text and keyword";
        return;
    }

    let cols = key.length;
    let rows = Math.ceil(text.length / cols);

    // padding
    while (text.length < rows * cols) {
        text += "X";
    }

    // build matrix
    let matrix = [];
    let index = 0;

    for (let r = 0; r < rows; r++) {
        matrix[r] = [];
        for (let c = 0; c < cols; c++) {
            matrix[r][c] = text[index++];
        }
    }

    // column order
    let order = getOrder(key);

    let cipher = "";

    // read columns based on sorted key
    for (let i = 0; i < cols; i++) {
        let col = order[i];
        for (let r = 0; r < rows; r++) {
            cipher += matrix[r][col];
        }
    }

    document.getElementById("transposition-result").innerHTML = cipher;
});

/* ---------- DECRYPT ---------- */
document.getElementById("transposition-decrypt-btn").addEventListener("click", function() {
    let cipher = document.getElementById("transposition-input").value.replace(/\s/g, "").toUpperCase();
    let key = document.getElementById("transposition-key").value.toUpperCase();

    if (!cipher || !key) {
        document.getElementById("transposition-result").innerHTML = "Please enter text and keyword";
        return;
    }

    let cols = key.length;
    let rows = Math.ceil(cipher.length / cols);

    let order = getOrder(key);

    let matrix = Array.from({ length: rows }, () => Array(cols));

    let index = 0;

    // rebuild matrix column-by-column
    for (let i = 0; i < cols; i++) {
        let col = order[i];
        for (let r = 0; r < rows; r++) {
            if (index < cipher.length) {
                matrix[r][col] = cipher[index++];
            }
        }
    }

    // read rows to get plaintext
    let resultText = "";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (matrix[r][c] !== undefined) {
                resultText += matrix[r][c];
            }
        }
    }

    document.getElementById("transposition-result").innerHTML = resultText;
});