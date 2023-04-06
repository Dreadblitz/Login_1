import { Component, OnInit } from '@angular/core';
import { PersonalCoysService } from './personal-coys.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'login_1';

  constructor(private personalCoysService: PersonalCoysService) {}

  async ngOnInit() {
    const personalCoysList = await this.personalCoysService.obtenerPersonalCoys();
    console.log(personalCoysList);
  }
}
