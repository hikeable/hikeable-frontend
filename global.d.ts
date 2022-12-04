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
