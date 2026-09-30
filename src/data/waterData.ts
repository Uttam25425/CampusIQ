import { WaterData } from '../types';

export const initialWaterData: WaterData = {
  totalUsage: 85240,
  changePercent: -5.2,
  waterSaved: 12450,
  rainwaterHarvested: 8200,
  leakageAlertsCount: 2,
  dailyTrend: [
    { day: 'Mon', usage: 12400, harvested: 1200, baseline: 13200 },
    { day: 'Tue', usage: 12900, harvested: 1100, baseline: 13000 },
    { day: 'Wed', usage: 13400, harvested: 950, baseline: 12800 },
    { day: 'Thu', usage: 12100, harvested: 1400, baseline: 12600 },
    { day: 'Fri', usage: 11800, harvested: 1300, baseline: 12500 },
    { day: 'Sat', usage: 11640, harvested: 1150, baseline: 11200 },
    { day: 'Sun', usage: 11000, harvested: 1100, baseline: 10400 },
  ],
  buildingData: [
    { building: 'Hostel Block', usage: 36400, percentage: 42.7, anomalyDetected: true, leakProbability: 89 },
    { building: 'Laboratory', usage: 18200, percentage: 21.4, anomalyDetected: false, leakProbability: 12 },
    { building: 'Engineering Block', usage: 12800, percentage: 15.0, anomalyDetected: false, leakProbability: 18 },
    { building: 'Computer Science Block', usage: 8400, percentage: 9.9, anomalyDetected: false, leakProbability: 8 },
    { building: 'Administration Block', usage: 5200, percentage: 6.1, anomalyDetected: false, leakProbability: 6 },
    { building: 'Library', usage: 4240, percentage: 4.9, anomalyDetected: false, leakProbability: 4 },
  ],
  sources: [
    { source: 'Municipal', liters: 48500, percentage: 56.9, color: '#0284C7' },
    { source: 'Groundwater', liters: 28540, percentage: 33.5, color: '#059669' },
    { source: 'Rainwater', liters: 8200, percentage: 9.6, color: '#10B981' },
  ],
};
