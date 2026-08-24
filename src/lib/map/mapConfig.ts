import { LocationMarker } from '../../types/map';

export const INITIAL_VIEWPORT = {
  lng: 0,
  lat: 18,
  zoom: 1.25,
  minZoom: 1,
  maxZoom: 9
};

// CONVERT LOCATION MARKERS TO GEOJSON FEATURE COLLECTION
export const locationsToGeoJSON = (locations: LocationMarker[]) => {
  return {
    type: 'FeatureCollection' as const,
    features: locations.map(loc => ({
      type: 'Feature' as const,
      properties: {
        id: loc.id,
        name: loc.name,
        country: loc.country,
        city: loc.city || '',
        region: loc.region || '',
        value: loc.value,
        activeCount: loc.activeCount || 1,
        device: loc.device || 'Desktop',
        browser: loc.browser || 'Chrome',
        flag: loc.flag || '🌐',
        lastActive: loc.lastActive || new Date().toISOString()
      },
      geometry: {
        type: 'Point' as const,
        coordinates: [loc.longitude, loc.latitude]
      }
    }))
  };
};

// MAPLIBRE BASE STYLE SPECIFICATION BUILDER (WITH ZERO UNNECESSARY POIS OR ROADS)
export const buildMapLibreStyle = (theme: 'dark' | 'light') => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#11171D' : '#F3F6F8';
  const landColor = isDark ? '#414345' : '#D9DEE2';
  const borderColor = isDark ? '#5B5D60' : '#B7BEC4';

  return {
    version: 8 as const,
    name: `Analytics ${theme} style`,
    sources: {
      'world-countries': {
        type: 'geojson' as const,
        data: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
      }
    },
    layers: [
      {
        id: 'background',
        type: 'background' as const,
        paint: {
          'background-color': bgColor
        }
      },
      {
        id: 'country-fills',
        type: 'fill' as const,
        source: 'world-countries',
        paint: {
          'fill-color': landColor,
          'fill-opacity': 1
        }
      },
      {
        id: 'country-hover-highlight',
        type: 'fill' as const,
        source: 'world-countries',
        paint: {
          'fill-color': isDark ? '#50555A' : '#CBD2D7',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0
          ]
        }
      },
      {
        id: 'country-borders',
        type: 'line' as const,
        source: 'world-countries',
        paint: {
          'line-color': borderColor,
          'line-width': 0.75,
          'line-opacity': 0.75
        }
      }
    ]
  };
};
