import { WasteData } from '../types';

export const initialWasteData: WasteData = {
  totalWaste: 320,
  changePercent: -12.1,
  recycled: 180,
  organic: 70,
  plastic: 40,
  paper: 20,
  eWaste: 10,
  recyclingRate: 56.2,
  targetRate: 70,
  categories: [
    { category: 'Recycled', weight: 180, percentage: 56.2, color: '#059669' },
    { category: 'Organic', weight: 70, percentage: 21.9, color: '#10B981' },
    { category: 'Plastic', weight: 40, percentage: 12.5, color: '#0284C7' },
    { category: 'Paper', weight: 20, percentage: 6.3, color: '#F59E0B' },
    { category: 'E-Waste', weight: 10, percentage: 3.1, color: '#6366F1' },
  ],
  trend: [
    { day: 'Mon', total: 54, recycled: 32, landfill: 22 },
    { day: 'Tue', total: 48, recycled: 28, landfill: 20 },
    { day: 'Wed', total: 52, recycled: 30, landfill: 22 },
    { day: 'Thu', total: 44, recycled: 26, landfill: 18 },
    { day: 'Fri', total: 50, recycled: 29, landfill: 21 },
    { day: 'Sat', total: 38, recycled: 20, landfill: 18 },
    { day: 'Sun', total: 34, recycled: 15, landfill: 19 },
  ],
};
