/**
 * Custom Destination Links Storage & Utilities
 * Enables developers and administrators to customize the destination links
 * and button labels for every article in the Knowledge Library, allowing
 * personal referral links, affiliate links, and commission monetization.
 */

export interface CustomDestinationLink {
  url: string;
  label?: string;
  updatedAt?: number;
}

const STORAGE_KEY = 'wh_ai_custom_knowledge_links_v1';

export const getCustomDestinationLinks = (): Record<string, CustomDestinationLink> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Error reading custom destination links:', e);
    return {};
  }
};

export const saveCustomDestinationLink = (
  articleId: string,
  url: string,
  label?: string
): void => {
  try {
    const current = getCustomDestinationLinks();
    if (!url.trim()) {
      delete current[articleId];
    } else {
      current[articleId] = {
        url: url.trim(),
        label: label?.trim() || undefined,
        updatedAt: Date.now()
      };
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('wh_destination_links_changed'));
  } catch (e) {
    console.error('Error saving custom destination link:', e);
  }
};

export const removeCustomDestinationLink = (articleId: string): void => {
  try {
    const current = getCustomDestinationLinks();
    delete current[articleId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('wh_destination_links_changed'));
  } catch (e) {
    console.error('Error removing custom destination link:', e);
  }
};

export const getEffectiveArticleDestination = (
  article: { id: string; url?: string; referralUrl?: string; buttonText?: string },
  customLinks?: Record<string, CustomDestinationLink>
): { url: string; label: string; isCustom: boolean } => {
  const links = customLinks || getCustomDestinationLinks();
  const custom = links[article.id];

  if (custom && custom.url) {
    return {
      url: custom.url,
      label: custom.label || (article.buttonText ? article.buttonText.split('(')[0].trim().slice(0, 16) : 'Open Link'),
      isCustom: true
    };
  }

  const defaultUrl = article.url || article.referralUrl || '';
  const defaultLabel = article.buttonText
    ? article.buttonText.split('(')[0].trim().slice(0, 16)
    : 'Open Link';

  return {
    url: defaultUrl,
    label: defaultLabel,
    isCustom: false
  };
};

export const exportDestinationLinksJson = (): string => {
  const links = getCustomDestinationLinks();
  return JSON.stringify(links, null, 2);
};

export const importDestinationLinksJson = (
  jsonStr: string
): { success: boolean; count: number; error?: string } => {
  try {
    const parsed = JSON.parse(jsonStr);
    if (typeof parsed !== 'object' || parsed === null) {
      return { success: false, count: 0, error: 'Invalid JSON format: expected an object' };
    }
    const current = getCustomDestinationLinks();
    let count = 0;
    for (const [id, val] of Object.entries(parsed)) {
      if (val && typeof val === 'object' && 'url' in (val as any)) {
        current[id] = {
          url: String((val as any).url).trim(),
          label: (val as any).label ? String((val as any).label).trim() : undefined,
          updatedAt: Date.now()
        };
        count++;
      } else if (typeof val === 'string') {
        current[id] = {
          url: val.trim(),
          updatedAt: Date.now()
        };
        count++;
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('wh_destination_links_changed'));
    return { success: true, count };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message || 'JSON parsing failed' };
  }
};
