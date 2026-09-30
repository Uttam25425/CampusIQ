import { ActivityItem } from '../types';

export const initialActivityData: ActivityItem[] = [
  {
    id: 'act-1',
    time: '08:42',
    title: 'Engineering Block energy alert generated',
    category: 'Energy',
    description: 'Chiller plant draw detected at +18% above typical morning baseline.',
    badgeType: 'warning',
  },
  {
    id: 'act-2',
    time: '08:35',
    title: 'Water usage updated',
    category: 'Water',
    description: 'Smart meter synchronized for all 6 campus building sectors.',
    badgeType: 'info',
  },
  {
    id: 'act-3',
    time: '08:21',
    title: 'Lab 2 maintenance completed',
    category: 'Asset',
    description: 'Smart power strips tested and firmware auto-updated to v2.4.',
    badgeType: 'success',
  },
  {
    id: 'act-4',
    time: '08:10',
    title: 'AQI sensor data updated',
    category: 'Air Quality',
    description: 'Hourly telemetry received: Campus average holding at 72 (Moderate).',
    badgeType: 'info',
  },
  {
    id: 'act-5',
    time: '07:58',
    title: 'Sustainability score recalculated',
    category: 'System',
    description: 'Campus score elevated to 78/100 (+6.4 points vs last 30 days).',
    badgeType: 'success',
  },
  {
    id: 'act-6',
    time: '07:15',
    title: 'Hostel Block water leakage alert',
    category: 'Water',
    description: 'Overnight flow anomaly detected in Wing B overhead feeder line.',
    badgeType: 'critical',
  },
];
