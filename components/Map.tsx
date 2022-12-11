import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "../styles/singletrail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface MapProps {
  lat: string;
  lon: string;
  trailID: number;
}

type MessageDataObject = {
  user: number;
  trail_id: number;
  latitude: string;
  longitude: string;
  message: string;
  likes: number;
  dislikes: number;
  date: string;
};

const Map = ({ lat, lon, trailID }: MapProps) => {
  const latNumber = parseFloat(lat);
  const lonNumber = parseFloat(lon);
  const [messageData, setMessageData] = useState<MessageDataObject[]>([]);

  const fetchMessageData = async () => {
    const fetchedMessageData = await axios.get(
      `https://hikeable-backend.herokuapp.com/api/trails/${trailID}/messages`
    );
    setMessageData(fetchedMessageData.data);
  };

  useEffect(() => {
    fetchMessageData();
  }, []);

  // useEffect(() => {
  //   console.log(messageData);
  // }, [messageData]);

  return (
    <>
      <MapContainer
        className={style.map}
        center={[latNumber, lonNumber]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};

export default Map;
