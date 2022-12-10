interface MapProps {
  lat: number;
  lon: number;
}

export const Map = ({ lat, lon }) => {
  return (
    <>
      <iframe
        width="425"
        height="350"
        // frameborder="0"
        // scrolling="no"
        // marginheight="0"
        // marginwidth="0"
        src="https://www.openstreetmap.org/export/embed.html?bbox=139.23997163772586%2C35.623256366178985%2C139.25273895263675%2C35.62943937920216&amp;layer=mapnik"
        // style="border: 1px solid black"
      ></iframe>
      <br />
      <small>
        <a href={`https://www.openstreetmap.org/#map=17/${lat}/${lon}`}>
          View Larger Map
        </a>
      </small>
    </>
  );
};
