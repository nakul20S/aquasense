# AquaSense
### Intelligent Aquaculture Water Quality Monitoring & Automated Management System

> Real-time IoT monitoring · Closed-loop automation · Predictive alerts · Built for Indian aquaculture farmers

🌐 **Live Demo:** [aquasense-blond.vercel.app](https://aquasense-blond.vercel.app)

---

## The Problem

Small and medium-scale aquaculture farmers in India rely on manual water sampling and delayed lab analysis. This reactive approach means critical fluctuations in dissolved oxygen, pH, and temperature go undetected — causing fish mortality, reduced yields, and significant economic loss.

| Pain Point | Impact |
|---|---|
| No real-time water quality data | Farmers cannot respond to changing pond conditions in time |
| Unstable DO, pH, temperature | Fish and shrimp stress, mortality, crop failure |
| Continuous uncontrolled aeration | High electricity cost, damaged pond ecology |
| Uncontrolled feeding schedules | Feed wastage, increased operational cost |

---

## The Solution

AquaSense is an IoT-based aquaculture management platform that provides **real-time monitoring, predictive alerts, and automatic control** to maintain ideal pond conditions — designed specifically for Indian small and medium-scale farmers.

```
Pond Sensors (ESP32)
       ↓  WiFi / HTTP
Web Dashboard (Vite + Tailwind)
       ↓
Real-time Analytics + Alerts
       ↓
Automated Actuator Control (Aerators, Feeders)
```

---

## Features

- **Real-time monitoring** — tracks dissolved oxygen, pH, temperature, salinity, and ORP continuously
- **Automated control** — aerators and feeders switch on/off based on actual pond conditions (closed-loop)
- **Predictive alerts** — anticipates critical fluctuations before they cause loss
- **Remote dashboard** — web-based interface for monitoring, historical trends, and instant alerts
- **Sustainable farming** — reduces electricity and feed wastage, supporting eco-friendly aquaculture
- **Cost-effective** — ~40% cheaper than current commercial IoT monitoring systems
- **Energy & feed savings** — cuts resource usage by ~30%

---

## System Architecture

```
┌─────────────────────────────────────┐
│           Sensor Layer              │
│  ESP32 + DO / pH / Temp / Salinity  │
│          / ORP sensors              │
└──────────────┬──────────────────────┘
               │ WiFi (HTTP/WebSocket)
┌──────────────▼──────────────────────┐
│         Web Platform                │
│  Vite · React · Tailwind CSS        │
│  Vercel deployment                  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Analytics & Control Layer      │
│  Real-time charts · Alert engine    │
│  Automated actuator commands        │
└─────────────────────────────────────┘
```

---

## Tech Stack

### Hardware
- **ESP32-S3** — microcontroller for sensor acquisition and WiFi transmission
- Water quality sensors — dissolved oxygen, pH, temperature, salinity, ORP

### Firmware
- **C++ (Arduino framework)** — sensor reading, data processing, HTTP transmission
- Located in `/AquaSense_ESP32/`

### Web Dashboard
- **Vite + React** — frontend framework
- **Tailwind CSS** — responsive UI styling
- **JavaScript** — real-time data handling and visualization
- **Vercel** — deployment and hosting

---

## Parameters Monitored

| Parameter | Symbol | Why It Matters |
|---|---|---|
| Dissolved Oxygen | DO | Critical for fish survival — drops below 4 mg/L cause mortality |
| pH | pH | Optimal range 6.5–9.0; extremes cause stress and disease |
| Temperature | T (°C) | Directly affects metabolism, disease resistance, and DO levels |
| Salinity | ppt | Affects osmoregulation in shrimp and brackish water species |
| Oxidation-Reduction Potential | ORP | Indicator of water oxidation state and overall pond health |

---

## Repository Structure

```
aquasense/
├── AquaSense_ESP32/          ← ESP32 firmware (C++)
│   ├── sensor_node/          ← Sensor reading and processing
│   └── communication/        ← WiFi and HTTP data transmission
│
├── src/                      ← Web dashboard source
│   ├── components/           ← React UI components
│   └── pages/                ← Dashboard pages
│
├── public/assets/            ← Static assets
├── index.html                ← Entry point
├── vite.config.js            ← Vite build config
├── tailwind.config.js        ← Tailwind CSS config
├── vercel.json               ← Deployment config
└── package.json              ← Dependencies
```

---

## How to Run

### Web Dashboard (local)
```bash
git clone https://github.com/nakul20S/aquasense.git
cd aquasense
npm install
npm run dev
```
Open `http://localhost:5173`

### ESP32 Firmware
1. Open `/AquaSense_ESP32/` in Arduino IDE or PlatformIO
2. Configure your WiFi credentials and server endpoint
3. Flash to ESP32-S3
4. Sensors begin transmitting data to the dashboard

---

## USP vs Existing Solutions

| Feature | AquaSense | Manual Testing | Expensive IoT Systems |
|---|---|---|---|
| Real-time monitoring | ✅ | ❌ | ✅ |
| Automated control | ✅ | ❌ | Partial |
| Predictive alerts | ✅ | ❌ | Limited |
| Cost | Low (~40% cheaper) | Very low | Very high |
| Indian farmer friendly | ✅ | ✅ | ❌ |
| Remote access | ✅ | ❌ | ✅ |

---

## Impact & Applications

- Small and medium-scale fish and shrimp farms (India's ~1.4 Cr aquaculture farmers)
- Water treatment and aquaculture research institutions
- Smart agriculture and precision farming initiatives
- Environmental water quality monitoring

---

## Future Roadmap

- [ ] TinyML deployment on ESP32 for on-device anomaly detection
- [ ] Automated feeding schedule optimization
- [ ] Multi-pond management dashboard

---

## Author

**Nakul S**
B.E. Electrical and Electronics Engineering — Sri Sairam Engineering College
IEEE PELS Student Branch Chairperson

> *"Smart. Sustainable. Scalable — AquaSense is redefining the future of aquaculture."*
