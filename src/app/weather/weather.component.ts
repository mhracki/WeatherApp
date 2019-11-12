import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Cities } from '../shared/constants/cities';
import * as moment from 'moment';
import { Weather } from '../shared/weather.model';
import { Chart } from 'chart.js';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  time: string;
  temperature: string;
  humidity: string;
  counter: number;
  cities = Cities;
  selected = this.cities[0];
  startDate: Date = new Date();
  endDate: Date;
  weatherData: Weather[];
  chartTemperature: string[];
  chartHumidity: string[];
  chartTime: string[]=[];
  chartSchema: any;
  @ViewChild('chart', { static: true })
  chart: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  user: User;

  constructor(private wserv: WeatherService, private service: UserService) {}

  async ngOnInit() {
    await this.wserv.getWeather(
      this.cities[0].localization.lat,
      this.cities[0].localization.lon
    );
    this.counter = 0;
    this.updateValues();
    this.onStartDate(this.startDate);
    this.service
      .getUser(localStorage.getItem('id'))
      .subscribe(res => (this.user = res));
  }
  updateValues() {
    this.time = this.wserv.weatherList[this.counter].time;
    this.temperature = this.wserv.weatherList[this.counter].temperature;
    this.humidity = this.wserv.weatherList[this.counter].humidity;
  }
  add() {
    this.counter++;
    this.updateValues();
  }
  subs() {
    this.counter--;
    this.updateValues();
  }
  async onCityChange(lat, lon) {
    await this.wserv.getWeather(lat, lon);
    this.updateValues();
    this.onStartDate(this.startDate);
  }
  onStartDate(startDate) {
    const date = this.toTimeStamp(startDate);
    this.weatherData = this.wserv.weatherList.filter(
      x => this.toTimeStamp(x.time) > date
    );
    if (this.endDate) {
      this.weatherData = this.weatherData.filter(
        x => this.toTimeStamp(x.time) <= this.toTimeStamp(this.endDate)
      );
    }
    this.chartTemperature = this.weatherData.map(x => x.temperature);
    this.chartHumidity = this.weatherData.map(x => x.humidity);
    this.chartTime = this.weatherData.map(x =>
      moment(x.time).format('MM/DD/YYYY, hh:mm A')
    );
    this.drawChart();
  }

  onEndDate() {
    this.onStartDate(this.startDate);
  }

  toTimeStamp = date => moment(date).format('x');

  drawChart() {
    if (this.chartSchema) {
      this.chartSchema.destroy();
    }
    this.ctx = this.chart.nativeElement.getContext('2d');

    this.chartSchema = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.chartTime,
        datasets: [
          {
            label: 'Temperature in °C',
            data: this.chartTemperature,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1
          },
          {
            label: 'Humidity in %',
            data: this.chartHumidity,
            backgroundColor: ['rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgba(153, 102, 255, 1)'],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
