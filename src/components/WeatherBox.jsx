import styles from "./WeatherBox.module.css";

function WeatherBox({ weatherData }) {
  if (!weatherData) {
    return <div>Loading...</div>;
  }
  const {
    name,
    main: { humidity, temp },
    wind: { speed },
    weather,
  } = weatherData;
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <h3>Current Temperature: {temp}°C </h3>
      <p>Current Weather: {weather[0].main}</p>
      <p>humidity: {humidity} </p>
      <p>Wind speed: {speed}/s</p>
    </div>
  );
}

export default WeatherBox;
