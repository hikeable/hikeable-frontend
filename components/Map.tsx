import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import style from "../styles/singletrail.module.css";

interface MapProps {
  lat: string;
  lon: string;
}

const Map = ({ lat, lon }: MapProps) => {
  const latNumber = parseInt(lat);
  const lonNumber = parseInt(lon);

  return (
    <>
      <MapContainer
        className={style.map}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
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
