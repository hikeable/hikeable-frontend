import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "../styles/singletrail.module.css";

interface SmallMapProps {
  lat: string;
  lon: string;
}

const SmallMap = ({ lat, lon }: SmallMapProps) => {
  const latNumber = parseFloat(lat);
  const lonNumber = parseFloat(lon);

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

export default SmallMap;
