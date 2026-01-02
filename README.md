# DrainSmart

DrainSmart is a civic-technology platform designed to **map, analyze, and visualize urban water-logging risks** across Delhi using **GIS-based visualization and data-driven assessment**.

The platform aims to support **proactive municipal planning** and improve **citizen safety during monsoon seasons** through ward-level insights, analytics dashboards, and emergency information.

---

## Problem Statement

Delhi faces severe water-logging every monsoon due to uneven rainfall distribution, inadequate drainage capacity, and rapid urbanization.

Current water-logging management practices are largely **reactive**, relying on post-incident complaints rather than preventive planning. There is no unified, ward-level system that integrates rainfall, drainage, and infrastructure indicators to identify high-risk areas in advance.

This results in traffic disruptions, infrastructure damage, public health risks, and inefficient allocation of municipal resources.

---

## Solution

DrainSmart provides a **GIS-enabled decision-support platform** that:

- Identifies ward-wise water-logging risk zones  
- Visualizes hotspots using interactive, map-based interfaces  
- Analyzes rainfall and infrastructure indicators to assess risk levels  
- Supports proactive planning for municipal authorities  
- Improves public awareness through a citizen-friendly portal  

The platform shifts water-logging management from **reactive response to preventive governance**.

---

## Key Features

- Ward-level water-logging risk visualization  
- Color-coded risk classification (Low / Medium / High)  
- Interactive ward-based risk display  
- Analytics dashboard highlighting vulnerable wards  
- Separate portals for municipal authorities and citizens  
- Emergency contacts accessible from the home dashboard  
- Light / Dark mode for accessibility and usability  

---

## Technology Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS**
- **React Context API**
- **Lucide Icons**
- UI-based GIS visualization

### Backend
- **Node.js**
- **Express.js**
- RESTful APIs for ward and risk data

### Database *(planned / in progress)*
- **PostgreSQL**
- **PostGIS** (for spatial and GIS data support)

### Analytics
- Rule-based and statistical risk assessment models  
- Advanced predictive analytics planned for future versions

---

## System Architecture (High-Level)

1. Collection of rainfall, ward boundary, and infrastructure datasets  
2. Backend processing and risk score computation  
3. REST APIs exposing ward-level risk and analytics data  
4. Frontend rendering dashboards and map-based visualizations  
5. Database layer planned for persistent storage and spatial queries  

---

## Data Sources

- India Meteorological Department (IMD) – rainfall data  
- Delhi Open Data Portal – ward boundaries and civic datasets  
- Municipal Corporation of Delhi (MCD) reports  
- OpenStreetMap – base mapping data  

*Note: Some datasets are currently mocked or simulated for prototype demonstration.*

---

## Project Status

DrainSmart is currently in a **functional prototype stage**.

- Frontend UI and workflows are implemented  
- Backend APIs are implemented  
- Database integration and persistent storage are under development  
- Authentication and analytics data are partially mocked for demonstration  

---

## Future Scope

- Database-backed GIS queries and spatial analytics  
- Integration with real-time rainfall APIs and sensors  
- Advanced GIS layers (drainage networks, elevation models)  
- Machine-learning-based flood risk prediction  
- Mobile alerts for citizens in high-risk wards  
- Integration with municipal emergency response systems  

---

## Team

**Debug Thugs**  
Hack4Delhi 2025

---

## License

This project is developed as part of a hackathon and academic initiative.  
All data sources referenced are publicly available.

© 2025 DrainSmart
