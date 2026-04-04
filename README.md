# Horizon

A weather analytics application built with React.js, providing real-time weather data, historical analysis, and interactive visualizations powered by the Open-Meteo API and Highcharts.

> Recommended: open the web app in **Google Chrome** for the best compatibility and experience.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React.js-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)
[![Vercel](https://img.shields.io/badge/Vercel-Portfolio-000000?logo=vercel&logoColor=white)](https://yalok.vercel.app)

## Overview

Horizon is a weather intelligence platform that delivers comprehensive weather analytics with a focus on data visualization and user experience. The application provides real-time weather conditions, hourly forecasts, and historical trend analysis with fully interactive, mobile-responsive charts.

**Key Highlights:**

- Real-time weather data from Open-Meteo API
- Automatic browser geolocation
- Premium light and dark theme with gradient UI
- Interactive Highcharts visualizations
- Date picker modal for quick date selection
- Historical data analysis (up to 2 years)
- Mobile-optimized responsive design

## Features

### Page 1: Current Weather & Hourly Forecast

#### Individual Weather Variables

- **Temperature Metrics** ✅
    - Current Temperature
    - Minimum Temperature
    - Maximum Temperature
- **Atmospheric Conditions** ✅
    - Precipitation (mm)
    - Relative Humidity (%)
    - UV Index

- **Sun Cycle** ✅
    - Sunrise Time (IST)
    - Sunset Time (IST)

- **Wind & Air Pressure** ✅
    - Maximum Wind Speed (km/h)
    - Precipitation Probability (%)

- **Air Quality Metrics** ✅
    - Air Quality Index (AQI)
    - PM10 (µg/m³)
    - PM2.5 (µg/m³)
    - Carbon Monoxide (CO) (ppb)
    - Carbon Dioxide (CO₂) (ppm)
    - Nitrogen Dioxide (NO₂) (ppb)
    - Sulphur Dioxide (SO₂) (ppb)

#### Hourly Data Visualizations

Interactive Highcharts for 24-hour forecast ✅

- **Temperature Chart** ( toggleable °C/°F )
- **Relative Humidity Chart**
- **Precipitation Chart**
- **Visibility Chart**
- **Wind Speed Chart**
- **Air Pollutants Chart** ( PM10 & PM2.5 combined )

---

### Page 2: Historical Data Analysis

#### Date Range Selection

- Maximum 2-year historical data range
- Start and end date inputs with validation
- Default 30-day range on page load
- Available up to 60 years

#### Historical Charts

- **Temperature Trends** ✅
    - Mean, Maximum, and Minimum temperature (Spline chart)
    - Color-coded: Purple (Max), Green (Mean), Orange (Min)

- **Sun Cycle Analysis** ✅
    - Sunrise and Sunset times in IST (Spline chart)
    - Visual tracking of daylight duration changes

- **Precipitation Analysis** ✅
    - Daily total precipitation (Column chart)
    - Total accumulation for selected period

- **Wind Analysis** ✅
    - Maximum wind speed trends (Line chart)
    - Dominant wind direction distribution (Column chart)

- **Air Quality Trends** ✅
    - PM10 and PM2.5 particulate matter (Spline chart)
    - Historical air quality patterns

## Installation

### Clone the Repository

```bash
git clone https://github.com/alok-x0s1/horizon.git
cd horizon
```

### Install Dependencies

```bash
npm install
```

## Getting Started

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage Guide

### Initial Load

1. Grant location permission when prompted (allows automatic geolocation)
2. Current weather for your location loads automatically
3. Default date is today; historical data loads for the past 30 days

### Location Permission Warning (when location is blocked)

- If you see a warning toast that user denied location access, click the icon (site info icon) on the left side of the browser location bar.
- Select site settings → Location → Allow for this site.
- Reload the window after enabling location access.

### Page 1: Current Weather

#### Viewing Weather Data

1. All individual weather variables display as organized metric cards
2. Temperature, humidity, precipitation, and air quality metrics visible at a glance

#### Using the Date Picker

1. Click the **"Current Date"** button in the header
2. Calendar modal opens with today highlighted
3. Modal auto-closes, page updates with selected date's weather

#### Temperature Unit Toggle

1. Click the **"°C/°F"** button to switch between Celsius and Fahrenheit
2. All temperature values update instantly across all metrics and charts

#### Hourly Forecast

1. Scroll down to view 6 interactive hourly forecast charts
2. Each chart shows 24-hour data for the selected date
3. All charts include zoom and horizontal scrolling capabilities

### Page 2: Historical Data

#### Selecting Date Range

1. Click the **"Historical"** tab in navigation
2. Enter start and end dates (max 2-year range)
3. Validation prevents:
    - End date before start date
    - Ranges exceeding 2 years
4. Click **"Load Data"** to fetch historical records

#### Analyzing Historical Trends

1. **Temperature Chart**: Visualize mean, max, and min temperature trends
2. **Sun Cycle Chart**: Track sunrise/sunset changes over time
3. **Precipitation Chart**: Identify rainy periods
4. **Wind Charts**: Analyze wind speed and direction patterns
5. **Air Quality Chart**: Monitor PM10 and PM2.5 trends

#### Temperature Unit Toggle

Click the **"°F"** button to switch units for historical data

## Interactive Charts Guide

### Zoom Functionality

#### How to Zoom In

1. **Click and drag** across the chart area to select a time range
2. The selected area becomes highlighted
3. Release to zoom into the selected period
4. Chart displays only the zoomed timeframe with expanded detail

#### How to Zoom Out

1. Click on **Zoom out** in top right corner of graph to reset to original view
2. Full date range displays again

### Horizontal Scrolling

#### Scroll with Keyboard + Mouse

1. Zoom and Hold **Shift key** on your keyboard
2. **Move left/right** with your mouse
3. Chart pans horizontally left and right
4. Allows viewing dense datasets on smaller screens

## Contributing

Contributions are welcome, To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

Please ensure your code:

- Follows the existing code style
- Includes proper TypeScript types
- Has responsive mobile design
- Maintains performance targets

[![GitHub](https://img.shields.io/badge/GitHub-Alok%20Yadav-181717?logo=github)](https://github.com/alok-x0s1)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Alok%20Yadav-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/alok-x0s1)
[![LinkedIn](https://img.shields.io/badge/Instagram-Alok%20Yadav-E4405F?logo=instagram&logoColor=white)](https://instagram.com/9.pnpm)

**Horizon** - _Weather Intelligence Redefined_ 🌤️
