import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  mobileView: boolean = false;

  currentRestaurantID!: string;

  constructor() { }

  formatAmount(amount: number | string) {
    if (Number(amount) % 1 === 0) {
      return Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 });
    } else {
      return Number(amount).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
    }
  }

}
