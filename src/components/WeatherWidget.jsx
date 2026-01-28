import React, { useState, useEffect } from 'react';
import '../styles/WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;
  const CITY = 'Abelyan street, Ajapnyak';
  const COUNTRY = 'AM';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetch current weather
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric`
        );

        if (!currentRes.ok) throw new Error('Weather data not available');

        const currentData = await currentRes.json();
        setWeather(currentData);

        // Fetch 5-day forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric`
        );

        if (forecastRes.ok) {
          const forecastData = await forecastRes.json();
          // Get one forecast per day (noon time)
          const dailyForecast = forecastData.list
            .filter(item => item.dt_txt.includes('12:00:00'))
            .slice(0, 4);
          setForecast(dailyForecast);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [API_KEY]);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="weather-widget">
        <div className="weather-loading">
          <div className="weather-loading-spinner"></div>
          <span>Loading weather...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget">
        <div className="weather-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          <span>Weather unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      {/* Current Weather Card */}
      <div className="weather-current">
        <div className="weather-header">
          <div className="weather-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{weather.name}</span>
          </div>
          <span className="weather-time">{formatTime(weather.dt)}</span>
        </div>

        <div className="weather-main">
          <img
            src={getWeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="weather-icon-large"
          />
          <div className="weather-temp-container">
            <span className="weather-temp">{Math.round(weather.main.temp)}</span>
            <span className="weather-unit">°C</span>
          </div>
        </div>

        <p className="weather-description">{weather.weather[0].description}</p>

        <div className="weather-details">
          <div className="weather-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              <circle cx="12" cy="12" r="4"/>
            </svg>
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{Math.round(weather.main.feels_like)}°</span>
          </div>
          <div className="weather-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.main.humidity}%</span>
          </div>
          <div className="weather-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
            </svg>
            <span className="detail-label">Wind</span>
            <span className="detail-value">{Math.round(weather.wind.speed)} m/s</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      {forecast.length > 0 && (
        <div className="weather-forecast">
          <h4 className="forecast-title">Forecast</h4>
          <div className="forecast-list">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-item">
                <span className="forecast-day">{formatDay(day.dt)}</span>
                <img
                  src={getWeatherIcon(day.weather[0].icon)}
                  alt={day.weather[0].description}
                  className="forecast-icon"
                />
                <span className="forecast-temp">{Math.round(day.main.temp)}°</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attribution */}
      <div className="weather-attribution">
        <span>Powered by OpenWeather</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
