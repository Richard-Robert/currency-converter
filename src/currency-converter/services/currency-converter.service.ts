import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  private baseURL = 'https://api.exchangeratesapi.io/latest';
  constructor(private http: HttpClient) {}

  getExchangeRate(base) {
    return this.http.get(this.baseURL + `?base=${base}`);
  }
}
