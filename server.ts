import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// API health endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// CampusIQ AI Chat Endpoint (also supports legacy /api/greenmind-ai/chat and /api/eco-ai/chat)
const handleChat = async (req: express.Request, res: express.Response) => {
  const { message, context } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `You are CampusIQ AI, the AI-Powered Sustainable Campus Intelligence Assistant for the CampusIQ platform by ECONEX.
Your purpose is to assist campus administrators, facility managers, and sustainability teams with data-driven insights.

Campus Current Status & Context:
- Platform: CampusIQ by ECONEX
- Overall Sustainability Score: 78/100 (+6 points vs last month)
- Total Energy: 12,450 kWh (↓ 8.4% vs last month), Solar Generation: 3,240 kWh (26% renewable), Est Cost: ₹1,24,500, CO2: 5.2 tons.
- Engineering Block consumed 18% more energy than baseline due to HVAC operating during low-occupancy hours (2 PM - 5 PM). Potential savings: 420 kWh/month.
- Water Usage: 85,240 L (↓ 5.2%), Saved: 12,450 L, Rainwater Harvested: 8,200 L.
- Water Leakage Alert: Hostel Block usage is 27% above normal (suspected pipeline or flush fixture leak).
- Waste: 320 kg total (180 kg recycled, 70 kg organic, 40 kg plastic, 20 kg paper, 10 kg e-waste). Recycling rate: 56.2%, Target: 70%. Increasing paper recycling by 10% could save ~120 kg landfill waste/month.
- Air Quality: Overall AQI 72 (Moderate). PM2.5: 28 µg/m³, PM10: 46 µg/m³, CO2: 620 ppm. Worst area is Parking Area (AQI 98) & Main Gate (AQI 84) due to vehicular idling. Library is cleanest (AQI 42).
- Asset Utilization: Overall 78% (↑ 6.8%). Computer Lab 2 has only 34% utilization (Idle state). Recommendation: Reallocate during low-demand periods.
- Buildings Monitored: Administration Block, Engineering Block, Science Block, Computer Science Block, Library, Hostel, Laboratory, Cafeteria.
${context ? `Additional user dashboard context: ${JSON.stringify(context)}` : ''}

Tone and style:
- Authoritative, practical, actionable, intelligent, and encouraging.
- Format responses cleanly with concise markdown: bullet points, bold metrics, and structured recommendations.
- Always tie issues to measurable impact (kWh saved, liters preserved, emissions reduced, or money saved).
`;

      const prompt = `User Query: ${message}`;
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI request timeout')), 4000)
      );

      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const response: any = await Promise.race([generatePromise, timeoutPromise]);
      const responseText = response.text || 'Unable to generate response from CampusIQ AI.';
      return res.json({ reply: responseText, source: 'gemini' });
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to local reasoning:', err?.message);
      // Fall through to local fallback response
    }
  }

  // Realistic local intelligent fallback reasoning engine
  const reply = generateLocalCampusIQAiResponse(message);
  return res.json({ reply, source: 'local-intelligence' });
};

app.post('/api/campusiq-ai/chat', handleChat);
app.post('/api/greenmind-ai/chat', handleChat);
app.post('/api/eco-ai/chat', handleChat);

function generateLocalCampusIQAiResponse(message: string): string {
  const query = message.toLowerCase();

  if (query.includes('energy') || query.includes('electricity') || query.includes('power') || query.includes('kwh')) {
    if (query.includes('highest') || query.includes('most') || query.includes('building')) {
      return `### ⚡ Energy Consumption Breakdown

**Engineering Block** is currently the highest energy consumer on campus:
- **Current Usage:** 3,850 kWh/week (**18% above baseline**)
- **Root Cause Identified:** Central HVAC chillers running at full capacity between 2:00 PM – 5:00 PM when student occupancy drops by 65%.
- **Actionable Recommendation:** Implement occupancy-linked setbacks on Building Automation System (BAS) Zone 3 & 4.
- **Estimated Savings:** **420 kWh/month** (~₹4,200/month) with zero disruption to scheduled classes.

*Campus overall energy usage is **12,450 kWh** (↓ 8.4% vs last month), with solar contributing **3,240 kWh (26%)**.*`;
    }
    return `### ⚡ Campus Energy Overview
- **Total Consumption:** 12,450 kWh (↓ 8.4% vs last month)
- **Estimated Cost:** ₹1,24,500
- **Solar Generation:** 3,240 kWh (26% of campus power)
- **Carbon Footprint:** 5.2 tons CO₂
- **Top Saver:** Library (solar rooftop array generation up 14%)
- **Primary Optimization:** Adjust Engineering Block HVAC schedule to recoup **420 kWh/month**.`;
  }

  if (query.includes('water') || query.includes('leak') || query.includes('liters') || query.includes('hostel')) {
    return `### 💧 Water Management & Anomaly Alert

**High-Priority Alert in Hostel Block:**
- **Current Flow:** 28,400 L/day (**27% above normal baseline**)
- **Detected Anomaly:** Sustained overnight baseline draw of 8.2 L/min between 1:30 AM and 4:30 AM, characteristic of an overhead tank float valve failure or toilet flapper bypass in Wing B.
- **Immediate Recommendation:**
  1. Inspect Hostel Wing B Level 2 & 3 plumbing shafts.
  2. Test automatic shut-off valve sensor on Tank #3.
- **Impact:** Resolving this will save approximately **7,500 Liters/day**.

*Campus wide water usage is **85,240 L** with **8,200 L harvested rainwater** currently stored.*`;
  }

  if (query.includes('asset') || query.includes('underutil') || query.includes('lab') || query.includes('room') || query.includes('computer')) {
    return `### 🏢 Asset Utilization Analysis

**Underutilized Spaces Identified:**
- **Computer Lab 2 (CSE Block):**
  - **Utilization Rate:** **34%** (Average campus lab baseline: 76%)
  - **Peak Hours:** 10:00 AM – 1:00 PM (Idle all afternoons)
  - **Idle Energy Draw:** ~1.8 kW standby load (42 workstations + projector)
- **Recommendation:**
  1. Consolidate afternoon open lab hours into Computer Lab 1.
  2. Implement automated sleep timer on Lab 2 workstations.
  3. Reallocate Lab 2 for cross-departmental competitive coding workshops or evening certifications.`;
  }

  if (query.includes('air') || query.includes('aqi') || query.includes('pm2.5') || query.includes('pollution') || query.includes('co2')) {
    return `### 🍃 Air Quality & Atmospheric Index

**Current Campus AQI:** **72 (Moderate)**
- **PM2.5:** 28 µg/m³ · **PM10:** 46 µg/m³ · **CO₂:** 620 ppm

**Location Comparison:**
- **Cleanest:** Library Reading Hall (AQI 42 - Good, HEPA filtration active)
- **Moderate:** Engineering Block (AQI 68), Hostels (AQI 65)
- **Worst Area:** **Parking Area (AQI 98)** & **Main Gate (AQI 84)**
  - *Cause:* Delivery vehicle drop-offs & parent pickups idling during 4:00 PM – 5:30 PM.
  - *Recommendation:* Enforce strict 2-minute "No Idle Zone" signage at security checkpoints.`;
  }

  if (query.includes('waste') || query.includes('recycle') || query.includes('plastic') || query.includes('organic')) {
    return `### ♻️ Waste & Diversion Metrics
- **Total Waste Generated:** 320 kg (↓ 12.1% vs last month)
- **Recycling Rate:** **56.2%** (Current Target: 70.0%)
- **Stream Breakdown:**
  - Recycled: 180 kg
  - Organic Compost: 70 kg
  - Plastic: 40 kg
  - Paper: 20 kg
  - E-Waste: 10 kg
- **AI Recommendation:** Increasing clean paper recycling segregation across Administrative & Faculty wings by 10% will divert ~**120 kg** of waste from landfills monthly.`;
  }

  if (query.includes('summary') || query.includes('overview') || query.includes('status') || query.includes('score')) {
    return `### 📊 Campus Sustainability Executive Briefing

**Campus Sustainability Score: 78 / 100 (Good Progress, +6 pts)**

1. **Energy (Score: 82%):** 12,450 kWh consumed (down 8.4%). 26% powered by solar panels.
2. **Water (Score: 74%):** 85,240 L consumed; **Hostel Block** flagged for 27% excess flow requiring maintenance inspection.
3. **Waste (Score: 81%):** 56.2% diversion rate. Organic compost facility operating at 92% efficiency.
4. **Air Quality (Score: 76%):** AQI 72. Indoor air quality remains well within WHO guidance.
5. **Asset Efficiency (Score: 79%):** 78% overall utilization. Computer Lab 2 identified for space consolidation.

**Priority Action for Today:** Dispatch plumbing maintenance to Hostel Block Tank #3 to eliminate leakage.`;
  }

  return `### 💡 CampusIQ AI Insights

Thank you for your question. Here is the relevant campus operational intelligence from **CampusIQ**:
- **Campus Sustainability Score:** **78 / 100** (Trending +6% improvement)
- **Energy Optimization:** Engineering Block HVAC schedule adjustment can yield **420 kWh/month**.
- **Water Vigilance:** Active leak detection alert on Hostel Block (27% flow spike).
- **Resource Diversion:** 56.2% recycling rate on track toward the 70% annual objective.

You can ask me specific questions like:
- *"Which building consumes the most energy?"*
- *"Why did water consumption increase in the hostel?"*
- *"Which assets are underutilized?"*
- *"How can we reduce electricity costs?"*`;
}

// Vite middleware in dev or static files in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`CampusIQ Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
