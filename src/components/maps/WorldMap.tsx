import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { WorldMapProps, LocationMarker } from '../../types/map';
import { MAP_THEMES } from '../../lib/map/mapStyles';
import { buildMapLibreStyle, INITIAL_VIEWPORT, locationsToGeoJSON } from '../../lib/map/mapConfig';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, X } from 'lucide-react';

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
  const [activeTooltip, setActiveTooltip] = useState<{
    location: LocationMarker;
    x: number;
    y: number;
  } | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const themeConfig = MAP_THEMES[theme];

  // INITIALIZE MAPLIBRE GL MAP INSTANCE
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
        // ADD MARKER SOURCE WITH GEOJSON DATA
        const geojsonData = locationsToGeoJSON(locations);
        map.addSource('location-markers', {
          type: 'geojson',
          data: geojsonData as any,
          cluster: mode === 'realtime',
          clusterMaxZoom: 6,
          clusterRadius: 40
        });

        // 1. MARKER GLOW LAYER (SUBTLE TRANSLUCENT OUTER RING)
        map.addLayer({
          id: 'marker-glow-layer',
          type: 'circle',
          source: 'location-markers',
          paint: {
            'circle-color': themeConfig.primaryMarker,
            'circle-opacity': 0.22,
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'value'],
              0, 12,
              20, 18,
              50, 26,
              100, 38
            ]
          }
        });

        // 2. PRIMARY CIRCLE BUBBLE LAYER
        map.addLayer({
          id: 'marker-bubble-layer',
          type: 'circle',
          source: 'location-markers',
          paint: {
            'circle-color': themeConfig.primaryMarker,
            'circle-opacity': 0.45,
            'circle-stroke-color': themeConfig.markerBorder,
            'circle-stroke-width': 1.5,
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'value'],
              0, 6,
              10, 10,
              50, 18,
              100, 28
            ]
          }
        });

        // 3. INNER SOLID CORE HIGHLIGHT
        map.addLayer({
          id: 'marker-core-layer',
          type: 'circle',
          source: 'location-markers',
          paint: {
            'circle-color': themeConfig.brightMarker,
            'circle-opacity': 0.95,
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'value'],
              0, 3,
              50, 5,
              100, 8
            ]
          }
        });

        // 4. NUMERIC COUNT LABELS FOR HIGH-VOLUME MARKERS
        map.addLayer({
          id: 'marker-labels-layer',
          type: 'symbol',
          source: 'location-markers',
          layout: {
            'text-field': ['to-string', ['get', 'value']],
            'text-size': 10,
            'text-allow-overlap': false,
            'text-ignore-placement': false
          },
          paint: {
            'text-color': '#FFFFFF'
          }
        });

        // HOVER & CLICK INTERACTIONS
        map.on('mousemove', 'marker-bubble-layer', (e) => {
          map.getCanvas().style.cursor = 'pointer';
          if (e.features && e.features[0]) {
            const props = e.features[0].properties as any;
            const geom = e.features[0].geometry as any;
            const loc: LocationMarker = {
              id: props.id,
              name: props.name,
              country: props.country,
              city: props.city,
              region: props.region,
              latitude: geom.coordinates[1],
              longitude: geom.coordinates[0],
              value: props.value,
              activeCount: props.activeCount,
              device: props.device,
              browser: props.browser,
              flag: props.flag,
              lastActive: props.lastActive
            };
            setActiveTooltip({
              location: loc,
              x: e.point.x,
              y: e.point.y
            });
            if (onMarkerHover) onMarkerHover(loc);
          }
        });

        map.on('mouseleave', 'marker-bubble-layer', () => {
          map.getCanvas().style.cursor = '';
          setActiveTooltip(null);
          if (onMarkerHover) onMarkerHover(null);
        });

        map.on('click', 'marker-bubble-layer', (e) => {
          if (e.features && e.features[0]) {
            const props = e.features[0].properties as any;
            if (onMarkerClick) {
              onMarkerClick({
                id: props.id,
                name: props.name,
                country: props.country,
                city: props.city,
                region: props.region,
                latitude: (e.features[0].geometry as any).coordinates[1],
                longitude: (e.features[0].geometry as any).coordinates[0],
                value: props.value,
                activeCount: props.activeCount,
                device: props.device,
                browser: props.browser,
                flag: props.flag
              });
            }
          }
        });

        // COUNTRY HOVER
        map.on('mousemove', 'country-fills', (e) => {
          if (e.features && e.features[0]) {
            const cName = (e.features[0].properties as any)?.name || 'Country';
            setHoveredCountry(cName);
          }
        });

        map.on('mouseleave', 'country-fills', () => {
          setHoveredCountry(null);
        });
      });

      // RESIZE OBSERVER
      const resizeObserver = new ResizeObserver(() => {
        if (mapRef.current) {
          mapRef.current.resize();
        }
      });

      resizeObserver.observe(mapContainerRef.current);

      return () => {
        resizeObserver.disconnect();
        map.remove();
      };
    } catch (err) {
      console.warn('MapLibre GL initialization fallback:', err);
    }
  }, [theme, mode]);

  // LIVE DATA UPDATES (WITHOUT REBUILDING THE MAP)
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    if (map.isStyleLoaded()) {
      const source = map.getSource('location-markers') as maplibregl.GeoJSONSource;
      if (source) {
        source.setData(locationsToGeoJSON(locations) as any);
      }
    }
  }, [locations]);

  // MAP ZOOM / RESET CONTROLS
  const handleZoomIn = useCallback(() => {
    mapRef.current?.zoomIn({ duration: 300 });
  }, []);

  const handleZoomOut = useCallback(() => {
    mapRef.current?.zoomOut({ duration: 300 });
  }, []);

  const handleReset = useCallback(() => {
    mapRef.current?.flyTo({
      center: [INITIAL_VIEWPORT.lng, INITIAL_VIEWPORT.lat],
      zoom: INITIAL_VIEWPORT.zoom,
      bearing: 0,
      pitch: 0,
      duration: 600
    });
  }, []);

  return (
    <div
      className={`relative w-full h-[460px] rounded-2xl overflow-hidden border select-none transition-colors ${className}`}
      style={{
        backgroundColor: themeConfig.ocean,
        borderColor: themeConfig.secondaryBorder
      }}
    >
      {/* MAP CANVAS CONTAINER */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* MINIMAL CONTROLS OVERLAY (BOTTOM-LEFT / TOP-RIGHT) */}
      {showControls && (
        <div className="absolute bottom-4 left-4 z-20 flex flex-col rounded-xl overflow-hidden shadow-2xl border"
             style={{
               backgroundColor: themeConfig.tooltipBackground,
               borderColor: themeConfig.tooltipBorder
             }}>
          <button
            onClick={handleZoomIn}
            aria-label="Zoom in"
            title="Zoom In"
            className="p-2 hover:bg-slate-700/50 transition-colors text-cyan-400 cursor-pointer border-b"
            style={{ borderColor: themeConfig.tooltipBorder }}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            aria-label="Zoom out"
            title="Zoom Out"
            className="p-2 hover:bg-slate-700/50 transition-colors text-cyan-400 cursor-pointer border-b"
            style={{ borderColor: themeConfig.tooltipBorder }}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            aria-label="Reset map"
            title="Reset to World View"
            className="p-2 hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-white cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ACTIVE HOVER TOOLTIP (PREMIUM ANALYTICS POPUP) */}
      {activeTooltip && (
        <div
          className="absolute z-30 pointer-events-none p-3.5 rounded-xl shadow-2xl space-y-1 font-mono text-xs border backdrop-blur-md animate-in fade-in"
          style={{
            left: `${Math.min(activeTooltip.x + 15, 600)}px`,
            top: `${Math.max(activeTooltip.y - 85, 20)}px`,
            backgroundColor: themeConfig.tooltipBackground,
            borderColor: themeConfig.tooltipBorder,
            color: themeConfig.primaryText
          }}
        >
          <div className="flex items-center space-x-2 font-bold">
            <span className="text-base">{activeTooltip.location.flag || '📍'}</span>
            <span>{activeTooltip.location.name}</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-cyan-400 font-bold text-sm">{activeTooltip.location.value}</span>
            <span className="text-[10px] text-slate-400">page views / sessions</span>
          </div>
          {activeTooltip.location.city && (
            <span className="text-[10px] text-slate-400 block">
              📍 Approx. Locality: {activeTooltip.location.city}, {activeTooltip.location.region}
            </span>
          )}
        </div>
      )}

      {/* FOOTER NOTICE */}
      <div className="absolute bottom-2 right-4 z-10 text-[9px] font-mono text-slate-500 pointer-events-none">
        MapLibre GL Real Geographic Engine &bull; IP-derived approximate location
      </div>
    </div>
  );
};
export default WorldMap;
