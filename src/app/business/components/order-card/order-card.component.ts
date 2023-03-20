import { Component, Input } from '@angular/core';

@Component({
  selector: 'business-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {

  @Input() order: any;

  ngOnInit(): void {
    this.order.number_of_items = this.order.order_items.length;
    this.order.order_status_text = this.order.order_status.replace(/_/g, ' ');
    this.order.order_status_text = this.order.order_status_text.replace(/\w\S*/g, (txt: any) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    this.order.status_text_color = this.order.order_status === 'cancelled' ? 'text-danger' : 'text-success';
  }

}
