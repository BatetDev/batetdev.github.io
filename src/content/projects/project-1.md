---
title: 'Eldritch Forecast: A Cosmic Horror Weather App'
description: 'A vintage-styled weather application with Lovecraftian flair - my JavaScript final project for The Odin Project'
publishDate: 'Jan 02 2024'
seo:
  image:
    src: '/eldritch-forecast-preview.jpg'
    alt: 'App interface showing storm warning with horror description'
tags: ['the-odin-project', 'javascript', 'api', 'webpack', 'tailwindcss']
---

![Eldritch Forecast Interface Screenshot](/eldritch-forecast-preview.jpg)

_Built as the final JavaScript project for [The Odin Project](https://www.theodinproject.com/) curriculum_

## Project Overview

Eldritch Forecast transforms mundane weather data into cosmic horror revelations. What began as a standard weather app assignment evolved into a narrative experience that combines:

- Real-time weather data from Visual Crossing API
- Lovecraftian descriptions for each weather condition
- Vintage newspaper aesthetic with Tailwind CSS
- Modular JavaScript architecture with Webpack

## Technical Implementation

### Core Architecture

```bash
src/
├── js/
│   ├── index.js          # Main application logic
│   └── modules/
│       ├── api.js        # Weather data fetching
│       ├── displayWeather.js # DOM rendering
│       ├── doomDescriptions.js # Horror text generator
│       ├── loading.js    # Loading animation control
│       ├── mapIconName.js # Icon mapping system
│       └── processWeatherData.js # Data transformation
```

## Key Features

### API Integration

```bash
// processWeatherData.js
export function processWeatherData(data) {
  const current = data.currentConditions;
  return {
    location: data.resolvedAddress || 'Unnamable Location',
    temperature: current.temp.toFixed(1),
    conditions: current.conditions || 'Reality unravels',
    icon: current.icon || 'unknown',
    precipProb: current.precipprob ?? 0
  };
}
```

### API Integration

```bash
// api.js
export async function fetchWeather(location) {
  const apiKey = 'DR8R9TFNZJNM2LKEGT5JHB6FC';
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('The ancient ones block your request...');
  }
}
```

### Data Processing

```bash
// processWeatherData.js
export function processWeatherData(data) {
  const current = data.currentConditions;
  return {
    location: data.resolvedAddress || 'Unnamable Location',
    temperature: current.temp.toFixed(1),
    conditions: current.conditions || 'Reality unravels',
    icon: current.icon || 'unknown',
    precipProb: current.precipprob ?? 0
  };
}
```

### Eldritch Descriptions

```bash
// doomDescriptions.js
export const doomMap = {
  snow: "Snowflakes descend like teeth from heaven's maw...",
  rain: 'The storm weeps like a blind celestial eye...',
  fog: 'The fog gathers, not as mist, but as the breath of unseen watchers...',
  // ...20+ more weather conditions
};
```

## Design Elements

### Typography

- Headings: UnifrakturMaguntia (Google Fonts)

- Body Text: IM Fell English (Google Fonts)

### Visual Components

```bash
<!-- Weather card component -->
<div class="bg-vintage-pattern p-4 border-4 border-double border-zinc-950/90">
  <h2 class="text-4xl font-heading">{{location}}</h2>
  <div class="flex justify-center my-4">
    <i data-lucide="{{weatherIcon}}" class="w-24 h-24 text-purple-950/90"></i>
  </div>
  <p class="text-2xl">{{temperature}}°C</p>
  <p class="italic bg-zinc-950/95 text-white p-4">
    {{doomDescription}}
  </p>
</div>
```

## Challenges & Solutions

Icon Mapping

Problem: Visual Crossing API uses different icon names than Lucide

Solution: Created a mapping system in mapIconName.js

Loading States

Problem: API calls sometimes too fast for good UX

Solution: Implemented minimum 750ms loading animation

Mobile Responsiveness

Problem: Vintage design elements breaking on small screens

Solution: Tailwind's responsive prefixes (e.g., md:border-6)

## What I learned

Through this Odin Project assignment, I:

- Solidified async/await patterns for API calls

- Practiced modular JavaScript architecture

- Mastered Tailwind CSS for rapid styling

- Implemented Webpack for modern bundling

- Learned the importance of loading states

- Gained experience with SVG manipulation

## Project Structure

```bash
top-project-weather-app/
├── webpack.config.js    # Build configuration
├── src/
│   ├── template.html    # Main HTML structure
│   ├── assets/          # Images and SVG
│   ├── js/              # All JavaScript modules
│   └── styles/          # Tailwind CSS files
├── docs/                # Project documentation
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
└── README.md           # Project overview
```

## Try It Yourself

Live Demo
GitHub Repository

## Local Development

To run locally:

```bash
git clone https://github.com/BatetDev/top-project-weather-app.git
cd top-project-weather-app
npm install
npm run dev
```

> The oldest and strongest emotion of mankind is fear,
> and the oldest and strongest kind of fear is fear of the unknown.

<span class="block text-right italic">— H.P. Lovecraft</span>
