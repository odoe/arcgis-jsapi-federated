import Extent from "@arcgis/core/geometry/Extent";

export class Home {
    view = null;

    constructor(_view) {
        this.view = _view;
    }

    zoomToHomeExtent() {
        const extent = new Extent({
          xmin: -7330167.1,
          ymin: 3729651.7,
          xmax: -7091703.7,
          ymax: -3894052.4,
          spatialReference: {
            wkid: 102100,
          },
        });
    
        this.view.goTo(extent, { animate: false, duration: 0 });
      }
}