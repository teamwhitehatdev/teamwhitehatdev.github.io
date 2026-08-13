import React from 'react';
import { Activity } from 'lucide-react';

export const LiveActivityTicker: React.FC = () => (
  <div className="hidden">
    <Activity className="w-3 h-3" />
  </div>
);
export default LiveActivityTicker;
