
let salt = "md3";

async function HashSaltFixed(senha) {
    const encoder = new TextEncoder();
    const senhaData = encoder.encode(senha + salt);

    const hashBuffer = await crypto.subtle.digest('SHA-256', senhaData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

