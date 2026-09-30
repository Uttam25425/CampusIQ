export type CampusName = 'Main Campus' | 'North Campus' | 'Hostel Campus' | 'Research Campus';

export type DateRangeOption = 'Today' | 'Last 7 Days' | 'Last 30 Days' | '6 Months' | '1 Year';

export type ResourceType = 'energy' | 'water' | 'waste' | 'air' | 'assets' | 'carbon';

export interface EnergyHourlyData {
  time: string;
  usage: number; // kWh
  solar: number; // kWh
  grid: number; // kWh
  baseline: number; // kWh
}

export interface EnergyBuildingData {
  building: string;
  usage: number; // kWh
  cost: number; // ₹
  solarContribution: number; // %
  efficiencyScore: number; // %
  peakUsageHour: string;
}

export interface EnergyData {
  totalUsage: number; // 12,450 kWh
  changePercent: number; // -8.4%
  estimatedCost: number; // 124500 ₹
  solarGeneration: number; // 3,240 kWh
  renewablePercentage: number; // 26%
  co2Emissions: number; // 5.2 tons
  hourlyData: EnergyHourlyData[];
  buildingData: EnergyBuildingData[];
  sources: {
    name: string;
    percentage: number;
    kwh: number;
    color: string;
  }[];
}

export interface WaterDailyData {
  day: string;
  usage: number; // Liters
  harvested: number; // Liters
  baseline: number; // Liters
}

export interface WaterBuildingData {
  building: string;
  usage: number; // Liters
  percentage: number;
  anomalyDetected: boolean;
  leakProbability: number;
}

export interface WaterData {
  totalUsage: number; // 85,240 L
  changePercent: number; // -5.2%
  waterSaved: number; // 12,450 L
  rainwaterHarvested: number; // 8,200 L
  leakageAlertsCount: number; // 2
  dailyTrend: WaterDailyData[];
  buildingData: WaterBuildingData[];
  sources: {
    source: 'Municipal' | 'Groundwater' | 'Rainwater';
    liters: number;
    percentage: number;
    color: string;
  }[];
}

export interface WasteCategoryItem {
  category: 'Recycled' | 'Organic' | 'Plastic' | 'Paper' | 'E-Waste';
  weight: number; // kg
  percentage: number;
  color: string;
}

export interface WasteDailyTrend {
  day: string;
  total: number;
  recycled: number;
  landfill: number;
}

export interface WasteData {
  totalWaste: number; // 320 kg
  changePercent: number; // -12.6%
  recycled: number; // 180 kg
  organic: number; // 70 kg
  plastic: number; // 40 kg
  paper: number; // 20 kg
  eWaste: number; // 10 kg
  recyclingRate: number; // 56.2%
  targetRate: number; // 70%
  categories: WasteCategoryItem[];
  trend: WasteDailyTrend[];
}

export interface AirQualityLocation {
  id: string;
  name: string;
  aqi: number;
  pm25: number;
  pm10: number;
  co2: number;
  status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Poor';
  temperature: number;
  humidity: number;
}

export interface HourlyAQIData {
  hour: string;
  aqi: number;
  pm25: number;
  pm10: number;
}

export interface AirQualityData {
  overallAQI: number; // 72
  status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Poor';
  pm25: number; // 28 µg/m³
  pm10: number; // 46 µg/m³
  co2: number; // 620 ppm
  temperature: number; // 28°C
  humidity: number; // 64%
  locations: AirQualityLocation[];
  hourlyTrend: HourlyAQIData[];
}

export type AssetCategory =
  | 'Classrooms'
  | 'Laboratories'
  | 'Computers'
  | 'Projectors'
  | 'AC Units'
  | 'Solar Panels'
  | 'Water Pumps';

export type AssetStatus = 'Active' | 'Idle' | 'Maintenance' | 'Offline';

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  location: string;
  status: AssetStatus;
  utilization: number; // %
  energyRating: string; // e.g. 5 Star, 1.8 kW, etc.
  lastMaintenance: string;
  nextMaintenance: string;
  hoursActiveToday: number;
  specifications?: string;
  aiNote?: string;
}

export interface Building {
  id: string;
  name: string;
  type: string;
  areaSqFt: number;
  floors: number;
  health: 'Healthy' | 'Warning' | 'Attention Required';
  energyKwh: number;
  waterLiters: number;
  wasteKg: number;
  aqi: number;
  occupancyPercent: number;
  assetUtilizationPercent: number;
  coordinates: { x: number; y: number }; // SVG map coordinates
  aiSummary: string;
  energyTrend: { time: string; current: number; baseline: number }[];
  waterTrend: { time: string; current: number; baseline: number }[];
  occupancyTrend: { time: string; occupancy: number }[];
}

export type AlertSeverity = 'Critical' | 'High' | 'Warning' | 'Medium';
export type AlertType = 'Energy' | 'Water' | 'Waste' | 'Air Quality' | 'Asset Maintenance';
export type AlertStatus = 'Active' | 'Investigating' | 'Resolved' | 'Dismissed';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  type: AlertType;
  building: string;
  title: string;
  description: string;
  timestamp: string;
  timeAgo: string;
  status: AlertStatus;
  recommendedAction: string;
  estimatedImpact?: string;
}

export type InsightCategory = 'Energy' | 'Water' | 'Waste' | 'Air Quality' | 'Assets';
export type InsightSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface AIInsight {
  id: string;
  category: InsightCategory;
  severity: InsightSeverity;
  building: string;
  title: string;
  detectedIssue: string;
  whyItMatters: string;
  recommendation: string;
  estimatedImpact: string;
  potentialSavings: string;
  status: 'New' | 'Action Scheduled' | 'Resolved';
  timestamp: string;
}

export type MaintenancePriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type MaintenanceStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';

export interface MaintenanceRecord {
  id: string;
  asset: string;
  location: string;
  issue: string;
  priority: MaintenancePriority;
  assignedTo: string;
  scheduledDate: string;
  status: MaintenanceStatus;
  predictiveFlag?: boolean;
}

export interface SustainabilityGoal {
  id: string;
  title: string;
  category: 'Energy' | 'Water' | 'Waste' | 'Carbon' | 'Renewable';
  currentValue: number;
  targetValue: number;
  unit: string;
  progressPercent: number;
  deadline: string;
  status: 'On Track' | 'Needs Attention' | 'Exceeded';
  reductionTargetLabel: string; // e.g. "Reduce electricity consumption by 15%"
}

export interface CarbonData {
  totalEmissionsTons: number; // 5.2 tons
  monthlyTargetTons: number; // 4.5 tons
  reductionPercent: number; // 14.2%
  annualProjectedSavingsTons: number; // 18.5 tons
  breakdown: {
    category: 'Energy' | 'Transport' | 'Waste' | 'Water';
    emissionsTons: number;
    percentage: number;
    color: string;
  }[];
  monthlyTrend: {
    month: string;
    actual: number;
    target: number;
    offset: number;
  }[];
}

export interface ActivityItem {
  id: string;
  time: string;
  title: string;
  category: 'Energy' | 'Water' | 'Waste' | 'Air Quality' | 'Asset' | 'System';
  description: string;
  badgeType: 'critical' | 'warning' | 'success' | 'info';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  source?: 'gemini' | 'local-intelligence';
}
