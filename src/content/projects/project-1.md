---
title: 'Eldritch Forecast: A Cosmic Horror Weather App'
description: 'A vintage-styled weather app with Cosmic Horror flair.'
publishDate: 'Jun 02 2025'
seo:
  image:
    src: '/eldritch-forecast-preview.jpg'
    alt: 'App mobile interface showing different weather conditions, icons and dreary descriptions'
tags: ['the-odin-project', 'javascript', 'api', 'webpack', 'tailwindcss']
---

![Eldritch Forecast Interface Screenshot](/eldritch-forecast-preview.jpg)

> The oldest and strongest emotion of mankind is fear,
> and the oldest and strongest kind of fear is fear of the unknown.

<span class="block text-right">— H.P. Lovecraft</span>

## Project Overview

Eldritch Forecast is my solution for [Project Weather App](https://www.theodinproject.com/lessons/node-path-javascript-weather-app), which is part of the JavaScript Course by The Odin Project.

Core assignments for this project are the following:

- Provide a form for users to input a location and fetch real-time weather data from an external API.
- Write JavaScript functions to request weather data for a given location and process the returned JSON, extracting only the necessary information.
- Display the weather information on the webpage, including optional weather icons.
- Optional: Implement a loading indicator while fetching data.

I always try to throw in some extra challenges to push myself a bit further. I had the initial idea of implementing some dreary descriptions for the different possible weather conditions received from the Visual Crossing Weather API. Initially I was leaning into more of a gothic vibe for the phrases, but in the end I thought Cosmic Horror was a bit more related to the topic of weather.

In the end, I went with these two as stretch goals:

- Give the app a vintage gazette theme.
- Write JavaScript functions to display cosmic horror-infused descriptions for the fetched weather forecasts.

## Challenges & Solutions

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
  const apiKey = 'YOUR_API_KEY_HERE';
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
