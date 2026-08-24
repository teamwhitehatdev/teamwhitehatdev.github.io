import { CMSItem } from '../types';
import { COMPREHENSIVE_EDUCATIONAL_CMS_ITEMS } from './comprehensiveEducationalData';

// Export the 20 comprehensive educational and AI items as the authoritative AI items
export const INITIAL_AI_ITEMS: CMSItem[] = COMPREHENSIVE_EDUCATIONAL_CMS_ITEMS.filter(
  item => item.pageOwner === 'ai'
);
