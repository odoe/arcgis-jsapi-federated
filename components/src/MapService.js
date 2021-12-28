import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export class MapService {
  container = null;
  view = null;
  constructor(_container) {
    this.container = _container;
    this._initialize();
  }

  _initialize() {
    const map = new ArcGISMap({
      basemap: "satellite",
    });

    const view = new MapView({
      map,
      container: this.container,
    });

    this.view = view;
  }
}
