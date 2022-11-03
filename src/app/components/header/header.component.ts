import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCitiesMenuOpenSub: Subscription = new Subscription();
  isCitiesMenuOpen!: boolean;
  chosenCitySub: Subscription = new Subscription();
  chosenCity: string = '';
  currentDate!: Date;

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.currentDate = new Date();

    this.chosenCitySub = this.citiesService.chosenCity.subscribe({next:(val)=>{
      this.chosenCity = val
    }, error:(err)=>{
      console.log(err)
      }});

    this.isCitiesMenuOpenSub = this.citiesService.isCitiesMenuOpen.subscribe({next:(val)=>{
      this.isCitiesMenuOpen = val
    },error:(err)=>{
      console.log(err)
    }});
  }

  openOrCloseMenu(){
    this.citiesService.openOrCloseMenu();
  }

}
