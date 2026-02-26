// ================= RSA ENCRYPT =================

function rsaEncrypt(message, publicKey) {
    const { e, n } = publicKey;

    const bigE = BigInt(e);
    const bigN = BigInt(n);

    const chunkSize = Math.max(1, Math.floor(bigN.toString().length / 3) - 1);

    const messageChunks = [...message]
        .map(char => char.charCodeAt(0).toString().padStart(3, '0'))
        .join('')
        .match(new RegExp(`.{1,${chunkSize}}`, 'g'));

    const encryptedChunks = messageChunks.map(chunk => {
        const messageCode = BigInt(chunk);

        if (messageCode >= bigN) {
            throw new Error("Message chunk too long for key size.");
        }

        const encrypted = modPow(messageCode, bigE, bigN);

        return encrypted.toString().padStart(bigN.toString().length, '0');
    });

    return encryptedChunks.join('');
}


// ================= RSA DECRYPT =================

function rsaDecrypt(ciphertext, privateKey) {
    const { d, n } = privateKey;

    const bigD = BigInt(d);
    const bigN = BigInt(n);

    const chunkLength = bigN.toString().length;

    const cipherChunks = ciphertext.match(new RegExp(`.{1,${chunkLength}}`, 'g'));

    const decryptedChunks = cipherChunks.map(chunk => {
        const decrypted = modPow(BigInt(chunk), bigD, bigN);
        return decrypted.toString();
    });

    const fullString = decryptedChunks.join('');

    const message = fullString.match(/.{1,3}/g)
        .map(code => String.fromCharCode(parseInt(code, 10)))
        .join('');

    return message;
}


// ================= FAST MODULAR POWER =================

function modPow(base, exponent, modulus) {
    let result = 1n;
    base = base % modulus;

    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent / 2n;
        base = (base * base) % modulus;
    }

    return result;
}


// ================= EVENT LISTENERS =================

document.addEventListener("DOMContentLoaded", function () {

    // ENCRYPT
    const rsaEncryptButton = document.getElementById('rsa-encrypt-btn');
    const rsaEncryptInput = document.getElementById('rsa-encrypt-input');
    const rsaKey_e = document.getElementById('rsa-encrypt-key-e');
    const rsaKey_n = document.getElementById('rsa-encrypt-key-n');
    const rsaEncryptResult = document.getElementById('rsa-encrypt-result');

    rsaEncryptButton.addEventListener('click', () => {

        const message = rsaEncryptInput.value;
        const e = rsaKey_e.value;
        const n = rsaKey_n.value;

        if (!message || !e || !n) {
            rsaEncryptResult.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Please provide message and keys.';
            return;
        }

        try {
            const encryptedMessage = rsaEncrypt(message, { e, n });

            rsaEncryptResult.innerHTML =
                `<div class="w-[340px] break-words">
                    🔒 Encrypted Message:<br>${encryptedMessage}
                 </div>`;

        } catch (error) {
            console.error(error);
            rsaEncryptResult.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Encryption failed.';
        }
    });


    // DECRYPT
    const rsaDecryptButton = document.getElementById('rsa-decrypt-btn');
    const rsaDecryptInput = document.getElementById('rsa-decrypt-input');
    const rsaKey_d = document.getElementById('rsa-decrypt-key-d');
    const rsaKey_n_decrypt = document.getElementById('rsa-decrypt-key-n');
    const rsaDecryptResult = document.getElementById('rsa-decrypt-result');

    rsaDecryptButton.addEventListener('click', () => {

        const encryptedMessage = rsaDecryptInput.value;
        const d = rsaKey_d.value;
        const n = rsaKey_n_decrypt.value;

        if (!encryptedMessage || !d || !n) {
            rsaDecryptResult.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Please provide message and keys.';
            return;
        }

        try {
            const decryptedMessage = rsaDecrypt(encryptedMessage, { d, n });

            rsaDecryptResult.innerHTML =
                `🔓 Decrypted Message: ${decryptedMessage}`;

        } catch (error) {
            console.error(error);
            rsaDecryptResult.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i> Decryption failed.';
        }
    });

});