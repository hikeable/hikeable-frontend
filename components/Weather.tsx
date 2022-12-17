import React from "react";
import ReactWeather, { useVisualCrossing } from "react-open-weather";
import styles from "../styles/weather.module.css";

interface WeatherProps {
  name: string;
  lon: string;
  lat: string;
}

export const Weather = ({ lon, lat, name }: WeatherProps) => {
  const weatherApi = process.env.NEXT_PUBLIC_WEATHERAPI;

  const { data, isLoading, errorMessage } = useVisualCrossing({
    key: weatherApi,
    lon: lon,
    lat: lat,
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });

  const customStyles = {
    fontFamily: "Montserrat, sans-serif",
    gradientStart: "#FFF",
    gradientMid: "#FFF",
    gradientEnd: "#FFF",
    locationFontColor: "#777",
    todayTempFontColor: "#777",
    todayDateFontColor: "#777",
    todayRangeFontColor: "#777",
    todayDescFontColor: "#777",
    todayInfoFontColor: "#777",
    todayIconColor: "#4BC4F7",
    forecastBackgroundColor: "#FFF",
    forecastSeparatorColor: "#DDD",
    forecastDateColor: "#777",
    forecastDescColor: "#777",
    forecastRangeColor: "#777",
    forecastIconColor: "#4BC4F7",
  };

  return (
    <>
      <div className={styles.weather__wrapper}>
        <ReactWeather
          theme={customStyles}
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel="Today"
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast
        />
      </div>
    </>
  );
};
