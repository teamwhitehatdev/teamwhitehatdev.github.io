export type MapThemeMode = 'dark' | 'light';

export interface LocationMarker {
  id: string;
  name: string;
  country: string;
  city?: string;
  region?: string;
  latitude: number;
  longitude: number;
  value: number; // page views / visitor count
  activeCount?: number;
  device?: string;
  browser?: string;
  flag?: string;
  lastActive?: string;
}

export interface MapThemeConfig {
  ocean: string;
  mapBackground: string;
  countryFill: string;
  countryHover: string;
  countrySelected: string;
  countryBorder: string;
  secondaryBorder: string;
  coastline: string;
  primaryMarker: string;
  brightMarker: string;
  markerBorder: string;
  markerGlow: string;
  primaryText: string;
  secondaryText: string;
  tooltipBackground: string;
  tooltipBorder: string;
}

export interface WorldMapProps {
  theme?: MapThemeMode;
  mode?: 'analytics' | 'realtime';
  locations: LocationMarker[];
  showControls?: boolean;
  showLabels?: boolean;
  showBorders?: boolean;
  showAdministrativeBorders?: boolean;
  enableCountryHover?: boolean;
  enableMarkerHover?: boolean;
  onCountryClick?: (country: { name: string; id?: string }) => void;
  onMarkerClick?: (location: LocationMarker) => void;
  onMarkerHover?: (location: LocationMarker | null) => void;
  className?: string;
}
