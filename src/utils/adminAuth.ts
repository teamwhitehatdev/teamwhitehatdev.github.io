/**
 * Developer & Admin Authentication Engine
 * Restricts niche contents modification, creation, and referral customization
 * strictly to authorized developers and administrators.
 * Visitors, readers, audience, and viewers have read-only access.
 */

const ADMIN_SESSION_KEY = 'wh_admin_session_strict_v5730';
const ADMIN_DEV_ROLE_KEY = 'wh_admin_dev_mode_active';

export const VALID_ADMIN_USERS = ['admin', 'developer', 'whitehatdev_master'];

export const VALID_ADMIN_PINS = [
  'whitehat#9821$masterdev',
  'whitehatdev@2026!secure',
  'wh#vault2026!key',
  'whitehatdev#2026!'
];

/**
 * Checks whether the current session has verified developer or administrator privileges.
 */
export const isUserAdminOrDeveloper = (): boolean => {
  try {
    const sessionAuth = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    const localAuth = localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    const roleAuth = localStorage.getItem(ADMIN_DEV_ROLE_KEY) === 'true';
    return sessionAuth || localAuth || roleAuth;
  } catch (e) {
    return false;
  }
};

/**
 * Validates credentials and elevates the browser session to Developer/Admin mode.
 */
export const verifyAdminCredentials = (username: string, pin: string): boolean => {
  const userClean = username.trim().toLowerCase();
  const pinClean = pin.trim().toLowerCase();

  const isUserValid = VALID_ADMIN_USERS.includes(userClean);
  const isPinValid = VALID_ADMIN_PINS.includes(pinClean);

  if (isUserValid && isPinValid) {
    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      localStorage.setItem(ADMIN_DEV_ROLE_KEY, 'true');
      window.dispatchEvent(new Event('wh_admin_auth_changed'));
    } catch (e) {
      console.error('Error saving admin session:', e);
    }
    return true;
  }
  return false;
};

/**
 * Revokes developer/admin privileges, returning the browser to standard visitor/reader mode.
 */
export const revokeAdminSession = (): void => {
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_DEV_ROLE_KEY);
    window.dispatchEvent(new Event('wh_admin_auth_changed'));
  } catch (e) {
    console.error('Error revoking admin session:', e);
  }
};
