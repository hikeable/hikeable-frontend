import Head from "next/head";
import Trail from "../global";
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

  // data?.forecast.unshift(data.forecast[0]);

  // console.log(data);

  const customStyles = {
    fontFamily: "Helvetica, sans-serif",
    gradientStart: "#0181C2",
    gradientMid: "#04A7F9",
    gradientEnd: "#4BC4F7",
    locationFontColor: "#FFF",
    todayTempFontColor: "#FFF",
    todayDateFontColor: "#B5DEF4",
    todayRangeFontColor: "#B5DEF4",
    todayDescFontColor: "#B5DEF4",
    todayInfoFontColor: "#B5DEF4",
    todayIconColor: "#FFF",
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
          locationLabel={`${name}`}
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast
        />
      </div>
    </>
  );
};
