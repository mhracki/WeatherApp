import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { Weather } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherList: Weather[] = [] ;
  apiUrl = 'https://api.met.no/weatherapi/locationforecast/1.9';

  constructor(private http: HttpClient, private xml2json: NgxXml2jsonService) {}


  async getWeather(lat: string, lon: string) {

    return await this.http
      .get(`${this.apiUrl}`
        , {params: {lat, lon}, responseType: 'text'},
      )
      .toPromise()
      .then(e => {
        this.parse(e);
      });
  }

  parse(xml2conv: string) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xml2conv, 'text/xml');
    const obj = this.xml2json.xmlToJson(xml);


    this.weatherList = obj['weatherdata'].product.time
      .filter(x => x.location.temperature)
      .map(x => x = {
        time : x['@attributes'].from,
        temperature : x.location.temperature['@attributes'].value,
        humidity : x.location.humidity['@attributes'].value
      });


  }
}
