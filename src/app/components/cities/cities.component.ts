import { Component, OnInit } from '@angular/core';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cityNames: string[] = this.citiesService.cityNames;

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {

  }

  onChangeCity(cityName:string) {
    this.citiesService.changeCity(cityName)
  }

}
