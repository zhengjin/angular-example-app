import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import HeatmapLayer from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
// import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;
  @ViewChild('popupContent') popupContent: ElementRef;

  private map!: Map;
  private vectorSource: VectorSource;
  private vectorLayer: VectorLayer<VectorSource>;
  private heatmapLayer: HeatmapLayer;
  private overlay: Overlay;

  constructor() {
    this.popupContent = new ElementRef<HTMLDivElement>(document.createElement('div'));

    this.vectorSource = new VectorSource();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
    });
    this.heatmapLayer = new HeatmapLayer({
      source: this.vectorSource,
      radius: 15,
      blur: 25,
    });
    this.overlay = new Overlay({
      element: this.popupContent.nativeElement,
      autoPan: true,
      positioning: 'bottom-center',
      stopEvent: false
    });
  }

  ngOnInit(): void {
    this.initMap()
  }

  ngAfterViewInit(): void {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.mapElement = new ElementRef(mapElement as HTMLDivElement);
      this.initMap();
    } else {
      console.error('Unable to find the map element with id "map" in the DOM.');
    }
  }

  initMap() {
    const baiduSource = new TileLayer();
    const map = new Map({
      target: this.mapElement.nativeElement,
      layers: [baiduSource, this.vectorLayer, this.heatmapLayer],
      view: new View({
        center: [0, 0],
        zoom: 2,
        minZoom: 3,
      }),
    });

    const osmLayer = new TileLayer({
      source: new OSM()
    });

    map.addLayer(osmLayer);
  }

  
}
