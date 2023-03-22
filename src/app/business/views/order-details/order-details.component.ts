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
  orderStatus!: string;

  orderStatuses = [
    {
      label: 'Preparing Order',
      value: 'order_preparing'
    },
    {
      label: 'Order Ready',
      value: 'order_ready'
    },
    {
      label: 'Order Picked Up',
      value: 'picked_up'
    },
    {
      label: 'Delivered',
      value: 'delivered'
    }
  ]

  constructor(public ordersService: OrdersService, private activatedRoute: ActivatedRoute) {
    this.orderID = activatedRoute.snapshot.params['id'];
    console.log(this.orderID);
  }

  ngOnInit(): void {
    this.getOrderLoad = true;
    this.getOrder();
  }

  getOrder() {
    this.ordersService.getOrder(this.orderID).subscribe({
      next: (response: any) => {
        console.log(response);
        this.order = response.data;
        this.order.status_text_color = this.order.order_status === 'cancelled' ? 'text-danger' : 'text-success';
        this.order.order_status_text = this.order.order_status.replace(/_/g, ' ');
        this.orderStatus = this.order.order_status === 'delivered' ? 'picked_up' : this.order.order_status;
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

  updateOrderStatus(order_status: string) {
    this.ordersService.updateOrderStatus(this.orderID, order_status).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getOrder();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }


}
