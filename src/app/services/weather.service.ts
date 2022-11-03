import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  chosenCity:BehaviorSubject<string> = new BehaviorSubject('Tel Aviv');
  chartTemps: any[] = [];
  chartHours: any[] = [];
  forecastDays:BehaviorSubject<number> = new BehaviorSubject(0);
  weather: BehaviorSubject<any> = new BehaviorSubject(this.getWeatherData(this.chosenCity.value, this.forecastDays.value));

  constructor(private http: HttpClient) {
    this.getWeatherData(this.chosenCity.value, this.forecastDays.value);
   }

  private getRequest(cityName: string){
    return this.http.get(environment.baseWeatherUrl + cityName, {params: new HttpParams()
      .set('unitGroup', 'metric')
      .set('key', environment.apiKey)
      .set('contentType','json')
    });
  }

  getWeatherData(cityName: string, forecastDays: number) {
    this.getRequest(cityName).subscribe({next:(response) => {
      this.weather.next(response);
      this.chartTemps = this.weather.value.days[forecastDays].hours;
      this.chartHours = this.weather.value.days[forecastDays+1].hours;
      for(let i=0; i<this.chartTemps.length; i++) {
        if(this.chartTemps[i]) {
          this.chartTemps[i] = this.chartTemps[i].temp
          this.chartHours[i] = this.chartHours[i].datetime
        }
      }
    },error:(err) => {
      console.log(err);
    }});
  }

  setLineChartData() {
    return {
      labels: this.chartHours,
      datasets: [
        {
          data: this.chartTemps,
          label: 'Temperatures',
          fill: false,
          tension: 0.5,
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        }
      ]
    };
  }

  setLineChartOptions() {
    return {
      responsive: false
    };
  }

  scrollRight() {
    if(this.forecastDays.value < this.chartTemps.length)
    this.forecastDays.next(this.forecastDays.value+1);
  this.getWeatherData(this.chosenCity.value, this.forecastDays.value);
  }

  scrollLeft() {
    if(this.forecastDays.value > 0)
    this.forecastDays.next(this.forecastDays.value-1);
    this.getWeatherData(this.chosenCity.value, this.forecastDays.value);
  }
}
