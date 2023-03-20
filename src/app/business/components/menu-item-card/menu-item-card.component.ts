import { Component, Input } from '@angular/core';
import { GeneralService } from 'src/app/general/services/general.service';

@Component({
  selector: 'business-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.scss']
})
export class MenuItemCardComponent {

  @Input() menuItem: any;
  @Input() type!: string;

  constructor(public generalService: GeneralService) { }

}
