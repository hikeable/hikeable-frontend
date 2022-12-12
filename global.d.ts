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

declare module "react-open-weather";
declare module "leaflet";
declare module "leaflet-defaulticon-compatibility";
declare module "leaflet-geosearch";
declare module "react-leaflet";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}
