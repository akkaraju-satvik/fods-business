import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(public http: HttpClient) { }

  getDashboard(business_id: string) {
    return this.http.get(environment.business_endpoint + '/dashboard/' + business_id, {
      headers: {
        'module': 'business',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      },
    });
  }

}
