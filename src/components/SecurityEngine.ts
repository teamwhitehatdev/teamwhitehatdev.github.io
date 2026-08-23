import { useEffect } from 'react';

export const useSecurityShield = () => {
  useEffect(() => {
    // 1. Disable Right-Click and Shift + Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // 2. Disable AuxClick (Right-Click & Shift + Right-Click on middle/right buttons)
    const handleAuxClick = (e: MouseEvent) => {
      if (e.button === 2 || (e.shiftKey && e.button === 2)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Disable MouseUp/MouseDown right-click triggers with Shift key held
    const handleMouseEvents = (e: MouseEvent) => {
      if (e.button === 2 || (e.shiftKey && e.button === 2)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 4. Disable DevTools & View Source Keyboard Shortcuts (F12, Shift+F10, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S, etc.)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Shift + F10 (Context Menu shortcut)
      if (e.shiftKey && (e.key === 'F10' || e.keyCode === 121)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent F12 (DevTools)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Ctrl + Shift + I / J / C (Inspect Element & Console)
      if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Ctrl + U (View Source) and Ctrl + S (Save Webpage)
      if (e.ctrlKey && ['U', 'u', 'S', 's'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent Mac Cmd + Option + I / U (DevTools & Source)
      if (e.metaKey && e.altKey && ['I', 'i', 'U', 'u'].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Attach listeners with useCapture = true to catch events at the earliest phase
    window.addEventListener('contextmenu', handleContextMenu, true);
    window.addEventListener('auxclick', handleAuxClick, true);
    window.addEventListener('mouseup', handleMouseEvents, true);
    window.addEventListener('mousedown', handleMouseEvents, true);
    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu, true);
      window.removeEventListener('auxclick', handleAuxClick, true);
      window.removeEventListener('mouseup', handleMouseEvents, true);
      window.removeEventListener('mousedown', handleMouseEvents, true);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);
};

export default useSecurityShield;
