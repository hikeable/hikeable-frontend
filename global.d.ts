declare global {
  interface Window {
    svgJapan: function;
  }
}

type RegionType = {
  id: number;
  name: string;
  prefs: number[];
  color: string;
  active: string;
};

declare function svgJapan(options: {
  element: string;
  uniformly: boolean;
  uniformColor: string;
  width: string;
  height: string;
  regionality: boolean;
  type: string;
  regions: RegionType[];
}): HTMLCollection;

export type Trail = {
  id: number;
  difficulty: 1 | 2 | 3;
  latitude: string;
  length: number;
  longitude: string;
  map_url: string;
  name: string;
  photo_url: string;
  prefecture: string;
};

export type TTrailCard = {
  trail: Trail;
};

export type TTrailCompletion = {
  id: number;
  user: number;
  trail_id: number;
  completion: true;
  date: string;
};

export type TTrailLike = {
  id: number;
  user: number;
  trail_id: number;
  like: boolean;
};

export type TTrailComment = {
  id: number;
  user: number;
  userName: string;
  trail_id: number;
  comment: string;
  date: string;
};

export type TMetricsProp = {
  trailID: number;
};

export type TLatLng = {
  lat: number | null;
  lng: number | null;
};

export type TLargeMapProps = {
  lat: string | null;
  lon: string | null;
  trailID: number;
  isSubmitted: boolean;
  setIsSubmitted: function;
  currentPosition: array;
  setCurrentPosition: function;
  setMessageDetails: function;
};

export type TContactForm = {
  from_name: string | null;
  from_email: string | null;
  message: string | null;
}

declare module "react-open-weather";
declare module "leaflet";
declare module "leaflet-defaulticon-compatibility";
declare module "leaflet-geosearch";
declare module "react-leaflet";
declare module "react-leaflet-locate-control";
declare module "next-cloudinary";
declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}
