// Authentication Module Phase 1 - WebAuthn/FIDO2 Passkey Registration and Login (TypeScript adjusted)

// Helper function to handle credential creation
export async function registerPasskey(username: string) {
  const publicKey: PublicKeyCredentialCreationOptions = {
    challenge: crypto.getRandomValues(new Uint8Array(32)),
    rp: { name: "Personal Health Records" },
    user: {
      id: new TextEncoder().encode(username),
      name: username,
      displayName: username,
    },
    pubKeyCredParams: [{ alg: -7, type: "public-key" }],
    authenticatorSelection: { authenticatorAttachment: "platform" },
    timeout: 60000,
    attestation: "direct",
  };

  try {
    const credential = (await navigator.credentials.create({ publicKey })) as PublicKeyCredential;
    localStorage.setItem(username, JSON.stringify({
      id: credential.id,
      rawId: Array.from(new Uint8Array(credential.rawId)),
      type: credential.type,
    }));
    console.log('Registration successful');
  } catch (err) {
    console.error('Registration failed:', err);
  }
}

// Helper function to handle credential retrieval
export async function loginPasskey(username: string) {
  const storedCredential = JSON.parse(localStorage.getItem(username) || '{}');
  if (!storedCredential.id) {
    console.error('User not found');
    return;
  }

  const publicKey: PublicKeyCredentialRequestOptions = {
    challenge: crypto.getRandomValues(new Uint8Array(32)),
    allowCredentials: [{
      type: "public-key",
      id: Uint8Array.from(storedCredential.rawId),
    }],
    timeout: 60000,
  };

  try {
    const assertion = (await navigator.credentials.get({ publicKey })) as PublicKeyCredential;
    console.log('Login successful:', assertion);
  } catch (err) {
    console.error('Login failed:', err);
  }
}

