import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  CurrencyConverterActionsUnion,
  CURRENCY_ACTION_TYPES
} from '../actions/currency-converter.actions';
import { map, switchMap } from 'rxjs/operators';
import { CurrencyConverterService } from '../services/currency-converter.service';
import { of } from 'rxjs';
@Injectable()
export class CurrencyConverterEffects {
  @Effect() getExchangeRates$ = this.actions$.pipe(
    ofType(CURRENCY_ACTION_TYPES.CHANGE_FROM_CURRENCY),
    map(action => action.payload),
    switchMap(
      payload => this.currencyConverterService.getExchangeRate(payload)
      // {
      //   debugger;
      //   return of({ rates: [] });
      // }
    ),
    map((result: any) => result.rates),
    map(exchangeRates => {
      return {
        type: CURRENCY_ACTION_TYPES.UPDATE_EXCHANGE_RATES,
        payload: exchangeRates
      };
    })
  );
  constructor(
    private actions$: Actions<CurrencyConverterActionsUnion>,
    private currencyConverterService: CurrencyConverterService
  ) {}
}
