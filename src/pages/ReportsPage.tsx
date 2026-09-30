import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Download,
  Printer,
  Filter,
  CheckCircle2,
  Zap,
  Droplets,
  Recycle,
  Wind,
  Layers,
  Leaf,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export const ReportsPage: React.FC = () => {
  const { energyData, waterData, wasteData, airQualityData, carbonData, buildings, selectedCampus } =
    useCampus();

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [selectedBuilding, setSelectedBuilding] = useState('All Buildings');
  const [selectedResource, setSelectedResource] = useState('All Resources');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
    }, 600);
  };

  const handleExportCSV = () => {
    const csvRows = [
      ['CampusIQ Campus Sustainability Executive Report by ECONEX'],
      ['Campus', selectedCampus],
      ['Date Range', dateRange],
      ['Generated On', new Date().toISOString()],
      [],
      ['Metric', 'Current Value', 'Change/Status', 'Benchmark Target'],
      ['Campus Sustainability Score', '78 / 100', '+6.4 pts vs last month', '85 / 100'],
      ['Total Energy Consumption', `${energyData.totalUsage} kWh`, '-8.4% vs baseline', '11,500 kWh'],
      ['Solar Power Generated', `${energyData.solarGeneration} kWh`, '26% renewable share', '40% renewable'],
      ['Estimated Electricity Cost', `INR ${energyData.estimatedCost}`, 'INR 10.00 / kWh', 'INR 1,15,000'],
      ['Total Water Consumption', `${waterData.totalUsage} L`, '-5.2% vs last month', '75,000 L'],
      ['Rainwater Harvested', `${waterData.rainwaterHarvested} L`, 'Cistern at 94%', '10,000 L'],
      ['Total Solid Waste', `${wasteData.totalWaste} kg`, '-12.6% vs last month', '280 kg'],
      ['Recycling Diversion Rate', `${wasteData.recyclingRate}%`, 'On track', '70.0%'],
      ['Campus Average AQI', `${airQualityData.overallAQI}`, 'Moderate', '< 50 Good'],
      ['Asset Utilization Index', '78%', '+6.8% improvement', '85%'],
      ['Carbon Emissions', `${carbonData.totalEmissionsTons} tons CO2`, '-14.2% avoided', '4.5 tons'],
      [],
      ['Facility Breakdown'],
      ['Building', 'Energy (kWh)', 'Water (L)', 'Waste (kg)', 'AQI', 'Health Status'],
      ...buildings.map((b) => [b.name, b.energyKwh, b.waterLiters, b.wasteKg, b.aqi, b.health]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CampusIQ_Campus_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Title & Action Buttons (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sustainability & ESG Compliance Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate printable audit dossiers and verifiable CSV exports for {selectedCampus}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/dossier"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-2xs transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Job Dossier (PDF)</span>
          </Link>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-sky-600" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{generating ? 'Rebuilding...' : 'Generate Report'}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar (Hidden on Print) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="Today">Range: Today</option>
            <option value="Last 7 Days">Range: Last 7 Days</option>
            <option value="Last 30 Days">Range: Last 30 Days</option>
            <option value="This Quarter">Range: This Quarter</option>
            <option value="Academic Year 2026">Range: Academic Year 2026</option>
          </select>

          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="All Buildings">Building: All Facilities</option>
            {buildings.map((b) => (
              <option key={b.id} value={b.name}>
                Building: {b.name}
              </option>
            ))}
          </select>

          <select
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="All Resources">Resource: Consolidated All</option>
            <option value="Energy">Resource: Energy Only</option>
            <option value="Water">Resource: Water Only</option>
            <option value="Waste">Resource: Waste Only</option>
            <option value="Air">Resource: Air Quality Only</option>
            <option value="Carbon">Resource: Carbon Only</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
          <CheckCircle2 className="w-4 h-4" />
          <span>Audit-Ready Format</span>
        </div>
      </div>

      {/* Printable Report Dossier Sheet */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        {/* Report Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                CampusIQ
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                by ECONEX
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Official Audit Report
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              AI-Powered Sustainable Campus Intelligence · Performance Verification
            </p>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500 font-mono">
            <div>Campus: <strong className="text-slate-900 dark:text-white">{selectedCampus}</strong></div>
            <div>Period: <strong>{dateRange}</strong></div>
            <div>Report ID: #CIQ-2026-09-Q3</div>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            1. Executive Key Performance Indicators
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Sustainability</span>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                78 / 100
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">+6.4 pts MoM</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Energy</span>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                12,450 kWh
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">↓ 8.4% MoM</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Water</span>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                85,240 L
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">↓ 5.2% MoM</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Solid Waste</span>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                320 kg
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">↓ 12.6% MoM</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Average AQI</span>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                72 (Mod.)
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">PM2.5: 28 µg/m³</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Carbon Cut</span>
              <div className="text-lg font-extrabold text-teal-700 dark:text-teal-400 tabular-nums">
                14.2%
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">18.5 tons ann.</span>
            </div>
          </div>
        </div>

        {/* Subsystem Audit Tables */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            2. Facility Consumption & Health Ledger
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                  <th className="py-2 px-3">Building Name</th>
                  <th className="py-2 px-3">Classification</th>
                  <th className="py-2 px-3">Energy (kWh)</th>
                  <th className="py-2 px-3">Water (L)</th>
                  <th className="py-2 px-3">Waste (kg)</th>
                  <th className="py-2 px-3">AQI</th>
                  <th className="py-2 px-3">Occupancy</th>
                  <th className="py-2 px-3 text-right">Health Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {buildings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">{b.name}</td>
                    <td className="py-2.5 px-3 text-slate-500">{b.type}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{b.energyKwh.toLocaleString()}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{b.waterLiters.toLocaleString()}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{b.wasteKg}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{b.aqi}</td>
                    <td className="py-2.5 px-3 font-mono tabular-nums">{b.occupancyPercent}%</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="font-semibold text-[11px]">{b.health}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Action Log & Recommendations */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>3. Automated AI Advisory Synopsis</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
            <li>
              <strong>Engineering Block HVAC:</strong> Dispatched temperature setback for 2:00 PM – 5:00 PM to capture 420 kWh monthly savings.
            </li>
            <li>
              <strong>Hostel Block Leakage:</strong> Plumbers dispatched to isolate Wing B overhead float valve to conserve ~7,500 L/day.
            </li>
            <li>
              <strong>Circularity:</strong> Increasing clean office paper segregation will divert 120 kg/month from municipal landfill.
            </li>
            <li>
              <strong>Asset Rebalancing:</strong> Computer Lab 2 recommended for scheduling consolidation to eliminate 1.8 kW phantom idle load.
            </li>
          </ul>
        </div>

        {/* Sign-off signatures */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-8 text-xs text-slate-500">
          <div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">Prepared by:</div>
            <div className="mt-1 font-mono text-[11px]">CampusIQ Automated Telemetry Engine v4.2</div>
            <div className="text-[10px] text-slate-400 mt-4">Automated Sensor Timestamp Hash: #8F9A-47C1</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-slate-800 dark:text-slate-200">Authorized Officer:</div>
            <div className="mt-1 font-mono text-[11px]">Uttam Sahu, Facility Director</div>
            <div className="text-[10px] text-slate-400 mt-4">Verified for Academic Board Submission</div>
          </div>
        </div>
      </div>
    </div>
  );
};
