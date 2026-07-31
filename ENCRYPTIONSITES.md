# ENCRYPTIONSITES.md - Source Protection & Encryption Guide

This document explains the security, anti-inspect obfuscation, and encryption techniques implemented across **WHITE HAT DEV**.

---

## 🔒 Implemented Security & Obfuscation Layers

### 1. Anti-Inspect & Developer Tools Blocker (`SecurityEngine.ts`)
- **Blocked Actions**:
  - Right-Click Context Menu (`contextmenu` event disabled).
  - Keyboard Shortcuts: `F12`, `Ctrl+U` (View Source), `Ctrl+Shift+I` (Inspect Element), `Ctrl+Shift+J` (Console), `Ctrl+S` (Save Page).
- **Anti-Debugger Loop**:
  - Continuous evaluation trap to pause and confuse unauthorized debuggers.
- **Glitch Audio Alert**:
  - Triggers a digital glitch warning chime whenever an inspect key is pressed.

---

## 🔑 Encryption Signature Pattern

All encrypted payload blocks, error pages, and security telemetry logs are stamped with the custom security pattern:
`TeamWhiteHat-PinoyUnknown`

---

## 🛠️ How to Encrypt & Decrypt Data/HTML

### Step-by-Step Encryption:
To encrypt text or code snippets using the signature:
1. Open the Admin Portal at `/#/admin` (Passcode: `whitehat2026`).
2. Execute `SecurityEngine.encryptPayload("your_data_here")`.
3. The function performs a XOR key-stream cipher against `TeamWhiteHat-PinoyUnknown` and encodes the result in Base64.

### Step-by-Step Decryption:
To decrypt payload strings:
1. Execute `SecurityEngine.decryptPayload(cipherText)`.
2. The cipher reverses the XOR transformation using the key `TeamWhiteHat-PinoyUnknown` to restore original source data.
