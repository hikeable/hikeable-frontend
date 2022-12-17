import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "../styles/singletrail.module.css";
import L from "leaflet";

interface SmallMapProps {
  lat: string;
  lon: string;
}

const SmallMap = ({ lat, lon }: SmallMapProps) => {
  const latNumber = parseFloat(lat);
  const lonNumber = parseFloat(lon);
  const trailHeadIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
    popupAnchor: [2, -40],
  });

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
        <Marker position={[latNumber, lonNumber]} icon={trailHeadIcon}></Marker>
      </MapContainer>
    </>
  );
};

export default SmallMap;
