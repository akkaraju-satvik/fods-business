import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  constructor(private http: HttpClient) { }

  addMenuItem(requestBody: any) {
    return this.http.post(environment.business_endpoint + '/menu-item', requestBody, {
      headers: {
        'module': 'business',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  getMenuItems(business_id: string) {
    return this.http.get(environment.business_endpoint + '/menu-items/' + business_id, {
      headers: {
        'module': 'business',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  updateMenuItem(menu_item_id: string, requestBody: any) {
    console.log(requestBody);
    console.log(menu_item_id);
    return this.http.put(environment.business_endpoint + '/menu-item/' + menu_item_id, requestBody, {
      headers: {
        'module': 'business',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  deleteMenuItem(menu_item_id: string) {
    return this.http.delete(environment.business_endpoint + '/menu-item/' + menu_item_id, {
      headers: {
        'module': 'business',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }
}
