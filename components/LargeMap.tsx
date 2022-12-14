import { MapContainer, Marker, TileLayer, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "../styles/mapview.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import L from "leaflet";

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

const LargeMap = ({
  lat,
  lon,
  trailID,
  currentPosition,
  findMe,
  setFindMe,
}) => {
  const [messageData, setMessageData] = useState<MessageDataObject[]>([]);
  const latNumber = parseFloat(lat);
  const lonNumber = parseFloat(lon);
  const currentPositionLatLng = {
    lat: currentPosition["coordinates"]["latitude"],
    lon: currentPosition["coordinates"]["longitude"],
  };
  const leafletIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
    popupAnchor: [2, -40],
  });

  const fetchMessageData = async () => {
    const fetchedMessageData = await axios.get(
      `https://hikeable-backend.herokuapp.com/api/trails/${trailID}/messages`
    );
    setMessageData(fetchedMessageData.data);
  };

  const FlyToButton = ({ latlng }) => {
    const map = useMap(); // available when component nested inside MapContainer
    const fly = () => {
      map.flyTo(latlng, 14, { duration: 2 });
    };
    return <button onClick={fly}>Test</button>;
  };

  function LocationMarker() {
    const [position, setPosition] = useState<null | any>(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  

  useEffect(() => {
    fetchMessageData();
  }, []);

  // useEffect(() => {
  //   if (findMe) LocationMarker();
  //   setFindMe(false);
  // }, [findMe]);

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
          url={`https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=${process.env.NEXT_PUBLIC_MAP_API}`}
        />
        {messageData.map((message) => {
          const messageLatNumber = parseFloat(message.latitude);
          const messageLonNumber = parseFloat(message.longitude);
          return (
            <Marker
              key={message.id}
              position={[messageLatNumber, messageLonNumber]}
              icon={leafletIcon}
            >
              <Popup>{message.message}</Popup>
            </Marker>
          );
        })}
        <LocationMarker />
      </MapContainer>
    </>
  );
};

export default LargeMap;
