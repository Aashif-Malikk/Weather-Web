import "./App.css";
import { useEffect, useMemo, useState } from "react";

const weatherEmojiMap = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Smoke: "🌫️",
  Haze: "🌫️",
  Dust: "🌫️",
  Fog: "🌫️",
  Sand: "🌫️",
  Ash: "🌋",
  Squall: "💨",
  Tornado: "🌪️",
};

const weatherThemeMap = {
  Clear: {
    bgImage: "/Images/sunshine.jpg",
    appGradient: "linear-gradient(180deg, rgba(100, 160, 255, 0.45), rgba(16, 30, 82, 0.92))",
    frameGradient: "linear-gradient(145deg, #2f5aa8, #162f6e 70%)",
    panelGradient: "linear-gradient(180deg, rgba(39, 89, 179, 0.86), rgba(16, 35, 93, 0.92))",
    rightGradient: "linear-gradient(180deg, rgba(24, 63, 144, 0.92), rgba(10, 30, 84, 0.96))",
    cardGradient: "linear-gradient(135deg, rgba(55, 122, 255, 0.55), rgba(15, 47, 119, 0.72))",
    searchBg: "rgba(14, 30, 83, 0.72)",
  },
  Clouds: {
    bgImage: "/Images/cloudy-1.jpg",
    appGradient: "linear-gradient(180deg, rgba(71, 91, 130, 0.5), rgba(18, 28, 58, 0.95))",
    frameGradient: "linear-gradient(145deg, #36486f, #1a2747 70%)",
    panelGradient: "linear-gradient(180deg, rgba(52, 73, 119, 0.88), rgba(22, 35, 72, 0.95))",
    rightGradient: "linear-gradient(180deg, rgba(34, 52, 95, 0.95), rgba(14, 24, 52, 0.98))",
    cardGradient: "linear-gradient(135deg, rgba(83, 107, 170, 0.58), rgba(26, 41, 78, 0.75))",
    searchBg: "rgba(19, 30, 60, 0.72)",
  },
  Rain: {
    bgImage: "/Images/rainDrop-1.jpg",
    appGradient: "linear-gradient(180deg, rgba(58, 87, 140, 0.45), rgba(14, 23, 51, 0.94))",
    frameGradient: "linear-gradient(145deg, #203a77, #0f1d45 70%)",
    panelGradient: "linear-gradient(180deg, rgba(30, 58, 121, 0.88), rgba(9, 18, 48, 0.95))",
    rightGradient: "linear-gradient(180deg, rgba(18, 40, 99, 0.94), rgba(7, 16, 44, 0.98))",
    cardGradient: "linear-gradient(135deg, rgba(44, 85, 184, 0.62), rgba(14, 31, 78, 0.74))",
    searchBg: "rgba(10, 22, 58, 0.75)",
  },
  Drizzle: {
    bgImage: "/Images/rainDrop-1.jpg",
    appGradient: "linear-gradient(180deg, rgba(58, 87, 140, 0.45), rgba(14, 23, 51, 0.94))",
    frameGradient: "linear-gradient(145deg, #203a77, #0f1d45 70%)",
    panelGradient: "linear-gradient(180deg, rgba(30, 58, 121, 0.88), rgba(9, 18, 48, 0.95))",
    rightGradient: "linear-gradient(180deg, rgba(18, 40, 99, 0.94), rgba(7, 16, 44, 0.98))",
    cardGradient: "linear-gradient(135deg, rgba(44, 85, 184, 0.62), rgba(14, 31, 78, 0.74))",
    searchBg: "rgba(10, 22, 58, 0.75)",
  },
  Thunderstorm: {
    bgImage: "/Images/rainDrop-1.jpg",
    appGradient: "linear-gradient(180deg, rgba(50, 71, 110, 0.52), rgba(9, 13, 33, 0.96))",
    frameGradient: "linear-gradient(145deg, #1b2851, #0a1028 70%)",
    panelGradient: "linear-gradient(180deg, rgba(35, 46, 89, 0.9), rgba(11, 16, 39, 0.95))",
    rightGradient: "linear-gradient(180deg, rgba(21, 28, 59, 0.95), rgba(8, 12, 29, 0.99))",
    cardGradient: "linear-gradient(135deg, rgba(52, 74, 133, 0.58), rgba(16, 22, 46, 0.8))",
    searchBg: "rgba(12, 17, 40, 0.8)",
  },
  Mist: {
    bgImage: "/Images/mist.webp",
    appGradient: "linear-gradient(180deg, rgba(79, 95, 117, 0.52), rgba(25, 30, 45, 0.95))",
    frameGradient: "linear-gradient(145deg, #4e5d74, #273140 70%)",
    panelGradient: "linear-gradient(180deg, rgba(70, 83, 105, 0.89), rgba(34, 42, 59, 0.95))",
    rightGradient: "linear-gradient(180deg, rgba(54, 63, 83, 0.95), rgba(26, 31, 44, 0.98))",
    cardGradient: "linear-gradient(135deg, rgba(98, 112, 138, 0.58), rgba(44, 52, 72, 0.75))",
    searchBg: "rgba(31, 39, 57, 0.74)",
  },
  Smoke: {
    bgImage: "/Images/smoke.jpg",
    appGradient: "linear-gradient(180deg, rgba(91, 88, 95, 0.5), rgba(34, 29, 38, 0.95))",
    frameGradient: "linear-gradient(145deg, #5b5662, #2d2932 70%)",
    panelGradient: "linear-gradient(180deg, rgba(95, 87, 102, 0.86), rgba(45, 39, 52, 0.95))",
    rightGradient: "linear-gradient(180deg, rgba(76, 66, 86, 0.92), rgba(34, 30, 40, 0.98))",
    cardGradient: "linear-gradient(135deg, rgba(116, 105, 127, 0.58), rgba(57, 50, 67, 0.75))",
    searchBg: "rgba(47, 41, 56, 0.75)",
  },
  Haze: {
    bgImage: "/Images/haze-2.webp",
    appGradient: "linear-gradient(180deg, rgba(95, 88, 104, 0.5), rgba(35, 28, 42, 0.95))",
    frameGradient: "linear-gradient(145deg, #61576e, #312939 70%)",
    panelGradient: "linear-gradient(180deg, rgba(103, 90, 112, 0.86), rgba(51, 40, 58, 0.95))",
    rightGradient: "linear-gradient(180deg, rgba(78, 65, 86, 0.92), rgba(37, 31, 43, 0.98))",
    cardGradient: "linear-gradient(135deg, rgba(125, 111, 138, 0.56), rgba(64, 54, 73, 0.75))",
    searchBg: "rgba(51, 43, 60, 0.75)",
  },
  default: {
    bgImage: "/Images/cloudy-1.jpg",
    appGradient: "linear-gradient(180deg, rgba(71, 91, 130, 0.5), rgba(18, 28, 58, 0.95))",
    frameGradient: "linear-gradient(145deg, #36486f, #1a2747 70%)",
    panelGradient: "linear-gradient(180deg, rgba(52, 73, 119, 0.88), rgba(22, 35, 72, 0.95))",
    rightGradient: "linear-gradient(180deg, rgba(34, 52, 95, 0.95), rgba(14, 24, 52, 0.98))",
    cardGradient: "linear-gradient(135deg, rgba(83, 107, 170, 0.58), rgba(26, 41, 78, 0.75))",
    searchBg: "rgba(19, 30, 60, 0.72)",
  },
};

const toCelsius = (kelvin) => Math.round(kelvin - 273.15);
const targetHour = 12;

const getDayLabel = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });

const buildWeatherUiData = (apiData) => {
  const entries = apiData?.list ?? [];
  // console.log(entries);

  if (!entries.length) {
    return {
      current: {
        temp: 0,
        condition: "",
        icon: "🌤️",
        date: "",
        weatherIconCode: "",
      },
      forecast: [],
      hourly: [],
      metrics: [],
    };
  }

  const currentEntry = entries[0];
  const currentCondition = currentEntry.weather?.[0]?.main ?? "";


  const bestByDate = new Map();

  entries.forEach((entry) => {
    const [date, time] = entry.dt_txt.split(" ");
    const hour = Number(time.split(":")[0]);

    const existing = bestByDate.get(date);

    // If no entry exists yet OR this one is closer to targetHour
    if (
      !existing ||
      Math.abs(hour - targetHour) <
      Math.abs(Number(existing.dt_txt.split(" ")[1].split(":")[0]) - targetHour)
    ) {
      bestByDate.set(date, entry);
    }
  });

  const orderedDays = [...bestByDate.entries()].sort((a, b) => {
    return new Date(a[0]).getTime() - new Date(b[0]).getTime();
  });

  const currentDatePart = currentEntry.dt_txt.split(" ")[0];
  const forecast = orderedDays
    .filter(([date]) => date !== currentDatePart)
    .slice(0, 4)
    .map(([, entry]) => {
      const condition = entry.weather?.[0]?.main ?? "";
      const iconCode = entry.weather?.[0]?.icon ?? "";

      return {
        day: getDayLabel(entry.dt_txt),
        temp: toCelsius(entry.main.temp),
        condition,
        icon: weatherEmojiMap[condition] ?? "🌤️",
        weatherIconCode: iconCode,
      };
    });

  const hourly = entries.slice(0, 5).map((entry, index) => {
    const condition = entry.weather?.[0]?.main ?? "";
    const [, timePart] = entry.dt_txt.split(" ");

    return {
      time: index === 0 ? "Now" : timePart.slice(0, 5),
      temp: `${toCelsius(entry.main.temp)}°`,
      icon: weatherEmojiMap[condition] ?? "🌤️",
    };
  });

  const metrics = [
    {
      temp: `${currentEntry.visibility ?? "--"} m`,
      icon: "👁️",
      city: "Visibility",
    },
    {
      temp:
        currentEntry.main?.feels_like !== undefined
          ? `${toCelsius(currentEntry.main.feels_like)}°`
          : "--",
      icon: "🌡️",
      city: "Feels Like",
    },
    {
      temp:
        currentEntry.wind?.speed !== undefined
          ? `${currentEntry.wind.speed} m/s`
          : "--",
      icon: "💨",
      city: "Wind Speed",
    },
    {
      temp:
        currentEntry.main?.humidity !== undefined
          ? `${currentEntry.main.humidity}%`
          : "--",
      icon: "💧",
      city: "Humidity",
    },
  ];

  return {
    current: {
      temp: toCelsius(currentEntry.main.temp),
      condition: currentCondition,
      icon: weatherEmojiMap[currentCondition] ?? "🌤️",
      date: currentEntry.dt_txt,
      weatherIconCode: currentEntry.weather?.[0]?.icon ?? "",
    },
    forecast,
    hourly,
    metrics,
  };
};

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cityInput, setCityInput] = useState("");

  const fetchWeather = async (cityName = "") => {
    try {
      setLoading(true);
      setError("");
      const query = cityName.trim() || "delhi";
      const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city_name: "London" }),
      });
      const data = await response.json();

      if (data.cod && String(data.cod) !== "200") {
        setError(data.message || "City not found.");
        return;
      }

      setWeatherData(data);
      if (cityName.trim()) {
        setCityInput("");
      }
    } catch (err) {
      setError("Unable to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const weatherUi = useMemo(() => buildWeatherUiData(weatherData), [weatherData]);
  const activeTheme = weatherThemeMap[weatherUi.current.condition] ?? weatherThemeMap.default;
  console.log(weatherUi.current.condition);
  
  const themeStyles = {
    "--app-bg-image": `url("${activeTheme.bgImage}")`,
    "--app-bg-gradient": activeTheme.appGradient,
    "--frame-gradient": activeTheme.frameGradient,
    "--panel-gradient": activeTheme.panelGradient,
    "--right-gradient": activeTheme.rightGradient,
    "--card-gradient": activeTheme.cardGradient,
    "--search-bg": activeTheme.searchBg,
  };


  const cityName = weatherData?.city?.name ?? "Loading...";
  const country = weatherData?.city?.country ?? "";
  const temperature = weatherUi.current.temp;
  const heroIcon = weatherUi.current.icon;
  const hourlyForecast = weatherUi.hourly;
  const nextForecast = weatherUi.forecast;
  const liveMetrics = weatherUi.metrics;
  // console.log(liveMetrics);


  const handleCitySearch = () => {
    if (!cityInput.trim()) return;
    fetchWeather(cityInput);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCitySearch();
    }
  };
  // console.log(weatherUi);
  // console.log(weatherData);



  return (
    <main className="app-shell" style={themeStyles}>
      <section className="desktop-layout">
        <div className="desktop-frame">

          <div className="dashboard-grid">
            <aside className="left-panel">
              <h2>
                {cityName}
                {country ? `, ${country}` : ""}
              </h2>
              <p className="big-temp">{temperature !== undefined ? `${temperature}°` : "--"}</p>
              <div className="hero-icon">{heroIcon}</div>
              <div className="mini-forecast">
                <div className="tabs">
                  <button className="active" type="button">
                    Hourly Forecast
                  </button>
                  <button type="button">Weekly Forecast</button>
                </div>
                <div className="mini-list">
                  {hourlyForecast.map((item) => (
                    <article key={`left-${item.time}`} className="hour-card">
                      <p>{item.time}</p>
                      <span>{item.icon}</span>
                      <p>{item.temp}</p>
                    </article>
                  ))}
                </div>
              </div>
            </aside>

            <section className="center-panel">
              <h3>Forecast Report</h3>
              <h4>Today</h4>
              <div className="hourly-row">
                {hourlyForecast.map((item) => (
                  <article key={item.time} className="hour-card">
                    <p>{item.time}</p>
                    <span>{item.icon}</span>
                    <p>{item.temp}</p>
                  </article>
                ))}
              </div>

              <h4>Next Forecast</h4>
              <div className="next-list">
                {nextForecast.map((item) => (
                  <article key={item.day} className="next-item">
                    <div>
                      <p className="day">{item.day}</p>
                      <p className="date">{item.condition}</p>
                    </div>
                    <p className="next-temp">{item.temp}°</p>
                    <span className="next-icon">{item.icon}</span>
                  </article>
                ))}
              </div>
            </section>

            <aside className="right-panel">
              <h3>Live Weather Data</h3>
              <p className="description">
                All values below are mapped from your backend response object.
              </p>
              <div className="top-search compact">
                <input
                  type="text"
                  placeholder={loading ? "Fetching..." : "Search city"}
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
                <button className="search_button" type="button" onClick={handleCitySearch}>
                  Search
                </button>
              </div>
              <div className="location-grid">
                {liveMetrics.map((place) => (
                  <article key={place.city} className="location-card">
                    <div className="location-head">
                      <p className="location-temp">{place.temp}</p>
                      <span>{place.icon}</span>
                    </div>
                    <p className="city">{place.city}</p>
                  </article>
                ))}
              </div>
              {error ? <p className="description">{error}</p> : null}
            </aside>
          </div>
        </div>
      </section>

      <section className="mobile-layout">
        <div className="mobile-search-wrap">
          <div className="top-search compact">
            <input
              type="text"
              placeholder={loading ? "Fetching..." : "Search city"}
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button className="search_button" type="button" onClick={handleCitySearch}>
              Search
            </button>
          </div>
          {error ? <p className="description">{error}</p> : null}
        </div>

        <article className="phone-panel weather-view">
          <h2>
            {cityName}
            {country ? `, ${country}` : ""}
          </h2>
          <p className="big-temp">{temperature !== undefined ? `${temperature}°` : "--"}</p>
          <div className="hero-icon">{heroIcon}</div>
          <div className="mini-forecast">
            <div className="tabs">
              <button className="active" type="button">
                Hourly Forecast
              </button>
              <button type="button">Weekly Forecast</button>
            </div>
            <div className="mini-list">
              {hourlyForecast.map((item) => (
                <article key={`mobile-left-${item.time}`} className="hour-card">
                  <p>{item.time}</p>
                  <span>{item.icon}</span>
                  <p>{item.temp}</p>
                </article>
              ))}
            </div>
          </div>
        </article>

        <article className="phone-panel report-view">
          <h3>Forecast Report</h3>
          <h4>Today</h4>
          <div className="hourly-row">
            {hourlyForecast.map((item) => (
              <article key={`mobile-${item.time}`} className="hour-card">
                <p>{item.time}</p>
                <span>{item.icon}</span>
                <p>{item.temp}</p>
              </article>
            ))}
          </div>
          <h4>Next Forecast</h4>
          <div className="next-list">
            {nextForecast.map((item) => (
              <article key={`mobile-${item.day}`} className="next-item">
                <div>
                  <p className="day">{item.day}</p>
                  <p className="date">{item.condition}</p>
                </div>
                <p className="next-temp">{item.temp}°</p>
                <span className="next-icon">{item.icon}</span>
              </article>
            ))}
          </div>
        </article>

        <article className="phone-panel location-view">
          <h3>Live Weather Data</h3>
          <p className="description">
            All values below are mapped from your backend response object.
          </p>
          <div className="location-grid">
            {liveMetrics.map((place) => (
              <article key={`mobile-${place.city}`} className="location-card">
                <div className="location-head">
                  <p className="location-temp">
                    {place.temp}
                  </p>
                  <span>{place.icon}</span>
                </div>
                <p className="city">{place.city}</p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;