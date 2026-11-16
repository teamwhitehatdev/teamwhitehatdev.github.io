/**
 * Quota-Safe Browser Storage Utility
 * Prevents QuotaExceededError from crashing React during mount or live usage,
 * and prunes obsolete versioned cache keys and oversized telemetry logs.
 */

const ACTIVE_WH_KEYS = new Set([
  'wh_nav_tabs_v5720',
  'wh_services_v5800',
  'wh_projects_v5720',
  'wh_inquiries',
  'wh_hire_va_inquiries',
  'wh_cms_categories',
  'wh_affiliate_topics_v5830',
  'wh_cms_items_v5840',
  'wh_promo_items_v5830',
  'wh_visitor_logs',
  'wh_banned_ips',
  'wh_adsense_config_v5730',
  'wh_playstore_config_v1',
  'wh_services_headline_v2',
  'wh_services_promo_ad_v1',
  'wh_telemetry_visitor_id',
  'wh_telemetry_events',
  'wh_telemetry_sessions',
  'wh_telemetry_perf',
  'wh_admin_session_strict_v5730',
  'wh_admin_dev_mode_active',
  'wh_adsense_cookie_consent_v1',
  'wh_ai_custom_referral_links_v1',
  'wh_custom_destination_links_v1',
  'wh_active_user',
  'wh_registered_users',
  'wh_orders_history',
  'whitehat_theme'
]);

const DISPOSABLE_TELEMETRY_KEYS = [
  'wh_telemetry_events',
  'wh_telemetry_sessions',
  'wh_telemetry_perf',
  'wh_visitor_logs'
];

export function evictDisposableStorage(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (!k) continue;
      // Clean up legacy versioned wh_* keys or old telemetry blobs
      const isLegacyWhKey =
        (k.startsWith('wh_cms_items_') && k !== 'wh_cms_items_v5840') ||
        (k.startsWith('wh_promo_items_') && k !== 'wh_promo_items_v5830') ||
        (k.startsWith('wh_affiliate_topics_') && k !== 'wh_affiliate_topics_v5830') ||
        (k.startsWith('wh_services_') && k !== 'wh_services_v5800' && k !== 'wh_services_headline_v2' && k !== 'wh_services_promo_ad_v1') ||
        (k.startsWith('wh_nav_tabs_') && k !== 'wh_nav_tabs_v5720') ||
        (k.startsWith('wh_projects_') && k !== 'wh_projects_v5720') ||
        (k.startsWith('wh_') && !ACTIVE_WH_KEYS.has(k) && /_v\d+/i.test(k));
      if (isLegacyWhKey) {
        keysToRemove.push(k);
      }
    }
    for (const k of keysToRemove) {
      window.localStorage.removeItem(k);
    }
    for (const k of DISPOSABLE_TELEMETRY_KEYS) {
      window.localStorage.removeItem(k);
    }
  } catch {
    // Ignore storage access errors in restricted frames
  }
}

export function pruneLegacyAndBloatedStorage(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const keysToDelete: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (!k) continue;
      if (
        (k.startsWith('wh_cms_items_') && k !== 'wh_cms_items_v5840') ||
        (k.startsWith('wh_promo_items_') && k !== 'wh_promo_items_v5830') ||
        (k.startsWith('wh_affiliate_topics_') && k !== 'wh_affiliate_topics_v5830') ||
        (k.startsWith('wh_services_') &&
          k !== 'wh_services_v5800' &&
          k !== 'wh_services_headline_v2' &&
          k !== 'wh_services_promo_ad_v1') ||
        (k.startsWith('wh_nav_tabs_') && k !== 'wh_nav_tabs_v5720') ||
        (k.startsWith('wh_projects_') && k !== 'wh_projects_v5720')
      ) {
        keysToDelete.push(k);
      }
    }
    keysToDelete.forEach((k) => window.localStorage.removeItem(k));

    // Cap historical visitor logs and telemetry events so they never grow into MBs
    for (const trimKey of ['wh_visitor_logs', 'wh_telemetry_events']) {
      const raw = window.localStorage.getItem(trimKey);
      if (raw && raw.length > 65000) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            window.localStorage.setItem(trimKey, JSON.stringify(parsed.slice(0, 80)));
          } else {
            window.localStorage.removeItem(trimKey);
          }
        } catch {
          window.localStorage.removeItem(trimKey);
        }
      }
    }
  } catch {
    // Ignore storage errors silently
  }
}

export function safeLocalStorageGetJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined' || !window.localStorage) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeLocalStorageSet(key: string, value: string): boolean {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    // Free disposable caches and stale keys then retry once
    evictDisposableStorage();
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (retryErr) {
      console.warn(`Storage quota tight for "${key}"; keeping state in memory.`, retryErr);
      return false;
    }
  }
}

export function safeLocalStorageSetJson(key: string, data: unknown): boolean {
  try {
    return safeLocalStorageSet(key, JSON.stringify(data));
  } catch {
    return false;
  }
}

export function safeSessionStorageSet(key: string, value: string): boolean {
  if (typeof window === 'undefined' || !window.sessionStorage) return false;
  try {
    window.sessionStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
