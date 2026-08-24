import { MapThemeConfig } from '../../types/map';

export const MAP_THEMES: Record<'dark' | 'light', MapThemeConfig> = {
  dark: {
    ocean: '#11171D',
    mapBackground: '#151B21',
    countryFill: '#414345',
    countryHover: '#50555A',
    countrySelected: '#596066',
    countryBorder: '#5B5D60',
    secondaryBorder: '#4A4C4F',
    coastline: '#65676A',
    primaryMarker: '#269BD5',
    brightMarker: '#3AAFE5',
    markerBorder: '#38A9DF',
    markerGlow: 'rgba(38, 155, 213, 0.22)',
    primaryText: '#F0F2F4',
    secondaryText: '#9BA1A6',
    tooltipBackground: '#1B2229',
    tooltipBorder: 'rgba(255, 255, 255, 0.08)'
  },
  light: {
    ocean: '#F3F6F8',
    mapBackground: '#F8FAFB',
    countryFill: '#D9DEE2',
    countryHover: '#CBD2D7',
    countrySelected: '#BEC7CD',
    countryBorder: '#B7BEC4',
    secondaryBorder: '#C8CED3',
    coastline: '#AAB3BA',
    primaryMarker: '#168AC4',
    brightMarker: '#249BD5',
    markerBorder: '#0875AA',
    markerGlow: 'rgba(22, 138, 196, 0.20)',
    primaryText: '#20262B',
    secondaryText: '#667078',
    tooltipBackground: '#FFFFFF',
    tooltipBorder: '#E0E5E8'
  }
};
