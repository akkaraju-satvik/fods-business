import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'business-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  hamburgerMenuItems = [];

  getOrderLoad !: boolean;
  order: any;
  orderID: string;

  constructor(public ordersService: OrdersService, private activatedRoute: ActivatedRoute) {
    this.orderID = activatedRoute.snapshot.params['id'];
    console.log(this.orderID);
  }

  ngOnInit(): void {
    this.getOrderLoad = true;
    this.ordersService.getOrder(this.orderID).subscribe({
      next: (response: any) => {
        console.log(response);
        this.order = response.data;
        this.order.status_text_color = this.order.order_status === 'cancelled' ? 'text-danger' : 'text-success';
        this.order.order_status_text = this.order.order_status.replace(/_/g, ' ');
        // order.order_status_text to title case
        this.order.order_status_text = this.order.order_status_text.replace(/\w\S*/g, (txt: any) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        this.getOrderLoad = false;
      },
      error: (error: any) => {
        console.log(error);
        this.getOrderLoad = false;
      }
    });
  }


}
