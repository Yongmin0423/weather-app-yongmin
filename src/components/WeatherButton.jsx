import styles from "./WeatherButton.module.css";

function WeatherButton() {
  return (
    <div className={styles.container}>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
    </div>
  );
}

export default WeatherButton;
