import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  latitud: number;
  longitud: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let geo: any = this.route.snapshot.paramMap.get('geo');

    geo = geo.substr(4);
    geo = geo.split(',');

    this.latitud = +geo[0];
    this.longitud = +geo[1];
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGF0ZXpubyIsImEiOiJjanp3ajJtbWUwMG1hM2JwNGNrb2dreWY5In0.nEKNqjeMeybCKz-tKnTm5A';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  }

}
