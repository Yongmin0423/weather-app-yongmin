import styles from "./WeatherButton.module.css";

function WeatherButton({ cities, setCity, getCurrentLocation, selectedCity }) {
  return (
    <>
      <button
        className={selectedCity === "" ? styles.active : styles.cityBtn}
        onClick={getCurrentLocation}
      >
        Current Location
      </button>
      <div className={styles.container}>
        {cities.map((city, index) => (
          <button
            className={selectedCity === city ? styles.active : styles.cityBtn}
            key={`${index}-${city}`}
            onClick={() => setCity(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </>
  );
}

export default WeatherButton;
