import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";
import styles from "../styles/mapview.module.css";
import MessageIcon from "./MessageIcon";
import { TLargeMap } from "../global";

type MessageDataObject = {
  id: number;
  user: number;
  trail_id: number;
  latitude: string;
  longitude: string;
  message: string;
  date: string;
};

const LargeMap = ({
  lat,
  lon,
  trailID,
  isSubmitted,
  setIsSubmitted,
  currentPosition,
  setCurrentPosition,
  setMessageDetails,
}: TLargeMap) => {
  let latNumber = 0;
  if (lat !== null) latNumber = parseFloat(lat);

  let lonNumber = 0;
  if (lon !== null) lonNumber = parseFloat(lon);

  const [messageData, setMessageData] = useState<MessageDataObject[]>([]);
  const messageIcon = L.icon({
    iconUrl: "/messageMarker.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    shadowUrl: "/markerShadow.png",
    popupAnchor: [2, -40],
  });
  const locationIcon = L.icon({
    iconUrl: "/locationMarker.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    shadowUrl: "/markerShadow.png",
    popupAnchor: [2, -40],
  });

  const fetchMessageData = async () => {
    const fetchedMessageData = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/${trailID}/messages`
    );
    if (!messageData) {
      setMessageData(fetchedMessageData.data);
    } else {
      setMessageData([...fetchedMessageData.data]);
    }
    setIsSubmitted(false);
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setCurrentPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return currentPosition === null ? null : (
      <Marker position={currentPosition} icon={locationIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  fetchMessageData();

  useEffect(() => {
    fetchMessageData();
  }, [isSubmitted]);

  return (
    <MapContainer
      className={styles.map__wrapper}
      center={[latNumber, lonNumber]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=${process.env.NEXT_PUBLIC_MAP_API}`}
      />
      {messageData.map((message) => {
        const messageLatNumber = parseFloat(message.latitude);
        const messageLonNumber = parseFloat(message.longitude);
        return (
          <Marker
            key={message.id}
            position={[messageLatNumber, messageLonNumber]}
            icon={messageIcon}
          >
            <Popup>
              {message.message}{" "}
              <MessageIcon
                message={message}
                setMessageDetails={setMessageDetails}
              />
            </Popup>
          </Marker>
        );
      })}
      <LocationMarker />
    </MapContainer>
  );
};

export default LargeMap;
