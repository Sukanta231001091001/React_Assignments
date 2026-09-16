const mockCities = {
  "london": {
    name: "London",
    country: "GB",
    temp: 18,
    humidity: 72,
    windSpeed: 4.6,
    condition: "scattered clouds",
    icon: "03d",
    sunrise: 1726462800,
    sunset: 1726509600
  },
  "tokyo": {
    name: "Tokyo",
    country: "JP",
    temp: 26,
    humidity: 65,
    windSpeed: 3.1,
    condition: "clear sky",
    icon: "01d",
    sunrise: 1726431600,
    sunset: 1726476600
  },
  "new york": {
    name: "New York",
    country: "US",
    temp: 22,
    humidity: 58,
    windSpeed: 5.2,
    condition: "few clouds",
    icon: "02d",
    sunrise: 1726483200,
    sunset: 1726528200
  },
  "paris": {
    name: "Paris",
    country: "FR",
    temp: 20,
    humidity: 68,
    windSpeed: 3.8,
    condition: "light rain",
    icon: "10d",
    sunrise: 1726464000,
    sunset: 1726510800
  },
  "sydney": {
    name: "Sydney",
    country: "AU",
    temp: 19,
    humidity: 55,
    windSpeed: 6.0,
    condition: "clear sky",
    icon: "01n",
    sunrise: 1726428000,
    sunset: 1726471200
  }
};

export async function fetchWeatherData(city) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const cleanCity = city.trim().toLowerCase();

  if (!cleanCity) {
    throw new Error("Please enter a city name to search.");
  }

  // If live key is provided and valid, fetch real API
  if (apiKey && apiKey !== "your_openweather_api_key_here") {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${city}" not found. Please check spelling.`);
        }
        if (response.status === 401) {
          throw new Error("Invalid API key configured in .env file.");
        }
        throw new Error("Weather service is temporarily unavailable.");
      }

      const data = await response.json();
      return {
        name: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        condition: data.weather[0].description,
        icon: data.weather[0].icon,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset
      };
    } catch (err) {
      if (err.message.includes("not found") || err.message.includes("API key")) {
        throw err;
      }
      // Fall through to mock dataset if network error
    }
  }

  // Fallback to mock dataset for instant demonstration
  if (mockCities[cleanCity]) {
    return mockCities[cleanCity];
  }

  // Generate dynamic mock result for unlisted cities if no key is present
  if (!apiKey || apiKey === "your_openweather_api_key_here") {
    return {
      name: city.charAt(0).toUpperCase() + city.slice(1),
      country: "GLOBAL",
      temp: Math.floor(Math.random() * 15) + 15,
      humidity: Math.floor(Math.random() * 30) + 50,
      windSpeed: Number((Math.random() * 5 + 2).toFixed(1)),
      condition: "few clouds",
      icon: "02d",
      sunrise: Math.floor(Date.now() / 1000) - 18000,
      sunset: Math.floor(Date.now() / 1000) + 18000
    };
  }

  throw new Error(`City "${city}" not found.`);
}
