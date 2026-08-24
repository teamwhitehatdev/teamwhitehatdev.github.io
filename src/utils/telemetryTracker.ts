import { TelemetryEvent, TelemetryEventType, LiveVisitorSession, WebPerfTelemetry } from '../types';

// STORAGE KEYS
const STORAGE_SESSION_KEY = 'wh_telemetry_session_id';
const STORAGE_VISITOR_KEY = 'wh_telemetry_visitor_id';
const STORAGE_EVENTS_KEY = 'wh_telemetry_events';
const STORAGE_SESSIONS_KEY = 'wh_telemetry_sessions';
const STORAGE_PERF_KEY = 'wh_telemetry_perf';

// GENERATE ANONYMOUS PRIVACY-CONSCIOUS ID (e.g. 7F2A-91BC)
export const generateAnonymousId = (prefix = 'ID'): string => {
  const chars = '0123456789ABCDEF';
  let segment1 = '';
  let segment2 = '';
  for (let i = 0; i < 4; i++) {
    segment1 += chars.charAt(Math.floor(Math.random() * chars.length));
    segment2 += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${segment1}-${segment2}`;
};

// GET OR INITIALIZE SESSION & VISITOR IDS
export const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem(STORAGE_SESSION_KEY);
  if (!sessionId) {
    sessionId = generateAnonymousId('SESS');
    sessionStorage.setItem(STORAGE_SESSION_KEY, sessionId);
  }
  return sessionId;
};

export const getVisitorId = (): string => {
  let visitorId = localStorage.getItem(STORAGE_VISITOR_KEY);
  if (!visitorId) {
    visitorId = generateAnonymousId('VIS');
    localStorage.setItem(STORAGE_VISITOR_KEY, visitorId);
  }
  return visitorId;
};

// PARSE URL SEARCH FOR UTM PARAMETERS
export const parseUTMParams = (): { utmSource?: string; utmMedium?: string; utmCampaign?: string } => {
  try {
    const urlParams = new URLSearchParams(window.location.search || window.location.hash.split('?')[1] || '');
    return {
      utmSource: urlParams.get('utm_source') || undefined,
      utmMedium: urlParams.get('utm_medium') || undefined,
      utmCampaign: urlParams.get('utm_campaign') || undefined
    };
  } catch (e) {
    return {};
  }
};

// DETECT CLIENT ENVIRONMENT
export const detectClientDetails = () => {
  const ua = navigator.userAgent || '';
  let device: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';
  let os = 'Windows';
  let browser = 'Chrome';

  // Device & Tablet Detection
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    device = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    device = 'Mobile';
  }

  // OS Detection
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';

  // Browser Detection
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/OPR|Opera/i.test(ua)) browser = 'Opera';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/SamsungBrowser/i.test(ua)) browser = 'Samsung Internet';

  const isBot = /bot|crawler|spider|crawling|googlebot|bingbot|yandex|duckduckbot/i.test(ua);

  return { device, os, browser, isBot };
};

// RECORD TELEMETRY EVENT
export const trackTelemetryEvent = (
  type: TelemetryEventType,
  label: string,
  pagePath = window.location.hash || window.location.pathname,
  extraMeta: Partial<TelemetryEvent> = {}
): TelemetryEvent => {
  const sessionId = getSessionId();
  const visitorId = getVisitorId();
  const utm = parseUTMParams();
  const client = detectClientDetails();

  const event: TelemetryEvent = {
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    sessionId,
    visitorId,
    type,
    label,
    pagePath: pagePath.startsWith('#') ? pagePath : `/#${pagePath}`,
    timestamp: new Date().toISOString(),
    device: client.device,
    browser: client.browser,
    os: client.os,
    referrer: document.referrer || (extraMeta.referrer || 'Direct'),
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
    ...extraMeta
  };

  // Save Event to Local Storage (capped at 5,000 events)
  try {
    const rawEvents = localStorage.getItem(STORAGE_EVENTS_KEY);
    const events: TelemetryEvent[] = rawEvents ? JSON.parse(rawEvents) : [];
    events.unshift(event);
    localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(events.slice(0, 5000)));
  } catch (e) {
    console.warn('Telemetry storage cap reached:', e);
  }

  return event;
};

// INITIAL SEED SESSIONS GENERATOR (SO ADMIN HAS COMPREHENSIVE GLOBAL DATA INSTANTLY)
export const getInitialTelemetryData = (): {
  events: TelemetryEvent[];
  sessions: LiveVisitorSession[];
  perf: WebPerfTelemetry[];
} => {
  const storedEvents = localStorage.getItem(STORAGE_EVENTS_KEY);
  const storedSessions = localStorage.getItem(STORAGE_SESSIONS_KEY);
  const storedPerf = localStorage.getItem(STORAGE_PERF_KEY);

  if (storedEvents && storedSessions) {
    try {
      return {
        events: JSON.parse(storedEvents),
        sessions: JSON.parse(storedSessions),
        perf: storedPerf ? JSON.parse(storedPerf) : []
      };
    } catch (e) {
      console.error(e);
    }
  }

  // Pre-seed realistic telemetry data
  const seedCountries = [
    { country: 'Philippines', city: 'Manila', region: 'NCR', weight: 45, flag: '🇵🇭' },
    { country: 'United States', city: 'Los Angeles', region: 'California', weight: 22, flag: '🇺🇸' },
    { country: 'Singapore', city: 'Singapore', region: 'Singapore', weight: 12, flag: '🇸🇬' },
    { country: 'United Kingdom', city: 'London', region: 'Greater London', weight: 8, flag: '🇬🇧' },
    { country: 'Canada', city: 'Toronto', region: 'Ontario', weight: 5, flag: '🇨🇦' },
    { country: 'Australia', city: 'Sydney', region: 'NSW', weight: 4, flag: '🇦🇺' },
    { country: 'Germany', city: 'Frankfurt', region: 'Hesse', weight: 4, flag: '🇩🇪' }
  ];

  const seedPages = ['/#/', '/#/showcase', '/#/services', '/#/web-hosting', '/#/ai', '/#/affiliate-guide', '/#/about'];
  const seedReferrers = ['Google', 'Direct', 'Facebook', 'YouTube', 'Reddit', 'X (Twitter)', 'TikTok', 'Patreon'];
  const seedDevices: Array<'Desktop' | 'Mobile' | 'Tablet'> = ['Mobile', 'Desktop', 'Mobile', 'Desktop', 'Tablet'];
  const seedBrowsers = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Samsung Internet'];
  const seedOS = ['Android', 'Windows', 'iOS', 'macOS', 'Linux'];

  const now = Date.now();
  const seedEvents: TelemetryEvent[] = [];
  const seedSessions: LiveVisitorSession[] = [];

  for (let i = 0; i < 150; i++) {
    const countryObj = seedCountries[Math.floor(Math.random() * seedCountries.length)];
    const page = seedPages[Math.floor(Math.random() * seedPages.length)];
    const referrer = seedReferrers[Math.floor(Math.random() * seedReferrers.length)];
    const device = seedDevices[Math.floor(Math.random() * seedDevices.length)];
    const browser = seedBrowsers[Math.floor(Math.random() * seedBrowsers.length)];
    const os = seedOS[Math.floor(Math.random() * seedOS.length)];
    const sessionId = generateAnonymousId('SESS');
    const visitorId = generateAnonymousId('VIS');
    const timeOffset = Math.floor(Math.random() * 86400000 * 3); // last 3 days
    const eventTime = new Date(now - timeOffset).toISOString();
    const duration = Math.floor(Math.random() * 320) + 20;

    const event: TelemetryEvent = {
      id: 'seed_evt_' + i,
      sessionId,
      visitorId,
      type: i % 4 === 0 ? 'CTA_CLICK' : i % 7 === 0 ? 'EXTERNAL_LINK' : 'PAGE_VIEW',
      label: i % 4 === 0 ? 'HIRE VA CONSULTATION' : i % 7 === 0 ? 'EXPLORE DEAL' : `Viewed ${page}`,
      pagePath: page,
      timestamp: eventTime,
      country: countryObj.country,
      city: countryObj.city,
      region: countryObj.region,
      device,
      browser,
      os,
      referrer,
      durationSeconds: duration
    };

    seedEvents.push(event);

    if (i < 25) {
      seedSessions.push({
        id: 'sess_' + i,
        sessionId,
        visitorId,
        ip: `1${Math.floor(Math.random()*90)+10}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`,
        country: countryObj.country,
        city: countryObj.city,
        region: countryObj.region,
        device,
        browser,
        os,
        currentPage: page,
        entryPage: seedPages[0],
        referrer,
        startTime: now - timeOffset - (duration * 1000),
        lastActive: now - timeOffset,
        durationSeconds: duration,
        isActive: i < 8, // top 8 are currently live active!
        eventsCount: Math.floor(Math.random() * 6) + 1,
        events: [event],
        isBot: false
      });
    }
  }

  const seedPerf: WebPerfTelemetry[] = [
    { pagePath: '/#/', ttfb: 142, fcp: 420, lcp: 820, cls: 0.012, domLoad: 580, jsErrorsCount: 0, timestamp: new Date().toISOString() },
    { pagePath: '/#/showcase', ttfb: 156, fcp: 490, lcp: 980, cls: 0.018, domLoad: 640, jsErrorsCount: 0, timestamp: new Date().toISOString() },
    { pagePath: '/#/services', ttfb: 138, fcp: 410, lcp: 790, cls: 0.008, domLoad: 530, jsErrorsCount: 0, timestamp: new Date().toISOString() },
    { pagePath: '/#/ai', ttfb: 148, fcp: 450, lcp: 840, cls: 0.015, domLoad: 610, jsErrorsCount: 0, timestamp: new Date().toISOString() },
    { pagePath: '/#/web-hosting', ttfb: 162, fcp: 510, lcp: 920, cls: 0.022, domLoad: 680, jsErrorsCount: 0, timestamp: new Date().toISOString() }
  ];

  localStorage.setItem(STORAGE_EVENTS_KEY, JSON.stringify(seedEvents));
  localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(seedSessions));
  localStorage.setItem(STORAGE_PERF_KEY, JSON.stringify(seedPerf));

  return { events: seedEvents, sessions: seedSessions, perf: seedPerf };
};
