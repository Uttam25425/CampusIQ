import { CarbonData } from '../types';

export const initialCarbonData: CarbonData = {
  totalEmissionsTons: 5.2,
  monthlyTargetTons: 4.5,
  reductionPercent: 14.2,
  annualProjectedSavingsTons: 18.5,
  breakdown: [
    { category: 'Energy', emissionsTons: 3.12, percentage: 60, color: '#059669' },
    { category: 'Transport', emissionsTons: 1.14, percentage: 22, color: '#0284C7' },
    { category: 'Waste', emissionsTons: 0.62, percentage: 12, color: '#F59E0B' },
    { category: 'Water', emissionsTons: 0.32, percentage: 6, color: '#10B981' },
  ],
  monthlyTrend: [
    { month: 'Apr', actual: 6.8, target: 6.5, offset: 1.2 },
    { month: 'May', actual: 6.4, target: 6.2, offset: 1.4 },
    { month: 'Jun', actual: 6.1, target: 5.8, offset: 1.5 },
    { month: 'Jul', actual: 5.7, target: 5.4, offset: 1.7 },
    { month: 'Aug', actual: 5.4, target: 5.0, offset: 1.9 },
    { month: 'Sep', actual: 5.2, target: 4.5, offset: 2.1 },
  ],
};
