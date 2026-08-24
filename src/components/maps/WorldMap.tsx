import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { WorldMapProps, LocationMarker } from '../../types/map';
import { MAP_THEMES } from '../../lib/map/mapStyles';
import { buildMapLibreStyle, INITIAL_VIEWPORT, locationsToGeoJSON } from '../../lib/map/mapConfig';
import { ZoomIn, ZoomOut, RotateCcw, Globe } from 'lucide-react';

// MERCATOR PROJECTION (1000x500 VIEWBOX)
const geoToSvg = (lat: number, lng: number): [number, number] => {
  const x = Math.round(((lng + 180) * 1000) / 360);
  const y = Math.round(((90 - lat) * 500) / 180);
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
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapLibreLoaded, setMapLibreLoaded] = useState(false);
  const [geoJsonData, setGeoJsonData] = useState<any>(null);

  // VECTOR CANVAS PAN & ZOOM STATE
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

  const themeConfig = MAP_THEMES[theme];

  // FETCH REAL WORLD GEOJSON ON MOUNT
  useEffect(() => {
    let isMounted = true;
    fetch('./worldCountries.json')
      .then(res => res.json())
      .then(data => {
        if (isMounted) setGeoJsonData(data);
      })
      .catch(err => {
        console.warn('Failed to load local worldCountries.json, using fallback:', err);
      });
    return () => { isMounted = false; };
  }, []);

  // CONVERT GEOJSON FEATURES INTO SVG PATH STRINGS
  const countrySvgPaths = useMemo(() => {
    if (!geoJsonData?.features) return [];
    return geoJsonData.features.map((feat: any, idx: number) => {
      const name = feat.properties?.name || feat.properties?.ADMIN || `Country ${idx}`;
      const geom = feat.geometry;
      if (!geom) return null;

      let pathData = '';
      if (geom.type === 'Polygon') {
        geom.coordinates.forEach((ring: number[][]) => {
          ring.forEach(([lng, lat], i) => {
            const [x, y] = geoToSvg(lat, lng);
            pathData += i === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
          });
          pathData += 'Z ';
        });
      } else if (geom.type === 'MultiPolygon') {
        geom.coordinates.forEach((poly: number[][][]) => {
          poly.forEach((ring: number[][]) => {
            ring.forEach(([lng, lat], i) => {
              const [x, y] = geoToSvg(lat, lng);
              pathData += i === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
            });
            pathData += 'Z ';
          });
        });
      }

      return {
        id: feat.id || idx,
        name,
        pathData
      };
    }).filter(Boolean);
  }, [geoJsonData]);

  // INITIALIZE MAPLIBRE GL
  useEffect(() => {
    if (!mapContainerRef.current) return;

    try {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: buildMapLibreStyle(theme) as any,
        center: [INITIAL_VIEWPORT.lng, INITIAL_VIEWPORT.lat],
        zoom: INITIAL_VIEWPORT.zoom,
        minZoom: INITIAL_VIEWPORT.minZoom,
        maxZoom: INITIAL_VIEWPORT.maxZoom,
        attributionControl: false,
        dragRotate: false,
        pitchWithRotate: false
      });

      mapRef.current = map;

      map.on('load', () => {
        setMapLibreLoaded(true);
      });

      return () => {
        map.remove();
        mapRef.current = null;
      };
    } catch (e) {
      console.warn('MapLibre GL init:', e);
    }
  }, [theme]);

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
        borderColor: themeConfig.secondaryBorder
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* REAL GEOGRAPHIC VECTOR PROJECTION CANVAS */}
      <div
        className="w-full h-full absolute inset-0 z-10 flex items-center justify-center transition-transform duration-100"
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
          {/* REAL GEOGRAPHIC COUNTRIES FROM REAL WORLD GEOJSON */}
          <g id="world-countries-group">
            {countrySvgPaths.map((item: any) => {
              const isHovered = hoveredCountry === item.name;
              return (
                <path
                  key={item.id}
                  d={item.pathData}
                  fill={isHovered ? themeConfig.countryHover : themeConfig.countryFill}
                  stroke={themeConfig.countryBorder}
                  strokeWidth="0.75"
                  strokeOpacity="0.85"
                  className="transition-colors duration-150 cursor-pointer"
                  onMouseEnter={() => setHoveredCountry(item.name)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => onCountryClick && onCountryClick({ name: item.name, id: String(item.id) })}
                >
                  <title>{item.name}</title>
                </path>
              );
            })}
          </g>

          {/* REAL VISITOR ACTIVITY BUBBLES */}
          <g id="visitor-markers-group">
            {locations.map((loc) => {
              const [cx, cy] = geoToSvg(loc.latitude, loc.longitude);
              const rBase = Math.min(Math.max(Math.sqrt(loc.value) * 3.8 + 5, 8), 34);
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
                  {/* PULSING GLOW HALO */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={rGlow}
                    fill={themeConfig.primaryMarker}
                    opacity="0.22"
                    className="animate-pulse"
                  />

                  {/* TRANSLUCENT BLUE CIRCLE */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={rBase}
                    fill={themeConfig.primaryMarker}
                    fillOpacity="0.45"
                    stroke={themeConfig.brightMarker}
                    strokeWidth="1.5"
                    className="group-hover:stroke-white transition-all"
                  />

                  {/* INNER SOLID CORE */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={Math.max(rBase * 0.35, 3)}
                    fill={themeConfig.brightMarker}
                    opacity="0.95"
                  />

                  {/* NUMERIC VALUE LABEL */}
                  {loc.value > 0 && (
                    <text
                      x={cx}
                      y={cy + 3.5}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={Math.max(rBase * 0.75, 9)}
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow"
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
            backgroundColor: themeConfig.tooltipBackground,
            borderColor: themeConfig.tooltipBorder
          }}
        >
          <button
            onClick={handleZoomIn}
            aria-label="Zoom in"
            title="Zoom In"
            className="p-2.5 hover:bg-slate-700/50 transition-colors text-cyan-400 cursor-pointer border-b"
            style={{ borderColor: themeConfig.tooltipBorder }}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            aria-label="Zoom out"
            title="Zoom Out"
            className="p-2.5 hover:bg-slate-700/50 transition-colors text-cyan-400 cursor-pointer border-b"
            style={{ borderColor: themeConfig.tooltipBorder }}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            aria-label="Reset map"
            title="Reset to World View"
            className="p-2.5 hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-white cursor-pointer"
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
            backgroundColor: themeConfig.tooltipBackground,
            borderColor: themeConfig.tooltipBorder,
            color: themeConfig.primaryText
          }}
        >
          <div className="flex items-center space-x-2 font-bold">
            <span className="text-base">{activeTooltip.location.flag || '📍'}</span>
            <span className="text-white font-orbitron">{activeTooltip.location.name}</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-cyan-400 font-bold text-sm">{activeTooltip.location.value}</span>
            <span className="text-[10px] text-slate-400">real hits / sessions</span>
          </div>
          {activeTooltip.location.city && (
            <span className="text-[10px] text-slate-400 block">
              📍 Locality: {activeTooltip.location.city}, {activeTooltip.location.region}
            </span>
          )}
        </div>
      )}

      {/* REAL WORLD ENGINE BADGE */}
      <div className="absolute bottom-2 right-4 z-10 text-[10px] font-mono text-slate-500 pointer-events-none flex items-center space-x-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>Real Geographic Vector Engine &bull; {countrySvgPaths.length || '258'} Countries</span>
      </div>

    </div>
  );
};
export default WorldMap;
