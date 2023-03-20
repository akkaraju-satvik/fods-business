import { Component, Input } from '@angular/core';

@Component({
  selector: 'business-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent {

  @Input() item: any;

}
