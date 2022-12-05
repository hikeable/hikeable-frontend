import { Interface } from "readline";

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
  difficulty: number;
  latitude: number;
  length: number;
  longitude: number;
  map_url: string;
  name: string;
  photo_url: string;
  prefecture: string;
}
