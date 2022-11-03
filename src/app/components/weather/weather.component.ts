import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Subscription } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';
import { ChartConfiguration, ChartOptions } from "chart.js";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherSub: Subscription = new Subscription();
  weather?: any;
  chosenCitySub: Subscription = new Subscription();
  chosenCity: string = '';
  forecastDaySub: Subscription = new Subscription();
  forecastDay: number = 0;
  lineChartData?: ChartConfiguration<'line'>['data']
  lineChartOptions?: ChartOptions<'line'>
  lineChartLegend?: boolean;

  constructor(private weatherService: WeatherService, private citiesService: CitiesService) {}

  ngOnInit(): void {
    this.chosenCitySub = this.citiesService.chosenCity.subscribe({next:(val)=>{
      this.chosenCity = val
    }, error:(err)=>{
      console.log(err)
    }});

    this.weatherSub = this.weatherService.weather.subscribe({next:(val) => {
      this.weather = val;
      this.setChart();
    }, error:(err) => {
      console.log(err);
    }});

    this.forecastDaySub = this.weatherService.forecastDays.subscribe({next:(val) => {
      this.forecastDay = val;
    }, error:(err) => {
      console.log(err);
    }});
  }

  setChart() {
    this.lineChartData = this.weatherService.setLineChartData();
    this.lineChartOptions = this.weatherService.setLineChartOptions();
    this.lineChartLegend = true;
  }

  scrollRight() {
    this.weatherService.scrollRight();
  }

  scrollLeft() {
    this.weatherService.scrollLeft();
  }
}
