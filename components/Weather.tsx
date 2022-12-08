import Head from "next/head";
import Trail from "../global";
import ReactWeather, { useVisualCrossing } from "react-open-weather";

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

  return (
    <>
      <div>
        <ReactWeather
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
