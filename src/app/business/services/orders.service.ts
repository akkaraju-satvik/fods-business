import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(business_id: string) {
    return this.http.get(environment.business_endpoint + '/orders/' + business_id, {
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
}
