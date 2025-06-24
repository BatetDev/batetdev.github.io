---
title: 'Eldritch Forecast: A Cosmic Horror Weather App'
description: 'A vintage-styled weather app with a touch of Cosmic Horror. Built with JavaScript, Tailwind CSS, and the Visual Crossing Weather API, it features async data fetching, custom icon mapping, and atmospheric horror-themed descriptions for each forecast.'
publishDate: 'Jun 03 2025'
seo:
  image:
    src: '/eldritch-forecast-preview.jpg'
    alt: 'App mobile interface showing different weather conditions, icons, and dreary descriptions'
tags: ['the-odin-project', 'javascript', 'api', 'webpack', 'tailwindcss']
---

![Eldritch Forecast Interface Screenshot](/eldritch-forecast-preview.jpg)

## Try It Yourself

<p align="center">
  <a href="https://batetdev.github.io/top-project-weather-app/" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/LIVE_DEMO-%F0%9F%8C%8D_Eldritch_Forecast-8A2BE2?style=for-the-badge&logo=vercel" alt="Live Demo">
  </a>
  <a href="https://github.com/BatetDev/top-project-weather-app" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/SOURCE_CODE-%F0%9F%93%81_GitHub-181717?style=for-the-badge&logo=github" alt="GitHub Repo">
  </a>
</p>

> The oldest and strongest emotion of mankind is fear,
> and the oldest and strongest kind of fear is fear of the unknown.

<span class="block text-right">— H.P. Lovecraft.</span>

## Project Overview

**Eldritch Forecast** is my take on The Odin Project's [Project Weather App](https://www.theodinproject.com/lessons/node-path-javascript-weather-app), where I tried to infuse a bit of a vintage Cosmic Horror vibe to weather forecasts while gaining experience with async JavaScript patterns.

### Core Assignments

The core assignments for this project are as follows:

- Provide a form for users to input a location and fetch real-time weather data from an external API.
- Write JavaScript functions to request weather data for a given location and process the returned JSON, extracting only the necessary information.
- Display the weather information on the webpage, including optional weather icons.
- **Optional:** Implement a loading indicator while fetching data.

To push myself further, I added two stretch goals:

1. Give the app a vintage gazette theme using Tailwind CSS.
2. Write JavaScript functions to display cosmic horror-infused descriptions for the fetched weather forecasts.

## Challenges & Solutions

### Form Handling and Data Flow

This assignment was relatively straightforward. We needed to add a form element with a text input, optionally a div to show custom error messages, and finally a submit button. The form, input, and error message div need to have an _id_ so we can select them easily in our JavaScript files.

```html
<form id="weather-form">
  <input type="text" id="location-input" placeholder="Enter city..." required />
  <button type="submit">Summon Weather</button>
</form>
<div id="error-message"></div>
```

<p align="center">
  <img src="/project-1-form.jpg" alt="Weather form screenshot">
</p>

_Figure: Weather form with error message_

```javascript
// index.js
const form = document.getElementById('weather-form');
const input = document.getElementById('location-input');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = input.value.trim();
  if (!location) return;

  // Clear previous errors
  const errorDiv = document.getElementById('error-message');
  if (errorDiv) {
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';
  }

  showLoading();

  try {
    const rawData = await fetchWeather(location);
    const weather = processWeatherData(rawData);
    displayWeather(weather);
  } catch (error) {
    console.error('Error fetching or processing weather:', error);
    if (errorDiv) {
      errorDiv.textContent = 'Failed to fetch weather data.';
      errorDiv.classList.remove('hidden');
    }
  } finally {
    hideLoading();
  }
});
```

### Key Responsibilities

1. Form Control

   - Prevents default page refresh (e.preventDefault())
   - Validates user input (checks for non-empty strings)

2. Data Flow

   - Shows/hides loading states
   - Fetches → Processes → Displays weather data

3. Error Management

   - Gracefully handles API failures
   - Displays user-friendly errors

4. Cleanup

   - Ensures loading indicators are removed (via finally block)

## Fetching Weather Data

Following the data flow, the first function we need to examine is fetchWeather, imported from api.js. It handles communication with the Visual Crossing Weather API:

```javascript
// modules/api.js
export async function fetchWeather(location) {
  const apiKey = 'YOUR_API_KEY_HERE'; // Never commit real keys!
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=${apiKey}&unitGroup=metric&iconSet=icons2`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Raw API Response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}
```

### Breaking It Down:

1. Async/Await

The async keyword tells JavaScript this function will handle asynchronous operations (like API calls). Inside, we use await to pause execution until the fetch() completes.

2. Building the API URL

- encodeURIComponent(location) safely encodes spaces/special characters (so "New York" becomes "New%20York").

- unitGroup=metric gives temperatures in Celsius (my preference).

- iconSet=icons2 selects icon set 2 of weather icons from the API.

3. The Fetch Process

- First await waits for the network request to finish.

- We check response.ok to catch HTTP errors (like 404s).

- Second await pauses until we convert the response to JSON.

4. What You Get Back

The function returns a promise that resolves to raw weather data like this:

```json
// Small sample, actual API response is 1000+ lines long
{
  "days": [
    {
      "datetime": "2025-05-15",
      "temp": 22.5,
      "conditions": "Partly cloudy",
      "humidity": 65
    }
  ],
  "address": "New York, NY",
  "timezone": "America/New_York"
}
```

Back on index.js, after fetchWeather resolves and its value is assigned to the rawData variable, we proceed to define a weather variable, which will hold the processed raw data:

```javascript
// index.js
const rawData = await fetchWeather(location);
const weather = processWeatherData(rawData);
```

We call processWeatherData for that, which is a simple module that just returns an object with pieces of information from the raw data response we are interested in.

```javascript
// modules/processWeatherData.js
export function processWeatherData(data) {
  const current = data.currentConditions;
  if (!current || typeof current !== 'object') {
    throw new Error('Invalid or missing current conditions in weather data');
  }

  return {
    location: data.resolvedAddress || 'Unknown Location',
    temperature: Number(current.temp?.toFixed(1) || 0),
    feelsLike: Number(current.feelslike?.toFixed(1) || 0),
    humidity: current.humidity || 0,
    windSpeed: Number(current.windspeed?.toFixed(1) || 0),
    conditions: current.conditions || 'Clear',
    icon: current.icon || 'cloud',
    precipAmount: current.precip !== null && current.precip !== undefined ? Number(current.precip.toFixed(1)) : null,
    precipProb: current.precipprob ?? 0,
  };
}
```

While the API returns 1000+ lines of data, I focused on core metrics for clarity, but the raw API response allows to expand with 7/14-day forecasts, hourly weather breakdowns, atmospheric details (UV, moon phase), and many more weather details.

A sample processed weather object will look like this:

```javascript
{
  "location": "Monaco",
  "temperature": 18.5,           // Current temp in °C (rounded to 1 decimal)
  "feelsLike": 16.2,             // Apparent temperature in °C
  "humidity": 65,                // Percentage (0-100)
  "windSpeed": 12.3,             // km/h (rounded to 1 decimal)
  "conditions": "Partly Cloudy", // Fallback to 'Clear' if undefined
  "icon": "partly-cloudy-night", // Fallback to 'cloud' if undefined
  "precipAmount": 1.3,           // Precipitation in mm (null if no rain)
  "precipProb": 15               // Chance of precipitation (0-100%)
}
```

With this, we complete the second core assignment and move on to the third:

- Display the weather information on the webpage, including optional weather icons.

For this, we just call displayWeather(weather), which basically injects into an output div in our index.html the needed HTML with the values extracted from the refined weather object we got from processWeatherData(data).

```html
output.innerHTML = `
<div>
  <h2>${weather.location}</h2>
  <!-- Rest of elements that form the weather card component... -->
</div>
`;
```

There are a few nuances in this otherwise straightforward process.

Initially, I didn't want to show the precipitation-related fields if there was zero chance of rain and no rain amount. Sometimes precipitation amount can be 0 while precipitation probabilities are above 0, as shown in the sample object above, so in the end, I decided to inject that data conditionally at the end of the rest of the fields. When the conditions are not met, we inject nothing—an empty string—and show here:

```javascript
let precipHTML = '';
if (weather.precipProb > 0 || weather.precipAmount > 0) {
  precipHTML = `
    <p><span>Precipitation:</span> ${weather.precipAmount} mm</p>
    <p><span>Chance of Rain:</span> ${weather.precipProb}%</p>
  `;
}
// After all the other injected HTML fields...
${precipHTML}
```

The second issue is related to the optional assignment of displaying the appropriate icons. Since I was already using Lucide Icons for this project, I decided to use them too for the weather card icons. The problem was that the Visual Crossing API response includes icon strings whose names do not match with Lucide Icons' names, so I had to map those strings to correlate with an existing Lucide Icon. For that, I created the mapIcon module, which takes in the weather.icon string and returns the corresponding Lucide icon name so we can use it in the data-lucide attribute, which is used by Lucide's createIcons function to render all icons based on that data-lucide string value.

```javascript
// modules/mapIconName.js
// Sample of the icon map, there are 30+ possible icons
export function mapIconName(iconString = 'clear-day') {
  const iconMap = {
    snow: 'snowflake',
    rain: 'cloud-rain',
    fog: 'cloud-fog',
    wind: 'wind',
    cloudy: 'cloudy',
    'partly-cloudy-day': 'cloud-sun',
    'partly-cloudy-night': 'cloud-moon',
    'clear-day': 'sun',
    'clear-night': 'moon',
    'scattered-showers': 'cloud-rain',
    'few-thunderstorms': 'cloud-lightning',
    unknown: 'circle-help',
  };

  return iconMap[iconString] || 'skull'; // Skull icon fall back
}
```

So using the sample weather object from before, we pass 'partly-cloudy-night' into mapIconName during the execution of displayWeather:

```javascript
const icon = mapIconName(weather.icon);
```

So for weather.icon ('partly-cloudy-night'), mapIconName returns the value for such key ('cloud-moon'), which is the name of one of the icons in the Lucide icon set that we can then use like this in displayWeather:

```javascript
// We declare const icon = mapIconName(weather.icon); before the string literal.
`
<!-- ...previous injected html... -->
<div>
  <i data-lucide="${icon}"></i>
</div>
<!-- ...rest of the string literal... -->
`;
```

Using a similar mapping method, I decided to make the app display a cosmic horror phrase related to the predominant weather in the fetched forecast. To keep it simple, I created a similar module to mapIconName that took the weather.icon string and mapped it to the corresponding dreary description.

Since we don't need any logic, doomDescription.js is just there to export the doomMap object. I could probably have made a similar thing with mapIconName, but decided to encapsulate it in a function instead in case further transformation or logic might be needed. For doomDescriptions, I knew it would probably just be a module for static lookup.

Following our example, for weather.icon string of 'partly-cloudy-night', we access doomMap object to get the value for our variable doomDescription, which we will use as an injected paragraph later on in the displayWeather process:

```javascript
// displayWeather.js (doomMap is imported at the top)
const doomDescription = doomMap[weather.icon] || doomMap['unknown'];
```

The lookup results in:

```javascript
// doomDescriptions.js
const doomMap = {
  'partly-cloudy-night': 'In the gaps of the cloud-veil, constellations shift like the pupils of a waking leviathan.',
  snow: "Snowflakes descend like teeth from heaven's maw...",
  fog: 'The fog gathers, not as mist, but as the breath of unseen watchers...',
  // ...20+ more weather conditions
};
```

The conditional display of precipitation data and the two mappings are the three notable challenges in displaying the weather information. Other than those, as mentioned earlier, it's quite a straightforward process.

With that, the only assignment that presented a challenge was the optional implementation of a loading component to display as the user waits for the data to be fetched.

### Loading Component

Fast API responses created a flickering loading state. My solution enforced a minimum display time to improve user experience:

```javascript
// modules/loading.js
const MIN_LOADING_TIME = 750; // Prevents flickering for fast API responses

export function hideLoading() {
  if (!isLoading) return;

  const loading = document.getElementById('loading');
  if (!loading) {
    isLoading = false;
    return;
  }

  loading.classList.remove('opacity-100');
  loading.classList.add('opacity-0');

  setTimeout(() => {
    loading.classList.add('hidden');
    isLoading = false;
  }, MIN_LOADING_TIME); // 750ms
}
```

That completes the more relevant parts of my solutions to the project's core assignments and my JS-related stretch goals.

### Final Core JS Architecture

```bash
src/
├── js/
│   ├── index.js          # Main application logic
│   └── modules/
│       ├── api.js        # Weather data fetching
│       ├── displayWeather.js # DOM rendering
│       ├── doomDescriptions.js # Horror text mapping
│       ├── loading.js    # Loading animation control
│       ├── mapIconName.js # Icon mapping
│       └── processWeatherData.js # Data transformation
```

## Design Elements

### Typography

For font families, I wanted something with a vintage feeling to go with the 1900s old gazette theme I had in mind, so I ended up picking these:

- Headings: UnifrakturMaguntia (Google Fonts)

- Body Text: IM Fell English (Google Fonts)

### Icons

As mentioned before, I used <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">Lucide Icons</a>, both for weather icons and also for the GitHub icon inside the footer.

### Header logo & favicon

The logo image was generated using a free AI tool, <a href="https://app.leonardo.ai/" target="_blank" rel="noopener noreferrer">LeonardoAI</a>, then converted into an SVG at <a href="https://www.svgcreator.com" target="_blank" rel="noopener noreferrer">svgcreator.com</a>.

### Container background pattern

I wanted to give the 'gazette" parts a bit of texture to better resemble old paper. For that, I used a pattern by <a href="https://heropatterns.com/" target="_blank" rel="noopener noreferrer">HeroPatterns</a>.

### Cosmic Horror descriptions

Those were also AI generated using <a href="https://chat.deepseek.com" target="_blank" rel="noopener noreferrer">DeepSeek</a> to save time since there is one for each of the 30+ possible main weather conditions.

## Final Thoughts

This project became a playground for:

- **Core Skills**: Async/await, API integration, error handling
- **UX Lessons**: Loading states, conditional UI, responsive feedback
- **Creative Problem-Solving**: Mapping third-party data to thematic elements

**What I'd Do Differently**:

1. **Dynamic Horror Text**: Generate variations from templates instead of static mappings
2. **Unit Toggle**: Implement metric/imperial conversion
3. **API Optimization**: Cache responses to reduce calls

While it’s not perfect, I’m happy with how it turned out and excited to build on these skills for future projects.
