# DrainSmart 

DrainSmart is a **civic-tech platform** designed to **map, visualize, and predict urban water-logging risks** across Delhi using **GIS-based visualization and data-driven risk analysis**.

The platform enables **proactive decision-making** for municipal authorities and improves **citizen awareness and safety** during monsoon seasons.

---

## Problem Statement

Delhi experiences severe water-logging during monsoons due to:
- Inadequate drainage planning
- Fragmented infrastructure data
- Lack of proactive, ward-level risk assessment

This results in traffic disruption, infrastructure damage, and public safety risks every year.

---

## Solution Overview

DrainSmart integrates **rainfall, drainage, and urban infrastructure data** to:

- Identify **ward-wise water-logging risk levels**
- Visualize **hotspots on interactive maps**
- Support **data-driven municipal planning**
- Provide **citizens with risk awareness and emergency information**

---

## Project Status

 **In Development (Hackathon Build)**

- Frontend UI & workflows implemented
- Backend APIs implemented
- Database schema & GIS integration in progress
- Authentication & data currently **mocked for demo purposes**

---

## Key Features

### Risk Visualization
- Ward-wise risk categorization (High / Medium / Low)
- Hotspot count per ward
- Interactive UI-based risk map

### Analytics Dashboard
- Most vulnerable wards
- Risk prioritization insights for authorities

### Citizen Portal
- Ward search & risk details
- Awareness-focused interface
- Mock sign-in / sign-up

### Admin Portal
- Secure access (mock authentication)
- Administrative monitoring interface

### Emergency Contacts
Always accessible emergency numbers:
- Delhi Disaster Helpline – **1077**
- Police – **112**
- Ambulance – **108**
- Fire Services – **101**

### Accessibility
- Light / Dark mode with persistent preference
- Responsive, mobile-friendly UI

---

## Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS**
- **Lucide Icons**
- **React Context API**
- JavaScript (ES6+)

### Backend
- **Node.js**
- **Express.js**
- RESTful APIs

### Database *(in progress)*
- **PostgreSQL**
- **PostGIS** (for spatial & GIS data)

### Analytics *(planned / optional)*
- **Python** (risk scoring, rainfall trend analysis)

---

### Risk Scoring Methodology (Planned)

Risk scores are computed using a weighted model:
Historical flooding frequency — 30%
Drainage infrastructure capacity — 25%
Rainfall intensity prediction — 25%
Population density & land use — 20%

### Target Region
Delhi (Ward-level granularity)

### Team
Debug Thugs – Hack4Delhi 2025

### ⚠️ Disclaimer
DrainSmart is a prototype created for demonstration and evaluation purposes.
Current data may be mocked or illustrative and should not be treated as official advisories.
