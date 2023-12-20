import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.initMap()
  }

  initMap() {
    const map = new Map({
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    const osmLayer = new TileLayer({
      source: new OSM()
    });

    map.addLayer(osmLayer);
  }

  
}
