import { PlayStoreAppConfig } from '../types';

export interface ExtractedPlayStoreData {
  appName?: string;
  developerName?: string;
  categoryBadge?: string;
  rating?: number;
  reviewsCount?: string;
  downloadsCount?: string;
  description?: string;
  appIconUrl?: string;
  bannerImageUrl?: string;
  windowTitle?: string;
  tagline?: string;
  badgeText?: string;
  featuresList?: string[];
}

/**
 * Format raw number to K/M/B representation
 */
function formatNumberAbbr(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M+';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K+';
  }
  return num.toString();
}

/**
 * Convert package name (e.g. "com.supercell.clashofclans") into human readable words
 */
function titleCaseFromPackage(pkg: string): string {
  const parts = pkg.split('.').filter(Boolean);
  const lastPart = parts.length > 1 ? parts[parts.length - 1] : parts[0] || 'App';
  // Split camelCase or under_scores or hyphens
  return lastPart
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/**
 * Extract Google Play Store metadata automatically using CORS proxies & structured schema parser
 */
export async function fetchPlayStoreMetadata(urlInput: string): Promise<ExtractedPlayStoreData | null> {
  const rawUrl = urlInput.trim();
  if (!rawUrl) return null;

  let targetUrl = rawUrl;
  // If user passed a package name like com.whatsapp
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    if (targetUrl.includes('.')) {
      targetUrl = `https://play.google.com/store/apps/details?id=${encodeURIComponent(targetUrl)}&hl=en`;
    } else {
      return null;
    }
  }

  // Ensure English locale so data is consistent
  if (!targetUrl.includes('hl=')) {
    targetUrl += (targetUrl.includes('?') ? '&' : '?') + 'hl=en';
  }

  let packageId = '';
  const isDevPage = targetUrl.includes('/store/apps/dev') || targetUrl.includes('dev?id=');

  try {
    const parsed = new URL(targetUrl);
    packageId = parsed.searchParams.get('id') || '';
  } catch (e) {
    // fallback regex
    const match = targetUrl.match(/[?&]id=([a-zA-Z0-9_.]+)/);
    if (match) packageId = match[1];
  }

  // If this is a Google Play Developer portfolio page
  if (isDevPage) {
    return {
      appName: 'Team WhiteHat Dev Android Suite',
      developerName: 'Team WhiteHat Dev',
      categoryBadge: 'Developer Portfolio',
      rating: 4.9,
      reviewsCount: '25K+ reviews',
      downloadsCount: '100K+ Downloads',
      description: 'Explore official Android productivity applications, automation utilities, and security tools published by Team WhiteHat Dev on Google Play.',
      appIconUrl: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=300&q=80',
      bannerImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      windowTitle: 'Team WhiteHat Dev - Google Play Store.exe',
      tagline: 'OFFICIAL ANDROID APPS',
      badgeText: 'Verified Developer',
      featuresList: ['Direct APK & Play Store Access', 'Zero Malware Guarantee', 'Automatic Cloud Updates']
    };
  }

  // Attempt 1: AllOrigins proxy
  // Attempt 2: CorsProxy.io
  let html = '';
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const resp = await fetch(proxyUrl, { signal: controller.signal });
    clearTimeout(timeout);
    if (resp.ok) {
      const data = await resp.json();
      if (data && typeof data.contents === 'string' && data.contents.length > 500) {
        html = data.contents;
      }
    }
  } catch (err) {
    // try fallback proxy
  }

  if (!html) {
    try {
      const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 7000);
      const resp = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeout);
      if (resp.ok) {
        html = await resp.text();
      }
    } catch (err) {
      // both proxies failed or timed out
    }
  }

  const result: ExtractedPlayStoreData = {};

  if (html) {
    // 1. Try JSON-LD Schema (Google Play uses application/ld+json for SoftwareApplication)
    const jsonLdMatches = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
    if (jsonLdMatches) {
      for (const block of jsonLdMatches) {
        try {
          const jsonText = block.replace(/<\/?script[^>]*>/gi, '').trim();
          const parsed = JSON.parse(jsonText);
          if (parsed['@type'] === 'SoftwareApplication' || parsed.name) {
            if (parsed.name) result.appName = parsed.name;
            if (parsed.author && parsed.author.name) result.developerName = parsed.author.name;
            if (parsed.applicationCategory) {
              result.categoryBadge = parsed.applicationCategory.replace(/_/g, ' ');
            }
            if (parsed.aggregateRating) {
              const r = parseFloat(parsed.aggregateRating.ratingValue);
              if (!isNaN(r)) result.rating = Math.round(r * 10) / 10;
              const rc = parseInt(parsed.aggregateRating.ratingCount);
              if (!isNaN(rc)) result.reviewsCount = `${formatNumberAbbr(rc)} reviews`;
            }
            if (parsed.description) {
              // Strip HTML tags from description
              result.description = parsed.description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 300);
            }
            if (parsed.image) {
              result.appIconUrl = parsed.image;
            }
            break;
          }
        } catch (e) {
          // ignore json parse error
        }
      }
    }

    // 2. OpenGraph Meta Tags fallback
    if (!result.appName) {
      const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
                      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);
      if (ogTitle && ogTitle[1]) {
        result.appName = ogTitle[1].replace(/\s*-\s*Apps on Google Play.*/i, '').trim();
      }
    }

    if (!result.description) {
      const ogDesc = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i) ||
                     html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
      if (ogDesc && ogDesc[1]) {
        result.description = ogDesc[1].replace(/<[^>]+>/g, '').trim().slice(0, 300);
      }
    }

    // Try extracting high-res icon
    const iconMatch = html.match(/<img[^>]+alt=["']Icon image["'][^>]+src=["']([^"']+)["']/i) ||
                      html.match(/<img[^>]+src=["']([^"']+)["'][^>]+alt=["']Icon image["']/i) ||
                      html.match(/<img[^>]+itemprop=["']image["'][^>]+src=["']([^"']+)["']/i);
    if (iconMatch && iconMatch[1]) {
      result.appIconUrl = iconMatch[1];
    }

    // Try extracting feature banner image
    const bannerMatch = html.match(/<img[^>]+alt=["']Cover art["'][^>]+src=["']([^"']+)["']/i) ||
                        html.match(/<img[^>]+src=["']([^"']+)["'][^>]+alt=["']Cover art["']/i) ||
                        html.match(/<img[^>]+itemprop=["']screenshot["'][^>]+src=["']([^"']+)["']/i);
    if (bannerMatch && bannerMatch[1]) {
      result.bannerImageUrl = bannerMatch[1];
    }

    if (!result.appIconUrl) {
      const ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      if (ogImg && ogImg[1]) {
        result.appIconUrl = ogImg[1];
      }
    }

    if (!result.bannerImageUrl && result.appIconUrl) {
      result.bannerImageUrl = result.appIconUrl;
    }

    // 3. Downloads count check from HTML regex
    const downloadsMatch = html.match(/([0-9.,]+[KkMmBb]?\+?)\s*downloads/i) ||
                           html.match(/>([0-9.,]+[MKB]?\+?)\s*Downloads</i);
    if (downloadsMatch && downloadsMatch[1]) {
      result.downloadsCount = `${downloadsMatch[1]} Downloads`;
    }

    // 4. Fallback developer name from title or site_name
    if (!result.developerName) {
      const devMatch = html.match(/itemprop="author"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i) ||
                        html.match(/href="\/store\/apps\/developer\?id=[^"]*"[^>]*>([^<]+)<\/a>/i);
      if (devMatch && devMatch[1]) {
        result.developerName = devMatch[1].trim();
      }
    }
  }

  // Fallback defaults if offline / blocked
  if (!result.appName && packageId) {
    result.appName = titleCaseFromPackage(packageId);
  }

  if (!result.developerName) {
    result.developerName = 'Google Play Verified Developer';
  }

  if (!result.categoryBadge) {
    result.categoryBadge = 'Tools & Utilities';
  }

  if (!result.rating) {
    result.rating = 4.8;
  }

  if (!result.reviewsCount) {
    result.reviewsCount = '10K+ reviews';
  }

  if (!result.downloadsCount) {
    result.downloadsCount = '50K+ Downloads';
  }

  if (!result.description && result.appName) {
    result.description = `Experience the official ${result.appName} app on Android. Download directly from the Google Play Store for verified performance and real-time security.`;
  }

  if (!result.tagline) {
    result.tagline = 'OFFICIAL ANDROID APP';
  }

  if (!result.badgeText) {
    result.badgeText = "Google Play Verified";
  }

  if (!result.appIconUrl) {
    result.appIconUrl = 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=300&q=80';
  }

  if (!result.bannerImageUrl) {
    result.bannerImageUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';
  }

  if (result.appName) {
    result.windowTitle = `${result.appName} - Google Play™ Store.exe`;
  }

  return result;
}
