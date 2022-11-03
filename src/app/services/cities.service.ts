import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WeatherService } from './weather.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  cityNames: string[] = ['Tel Aviv', 'New York', 'London', 'Bangkok', 'Barcelona'];
  chosenCity:BehaviorSubject<string> = new BehaviorSubject('Tel Aviv');
  isCitiesMenuOpen:BehaviorSubject<boolean> = new BehaviorSubject(false);
  weather?: any;

  constructor(private weatherService: WeatherService) { }

  changeCity(cityName:string) {
    this.chosenCity.next(cityName);
    this.weatherService.getWeatherData(cityName, this.weatherService.forecastDays.value);
  }

  openOrCloseMenu(){
    this.isCitiesMenuOpen.next(!this.isCitiesMenuOpen.value)
  }

}
