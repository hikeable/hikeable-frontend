import { useSearchParams } from "next/navigation";

const mapview = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  return (
    <>
      {lat}
      {lon}
    </>
  );
};

export default mapview;
