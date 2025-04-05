import { useEffect, useState } from "react";
import "./reset.css";
import "./App.css";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

const API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY);
function App() {
  const [weatherData, setWeatherData] = useState();
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const getCurrentLocation = async () => {
    setCity("");
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      setLoading(true);
      const data = await getWeatherByCurrentLocation(lat, lon);
      setLoading(false);
      setWeatherData(data);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      setLoading(true);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return null;
    }
  };

  const getWeatherByCity = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Fail to fetch City Weather");
      const data = await response.json();
      setLoading(false);
      setWeatherData(data);
    } catch (error) {
      console.error("Error message", error);
      return null;
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    getWeatherByCity();
  }, [city]);

  return (
    <div className="container">
      {loading ? (
        <ClipLoader
          color="white"
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="loading"
        />
      ) : (
        <WeatherBox weatherData={weatherData} />
      )}
      <WeatherButton
        cities={cities}
        setCity={setCity}
        getCurrentLocation={getCurrentLocation}
        selectedCity={city}
      />
    </div>
  );
}

export default App;
