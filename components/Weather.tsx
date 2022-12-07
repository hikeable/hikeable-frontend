import Head from "next/head";
import { useEffect, useState } from "react";
import Trail from "../global";
import ReactWeather from "react-open-weather";
import axios from "axios";
import useSWR from "swr";

interface WeatherProps {
  lon: string;
  lat: string;
}

export const Weather = ({ lon, lat }: WeatherProps) => {
  const weatherApi = process.env.NEXT_PUBLIC_WEATHERAPI;
  async function fetcher(url: string) {
    const { data } = await axios.get(url);
    return data;
  }

  function getWeatherData() {
    const { data } = useSWR(
      `https://api.openweathermap.org/data/2.5/forecast?&lat=${lat}&lon=${lon}&APPID=${weatherApi}&units=metric`,
      fetcher
    );
    return data;
  }

  const weather = getWeatherData();

  // const { data, isLoading, errorMessage } = useOpenWeather({
  //   key: weatherApi,
  //   lon: "139.2437",
  //   lat: "35.6254",
  //   lang: "en",
  //   unit: "metric", // values are (metric, standard, imperial)
  // });

  return (
    <>
      <div>
        <ReactWeather
          data={weather}
          lang="en"
          locationLabel="Munich"
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        />
      </div>
    </>
  );
};
