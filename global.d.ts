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

export interface Trail {
  id: number;
  difficulty: 1 | 2 | 3;
  latitude: string;
  length: number;
  longitude: string;
  map_url: string;
  name: string;
  photo_url: string;
  prefecture: string;
}

export type TTrailMetrics = {
  trailID: number;
  userID: number | undefined;
};

export type TDataSet = {
  date: string;
  length: string;
};

export type TMessageLike = {
  id: number;
  user: number;
  message_id: number;
  value: number;
  create_date: string;
  update_date: string | null;
};

export type TTrailCompletion = {
  id: number;
  user: number;
  trail_id: number;
  completion: boolean;
  date: string;
};

export type TMessageDetailsProps = {
  messageDetails: TMessageDetails;
  setMessageDetails: Function;
};

export type TMessageFormProps = {
  trailID: number;
  currentPosition: TLatLng;
  formOpen: boolean;
  setFormOpen: Function;
  setIsSubmitted: Function;
};

export type TMessageIconProps = {
  message: TMessageData;
  setMessageDetails: Function;
};

export type TLatLng = {
  lat: number;
  lng: number;
};

declare module "react-open-weather";
declare module "leaflet";
declare module "leaflet-defaulticon-compatibility";
declare module "leaflet-geosearch";
declare module "react-leaflet";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

declare module "react-leaflet-locate-control";
