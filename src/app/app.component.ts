import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'Weather App';

  

 
    constructor(private service:LoginService) { }
  
    ngOnInit() {
     
      
    }
  
}
