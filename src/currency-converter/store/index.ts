import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import { currencyConverterReducer } from "../reducers/currency-converter.reducer";
import { CurrencyConverterActionsUnion } from "../actions/currency-converter.actions";
import { HistoryRecord } from "../models/currency-converter.models";
import { HistoryRecordState } from "../entities/conversion-history.entity";

// export interface AppState {
//   currencyConverterState: CurrencyConverterState;
// }
export interface CurrencyConverterState {
  fromCurrency: string;
  toCurrency: string;
  exchangeRates: { [key: string]: number };
  history: HistoryRecordState;
}
// export const CurrencyConverterReducers: ActionReducerMap<AppState, CurrencyConverterActionsUnion> = {
//   currencyConverterState: currencyConverterReducer
// };
export const currencyConverterState = createFeatureSelector<
  CurrencyConverterState
>("currencyConverter");

// export const getFromCurrency = createSelector(
//   currencyConverterState,
//   (state: CurrencyConverterState) => state.fromCurrency
// );
