import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(business_id: string, paginationDetails: any) {
    return this.http.get(`${environment.business_endpoint}/orders/${business_id}?limit=${paginationDetails.limit}&offset=${paginationDetails.offset}`, {
      headers: {
        'module': 'business',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  getOrder(order_id: string) {
    return this.http.get(environment.business_endpoint + '/order/' + order_id, {
      headers: {
        'module': 'business',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  updateOrderStatus(order_id: string, order_status: string) {
    return this.http.put(environment.business_endpoint + '/order/' + order_id, {
      order_status
    }, {
      headers: {
        'module': 'business',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

}
