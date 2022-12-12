import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "../styles/singletrail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";

interface TrailMapProps {
  lat: string;
  lon: string;
  trailID: number;
}

type MessageDataObject = {
  id: number;
  user: number;
  trail_id: number;
  latitude: string;
  longitude: string;
  message: string;
  likes: number;
  dislikes: number;
  date: string;
};

const TrailMap = ({ lat, lon, trailID }: TrailMapProps) => {
  const latNumber = parseFloat(lat);
  const lonNumber = parseFloat(lon);
  const [messageData, setMessageData] = useState<MessageDataObject[]>([]);
  const leafletIcon = L.icon({
    iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [12, -90],
  });
  const locateOptions = {
    position: "topright",
    strings: {
      title: "Show me where I am, yo!",
    },
    onActivate: () => {}, // callback before engine starts retrieving locations
  };

  const fetchMessageData = async () => {
    const fetchedMessageData = await axios.get(
      `https://hikeable-backend.herokuapp.com/api/trails/${trailID}/messages`
    );
    setMessageData(fetchedMessageData.data);
  };

  useEffect(() => {
    fetchMessageData();
  }, []);

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
        {messageData.map((message, index) => {
          const messageLatNumber = parseFloat(message.latitude);
          const messageLonNumber = parseFloat(message.longitude);
          return (
            <Marker
              key={index}
              icon={leafletIcon}
              position={[messageLatNumber, messageLonNumber]}
            >
              <Popup>{message.message}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default TrailMap;
