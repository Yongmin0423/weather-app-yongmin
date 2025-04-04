import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";

const API_KEY = "f77ce215b0bbf555422ae08fed7e3d47";
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const data = await getWeatherByCurrentLocation(lat, lon);
      setWeatherData(data);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="container">
      <WeatherBox weatherData={weatherData} />
      <WeatherButton />
    </div>
  );
}

export default App;
