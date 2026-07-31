import { audioEngine } from './AudioEngine';

export class SecurityEngine {
  public static SIGNATURE = 'TeamWhiteHat-PinoyUnknown';

  public static initProtection() {
    if (typeof window === 'undefined') return;

    // 1. Disable Right Click Context Menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      audioEngine.playGlitch();
      SecurityEngine.showSecurityWarning('RIGHT_CLICK_DISABLED');
    });

    // 2. Disable Key Shortcuts (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+S)
    document.addEventListener('keydown', (e) => {
      const isF12 = e.key === 'F12' || e.keyCode === 123;
      const isCtrlU = (e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U');
      const isCtrlS = (e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S');
      const isInspect = (e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c');

      if (isF12 || isCtrlU || isCtrlS || isInspect) {
        e.preventDefault();
        e.stopPropagation();
        audioEngine.playGlitch();
        SecurityEngine.showSecurityWarning('INSPECT_SOURCE_BLOCKED');
      }
    });

    // 3. Anti-Debugger Loop Detection
    setInterval(() => {
      const startTime = performance.now();
      try {
        (function() { return false; })['constructor']('debugger')();
      } catch(err){}
      const endTime = performance.now();
      if (endTime - startTime > 100) {
        audioEngine.playGlitch();
      }
    }, 2000);
  }

  private static showSecurityWarning(type: string) {
    const warning = document.createElement('div');
    warning.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-950/90 border-2 border-red-500 text-white font-mono px-4 py-2 rounded shadow-[0_0_20px_rgba(255,0,0,0.8)] text-xs animate-bounce';
    warning.innerHTML = `⚠️ ACCESS DENIED // ${type} // PROTOCOL: ${SecurityEngine.SIGNATURE}`;
    document.body.appendChild(warning);
    setTimeout(() => warning.remove(), 2500);
  }

  public static encryptPayload(data: string): string {
    const key = SecurityEngine.SIGNATURE;
    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return window.btoa(result);
  }

  public static decryptPayload(cipherText: string): string {
    try {
      const key = SecurityEngine.SIGNATURE;
      const data = window.atob(cipherText);
      let result = '';
      for (let i = 0; i < data.length; i++) {
        result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return result;
    } catch (e) {
      return cipherText;
    }
  }
}
