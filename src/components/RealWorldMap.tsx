import React, { useState, useMemo } from 'react';
import { WorldMap } from './maps/WorldMap';
import { LocationMarker } from '../types/map';
import { LiveVisitorSession, TelemetryEvent } from '../types';
import { Globe } from 'lucide-react';

export interface RealWorldMapProps {
  isDark?: boolean;
  sessions: LiveVisitorSession[];
  events: TelemetryEvent[];
  onSelectCountry?: (country: string) => void;
  selectedCountry?: string;
}

const KNOWN_GEO_COORDINATES: Record<string, { lat: number; lng: number; flag: string; defaultCity: string }> = {
  'philippines': { lat: 14.5995, lng: 120.9842, flag: '🇵🇭', defaultCity: 'Manila' },
  'united states': { lat: 37.0902, lng: -95.7129, flag: '🇺🇸', defaultCity: 'Washington D.C.' },
  'singapore': { lat: 1.3521, lng: 103.8198, flag: '🇸🇬', defaultCity: 'Singapore' },
  'united kingdom': { lat: 55.3781, lng: -3.4360, flag: '🇬🇧', defaultCity: 'London' },
  'india': { lat: 20.5937, lng: 78.9629, flag: '🇮🇳', defaultCity: 'New Delhi' },
  'germany': { lat: 51.1657, lng: 10.4515, flag: '🇩🇪', defaultCity: 'Berlin' },
  'canada': { lat: 56.1304, lng: -106.3468, flag: '🇨🇦', defaultCity: 'Ottawa' },
  'australia': { lat: -25.2744, lng: 133.7751, flag: '🇦🇺', defaultCity: 'Canberra' },
  'japan': { lat: 36.2048, lng: 138.2529, flag: '🇯🇵', defaultCity: 'Tokyo' },
  'netherlands': { lat: 52.1326, lng: 5.2913, flag: '🇳🇱', defaultCity: 'Amsterdam' },
  'portugal': { lat: 39.3999, lng: -8.2245, flag: '🇵🇹', defaultCity: 'Lisbon' },
  'france': { lat: 46.2276, lng: 2.2137, flag: '🇫🇷', defaultCity: 'Paris' },
  'brazil': { lat: -14.2350, lng: -51.9253, flag: '🇧🇷', defaultCity: 'Brasilia' }
};

export const RealWorldMap: React.FC<RealWorldMapProps> = ({
  sessions,
  events,
  onSelectCountry
}) => {
  const [, setSelectedMarker] = useState<LocationMarker | null>(null);

  const locationMarkers = useMemo<LocationMarker[]>(() => {
    const map: Record<string, { count: number; active: number; city: string; region: string; device: string; browser: string }> = {};

    events.forEach((e) => {
      const c = (e.country || 'Philippines').toLowerCase();
      if (!map[c]) {
        map[c] = {
          count: 0,
          active: 0,
          city: e.city || '',
          region: e.region || '',
          device: e.device || 'Desktop',
          browser: e.browser || 'Chrome'
        };
      }
      map[c].count += 1;
    });

    sessions.forEach((s) => {
      const c = (s.country || 'Philippines').toLowerCase();
      if (!map[c]) {
        map[c] = {
          count: 1,
          active: s.isActive ? 1 : 0,
          city: s.city || '',
          region: s.region || '',
          device: s.device || 'Desktop',
          browser: s.browser || 'Chrome'
        };
      } else if (s.isActive) {
        map[c].active += 1;
      }
    });

    const markers: LocationMarker[] = [];
    Object.entries(map).forEach(([cKey, data]) => {
      const geo = KNOWN_GEO_COORDINATES[cKey] || {
        lat: 14.5995,
        lng: 120.9842,
        flag: '🌐',
        defaultCity: 'Locality'
      };
      const displayName = cKey.charAt(0).toUpperCase() + cKey.slice(1);
      markers.push({
        id: `loc_${cKey}`,
        name: displayName,
        country: displayName,
        city: data.city || geo.defaultCity,
        region: data.region || 'Region',
        latitude: geo.lat,
        longitude: geo.lng,
        value: data.count,
        activeCount: data.active,
        device: data.device,
        browser: data.browser,
        flag: geo.flag
      });
    });

    return markers.sort((a, b) => b.value - a.value);
  }, [events, sessions]);

  const topCountriesRanking = useMemo(() => {
    const maxVal = Math.max(...locationMarkers.map((m) => m.value), 1);
    return locationMarkers
      .map((m) => ({
        country: m.name,
        flag: m.flag || '🌐',
        views: m.value,
        pct: Math.round((m.value / maxVal) * 100)
      }))
      .slice(0, 6);
  }, [locationMarkers]);

  const totalActiveOnline = useMemo(() => {
    return sessions.filter((s) => s.isActive).length;
  }, [sessions]);

  return (
    <div className="space-y-6 text-slate-900">
      {/* MAP HEADER */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Geographic MapLibre Engine
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Global Traffic Intelligence Map
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <span className="text-slate-500 font-bold">Realtime Visitors:</span>
          <span className="text-slate-900 font-extrabold text-sm">{totalActiveOnline}</span>
          <span className="text-[10px] text-slate-700 font-bold">● Live</span>
        </div>
      </div>

      {/* REAL MAP & SIDE STATS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative">
          <WorldMap
            theme="light"
            mode="analytics"
            locations={locationMarkers}
            showControls={true}
            enableCountryHover={true}
            enableMarkerHover={true}
            onMarkerClick={(loc) => setSelectedMarker(loc)}
            onCountryClick={(c) => onSelectCountry && onSelectCountry(c.name)}
          />
        </div>

        {/* COUNTRY RANKING LIST (PURE WHITE CARD) */}
        <div className="lg:col-span-4 p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 bg-white text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Audience Distribution
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">
                Top Visiting Countries
              </h4>
            </div>
            <span className="text-[10px] text-slate-500 font-bold">HITS</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {topCountriesRanking.length === 0 ? (
              <span className="text-slate-500 text-center block py-4">
                No visitor events logged.
              </span>
            ) : (
              topCountriesRanking.map((c) => (
                <div
                  key={c.country}
                  onClick={() => onSelectCountry && onSelectCountry(c.country)}
                  className="space-y-1.5 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{c.flag}</span>
                      <span className="font-bold text-slate-900 group-hover:underline">
                        {c.country}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 font-bold">
                      <span className="text-slate-900">{c.views}</span>
                      <span className="text-slate-400 text-[10px]">({c.pct}%)</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="bg-slate-900 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(c.pct, 6)}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">MOBILE</span>
              <span className="text-slate-900 font-bold text-xs">74%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">DESKTOP</span>
              <span className="text-slate-900 font-bold text-xs">24%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block">TABLET</span>
              <span className="text-slate-900 font-bold text-xs">2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RealWorldMap;
