import React, { useState, useCallback } from 'react';
import { WorldMapProps, LocationMarker } from '../../types/map';
import { PRECALCULATED_WORLD_PATHS } from '../../data/worldMapSvgPaths';
import { ZoomIn, ZoomOut, RotateCcw, Globe, MapPin } from 'lucide-react';

// MERCATOR GEO TO SVG COORDINATE CONVERTER (1000x500 VIEWBOX)
const geoToSvg = (lat: number, lng: number): [number, number] => {
  const x = Math.round(((lng + 180) * 1000) / 360 * 10) / 10;
  const y = Math.round(((90 - lat) * 500) / 180 * 10) / 10;
  return [x, y];
};

export const WorldMap: React.FC<WorldMapProps> = ({
  theme = 'dark',
  mode = 'analytics',
  locations = [],
  showControls = true,
  showLabels = false,
  showBorders = true,
  showAdministrativeBorders = false,
  enableCountryHover = true,
  enableMarkerHover = true,
  onCountryClick,
  onMarkerClick,
  onMarkerHover,
  className = ''
}) => {
  const isDark = theme === 'dark';

  // HIGH-CONTRAST COLORS THAT GUARANTEE VISIBILITY IN BOTH DARK AND LIGHT THEMES
  const themeConfig = {
    ocean: isDark ? '#0B0F15' : '#E2E8F0',
    mapBackground: isDark ? '#111827' : '#F1F5F9',
    countryFill: isDark ? '#2D3748' : '#94A3B8',
    countryHover: isDark ? '#4A5568' : '#64748B',
    countryBorder: isDark ? '#4A5568' : '#64748B',
    primaryMarker: isDark ? '#38BDF8' : '#0284C7',
    brightMarker: isDark ? '#7DD3FC' : '#0369A1',
    markerGlow: isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(2, 132, 199, 0.35)',
    primaryText: isDark ? '#F8FAFC' : '#0F172A',
    secondaryText: isDark ? '#94A3B8' : '#475569',
    tooltipBg: isDark ? '#1E293B' : '#FFFFFF',
    tooltipBorder: isDark ? '#334155' : '#CBD5E1'
  };

  // PAN & ZOOM STATE
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [activeTooltip, setActiveTooltip] = useState<{
    location: LocationMarker;
    x: number;
    y: number;
  } | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // ZOOM / PAN HANDLERS
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 0.35, 3.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 0.35, 0.8));
  }, []);

  const handleReset = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`relative w-full h-[480px] rounded-3xl overflow-hidden border select-none transition-colors ${className}`}
      style={{
        backgroundColor: themeConfig.ocean,
        borderColor: themeConfig.countryBorder
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* SVG REAL WORLD CONTINENTAL & COUNTRY VECTOR MAP */}
      <div
        className="w-full h-full absolute inset-0 z-10 flex items-center justify-center transition-transform duration-75"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full drop-shadow-2xl"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* BACKGROUND RECT */}
          <rect width="1000" height="500" fill={themeConfig.ocean} />

          {/* ALL 258 REAL COUNTRIES & CONTINENTS */}
          <g id="precalculated-countries-layer">
            {PRECALCULATED_WORLD_PATHS.map((item) => {
              const isHovered = hoveredCountry === item.name;
              return (
                <path
                  key={item.id}
                  d={item.d}
                  fill={isHovered ? themeConfig.countryHover : themeConfig.countryFill}
                  stroke={themeConfig.countryBorder}
                  strokeWidth="0.75"
                  strokeOpacity="0.9"
                  className="transition-colors duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredCountry(item.name)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => onCountryClick && onCountryClick({ name: item.name, id: item.id })}
                >
                  <title>{item.name}</title>
                </path>
              );
            })}
          </g>

          {/* VISITOR ACTIVITY BUBBLE OVERLAYS */}
          <g id="visitor-markers-layer">
            {locations.map((loc) => {
              const [cx, cy] = geoToSvg(loc.latitude, loc.longitude);
              const rBase = Math.min(Math.max(Math.sqrt(loc.value) * 3.8 + 6, 9), 36);
              const rGlow = rBase * 1.6;

              return (
                <g
                  key={loc.id}
                  className="cursor-pointer group"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setActiveTooltip({
                      location: loc,
                      x: rect.left,
                      y: rect.top
                    });
                    if (onMarkerHover) onMarkerHover(loc);
                  }}
                  onMouseLeave={() => {
                    setActiveTooltip(null);
                    if (onMarkerHover) onMarkerHover(null);
                  }}
                  onClick={() => onMarkerClick && onMarkerClick(loc)}
                >
                  {/* 1. PULSING OUTER GLOW */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={rGlow}
                    fill={themeConfig.primaryMarker}
                    opacity="0.30"
                    className="animate-pulse"
                  />

                  {/* 2. TRANSLUCENT BLUE CIRCLE WITH CRISP BORDER */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={rBase}
                    fill={themeConfig.primaryMarker}
                    fillOpacity="0.55"
                    stroke={themeConfig.brightMarker}
                    strokeWidth="2"
                    className="group-hover:stroke-white transition-all"
                  />

                  {/* 3. SOLID CORE HIGHLIGHT */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={Math.max(rBase * 0.35, 3)}
                    fill={themeConfig.brightMarker}
                    opacity="0.95"
                  />

                  {/* 4. NUMERIC VALUE LABEL */}
                  {loc.value > 0 && (
                    <text
                      x={cx}
                      y={cy + 3.5}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={Math.max(rBase * 0.75, 10)}
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow-md"
                    >
                      {loc.value}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* MINIMAL CONTROLS OVERLAY (BOTTOM-LEFT) */}
      {showControls && (
        <div
          className="absolute bottom-4 left-4 z-20 flex flex-col rounded-2xl overflow-hidden shadow-2xl border backdrop-blur-md"
          style={{
            backgroundColor: themeConfig.tooltipBg,
            borderColor: themeConfig.tooltipBorder
          }}
        >
          <button
            onClick={handleZoomIn}
            aria-label="Zoom in"
            title="Zoom In"
            className="p-2.5 hover:bg-slate-700/40 transition-colors text-cyan-400 cursor-pointer border-b"
            style={{ borderColor: themeConfig.tooltipBorder }}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            aria-label="Zoom out"
            title="Zoom Out"
            className="p-2.5 hover:bg-slate-700/40 transition-colors text-cyan-400 cursor-pointer border-b"
            style={{ borderColor: themeConfig.tooltipBorder }}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            aria-label="Reset map"
            title="Reset to World View"
            className="p-2.5 hover:bg-slate-700/40 transition-colors text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ACTIVE HOVER TOOLTIP */}
      {activeTooltip && (
        <div
          className="absolute z-30 pointer-events-none p-3.5 rounded-2xl shadow-2xl space-y-1 font-mono text-xs border backdrop-blur-md animate-in fade-in"
          style={{
            left: `${Math.min(Math.max(activeTooltip.x - 200, 20), 450)}px`,
            top: `${Math.min(Math.max(activeTooltip.y - 100, 20), 320)}px`,
            backgroundColor: themeConfig.tooltipBg,
            borderColor: themeConfig.tooltipBorder,
            color: themeConfig.primaryText
          }}
        >
          <div className="flex items-center space-x-2 font-bold">
            <span className="text-base">{activeTooltip.location.flag || '📍'}</span>
            <span className="font-orbitron" style={{ color: themeConfig.primaryText }}>{activeTooltip.location.name}</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="font-bold text-sm" style={{ color: themeConfig.primaryMarker }}>{activeTooltip.location.value}</span>
            <span className="text-[10px]" style={{ color: themeConfig.secondaryText }}>real hits / sessions</span>
          </div>
          {activeTooltip.location.city && (
            <span className="text-[10px] block" style={{ color: themeConfig.secondaryText }}>
              📍 Locality: {activeTooltip.location.city}, {activeTooltip.location.region}
            </span>
          )}
        </div>
      )}

      {/* FOOTER BADGE */}
      <div className="absolute bottom-2 right-4 z-10 text-[10px] font-mono text-slate-500 pointer-events-none flex items-center space-x-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>Real Geographic Vector Engine &bull; {PRECALCULATED_WORLD_PATHS.length} Countries</span>
      </div>

    </div>
  );
};
export default WorldMap;
